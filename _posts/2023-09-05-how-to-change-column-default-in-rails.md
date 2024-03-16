---
layout: single
title: How to change column default in rails?
description: &description >
  This article explains how to change a column default in rails.
excerpt: *description
date: 2023-09-05
last_modified_at: 2024-03-16
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2023-09-05-how-to-change-column-default-in-rails.png
---

## Syntax

```ruby
change_column_default(table_name, column_name, default_or_changes)
```

## Example

```ruby
change_column_default(:users, :state, 'active')
```

Rails Command:

```bash
$ rails generate migration change_column_default_for_state
      invoke  active_record
      create    db/migrate/20230906142034_change_column_default_for_state.rb
```

The above command will generate a migration

```ruby
class ChangeColumnDefaultForState < ActiveRecord::Migration[7.1]
  def change
  end
end

```

We need to modify it to:

```ruby
class ChangeColumnDefaultForState < ActiveRecord::Migration[7.1]
  def change
    change_column_default(:users, :state, from: nil, to: 'active')
  end
end
```

This migration will update the schema to set the default value of the status column to "active" for all existing records.

It is recommended to pass `:from` and `:to` as it helps while reverting the migration

NOTE:

setting default to `nil` drops the default.

## References

- [Rails Guides - Changing Columns](https://guides.rubyonrails.org/active_record_migrations.html#changing-columns){:target="_blank"}
