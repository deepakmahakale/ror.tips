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

<style>
  table {
    font-size: inherit;
  }
  thead {
    background-color: inherit;
  }
  th, td {
    width: 1%;
  }
</style>

## nil?

This method is available on all objects and returns `true` only when the object is `nil`.

```ruby
nil.nil?               #=> true
[].nil?                #=> false
"".nil?                #=> false
1.nil?                 #=> false
```

## empty?

This method is available on `String`, `Array` and `Hash` and returns `true` only when they are empty.
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

<div class="language-ruby highlighter-rouge">
<table class="highlight">
  <thead>
    <tr>
      <th></th>
      <th><span class="nf">#nil?</span></th>
      <th><span class="nf">#empty?</span></th>
      <th><span class="nf">#blank?</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="kp">nil</span></td>
      <td><span class="s2">true</span></td>
      <td><span class="no">NoMethodError</span></td>
      <td><span class="s2">true</span></td>
    </tr>
    <tr>
      <td><span class="p">[]</span></td>
      <td><span class="kp">false</span></td>
      <td><span class="s2">true</span></td>
      <td><span class="s2">true</span></td>
    </tr>
    <tr>
      <td><span class="p">{}</span></td>
      <td><span class="kp">false</span></td>
      <td><span class="s2">true</span></td>
      <td><span class="s2">true</span></td>
    </tr>
    <tr>
      <td><span class="s2">""</span></td>
      <td><span class="kp">false</span></td>
      <td><span class="s2">true</span></td>
      <td><span class="s2">true</span></td>
    </tr>
    <tr>
      <td><span class="s2">" "</span></td>
      <td><span class="kp">false</span></td>
      <td><span class="kp">false</span></td>
      <td><span class="s2">true</span></td>
    </tr>
    <tr>
      <td><span class="mi">1</span></td>
      <td><span class="kp">false</span></td>
      <td><span class="no">NoMethodError</span></td>
      <td><span class="kp">false</span></td>
    </tr>
    <tr>
      <td><span class="s2">true</span></td>
      <td><span class="kp">false</span></td>
      <td><span class="no">NoMethodError</span></td>
      <td><span class="kp">false</span></td>
    </tr>
    <tr>
      <td><span class="kp">false</span></td>
      <td><span class="kp">false</span></td>
      <td><span class="no">NoMethodError</span></td>
      <td><span class="s2">true</span></td>
    </tr>
  </tbody>
</table>
