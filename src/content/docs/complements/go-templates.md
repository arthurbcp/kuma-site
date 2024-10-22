---
title: Go Text Templates
description: Guia resumido de text templates em Go para usar junto ao Kuma Framework
---

Os text templates em Go são uma ferramenta poderosa para gerar textos dinâmicos. Elas permitem inserir valores, executar lógica condicional, iterar sobre coleções e muito mais dentro de strings. Neste documento, exploraremos como funcionam as text templates em Go, incluindo exemplos de uso de `range`, `if`, iteração sobre mapas, funções, blocos e composição de templates.

## Sintaxe Básica

A sintaxe básica para templates em Go utiliza chaves duplas `{{ }}` para delimitar ações dentro da string do template.

Exemplo simples:

```
Name: {{.data.Name}}
Age: {{.data.Age}}
```

Neste exemplo, `{{.data}}` refere-se aos dados passados para o template.


Aqui, `.data.Name` e `.data.Age` acessam os campos `Name` e `Age` dos dados fornecidos ao template.

## Estruturas de Controle

### Condicionais (`if`)

A diretiva `if` permite executar código condicionalmente.

Exemplo:

```
{{if .data.Active}}
User is active.
{{else}}
User is not active.
{{end}}
```

Neste exemplo, se `.data.Active` for verdadeiro, o primeiro bloco é executado; caso contrário, o bloco dentro de `{{else}}` é executado.

### Iteração (`range`)

A diretiva `range` permite iterar sobre slices, arrays, mapas e canais.

#### Iterando sobre Slices

Exemplo:

```
List of Fruits:
{{range .data.Fruits}}
- {{.}}
{{end}}
```

Aqui, `.data.Fruits` é um slice, e `{{range}}` irá iterar sobre cada elemento, referenciado por `{{.}}`.

#### Iterando sobre Mapas

Ao iterar sobre mapas, você pode acessar tanto as chaves quanto os valores.

Exemplo:

```
Players' Scores:
{{range $name, $score := .data.Players}}
${$name}: ${$score} points
{{end}}
```

Neste caso, `$name` e `$score` são variáveis que armazenam a chave e o valor de cada entrada no mapa `.data.Players`.

## Funções nos Templates

### Funções Predefinidas

Algumas funções estão disponíveis por padrão, como `len`, `print`, `printf` e `println`.

Exemplo:

```
The total number of items is {{len .data.Items}}
```

### Funções Personalizadas

Você pode definir suas próprias funções e registrá-las no template.

No Kuma, você terá acesso a todas as funções do pacote [go-sproute](https://github.com/go-sprout/sprout) e também uma série de funções customizadas específicas para o Kuma. Acesse o [Guia sobre funções]() para saber mais a respeito.

```
Original text: {{.data.Text}}
Uppercase text: {{ToUpperCase .data.Text}}
```

## Blocos e Composição de Templates

### Definindo e Usando Templates

Você pode definir partes de um template para reutilização:

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

Neste exemplo, definimos dois templates, `"header"` e `"body"`, e os utilizamos com `{{template}}`.

### Blocos

Blocos permitem que você defina áreas que podem ser sobrescritas por outros templates.

Exemplo:
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

No exemplo acima, o template `base` define blocos para `title` e `content`, que podem ser sobrescritos no `childTemplate`.

## Exemplo Completo

Aqui está um exemplo que combina vários recursos dos templates em Go:

```
Product List:
{{range .data.Products}}
- Name: {{.Name}}
  Price: ${{printf "%.2f" .Price}}
{{end}}

Total products: {{len .data.Products}}
```

Onde `.data.Products` é um slice de produtos com os campos `Name` e `Price`.

Acesse a documentação oficial aqui: [Go text templates](https://pkg.go.dev/text/template)
