---
layout: posts
title: How to remove a column in rails?
description: >
  Need to remove a column in rails?
  Let's see how to do it.
date: 2023-08-01
categories:
  - migration
image: /images/og/how-to-remove-a-column-in-rails.jpg
---

## Syntax

```ruby
remove_column(table_name, column_name, type = nil, **options)
```

## Example

```ruby
remove_column(:users, :phone, type: :string)
```

While the type is not mandatory,
it is advised to add it so that the type is used while reverting the migration.

Rails Command:

```bash
$ rails generate migration remove_phone_from_users phone:string
      invoke  active_record
      create    db/migrate/20230906141018_remove_phone_from_users.rb
```

The above command will generate an appropriate migration

```ruby
class RemovePhoneFromUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :phone, :string
  end
end
```
