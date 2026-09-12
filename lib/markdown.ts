import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

export type TableOfContentsItem = {
  id: string;
  title: string;
  depth: number;
};

type TableOfContentsOptions = {
  minDepth?: number;
  maxDepth?: number;
};

export function createHeadingSlugger() {
  return new GithubSlugger();
}

export function extractTableOfContents(
  markdown: string,
  { minDepth = 2, maxDepth = 3 }: TableOfContentsOptions = {},
) {
  const tree = unified().use(remarkParse).parse(markdown);
  const slugger = createHeadingSlugger();
  const items: TableOfContentsItem[] = [];

  visit(tree, 'heading', (node) => {
    const title = toString(node).trim();

    if (!title) {
      return;
    }

    const id = slugger.slug(title);

    if (node.depth >= minDepth && node.depth <= maxDepth) {
      items.push({ id, title, depth: node.depth });
    }
  });

  return items;
}
