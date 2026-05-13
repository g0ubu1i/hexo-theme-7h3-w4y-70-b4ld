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
event: Internal Research
author_alias: 0xBlue
reading_time: 12 min
lab: LAB-07
tools:
  - Burp Suite
  - ffuf
  - httpx
iocs:
  - metadata endpoint
  - x-forwarded-for
warning: 文章中的目标、域名与数据均为实验环境样本。
---

## 背景

这篇示例文章用来演示主题如何从 Markdown front matter 中读取元数据。

## 观察点

1. 首页卡片会读取 `summary`、`difficulty`、`platform` 与 `challenge`。
2. 文章页会渲染 `题目 / 工具链 / IOC / 实验编号` 等元数据。
3. 标题层级会自动生成 TOC。

## 示例命令

```bash
ffuf -u http://target.local/FUZZ -w raft-small-words.txt
```

## 结论

如果你希望对某篇文章关闭目录，可以在 front matter 中设置：

```yml
toc: false
```
