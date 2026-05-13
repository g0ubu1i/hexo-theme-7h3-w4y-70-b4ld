# 7h3_w4y_70_b4ld

一款面向 CTF 选手、漏洞研究员、蓝队工程师的 Hexo 主题。

当前版本支持：

- 首页 / 文章页 / 归档页 / 分类页 / 标签页
- profile 区域标签雷达图
- 标签索引页
- 友情链接页面
- 文章目录 TOC
- 代码块复制按钮
- 独立 `preview.html` 预览

## 主题名

本主题名为：

```text
7h3_w4y_70_b4ld
```

## 目录结构

```text
layout/
source/
languages/
_config.yml
package.json
preview.html
example/
```

## 直接预览

打开：

```text
preview.html
```

## 作为 Hexo 主题使用

把本目录放到你的 Hexo 站点中：

```text
themes/7h3_w4y_70_b4ld
```

然后在站点根目录 `_config.yml` 里启用：

```yml
theme: 7h3_w4y_70_b4ld
```

执行构建：

```bash
npx hexo generate
```

## profile 标签雷达图

- 取消了原来的 `profile.stats`
- 标签雷达图现在直接显示在 profile 区域
- 默认取文章数量最多的前 6 个标签
- 少于 3 个标签时不会绘制雷达图

## 标签页

标签页不再显示雷达图，改为完整标签索引列表。

创建页面：

```text
source/tags/index.md
```

内容示例：

```yml
---
title: 标签
type: tags
layout: tags
---
```

## 文章 front matter 示例

front matter 仍然用于驱动首页卡片、摘要、TOC 开关等，但文章页不再显示单独的元数据面板。

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
challenge: SSRF to Intranet
platform: Lab / Self-hosted
difficulty: Medium
warning: 文章中的目标、域名与数据均为实验环境样本。
---
```

对应示例文件：

```text
example/source/_posts/welcome-to-7h3_w4y_70_b4ld.md
```

## 友情链接

创建页面：

```text
source/friends/index.md
```

示例：

```yml
---
title: 友情链接
layout: friends
links:
  - name: g0ubu1i's Blog
    url: https://blog.goubuli.online
    desc: CTF学习笔记
---
```

## TOC 与代码复制

- 文章目录默认自动开启
- 如果某篇文章不想显示 TOC，可在 front matter 里写：

```yml
toc: false
```

- 代码块复制按钮会自动注入到文章页代码块右上角
