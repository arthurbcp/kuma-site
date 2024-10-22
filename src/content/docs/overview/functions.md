---
title: Funções
description: Visão geral de Funções (Kuma Framework)
---

O Kuma importa todas as funções disponíveis no pacote [go-sproute](https://github.com/go-sprout/sprout), e também conta com uma série de funções proṕrias que serão descritas nesse documento.


## Funções de Parser

### ToYaml

ToYaml converte uma estrutura de dados Go em um slice de strings formatado em YAML, onde cada elemento representa uma linha do YAML resultante. Esta função é útil para renderizar dados em um formato legível para os templates.

**Assinatura:**

```go
func ToYaml(data interface{}) []string
```

**Parâmetros:**

- `data`: A estrutura de dados a ser convertida em YAML.

**Retorna:**

Um slice de strings contendo a representação YAML dos dados.

**Exemplo**

```yaml
# input:
#    {
#         "items":  {
#             "subItems": [ "item1",   "item2",  "item3"],
#         },
#   }
data:
   {{ range toYaml . }}{{ . }}{{end}}
#output:
# data:
#   items:
#     subItems:
#         - item1
#         - item2
#         - item3
```

---

## Funções de Agrupamento

### GroupByKey

GroupByKey organiza um slice de mapas com base em uma chave especificada. Ele retorna um mapa onde as chaves são valores únicos encontrados na chave especificada nos itens de entrada, e os valores são slices de itens que compartilham esse valor de chave.

**Assinatura:**

```go
func GroupByKey(data []interface{}, key string) map[string]interface{
```

**Parâmetros:**

- `data`: Um slice de mapas onde cada mapa representa um item com pares chave-valor.
- `key`: A chave usada para agrupar itens no slice de dados.

**Retorna:**

Um mapa onde cada chave representa um valor único da chave especificada no slice de dados, e o valor correspondente é um slice de itens que possuem esse valor de chave.

**Exemplo**

```yaml
# input:
# data:
#   - {"name": "Alice", "department": "HR"}
#   - {"name": "Bob", "department": "IT"}
#   - {"name": "Charlie", "department": "HR"}
#   - {"name": "Dave", "department": "IT"}
# key: "department"

"{{ groupByKey .data .key }}"
# output:
# {
#   "HR": [
#     {"name": "Alice", "department": "HR"},
#     {"name": "Charlie", "department": "HR"}
#   ],
#   "IT": [
#     {"name": "Bob", "department": "IT"},
#     {"name": "Dave", "department": "IT"}
#   ]
# }
```

---

## Funções OpenAPI

### GetRefFrom

GetRefFrom extrai o identificador de referência de um objeto OpenAPI 2.0 se existir. A função espera que a referência esteja no formato de um ponteiro JSON dentro da especificação OpenAPI.

**Assinatura:**

```go
func GetRefFrom(object map[string]interface{}) string
```

**Parâmetros:**

- `object`: Um mapa que representa um objeto OpenAPI que pode conter um campo $ref.

**Retorna:**

Uma string contendo o identificador de referência ou uma string vazia se nenhuma referência válida for encontrada.

**Exemplo**

```yaml
# input:
# {
#     "schema": {
#         "$ref": "#/definitions/ApiResponse"
#     }
# }
"{{getRefFrom  .schema}}"
# output:
# "ApiResponse"
```

---

### GetPathsByTag

GetPathsByTag filtra caminhos OpenAPI por uma tag especificada. Ele retorna um subconjunto de caminhos que estão associados com a tag fornecida, útil para gerar documentação para seções específicas de uma API.

**Assinatura:**

```go
func GetPathsByTag(paths map[string]interface{},
tag string) map[string]interface{}
```

**Parâmetros:**

- `paths`: Um mapa onde as chaves são nomes de caminhos e os valores são objetos de itens de caminho.
- `tag`: A tag usada para filtrar caminhos.

**Retorna:**

Um mapa contendo os caminhos que incluem a tag especificada.

**Exemplo**

```yaml
# input:
# paths: {
#   "/pet/{petId}/uploadImage": {
#       "post": {
#         "tags": ["pet"],
#         "summary": "uploads an image",
#       }
#       ...
#   },
#   "/user": {
#       "post": {
#         "tags": ["user"],
#         "summary": "create a user",
#       },
#   },
#   "/user/{userId}": {
#       "put": {
#         "tags": ["user"],
#         "summary": "update user by id",
#       },
#       "get": {
#         "tags": ["user"],
#         "summary": "get user by id",
#       }
#       ...
#  }
#}
"{{ getPathsByTag .paths "user" }}"
# output:
# {
#   "/user": {
#       "post": {
#         "tags": ["user"],
#         "summary": "create a user",
#       },
#   },
#   "/user/{userId}": {
#       "put": {
#         "tags": ["user"],
#         "summary": "update user by id",
#       },
#       "get": {
#         "tags": ["user"],
#         "summary": "get user by id",
#       }
#       ...
#  }
#}
```

---

### GetParamsByType

GetParamsByType filtra parâmetros com base no tipo do campo `in` (por exemplo, query, header, path, formData). Esta função ajuda a extrair parâmetros de um determinado tipo de uma operação OpenAPI.

**Assinatura:**

```go
func GetParamsByType(params []interface{},
paramType string) []interface{}
```

**Parâmetros:**

- `params`: Um slice de objetos de parâmetros.
- `paramType`: O tipo de parâmetros para filtrar (por exemplo, "query").

**Retorna:**

Um slice de parâmetros que correspondem ao tipo especificado.

**Exemplo**

```yaml
# input:
#     {
#       "parameters": [
#             {
#                 "name": "petId",
#                 "in": "path",
#             },
#             {
#                 "name": "body",
#                 "in": "body",
#             },
#             {
#                 "name": "userId",
#                 "in": "path,
#             }
#     ],
# }
"{{ getParamsByType $data.parameters "path" }}"
# output:
# [
#     {
#         "name": "userId"
#     },
#      {
#        "name": "petId"
#      }
#  ]
```

---

## Funções de Arquivos

### GetFileContent

A função `GetFileContent` lê e retorna o conteúdo de um arquivo fornecido como uma string. Ela é útil para inserir o conteúdo de arquivos dentro de templates Go.

**Assinatura:**

```go
func GetFileContent(filePath string) string
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo a ser lido.

**Retorna:**

- O conteúdo do arquivo como uma string.
- Uma string vazia se ocorrer um erro.

**Exemplo**

```go
{{ $content := GetFileContent "/path/to/file.txt" }}
{{ $content }}
```

---

### GetFilesList

A função `GetFilesList` retorna uma lista de nomes de arquivos em um diretório. Pode ser usada para listar arquivos em um diretório dentro de um template Go.

**Assinatura:**

```go
func GetFilesList(path string) []string
```

**Parâmetros:**

- `path`: O caminho do diretório onde os arquivos serão listados.

**Retorna:**

- Um slice de strings contendo os nomes dos arquivos no diretório.
- Um slice vazio se houver um erro.

**Exemplo**

```go
{{ $files := GetFilesList "/path/to/directory" }}
{{ range $files }}{{ . }}{{ end }}
```

---

### GetFileExtension

A função `GetFileExtension` retorna a extensão de um arquivo a partir do seu caminho. Útil para condicionar a lógica de templates com base no tipo de arquivo.

**Assinatura:**

```go
func GetFileExtension(filePath string) string
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo.

**Retorna:**

- A extensão do arquivo como uma string.
- Uma string vazia se o arquivo não tiver extensão.

**Exemplo**

```go
{{ $ext := GetFileExtension "/path/to/file.txt" }}
{{ if eq $ext "txt" }}Este é um arquivo de texto.{{ end }}
```

---

### GetFileName

A função `GetFileName` retorna o nome do arquivo, sem o caminho. Pode ser usada para exibir apenas o nome do arquivo em templates.

**Assinatura:**

```go
func GetFileName(filePath string) string
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo.

**Retorna:**

- O nome do arquivo como uma string.

**Exemplo**

```go
{{ $fileName := GetFileName "/path/to/file.txt" }}
{{ $fileName }}
```

---

### GetFilePath

A função `GetFilePath` retorna o diretório onde o arquivo está localizado. Pode ser usada para acessar o caminho do diretório dentro de um template Go.

**Assinatura:**

```go
func GetFilePath(filePath string) string
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo.

**Retorna:**

- O caminho do diretório como uma string.

**Exemplo**

```go
{{ $dir := GetFilePath "/path/to/file.txt" }}
{{ $dir }}
```

---

### FileExists

A função `FileExists` verifica se um arquivo existe no sistema de arquivos. Ela é útil para verificar a existência de arquivos antes de utilizá-los em templates Go.

**Assinatura:**

```go
func FileExists(filePath string) bool
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo.

**Retorna:**

- `true` se o arquivo existir, `false` caso contrário.

**Exemplo**

```go
{{ if FileExists "/path/to/file.txt" }}O arquivo existe.{{ else }}O arquivo não existe.{{ end }}
```

---

### IsDirectory

A função `IsDirectory` verifica se um caminho é um diretório. Pode ser usada para diferenciar diretórios de arquivos em um template Go.

**Assinatura:**

```go
func IsDirectory(filePath string) bool
```

**Parâmetros:**

- `filePath`: O caminho completo a ser verificado.

**Retorna:**

- `true` se o caminho for um diretório, `false` caso contrário.

**Exemplo**

```go
{{ if IsDirectory "/path/to/directory" }}Isso é um diretório.{{ else }}Isso é um arquivo.{{ end }}
```

---

### IsFile

A função `IsFile` verifica se um caminho é um arquivo. Pode ser usada para diferenciar arquivos de diretórios em um template Go.

**Assinatura:**

```go
func IsFile(filePath string) bool
```

**Parâmetros:**

- `filePath`: O caminho completo a ser verificado.

**Retorna:**

- `true` se o caminho for um arquivo, `false` caso contrário.

**Exemplo**

```go
{{ if IsFile "/path/to/file.txt" }}Isso é um arquivo.{{ else }}Isso não é um arquivo.{{ end }}
```

---

### GetFileSize

A função `GetFileSize` retorna o tamanho de um arquivo em bytes.

**Assinatura:**

```go
func GetFileSize(filePath string) int64
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo.

**Retorna:**

- O tamanho do arquivo em bytes.
- `0` se ocorrer um erro.

**Exemplo**

```go
{{ $size := GetFileSize "/path/to/file.txt" }}
{{ $size }} bytes
```

---
`
