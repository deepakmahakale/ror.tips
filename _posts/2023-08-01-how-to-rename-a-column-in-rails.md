---
layout: single
title: How to rename a column in rails?
description: >
  Need to rename a column in rails?
  Let's see how to do it.
date: 2023-08-01
categories:
  - rails
tags:
  - database
  - migration
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
