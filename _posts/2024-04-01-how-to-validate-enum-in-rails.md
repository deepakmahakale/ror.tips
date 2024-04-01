---
layout: single
title: How to validate enum in rails?
description: &description >
  This article explains how to effectively validate enums in your Ruby on Rails application.
excerpt: *description
date: 2024-04-01
categories:
  - Rails
tags:
  - Enum
header:
  og_image: /assets/images/opengraph/2024-04-01-how-to-validate-enum-in-rails.png
---

In Rails 7.1, validating enums has become easier with the introduction of the `validate` method.
This method allows you to ensure that the value assigned to an enum attribute is valid, providing a cleaner and more maintainable approach compared to previous versions of Rails.

### Syntax:

```ruby
enum status: { draft: 0, published: 1, archived: 2 }, validate: true
```

## Example:

```ruby
class Post < ApplicationRecord
  enum status: { draft: 0, published: 1, archived: 2 }, validate: true
end

post = Post.new
post.valid? # false

post.errors.full_messages # ["Status is not included in the list"]

post.status = :invalid
post.valid? # false

post.errors.full_messages # ["Status is not included in the list"]

post.status = :draft
post.valid? # true
```

## Allow nil values

If you want to allow `nil` values for the enum attribute, you can use the `allow_nil` option.

### Syntax:

```ruby
enum status: { draft: 0, published: 1, archived: 2 }, validate: { allow_nil: true }
```

### Example

```ruby
class Post < ApplicationRecord
  enum status: { draft: 0, published: 1, archived: 2 }, validate: { allow_nil: true }
end

post = Post.new
post.valid? # true

post.status = :draft
post.valid? # true

post.status = :invalid
post.valid? # false

post.errors.full_messages # ["Status is not included in the list"]
```

**NOTE:** If `validate` option is not provided rails will rails an `ArgumentError`.
`post.status = :unknown # 'unknown' is not a valid status (ArgumentError)`
{: .notice--info}

### References:

- [Active Record Enum](https://api.rubyonrails.org/classes/ActiveRecord/Enum.html){:target="_blank"}
