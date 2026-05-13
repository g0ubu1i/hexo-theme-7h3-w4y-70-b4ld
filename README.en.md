# 7h3_w4y_70_b4ld

[简体中文](./README.md)

A Hexo theme for CTF players, security practitioners, and technical bloggers.

## Features

- Dark security-oriented visual style
- Homepage post cards
- Article TOC
- Active TOC highlighting with hierarchical expansion
- Code copy button
- Optimized horizontal scrolling for long code blocks
- Tag index page
- Sidebar tag radar chart
- Friend links page
- KaTeX math rendering
- Cursor glow effect
- Chinese-first UI
- Standalone `preview.html`

## Theme Name

```text
7h3_w4y_70_b4ld
```

## Structure

```text
layout/
source/
languages/
scripts/
example/
_config.yml
package.json
preview.html
```

## Preview

Open:

```text
preview.html
```

## Installation

Put the theme into your Hexo site:

```text
themes/7h3_w4y_70_b4ld
```

Enable it in your site root `_config.yml`:

```yml
theme: 7h3_w4y_70_b4ld
```

Build:

```bash
npx hexo clean
npx hexo generate
npx hexo server
```

## Recommended Pages

### Tags page

Create:

```text
source/tags/index.md
```

Content:

```yml
---
title: Tags
type: tags
layout: tags
---
```

### Friends page

Create:

```text
source/friends/index.md
```

Content:

```yml
---
title: Friends
type: friends
layout: friends
links:
  - name: NightLab
    url: https://nightlab.example/
    desc: Web security, cloud-native offense/defense, and vuln reproduction
    tag: Web
---
```

## Configuration Priority

This theme supports overriding theme settings from the site root `_config.yml`.

Priority:

```text
site root top-level config
> site root 7h3_w4y_70_b4ld namespace
> theme local _config.yml
```

Supported sections:

```text
language
menu
brand
hero
profile
social
footer
ui
math
```

### Top-level config example

```yml
menu:
  Home: /
  Archives: /archives/
  Tags: /tags/
  Friends: /friends/
  About: /about/

brand:
  name: 7h3_w4y_70_b4ld
  mark: https://example.com/logo.png
  motto: Writeups, vulnerabilities, traffic, and evidence chains
```

### Namespaced config example

```yml
7h3_w4y_70_b4ld:
  ui:
    accent: "#5bff98"
  math:
    enable: true
    inline_dollar: true
```

## Math Rendering

Built-in KaTeX support:

- Inline math: `$...$`, `\(...\)`
- Display math: `$$...$$`, `\[...\]`

Theme config:

```yml
math:
  enable: true
  inline_dollar: true
```

Disable math per post:

```yml
---
title: Example
math: false
---
```

## Post Front Matter Example

```yml
---
title: From abnormal response to full attack surface mapping
date: 2026-05-12 20:30:00
updated: 2026-05-12 22:10:00
categories:
  - Web
tags:
  - ssrf
  - writeup
  - internal-network
summary: A walkthrough from external SSRF probing to internal HTTP service identification.
warning: Targets, domains, and data in this post are from a lab environment.
toc: true
math: false
---
```

## Behavior

- Sidebar profile is hidden on post pages
- TOC supports H1 / H2 / H3
- TOC smooth scrolling and active heading tracking
- Fixed line-number width in code blocks
- Long code scrolls inside the block only
- Archive titles and summaries are truncated to avoid overflow
- `brand.mark` can use an image URL directly

## Example Content

See:

```text
example/source/_posts/welcome-to-7h3_w4y_70_b4ld.md
example/source/tags/index.md
example/source/friends/index.md
example/source/about/index.md
```

## Development

To preview locally, copy the theme into your Hexo site and run:

```bash
npx hexo clean
npx hexo g
npx hexo s
```

## License

MIT
