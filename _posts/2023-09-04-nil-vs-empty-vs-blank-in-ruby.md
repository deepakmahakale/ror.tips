---
layout: single
title: nil? vs empty? vs blank? in ruby
description: &description ruby nil? vs empty? vs blank?; What is the difference?
excerpt: *description
date: 2023-09-04
categories:
  - rails
tags:
  - ruby
header:
  og_image: /assets/images/opengraph/2023-09-04-nil-vs-empty-vs-blank-in-ruby.png
---

## nil?

This method is available on all objects and ruturns `true` only when the object is `nil`.

```ruby
nil.nil?               #=> true
[].nil?                #=> false
"".nil?                #=> false
1.nil?                 #=> false
```

## empty?

This method is available on `String`, `Array` and `Hash` and ruturns `true` only when they are empty.
Empty here means the object is not nil but does not have any value inside.

For example:

```ruby
"".empty?               #=> true
[].empty?               #=> true
{}.empty?               #=> true
```

## blank?

ℹ️ `#blank?` is a rails method

An object is blank if it's `false`, empty, or a whitespace string.

```ruby
false.blank?            #=> true
"".blank?               #=> true
"  ".blank?             #=> true
nil.blank?              #=> true
[].blank?               #=> true
{}.blank?               #=> true
```

## Comparison

<table>
  <thead>
    <tr>
      <th></th>
      <th>#nil?</th>
      <th>#empty?</th>
      <th>#blank?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>nil</td>
      <td>true</td>
      <td>NoMethodError</td>
      <td>true</td>
    </tr>
    <tr>
      <td>[]</td>
      <td>false</td>
      <td>true</td>
      <td>true</td>
    </tr>
    <tr>
      <td>{}</td>
      <td>false</td>
      <td>true</td>
      <td>true</td>
    </tr>
    <tr>
      <td>""</td>
      <td>false</td>
      <td>true</td>
      <td>true</td>
    </tr>
    <tr>
      <td>" "</td>
      <td>false</td>
      <td>false</td>
      <td>true</td>
    </tr>
    <tr>
      <td>1</td>
      <td>false</td>
      <td>NoMethodError</td>
      <td>false</td>
    </tr>
    <tr>
      <td>true</td>
      <td>false</td>
      <td>NoMethodError</td>
      <td>false</td>
    </tr>
    <tr>
      <td>false</td>
      <td>false</td>
      <td>NoMethodError</td>
      <td>true</td>
    </tr>
  </tbody>
</table>
