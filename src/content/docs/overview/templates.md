---
title: Templates
description: Visão geral de Templates (Kuma Framework)
---

**Templates** são arquivos que serão transformados pelo Kuma em [templates Go](/complements/go-templates) para gerar os arquivos finais para um processo de scaffolding.

### Variáveis


As variáveis para templates no Kuma são classificadas entre dois tipos:

- **data:** variáveis passadas na propriedade data de um arquivo da árvore do campo `structure` em um [builder](/overview/builders). Utilização: `.data.nomeVariavel`

- **global:** variáveis globais, ou seja, que podem ser utilizadas em todos os templates. São definidas uma única vez na propriedade `global` dentro de um [builder](/overview/builders). Utilização: `.global.nomeVariavel`

### Extensões

Arquivos de template no Kuma, aceitam qualquer extensão de arquivo de texto. Porém, é aconselhável utilizar uma das extensões abaixo para ter *Syntax Highlighting* em sua IDE.

Extensões recomendadas: `*.go.txt, *.go.tpl, *.go.tmpl, *.gtpl *.tpl.`

### Exemplos
---
Exemplo simples:
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
Resultado:
```go
// main.go
package main

import (
  "fmt"
)

func main() {
  fmt.Println("Eu sou uma variável global")
  fmt.Println("Eu sou uma variável local")
}
```
--- 


Exemplo avançado:
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

Resultado:
```ts
//Pet.ts
import { Category } from './category'
import { Tag } from './tag'

export type Pet = {
    category?:Category
    id?:number
    name?:string
    photoUrls?:string[]
    status?:"available" | "pending" | "sold"
    tags?:Tag[]
}
```
Para saber mais sobre text templates e como utilizá-los junto ao Kuma, acesse o link: [Text Templates no Go](/complements/go-templates)