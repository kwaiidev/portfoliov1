#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const reportPath = resolve(root, '.lighthouse/performance.json');
const dataPath = resolve(root, 'data/performance.json');
const port = process.env.PERF_PORT ?? '3100';
const suppliedUrl = process.env.PERF_URL;
const targetUrl = suppliedUrl ?? `http://127.0.0.1:${port}`;

const budgets = {
  performance: 95,
  transferKb: 250,
  jsKb: 150,
  cls: 0.05,
  tbt: 100,
};

function run(command, args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolveRun();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function waitForServer(server) {
  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error('The production server stopped before the audit started.');

    try {
      const response = await fetch(targetUrl, { signal: AbortSignal.timeout(1000) });
      if (response.ok) return;
    } catch {
      // Retry until the server is ready.
    }

    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }

  throw new Error(`Timed out waiting for ${targetUrl}`);
}

function extractMetrics(report) {
  const requests = report.audits['network-requests'].details.items;
  const transferredBytes = (items) => items.reduce((total, item) => total + (item.transferSize ?? 0), 0);

  return {
    performance: Math.round(report.categories.performance.score * 100),
    lcp: Number((report.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2)),
    cls: Number(report.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
    tbt: Math.round(report.audits['total-blocking-time'].numericValue),
    transferKb: Math.round(transferredBytes(requests) / 1000),
    jsKb: Math.round(transferredBytes(requests.filter((request) => request.resourceType === 'Script')) / 1000),
    requests: requests.length,
  };
}

function checkBudgets(metrics) {
  return [
    metrics.performance >= budgets.performance || `performance ${metrics.performance} < ${budgets.performance}`,
    metrics.transferKb <= budgets.transferKb || `transfer ${metrics.transferKb} KB > ${budgets.transferKb} KB`,
    metrics.jsKb <= budgets.jsKb || `JavaScript ${metrics.jsKb} KB > ${budgets.jsKb} KB`,
    metrics.cls <= budgets.cls || `CLS ${metrics.cls} > ${budgets.cls}`,
    metrics.tbt <= budgets.tbt || `TBT ${metrics.tbt} ms > ${budgets.tbt} ms`,
  ].filter((result) => result !== true);
}

async function main() {
  let server;
  let serverExit;

  try {
    if (!suppliedUrl) {
      await run('npm', ['run', 'build']);
      server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', port], {
        cwd: root,
        stdio: 'inherit',
      });
      serverExit = once(server, 'exit');
      await waitForServer(server);
    }

    await mkdir(dirname(reportPath), { recursive: true });
    await run('npx', [
      '--yes',
      'lighthouse@13.4.1',
      targetUrl,
      '--only-categories=performance',
      '--output=json',
      `--output-path=${reportPath}`,
      '--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage',
      '--quiet',
    ]);

    const report = JSON.parse(await readFile(reportPath, 'utf8'));
    const metrics = extractMetrics(report);
    const failures = checkBudgets(metrics);

    console.table(metrics);

    if (failures.length > 0) {
      throw new Error(`Performance budget failed:\n- ${failures.join('\n- ')}`);
    }

    await writeFile(dataPath, `${JSON.stringify(metrics, null, 2)}\n`);
    console.log(`Updated ${dataPath}`);
  } finally {
    server?.kill('SIGTERM');
    await serverExit;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
