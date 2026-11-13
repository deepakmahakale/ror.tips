---
layout: single
title: Rails 8.1 app:update can disable force_ssl
description: &description >
  This article explains why bin/rails app:update on Rails 8.1 offers to comment out
  config.force_ssl and config.assume_ssl, and how to keep them.
excerpt: *description
date: 2026-11-13
categories:
  - Rails
tags:
  - Upgrade
  - Security
  - Rails 8
header:
  og_image: /assets/images/opengraph/2026-11-13-rails-8-1-app-update-can-disable-force-ssl.png
---

If your app does not use Kamal, `bin/rails app:update` on Rails 8.1.1 to 8.1.4.1 offers to comment out
`config.assume_ssl` and `config.force_ssl`. Accepting it turns off forced SSL in production.

```bash
$ bin/rails app:update
    conflict  config/environments/production.rb
Overwrite /path/to/app/config/environments/production.rb? (enter "h" for help) [Ynaqdhm] d
```

```diff
   # Assume all access to the app is happening through a SSL-terminating reverse proxy.
-  config.assume_ssl = true
+  # config.assume_ssl = true

   # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
-  config.force_ssl = true
+  # config.force_ssl = true
```

## Why it happens
Rails 8.1.1 comments out both settings in new apps that use Kamal, so the first deploy works on a server without SSL.
Apps without Kamal still get them turned on.

`app:update` checks which gems your app skips (brakeman, rubocop, thruster...) but it did not check Kamal.
So every app is treated as a Kamal app and gets the commented-out version.

## Keep your SSL settings
Answer `n` for `config/environments/production.rb` and copy over the other changes by hand,
or accept it and restore these two lines:

```ruby
# config/environments/production.rb
config.assume_ssl = true
config.force_ssl = true
```

Check after the upgrade:

```bash
$ grep -E "config\.(assume|force)_ssl" config/environments/production.rb
  config.assume_ssl = true
  config.force_ssl = true
```

If the lines start with `#`, SSL is not forced.

**Note:** `assume_ssl` is only right when a proxy in front of the app terminates SSL (Heroku, Render, a load balancer, Kamal with `ssl: true`).
If you had it commented out before the upgrade, keep it that way.
{: .notice--info}

#### NOTE:
This is fixed in [rails/rails#59779](https://github.com/rails/rails/pull/59779){:target="_blank"},
merged into `8-1-stable` on 13th Nov 2026, so the next 8.1 release will not suggest this change.

Using Kamal? You do need these settings once you turn on SSL in kamal-proxy.
See [Kamal SSL: turn on assume_ssl and force_ssl](https://kamal.wiki/kamal-ssl-assume-ssl-and-force-ssl/).

## References
- [rails/rails#59779 - Detect Kamal in app:update](https://github.com/rails/rails/pull/59779){:target="_blank"}
- [rails/rails#56010 - Disable SSL default config for out of the box Kamal deployments](https://github.com/rails/rails/pull/56010){:target="_blank"}
- [Rails Guides - Upgrading Ruby on Rails](https://guides.rubyonrails.org/upgrading_ruby_on_rails.html){:target="_blank"}
