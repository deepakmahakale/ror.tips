---
layout: posts
title: How to check TODOs and FIXMEs in rails?
description: >
  Want to check all the TODO's in your rails application?
  Let's see how to do it.
date: 2023-09-13
categories:
  - rails
image: images/og/how-to-check-todos-in-rails.png
---

## Find all TODO's and FIXME's in your project?

```bash
$ bin/rails notes

app/controllers/posts_controller.rb:
  * [ 9] [TODO] Move this logic to a concern
  * [18] [FIXME] Refactor this method

app/models/post.rb:
  * [ 2] [TODO] Refactor this validation

```

## Find notes with specific annotation

```bash
$ bin/rails notes -a TODO

app/controllers/posts_controller.rb:
  * [9] Move this logic to a concern

app/models/post.rb:
  * [2] Refactor this validation
```

```bash
$ bin/rails notes -a FIXME

app/controllers/posts_controller.rb:
  * [18] Refactor this method
```
