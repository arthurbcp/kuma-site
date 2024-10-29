---
title: Templates
description: Overview of Templates (Kuma Framework)
---

**Templates** are files that will be transformed by Kuma into [Go templates](/complements/go-templates) to generate the final files for a scaffolding process.

### Variables


The variables for templates in Kuma are classified into two types:

- **data:** variables passed in the data property of a file in the `structure` field tree within a [builder](/overview/builders). Usage: `.data.variableName`

- **global:** global variables, meaning they can be used in all templates. They are defined once in the `global` property inside a [builder](/overview/builders). Usage: `.global.variableName`

### Extensions

Template files in Kuma can accept any text file extension. However, it is advisable to use one of the extensions below to have *Syntax Highlighting* in your IDE.

Recommended extensions: `*.go.txt, *.go.tpl, *.go.tmpl, *.gtpl, *.tpl.`

### Examples
---
Simple example:
```go
// templates/Main.gtpl
package main

import (
  "fmt"
)

func main() {
  fmt.Println("{{.global.msg}}")
  fmt.Println("{{ .data.msg }}")
}
```
Result:
```go
// main.go
package main

import (
  "fmt"
)

func main() {
  fmt.Println("I am a global variable")
  fmt.Println("I am a local variable")
}
```
--- 


Advanced example:
```ts
// templates/DTO.gptl
{{- range .data.properties -}}
{{$ref :=  getRefFrom . }}
{{- if not $ref  }}{{if getRefFrom .items}}{{$ref = getRefFrom .items}}{{- end}}{{- end}}
{{- if $ref }}
import { {{ toPascalCase $ref }} } from './{{ toSnakeCase $ref }}'
{{- end -}}
{{- end -}}
{{"\n"}}
{{- if .data.description }}
// {{ .data.description }}
{{- end }}
export type {{ toPascalCase .data.name }} = { 
    {{- range $name, $prop := .data.properties}}
    {{- if $prop.description }}
    // {{ $prop.description }}
    {{- end }}
    {{ $name }}{{- if not $prop.required -}}?{{- end -}}: {{- block "TypeResolver" $prop }}{{end}}
    {{- end}}
}
```

Result:
```ts
// Pet.ts
import { Category } from './category'
import { Tag } from './tag'

export type Pet = {
    category?: Category
    id?: number
    name?: string
    photoUrls?: string[]
    status?: "available" | "pending" | "sold"
    tags?: Tag[]
}
```
To learn more about text templates and how to use them with Kuma, visit the link: [Text Templates in Go](/complements/go-templates)