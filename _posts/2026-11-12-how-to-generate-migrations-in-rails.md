---
layout: single
title: "How to generate migrations in Rails (rails generate migration)"
description: &description >
  Use bin/rails generate migration to add, remove and reference columns, create tables and join tables, with indexes, types and the naming rules.
excerpt: *description
date: 2026-11-12
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2026-11-12-how-to-generate-migrations-in-rails.png
---

## Quick answer

```bash
bin/rails generate migration AddPublishedAtToArticles published_at:datetime
```

This creates `db/migrate/20261112093000_add_published_at_to_articles.rb`:

```ruby
class AddPublishedAtToArticles < ActiveRecord::Migration[8.1]
  def change
    add_column :articles, :published_at, :datetime
  end
end
```

Run it with `bin/rails db:migrate`. `bin/rails g migration` is the short form.

The generator reads the **migration name** and the **fields** you pass, and writes the matching code for you. If the name doesn't match a pattern below, you get an empty `change` method to fill in yourself.

## Add columns: `AddXToY`

```bash
bin/rails g migration AddDetailsToProducts part_number:string price:decimal
```

```ruby
def change
  add_column :products, :part_number, :string
  add_column :products, :price, :decimal
end
```

## Remove columns: `RemoveXFromY`

```bash
bin/rails g migration RemovePartNumberFromProducts part_number:string
```

```ruby
def change
  remove_column :products, :part_number, :string
end
```

Keep the type: it makes the migration reversible. See [how to remove a column](/rails/how-to-remove-a-column-in-rails/).

## Create a table: `CreateX`

```bash
bin/rails g migration CreateProducts name:string part_number:string
```

```ruby
def change
  create_table :products do |t|
    t.string :name
    t.string :part_number

    t.timestamps
  end
end
```

More in [how to create a table](/rails/how-to-create-a-table-in-rails/). If you also want the model, use `bin/rails g model Product name:string` instead: it generates the same migration plus `app/models/product.rb`.

## Add a reference (foreign key): `AddXRefToY`

```bash
bin/rails g migration AddUserRefToProducts user:references
```

```ruby
def change
  add_reference :products, :user, null: false, foreign_key: true
end
```

This adds `user_id`, an index and a foreign key. For a polymorphic reference:

```bash
bin/rails g migration AddImageableToPictures 'imageable:references{polymorphic}'
```

## Create a join table: `CreateJoinTable…`

```bash
bin/rails g migration CreateJoinTableCustomerProduct customer product
```

```ruby
def change
  create_join_table :customers, :products do |t|
    # t.index [:customer_id, :product_id]
    # t.index [:product_id, :customer_id]
  end
end
```

Uncomment the index you need.

## Field types and options

```bash
# type defaults to string when omitted
bin/rails g migration AddTitleToArticles title

# index and unique index
bin/rails g migration AddEmailToUsers email:string:uniq
bin/rails g migration AddSlugToArticles slug:string:index

# precision/scale and limit (quote them in zsh)
bin/rails g migration AddPriceToProducts 'price:decimal{10,2}'
bin/rails g migration AddCodeToCoupons 'code:string{40}'
```

Common types: `string`, `text`, `integer`, `bigint`, `float`, `decimal`, `boolean`, `date`, `datetime`, `time`, `binary`, `json`/`jsonb` (PostgreSQL), `references`.

**zsh users:** `{` and `}` are special in zsh, so wrap fields like `'price:decimal{10,2}'` in quotes or you'll get `no matches found`.
{: .notice--info}

## Name it however you like

The name only has to be CamelCase or snake_case; these are the same:

```bash
bin/rails g migration AddPublishedAtToArticles published_at:datetime
bin/rails g migration add_published_at_to_articles published_at:datetime
```

For anything else (renames, data fixes, changing a column), generate an empty migration with a descriptive name and write the code:

```bash
bin/rails g migration RenameEmailIdToEmailInUsers
```

See [how to rename a column](/rails/how-to-rename-a-column-in-rails/) and [how to change a column default](/rails/how-to-change-column-default-in-rails/).

## Undo a generated migration

If you haven't run it yet:

```bash
bin/rails destroy migration AddPublishedAtToArticles
```

If you already ran it, roll it back first, then destroy it. See [how to rollback a migration](/rails/how-to-rollback-n-numbers-of-migration-in-rails/).

## More migration guides

- [Run a specific migration](/rails/how-to-run-a-specific-migration-in-rails/)
- [Add an index](/rails/how-to-add-an-index-in-rails/)
- [Change a column to null / not null](/rails/how-to-change-column-null-in-rails/)
- [Drop a table](/rails/how-to-drop-a-table-in-rails/)

## References

- [Rails Guides: Creating a Standalone Migration](https://guides.rubyonrails.org/active_record_migrations.html#creating-a-standalone-migration){:target="_blank"}
