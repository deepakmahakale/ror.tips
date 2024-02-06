---
layout: single
title: How to change column default?
description: >
  Need to change a column default in rails?
  Let's see how to do it.
date: 2023-09-05
categories:
  - rails
tags:
  - database
  - migration
image: /images/og/how-to-change-column-default-in-rails.jpg
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

It is recommended to pass `:from` and `:to` as it helps while reverting the migration

NOTE:

setting default to `nil` drops the default.
