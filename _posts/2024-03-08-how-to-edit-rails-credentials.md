---
layout: single
title: "How to edit Rails credentials (credentials:edit)"
description: &description >
  Edit Rails credentials with bin/rails credentials:edit, per environment, in VS Code or vim, read them in code, and fix the master key errors.
excerpt: *description
date: 2024-03-08
last_modified_at: 2026-11-12
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
$ EDITOR=vim bin/rails credentials:edit
```

This will open the encrypted credentials file in the editor specified by the `EDITOR` environment variable.
Save and close the file to encrypt it again.

**Note:** This command will create `config/credentials.yml.enc` file as well as `config/master.key` if they don't exist.
{: .notice--info}

### With VS Code, Sublime or another GUI editor

GUI editors return immediately unless told to wait, and Rails then re-encrypts the file before you've edited it. Pass the wait flag:

```bash
EDITOR="code --wait" bin/rails credentials:edit
EDITOR="subl --wait" bin/rails credentials:edit
```

## How to edit rails credentials for an environment

```bash
$ EDITOR=vim bin/rails credentials:edit --environment production
```

This will open the encrypted credentials file for the production environment (`config/credentials/production.yml.enc`) in the editor specified by the `EDITOR` environment variable.
It uses its own key, `config/credentials/production.key`.

When a file for the current environment exists, Rails uses it **instead of** `config/credentials.yml.enc`. Values are not merged.

## View credentials without editing

```bash
bin/rails credentials:show
bin/rails credentials:show --environment production
```

## Read credentials in code

```yaml
# bin/rails credentials:edit
aws:
  access_key_id: AKIA...
  secret_access_key: abc123
stripe_secret_key: sk_live_...
```

```ruby
Rails.application.credentials.stripe_secret_key
Rails.application.credentials.aws[:access_key_id]
Rails.application.credentials.dig(:aws, :secret_access_key)

# Raise if it's missing instead of returning nil
Rails.application.credentials.stripe_secret_key!
```

## The master key in production

Never commit `config/master.key` (or `config/credentials/*.key`). Rails adds them to `.gitignore` for you.

On the server, provide the key through the `RAILS_MASTER_KEY` environment variable. With Kamal, add it to `.kamal/secrets` and the `env.secret` list in `config/deploy.yml`. See [managing secrets with Kamal](https://kamal.wiki/managing-secrets-with-kamal/).

## Common errors

### `ActiveSupport::MessageEncryptor::InvalidMessage`

The key doesn't match the file. Usually `master.key` was regenerated, or `RAILS_MASTER_KEY` holds the key for a different environment. Get the original key from a teammate or your password manager. Without it the file can't be decrypted.

### `Missing encryption key to decrypt file with`

There's no `config/master.key` and no `RAILS_MASTER_KEY`. Add the key, or set the environment variable.

### Lost the key entirely

Delete the encrypted file and run `credentials:edit` again to create a new file and key, then re-enter every secret. Rotate any secrets that were in the old file.

## References

- [Rails Guides: Custom Credentials](https://guides.rubyonrails.org/security.html#custom-credentials){:target="_blank"}

**Note:** All the commands have been tested with rails 7.1 and the result may differ from prior versions
{: .notice--info}
