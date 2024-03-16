---
layout: single
title: How to edit rails credentials?
description: &description >
  This article explains how to edit environment-specific rails credentials.
excerpt: *description
date: 2024-03-08
categories:
  - Rails
tags:
  - Credentials
header:
  og_image: /assets/images/opengraph/2024-03-08-how-to-edit-rails-credentials.png
---

Rails recommends using encrypted credentials to store sensitive information like API keys, passwords, etc.
The secrets are stored in `config/credentials.yml.enc` file and can be accessed using `Rails.application.credentials`.

## How to edit rails credentials

```bash
$ EDITOR=vim rails credentials:edit
```

This will open the encrypted credentials file in the editor specified by the `EDITOR` environment variable.

**Note:** This command will create `config/credentials.yml.enc` file as well as `config/master.key` if they don't exist.
{: .notice--info}

## How to edit rails credentials

```bash
$ EDITOR=vim rails credentials:edit --environment production
```

This will open the encrypted credentials file for the production environment (`config/credentials/production.yml.enc`) in the editor specified by the `EDITOR` environment variable.

## References

- [https://guides.rubyonrails.org/security.html#custom-credentials](https://guides.rubyonrails.org/security.html#custom-credentials){:target="_blank"}

**Note:** All the commands have been tested with rails 7.1 and the result may differ from prior versions
{: .notice--info}
