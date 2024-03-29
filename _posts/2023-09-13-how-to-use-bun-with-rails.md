---
layout: single
title: How to use bun with rails?
description: &description >
  This article explains how to use Bun with Rails 7.1.
excerpt: *description
date: 2023-09-13
categories:
  - Rails
tags:
  - JavaScript
header:
  og_image: /assets/images/opengraph/2023-09-13-how-to-use-bun-with-rails.png
---

Bun is fast. So is Rails.

Rails 7.1
[added support](https://github.com/rails/jsbundling-rails/pull/167){:target="_blank"}
to use bun as JS runtime.

## Use bun with new rails application

```bash
$ rails new blog --javascript=bun
```

## Use bun with an existing rails application

```bash
$ bin/rails javascript:install:bun
```
