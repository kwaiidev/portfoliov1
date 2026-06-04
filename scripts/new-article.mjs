import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Usage: npm run new:article -- "Article title"');
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

const articlesRoot = join(process.cwd(), 'content', 'articles');
const filePath = join(articlesRoot, `${slug}.md`);

if (existsSync(filePath)) {
  console.error(`Article already exists: ${filePath}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const escapedTitle = title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const template = `---
title: "${escapedTitle}"
date: "${today}"
description: ""
tags: ["blog"]
published: true
---

## intro

Start writing here.
`;

mkdirSync(articlesRoot, { recursive: true });
writeFileSync(filePath, template);

console.log(`Created ${filePath}`);
