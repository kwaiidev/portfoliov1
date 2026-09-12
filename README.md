# kwaii.dev

Jason Sacerio's single-page portfolio, built with the Next.js App Router. About, experience, projects, and articles share one anchored homepage. Project case studies and full articles are rendered from Markdown at build time, with small client components reserved for project browsing and long-form section tracking.

## Local development

Use Node.js 22, matching the version declared in `package.json`.

```bash
npm ci
npm run dev
```

Before shipping a change, run:

```bash
npm run check
```

This runs ESLint, TypeScript, and the production build. The build also validates all published project and article frontmatter.

## Content structure

```text
content/
  articles/
    article-slug.md
  projects/
    project-slug.md
```

Both content types use YAML frontmatter followed by normal Markdown. Published content is statically rendered, so readers and search engines receive the complete page without waiting for client JavaScript.

### Writing an article

```bash
npm run new:article -- "Article title"
```

Article frontmatter includes `title`, `date`, `description`, `tags`, and `published`. New articles start as unpublished drafts, so they cannot break the production build while their metadata is still being written. Start body sections at `##`. Section IDs and the table of contents are generated from the Markdown headings, so there is no separate navigation list to maintain.

### Adding a project

```bash
npm run new:project -- "Project title"
```

The generated draft is unpublished until its required metadata is filled in. Project frontmatter supports:

- `title`, `order`, and `summary`
- optional `year`, `role`, `timeline`, `status`, `award`, `aliases`, and `featured`
- `tech` and `highlights` lists for the project explorer
- optional links with `label` and `href`
- zero or more images with `src`, specific `alt` text, `width`, `height`, and optional `caption` or `focalPoint`

The Markdown body is the project case study. It can stay short or grow into a detailed technical document with nested sections, code, tables, quotes, diagrams, and images. Adding depth does not require a new page component.

Project media lives in `public/projects/<project-slug>/`. The homepage project explorer loads one selected image at a time. Detail galleries use responsive image sizes, stable frames, lazy secondary media, and links to the original files.

## Long-form pages

Articles and project case studies share the same renderer and layout. The shared system provides:

- stable heading anchors and build-time table of contents data
- sticky desktop section navigation
- a compact native mobile section navigator
- readable prose, code, table, list, quote, and media styles
- previous and next project navigation
- direct hash links that work without JavaScript

The active section indicator is a progressive enhancement. The content and every anchor remain available when JavaScript is disabled.

## Vercel deployment

Import this repository using Vercel's Next.js framework preset. Use the repository root, `npm ci` for installation, and `npm run build` for the build. Keep the default output directory; this is a normal Next.js deployment, not a static export. [Vercel supports this configuration directly](https://vercel.com/docs/frameworks/full-stack/nextjs).

The site requires no environment variables. Markdown is read from `content/` during the build, images and the resume are served from `public/`, and Next.js handles image optimization. Redirects and security headers live in `next.config.ts`. The public Umami website ID in `app/layout.tsx` is the existing analytics configuration, not a secret.

The Next.js and ESLint packages stay on the same 15.5 patch release. A scoped PostCSS override uses a patched 8.x version for Next.js's CSS tooling. Recheck the override when upgrading Next.js; the dependency advisory is documented [upstream](https://github.com/postcss/postcss/security/advisories/GHSA-fxqj-rqcc-2cmp).

## Performance metadata

Run the production Lighthouse audit and refresh the hero readout with:

```bash
npm run perf:update
```

The audit requires a local Chrome or Chromium installation. Set `CHROME_PATH` if Lighthouse cannot find it. By default, the command builds the site, serves it locally, runs Lighthouse 13.4.1 with its default mobile simulation, and writes the extracted measurements to `data/performance.json` after the budgets pass. The full report is saved in the ignored `.lighthouse/performance.json` file. To measure an existing preview or deployment instead, provide its URL:

```bash
PERF_URL=https://preview.example.com npm run perf:update
```

The next build imports that JSON directly, so visitors receive static text without another request or any measurement code. The audit also checks a performance score of at least 95, transfer size no greater than 250 KB, JavaScript no greater than 150 KB, CLS no greater than 0.05, and TBT no greater than 100 ms.

Run `npm run build` after updating the metrics to include the new readout in the production output. Keep the Lighthouse version and mobile settings unchanged when comparing results. No separate test runner or formatter is configured; `npm run check` covers the repository's automated code and build checks.
