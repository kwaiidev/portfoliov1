import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Usage: npm run new:project -- "Project title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/['"]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!slug) {
  console.error('Could not create a valid slug from that title.');
  process.exit(1);
}

const projectsRoot = join(process.cwd(), 'content', 'projects');
const filePath = join(projectsRoot, `${slug}.md`);

if (existsSync(filePath)) {
  console.error(`Project already exists: ${filePath}`);
  process.exit(1);
}

const escapedTitle = title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const template = `---
title: "${escapedTitle}"
role: ""
timeline: ""
status: ""
order: 999
summary: ""
tech: []
highlights: []
links: []
images: []
published: false
---

## overview

Start with the problem and the system you built.

## engineering notes

Document the decisions, tradeoffs, and results that mattered.
`;

mkdirSync(projectsRoot, { recursive: true });
writeFileSync(filePath, template);

console.log(`Created ${filePath}`);
