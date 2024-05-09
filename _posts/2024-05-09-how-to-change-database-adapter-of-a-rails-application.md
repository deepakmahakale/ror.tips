---
layout: single
title: How to change database adapter of a Rails application?
description: &description >
  This article explains how to change the database adapter of a Rails application with a single command.
excerpt: *description
date: 2024-05-09
categories:
  - Rails
tags:
  - Database
  - PostgreSQL
  - SQLite3
  - MySQL
header:
  og_image: /assets/images/opengraph/2024-05-09-how-to-change-database-adapter-of-a-rails-application.png
---

While we can always change the database adapter in the `database.yml` file manually,
it's always better to use the built in command to do it for us.

This not only changes the adapter in `database.yml` but also changes the required gems for the adapter and the dependencies in `Dockerfile`.

## Syntax

```bash
rails db:system:change --to=<adapter>
```

## Example

To change the database adapter to `postgresql`, run the following command:

```bash
rails db:system:change --to=postgresql
```

This command will change the adapter in `database.yml` to `postgresql` and update the required gems and dependencies in `Dockerfile`.

```diff
--- a/Dockerfile
+++ b/Dockerfile
@@ -19,7 +19,7 @@ FROM base as build

 # Install packages needed to build gems
 RUN apt-get update -qq && \
-    apt-get install --no-install-recommends -y build-essential git libvips pkg-config
+    apt-get install --no-install-recommends -y build-essential git libpq-dev libvips pkg-config

 # Install application gems
 COPY Gemfile Gemfile.lock ./
@@ -42,7 +42,7 @@ FROM base

 # Install packages needed for deployment
 RUN apt-get update -qq && \
-    apt-get install --no-install-recommends -y curl libsqlite3-0 libvips && \
+    apt-get install --no-install-recommends -y curl libvips postgresql-client && \
     rm -rf /var/lib/apt/lists /var/cache/apt/archives

 # Copy built artifacts: gems, application
```

```diff
--- a/Gemfile
+++ b/Gemfile
@@ -8,8 +8,8 @@ gem "rails", "~> 7.1.3", ">= 7.1.3.2"
 # The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
 gem "sprockets-rails"

-# Use sqlite3 as the database for Active Record
-gem "sqlite3", "~> 1.4"
+# Use pg as the database for Active Record
+gem "pg", "~> 1.1"
```

```diff
--- a/config/database.yml
+++ b/config/database.yml
@@ -1,25 +1,84 @@
-# SQLite. Versions 3.8.0 and up are supported.
-#   gem install sqlite3
+# PostgreSQL. Versions 9.3 and up are supported.
 #
-#   Ensure the SQLite 3 gem is defined in your Gemfile
-#   gem "sqlite3"
+# Install the pg driver:
+#   gem install pg
+# On macOS with Homebrew:
+#   gem install pg -- --with-pg-config=/usr/local/bin/pg_config
+# On Windows:
+#   gem install pg
+#       Choose the win32 build.
+#       Install PostgreSQL and put its /bin directory on your path.
+#
+# Configure Using Gemfile
+# gem "pg"
 #
 default: &default
-  adapter: sqlite3
+  adapter: postgresql
+  encoding: unicode
+  # For details on connection pooling, see Rails configuration guide
+  # https://guides.rubyonrails.org/configuring.html#database-pooling
   pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
-  timeout: 5000

 development:
   <<: *default
-  database: storage/development.sqlite3
+  database: blog_development
+
+  # The specified database role being used to connect to PostgreSQL.
+  # To create additional roles in PostgreSQL see `$ createuser --help`.
+  # When left blank, PostgreSQL will use the default role. This is
+  # the same name as the operating system user running Rails.
+  #username: blog
+
+  # The password associated with the PostgreSQL role (username).
+  #password:
+
+  # Connect on a TCP socket. Omitted by default since the client uses a
+  # domain socket that doesn't need configuration. Windows does not have
+  # domain sockets, so uncomment these lines.
+  #host: localhost
+
+  # The TCP port the server listens on. Defaults to 5432.
+  # If your server runs on a different port number, change accordingly.
+  #port: 5432
+
+  # Schema search path. The server defaults to $user,public
+  #schema_search_path: myapp,sharedapp,public
+
+  # Minimum log levels, in increasing order:
+  #   debug5, debug4, debug3, debug2, debug1,
+  #   log, notice, warning, error, fatal, and panic
+  # Defaults to warning.
+  #min_messages: notice

 # Warning: The database defined as "test" will be erased and
 # re-generated from your development database when you run "rake".
 # Do not set this db to the same as development or production.
 test:
   <<: *default
-  database: storage/test.sqlite3
+  database: blog_test

+# As with config/credentials.yml, you never want to store sensitive information,
+# like your database password, in your source code. If your source code is
+# ever seen by anyone, they now have access to your database.
+#
+# Instead, provide the password or a full connection URL as an environment
+# variable when you boot the app. For example:
+#
+#   DATABASE_URL="postgres://myuser:mypass@localhost/somedatabase"
+#
+# If the connection URL is provided in the special DATABASE_URL environment
+# variable, Rails will automatically merge its configuration values on top of
+# the values provided in this file. Alternatively, you can specify a connection
+# URL environment variable explicitly:
+#
+#   production:
+#     url: <%= ENV["MY_APP_DATABASE_URL"] %>
+#
+# Read https://guides.rubyonrails.org/configuring.html#configuring-a-database
+# for a full overview on how database connection configuration can be specified.
+#
 production:
   <<: *default
-  database: storage/production.sqlite3
+  database: blog_production
+  username: blog
+  password: <%= ENV["BLOG_DATABASE_PASSWORD"] %>
```

## Supported Adapters

Other supported adapters are:

- `mysql`
- `trilogy`
- `postgresql`
- `sqlite3`
- `oracle`
- `sqlserver`
- `jdbcmysql`
- `jdbcsqlite3`
- `jdbcpostgresql`
- `jdbc`

## References

- [Rails Source: Rails::Generators::Database](https://github.com/rails/rails/blob/25f22503af6d9fa4fc52fd39142b9b10b73cbfda/railties/lib/rails/generators/database.rb){:target="_blank"}
