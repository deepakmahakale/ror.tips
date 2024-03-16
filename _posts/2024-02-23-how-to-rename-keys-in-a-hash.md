---
layout: single
title: How to rename or transform keys in a hash?
description: &description >
  This article explains how to rename or transform keys in a hash.
excerpt: *description
date: 2024-02-23
categories:
  - Rails
tags:
  - Hash
header:
  og_image: /assets/images/opengraph/2024-02-23-how-to-rename-keys-in-a-hash.png
---

Ruby provides a way to rename keys in a hash using the `transform_keys` method.

## Rename keys in a hash

Provide an hash argument to map old keys to new keys.
Any key not given will be mapped using the provided block, or remain the same if no block is given.

For example:

```ruby
h = { foo: 0, bar: 1, baz: 2 }
#=> {:foo=>0, :bar=>1, :baz=>2}

h.transform_keys(&:to_s)
#=> {"foo"=>0, "bar"=>1, "baz"=>2}

h.transform_keys(foo: :bar, bar: :foo)
#=> {:bar=>0, :foo=>1, :baz=>2}

h.transform_keys(foo: :hello, &:to_s)
#=> {:hello=>0, "bar"=>1, "baz"=>2}
```

## References

- [https://ruby-doc.org/core-3.0.0/Hash.html#method-i-transform_keys](https://ruby-doc.org/core-3.0.0/Hash.html#method-i-transform_keys){:target="_blank"}
