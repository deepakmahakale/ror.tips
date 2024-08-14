---
layout: single
title: How to add devcontainer in rails?
description: &description >
  This article explains how to add devcontainer in rails.
excerpt: *description
date: 2024-08-14
categories:
  - Rails
tags:
  - Devcontainer
header:
  og_image: /assets/images/opengraph/2024-08-14-how-to-add-devcontainer-in-rails.png
---

Rails 7.2 introduced devcontainer support to make it easier to set up a development environment for a Rails application.

## Adding devcontainer in a new rails application

```bash
rails new blog --devcontainer
```

## Adding devcontainer to an existing rails application

```bash
rails devcontainer
```

## References

- [Rails Guides - Getting Started with Dev Containers](https://guides.rubyonrails.org/getting_started_with_devcontainer.html){:target="_blank"}
