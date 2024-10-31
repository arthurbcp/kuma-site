---
title: Funções
description: Visão geral de Funções (Kuma Framework)
---

O Kuma importa todas as funções disponíveis no pacote [go-sproute](https://github.com/go-sprout/sprout), e também conta com uma série de funções proṕrias que serão descritas nesse documento.


## Funções de Parser

### toYaml

Converte uma estrutura de dados Go em um slice de strings formatado em YAML, onde cada elemento representa uma linha do YAML resultante. Esta função é útil para renderizar dados em um formato legível para os templates.

**Assinatura:**

```go
func toYaml(data interface{}) []string
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

### groupByKey

Organiza um slice de mapas com base em uma chave especificada. Ele retorna um mapa onde as chaves são valores únicos encontrados na chave especificada nos itens de entrada, e os valores são slices de itens que compartilham esse valor de chave.

**Assinatura:**

```go
func groupByKey(data []interface{}, key string) map[string]interface{
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

### getRefFrom

Extrai o identificador de referência de um objeto OpenAPI 2.0 se existir. A função espera que a referência esteja no formato de um ponteiro JSON dentro da especificação OpenAPI.

**Assinatura:**

```go
func getRefFrom(object map[string]interface{}) string
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

### getPathsByTag

Filtra caminhos OpenAPI por uma tag especificada. Ele retorna um subconjunto de caminhos que estão associados com a tag fornecida, útil para gerar documentação para seções específicas de uma API.

**Assinatura:**

```go
func getPathsByTag(paths map[string]interface{},
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

### getParamsByType

Filtra parâmetros com base no tipo do campo `in` (por exemplo, query, header, path, formData). Esta função ajuda a extrair parâmetros de um determinado tipo de uma operação OpenAPI.

**Assinatura:**

```go
func getParamsByType(params []interface{},
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

### GetAllTags

GetAllTags extrai todas as tags únicas dos caminhos OpenAPI. Ele processa cada operação dentro de cada caminho para coletar tags e retorna como uma slice de strings.

**Assinatura:**

```go
func GetAllTags(paths map[string]interface{}) []string
```

**Parâmetros:**

- `paths`: Um mapa onde as chaves são nomes de caminhos e os valores são objetos de item de caminho.

**Retorna:**

Uma slice de strings contendo todas as tags únicas encontradas nos caminhos.

**Exemplo**

```yaml
# input:
# paths: {
#   "/pet/{petId}": {
#       "get": {
#         "tags": ["pet"],
#         "summary": "Find pet by ID"
#       }
#   },
#   "/user/login": {
#       "get": {
#         "tags": ["user"],
#         "summary": "Logs user into the system"
#       }
#   }
# }
"{{ getAllTags .paths }}"
# output:
# ["pet", "user"]
```

---

### GetRefsList

GetRefsList extrai todos os identificadores de referência únicos de um objeto paths do OpenAPI 2.0. Ele percorre recursivamente o objeto paths e coleta todos os valores $ref, removendo duplicatas.

**Assinatura:**

```go
func GetRefsList(paths map[string]interface{}) []string
```

**Parâmetros:**

- `paths`: Um mapa representando os caminhos e suas operações do OpenAPI

**Retorna:**

Uma slice de identificadores de referência únicos encontrados no objeto paths.

**Exemplo**

```yaml
# input:
# paths: {
#   "/pet/{petId}": {
#     "get": {
#       "responses": {
#         "200": {
#           "schema": {
#             "$ref": "#/definitions/Pet"
#           }
#         },
#         "404": {
#           "schema": {
#             "$ref": "#/definitions/Error"
#           }
#         }
#       },
#       "parameters": [
#         {
#           "schema": {
#             "$ref": "#/definitions/PetRequest"
#           }
#         }
#       ]
#     },
#     "put": {
#       "responses": {
#         "200": {
#           "schema": {
#             "$ref": "#/definitions/Pet"
#           }
#         }
#       }
#     }
#   }
# }
"{{ getRefsList .paths }}"
# output:
# ["Pet", "Error", "PetRequest"]
```

---

## Funções de Arquivos

### getFileContent

Lê e retorna o conteúdo de um arquivo fornecido como uma string. Ela é útil para inserir o conteúdo de arquivos dentro de templates Go.

**Assinatura:**

```go
func getFileContent(filePath string) string
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo a ser lido.

**Retorna:**

- O conteúdo do arquivo como uma string.
- Uma string vazia se ocorrer um erro.

**Exemplo**

```go
{{ $content := getFileContent "/path/to/file.txt" }}
{{ $content }}
```

---

### getFilesList

Retorna uma lista de nomes de arquivos em um diretório. Pode ser usada para listar arquivos em um diretório dentro de um template Go.

**Assinatura:**

```go
func getFilesList(path string) []string
```

**Parâmetros:**

- `path`: O caminho do diretório onde os arquivos serão listados.

**Retorna:**

- Um slice de strings contendo os nomes dos arquivos no diretório.
- Um slice vazio se houver um erro.

**Exemplo**

```go
{{ $files := getFilesList "/path/to/directory" }}
{{ range $files }}{{ . }}{{ end }}
```

---

### getFileExtension

Retorna a extensão de um arquivo a partir do seu caminho. Útil para condicionar a lógica de templates com base no tipo de arquivo.

**Assinatura:**

```go
func getFileExtension(filePath string) string
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo.

**Retorna:**

- A extensão do arquivo como uma string.
- Uma string vazia se o arquivo não tiver extensão.

**Exemplo**

```go
{{ $ext := getFileExtension "/path/to/file.txt" }}
{{ if eq $ext "txt" }}Este é um arquivo de texto.{{ end }}
```

---

### getFileName

Retorna o nome do arquivo, sem o caminho. Pode ser usada para exibir apenas o nome do arquivo em templates.

**Assinatura:**

```go
func getFileName(filePath string) string
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo.

**Retorna:**

- O nome do arquivo como uma string.

**Exemplo**

```go
{{ $fileName := getFileName "/path/to/file.txt" }}
{{ $fileName }}
```

---

### getFilePath

Retorna o diretório onde o arquivo está localizado. Pode ser usada para acessar o caminho do diretório dentro de um template Go.

**Assinatura:**

```go
func getFilePath(filePath string) string
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo.

**Retorna:**

- O caminho do diretório como uma string.

**Exemplo**

```go
{{ $dir := getFilePath "/path/to/file.txt" }}
{{ $dir }}
```

---

### fileExists

Verifica se um arquivo existe no sistema de arquivos. Ela é útil para verificar a existência de arquivos antes de utilizá-los em templates Go.

**Assinatura:**

```go
func fileExists(filePath string) bool
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo.

**Retorna:**

- `true` se o arquivo existir, `false` caso contrário.

**Exemplo**

```go
{{ if fileExists "/path/to/file.txt" }}O arquivo existe.{{ else }}O arquivo não existe.{{ end }}
```

---

### isDirectory

Verifica se um caminho é um diretório. Pode ser usada para diferenciar diretórios de arquivos em um template Go.

**Assinatura:**

```go
func isDirectory(filePath string) bool
```

**Parâmetros:**

- `filePath`: O caminho completo a ser verificado.

**Retorna:**

- `true` se o caminho for um diretório, `false` caso contrário.

**Exemplo**

```go
{{ if isDirectory "/path/to/directory" }}Isso é um diretório.{{ else }}Isso é um arquivo.{{ end }}
```

---

### isFile

Verifica se um caminho é um arquivo. Pode ser usada para diferenciar arquivos de diretórios em um template Go.

**Assinatura:**

```go
func isFile(filePath string) bool
```

**Parâmetros:**

- `filePath`: O caminho completo a ser verificado.

**Retorna:**

- `true` se o caminho for um arquivo, `false` caso contrário.

**Exemplo**

```go
{{ if isFile "/path/to/file.txt" }}Isso é um arquivo.{{ else }}Isso não é um arquivo.{{ end }}
```

---

### getFileSize

Retorna o tamanho de um arquivo em bytes.

**Assinatura:**

```go
func getFileSize(filePath string) int64
```

**Parâmetros:**

- `filePath`: O caminho completo do arquivo.

**Retorna:**

- O tamanho do arquivo em bytes.
- `0` se ocorrer um erro.

**Exemplo**

```go
{{ $size := getFileSize "/path/to/file.txt" }}
{{ $size }} bytes
```

---
`
