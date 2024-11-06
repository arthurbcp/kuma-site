---
title: Go Text Templates
description: A brief guide to text templates in Go for use with the Mr. Smith Framework
---

Go text templates are a powerful tool for generating dynamic text. They allow you to insert values, execute conditional logic, iterate over collections, and much more within strings. In this document, we will explore how text templates in Go work, including examples of using `range`, `if`, iterating over maps, functions, blocks, and template composition.

## Basic Syntax

The basic syntax for templates in Go uses double curly braces `{{ }}` to delimit actions within the template string.

Simple example:

```
Name: {{.data.Name}}
Age: {{.data.Age}}
```

## Control Structures

### Conditionals (`if`)

The `if` directive allows you to execute code conditionally.

Example:

```
{{if .data.Active}}
User is active.
{{else}}
User is not active.
{{end}}
```

### Iteration (`range`)

The `range` directive allows you to iterate over slices and maps.

#### Iterating over Slices

Example:

```
List of Fruits:
{{range .data.Fruits}}
- {{.}}
{{end}}
```

#### Iterating over Maps

When iterating over maps, you can access both the keys and the values.

Example:

```
Players' Scores:
{{range $name, $score := .data.Players}}
${$name}: ${$score} points
{{end}}
```

## Functions in Templates

### Predefined Functions

Some functions are available by default, such as `len`, `print`, `printf`, and `println`.

Example:

```
The total number of items is {{len .data.Items}}
```

### Custom Functions

In Mr. Smith, you will have access to all the functions from the [go-sproute](https://github.com/go-sprout/sprout) package as well as a series of custom functions specific to Mr. Smith. Check the [Guide on functions]() for more information.

```
Original text: {{.data.Text}}
Uppercase text: {{ToUpperCase .data.Text}}
```

## Blocks and Template Composition

### Defining and Using Templates

You can define parts of a template for reuse:

```
{{define "header"}}
Title: {{.data.Title}}
{{end}}

{{define "body"}}
Content: {{.data.Content}}
{{end}}

{{template "header" .}}
{{template "body" .}}
```

### Blocks

Blocks allow you to define areas that can be overridden by other templates.

Example:
```
{{define "base"}}
Title: {{block "title" .}}Default Title{{end}}
Content:
{{block "content" .}}{{end}}
{{end}}


{{define "title"}}Custom Title{{end}}
{{define "content"}}Custom Content{{end}}
{{template "base" .}}
```

## Complete Example

Here is an example that combines several features of Go templates:

```
Product List:
{{range .data.Products}}
- Name: {{.Name}}
  Price: ${{printf "%.2f" .Price}}
{{end}}

Total products: {{len .data.Products}}
```

Access the official documentation here: [Go text templates](https://pkg.go.dev/text/template)
