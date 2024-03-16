---
layout: single
title: How to rename a column in rails?
description: &description >
  This article explains how to rename a column in rails.
excerpt: *description
date: 2023-08-01
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2023-08-01-how-to-rename-a-column-in-rails.png
---

## Syntax

```ruby
rename_column(table_name, column_name, new_column_name)
```

## Example

```ruby
rename_column(:users, :email_id, :email)
```

Rails Command:

```bash
$ rails generate migration rename_email_id_to_email
      invoke  active_record
      create    db/migrate/20230906131708_rename_email_id_to_email.rb
```

The above command will generate a migration

```ruby
class RenameEmailIdToEmail < ActiveRecord::Migration[7.1]
  def change
  end
end
```

We need to modify it to:

```ruby
class RenameEmailIdToEmail < ActiveRecord::Migration[7.1]
  def change
    rename_column(:users, :email_id, :email)
  end
end
```
