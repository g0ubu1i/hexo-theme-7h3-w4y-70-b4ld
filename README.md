# 7h3_w4y_70_b4ld

[English](./README.en.md)

面向 CTF 选手、网络安全从业者与技术写作者的 Hexo 主题。

## 特性

- 深色安全风格界面
- 首页文章卡片
- 文章页 TOC
- TOC 当前标题高亮与分级展开
- 代码复制按钮
- 长代码块横向滚动优化
- 标签页索引
- 侧边栏标签雷达图
- 友情链接页面
- KaTeX 公式渲染
- 鼠标跟随发光效果
- 中文化默认界面
- 独立 `preview.html` 预览页

## 主题名

```text
7h3_w4y_70_b4ld
```

## 目录结构

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

## 预览

直接打开：

```text
preview.html
```

## 安装

将主题放入 Hexo 站点：

```text
themes/7h3_w4y_70_b4ld
```

然后在站点根目录 `_config.yml` 中启用：

```yml
theme: 7h3_w4y_70_b4ld
```

构建：

```bash
npx hexo clean
npx hexo generate
npx hexo server
```

## 推荐页面

### 标签页

创建：

```text
source/tags/index.md
```

内容：

```yml
---
title: 标签
type: tags
layout: tags
---
```

### 友链页

创建：

```text
source/friends/index.md
```

内容：

```yml
---
title: 友情链接
type: friends
layout: friends
links:
  - name: NightLab
    url: https://nightlab.example/
    desc: Web 安全、云原生攻防与漏洞复现
    tag: Web
---
```

## 配置读取优先级

主题支持从站点根目录 `_config.yml` 覆盖主题配置。

优先级：

```text
站点根目录顶层配置
> 站点根目录 7h3_w4y_70_b4ld 命名空间
> 主题自身 _config.yml
```

支持覆盖的配置段：

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

### 根配置顶层写法

```yml
menu:
  首页: /
  归档: /archives/
  标签: /tags/
  友链: /friends/
  关于: /about/

brand:
  name: 7h3_w4y_70_b4ld
  mark: https://example.com/logo.png
  motto: 记录题解、漏洞、流量与证据链

profile:
  title: 攻防研究笔记
  description: 聚焦 Web、Pwn、Reverse、Crypto、DFIR
  badges:
    - Web
    - Pwn
    - Reverse
    - Crypto
    - DFIR
```

### 命名空间写法

```yml
7h3_w4y_70_b4ld:
  ui:
    accent: "#5bff98"
  math:
    enable: true
    inline_dollar: true
```

## 数学公式

默认内置 KaTeX，支持：

- 行内公式：`$...$`、`\(...\)`
- 块级公式：`$$...$$`、`\[...\]`

主题配置：

```yml
math:
  enable: true
  inline_dollar: true
```

单篇文章关闭公式：

```yml
---
title: 示例
math: false
---
```

## 文章 front matter 示例

```yml
---
title: 从一条异常回显定位到完整攻击面
date: 2026-05-12 20:30:00
updated: 2026-05-12 22:10:00
categories:
  - Web
tags:
  - ssrf
  - writeup
  - internal-network
summary: 记录一次从外部 SSRF 探测点到内网 HTTP 服务识别的复现过程。
warning: 文中的目标、域名与数据均为实验环境样本。
toc: true
math: false
---
```

## 页面行为

- 文章页默认隐藏侧边栏 profile
- TOC 支持 H1 / H2 / H3
- TOC 点击跳转与滚动高亮
- 代码块固定行号宽度
- 长代码仅在代码块内部滚动
- 归档页标题与摘要自动截断，避免溢出
- `brand.mark` 可直接使用图片地址

## 示例内容

可参考：

```text
example/source/_posts/welcome-to-7h3_w4y_70_b4ld.md
example/source/tags/index.md
example/source/friends/index.md
example/source/about/index.md
```

## 开发

本地预览可直接将主题复制到你的 Hexo 站点中，然后执行：

```bash
npx hexo clean
npx hexo g
npx hexo s
```

## License

MIT
