---
layout: single
title: How to change column null in rails?
description: &description >
  This article explains how to change a column null in rails.
excerpt: *description
date: 2024-03-25
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2024-03-25-how-to-change-column-null-in-rails.png
---
When working with databases in Rails,
it's common to allow nullable columns or to change the null constraint of a column.

For example, to set a `NOT NULL` constraint on the `email` column in the `users` table run:

```bash
$ rails generate migration change_column_null_for_email
      invoke  active_record
      create    db/migrate/20240325142034_change_column_null_for_email.rb
```

The above command will generate an empty migration

```ruby
class ChangeColumnNullForEmail < ActiveRecord::Migration[7.1]
  def change
  end
end
```

We need to modify it to:

```ruby
class ChangeColumnNullForEmail < ActiveRecord::Migration[7.1]
  def change
    change_column_null(:users, :email, false)
  end
end
```

This migration will update the schema to enforce the presence of email addresses for users.

## Syntax

```ruby
change_column_null(table_name, column_name, null, default = nil)
```

**NOTE:**

The `null` flag indicates whether the value can be `NULL`. For example

```ruby
change_column_null(:users, :email, false)
```

User `email` cannot be `NULL` (adds `NOT NULL` constraint)

```ruby
change_column_null(:users, :email, true)
```

Allows user email to be `NULL` (drops the `NOT NULL` constraint).

## References

- [Rails Guides - Changing Columns](https://guides.rubyonrails.org/active_record_migrations.html#changing-columns)
