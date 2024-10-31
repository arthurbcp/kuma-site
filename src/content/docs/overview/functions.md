---
title: Functions
description: Overview of Functions (Kuma Framework)
---

Kuma imports all the available functions in the [go-sproute](https://github.com/go-sprout/sprout) package, and also includes a series of its own functions that will be described in this document.


## Parser Functions

### toYaml

Converts a Go data structure into a slice of strings formatted as YAML, where each element represents a line of the resulting YAML. This function is useful for rendering data in a format readable for templates.

**Signature:**

```go
func toYaml(data interface{}) []string
```

**Parameters:**

- `data`: The data structure to be converted to YAML.

**Returns:**

A slice of strings containing the YAML representation of the data.

**Example**

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

## Grouping Functions

### groupByKey

Organizes a slice of maps based on a specified key. It returns a map where the keys are unique values found in the specified key in the input items, and the values are slices of items that share that key value.

**Signature:**

```go
func groupByKey(data []interface{}, key string) map[string]interface
```

**Parameters:**

- `data`: A slice of maps where each map represents an item with key-value pairs.
- `key`: The key used to group items in the data slice.

**Returns:**

A map where each key represents a unique value of the specified key in the data slice, and the corresponding value is a slice of items that have that key value.

**Example**

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

## OpenAPI Functions

### getRefFrom

Extracts the reference identifier from an OpenAPI 2.0 object if it exists. The function expects the reference to be in the form of a JSON pointer within the OpenAPI specification.

**Signature:**

```go
func getRefFrom(object map[string]interface{}) string
```

**Parameters:**

- `object`: A map representing an OpenAPI object that may contain a $ref field.

**Returns:**

A string containing the reference identifier or an empty string if no valid reference is found.

**Example**

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

Filters OpenAPI paths by a specified tag. It returns a subset of paths that are associated with the provided tag, useful for generating documentation for specific sections of an API.

**Signature:**

```go
func getPathsByTag(paths map[string]interface{},
tag string) map[string]interface{}
```

**Parameters:**

- `paths`: A map where the keys are path names and the values are path item objects.
- `tag`: The tag used to filter paths.

**Returns:**

A map containing the paths that include the specified tag.

**Example**

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

Filters parameters based on the type of the `in` field (e.g., query, header, path, formData). This function helps extract parameters of a specific type from an OpenAPI operation.

**Signature:**

```go
func getParamsByType(params []interface{},
paramType string) []interface{}
```

**Parameters:**

- `params`: A slice of parameter objects.
- `paramType`: The type of parameters to filter (e.g., "query").

**Returns:**

A slice of parameters that match the specified type.

**Example**

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

#### GetAllTags

GetAllTags extracts all unique tags from OpenAPI paths. It processes each operation within each path to collect tags and returns them as a slice of strings.

**Signature:**

```go
func GetAllTags(paths map[string]interface{}) []string
```

**Parameters:**

- `paths`: A map where keys are path names and values are path item objects.

**Returns:**

A slice of strings containing all unique tags found in the paths.

**Example**

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

---

#### GetRefsList

GetRefsList extracts all unique reference identifiers from an OpenAPI 2.0 paths object. It recursively traverses the paths object and collects all $ref values, removing duplicates.

**Signature:**

```go
func GetRefsList(paths map[string]interface{}) []string
```

**Parameters:**

- `paths`: A map representing OpenAPI paths and their operations

**Returns:**

A slice of unique reference identifiers found in the paths object.

**Example**

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

## File Functions

### getFileContent

Reads and returns the content of a file provided as a string. It is useful for inserting the content of files into Go templates.

**Signature:**

```go
func getFileContent(filePath string) string
```

**Parameters:**

- `filePath`: The full path of the file to be read.

**Returns:**

- The content of the file as a string.
- An empty string if an error occurs.

**Example**

```go
{{ $content := getFileContent "/path/to/file.txt" }}
{{ $content }}
```

---

### getFilesList

Returns a list of file names in a directory. It can be used to list files in a directory within a Go template.

**Signature:**

```go
func getFilesList(path string) []string
```

**Parameters:**

- `path`: The path of the directory where the files will be listed.

**Returns:**

- A slice of strings containing the names of the files in the directory.
- An empty slice if an error occurs.

**Example**

```go
{{ $files := getFilesList "/path/to/directory" }}
{{ range $files }}{{ . }}{{ end }}
```

---

### getFileExtension

Returns the extension of a file from its path. Useful for conditioning template logic based on the file type.

**Signature:**

```go
func getFileExtension(filePath string) string
```

**Parameters:**

- `filePath`: The full path of the file.

**Returns:**

- The file extension as a string.
- An empty string if the file has no extension.

**Example**

```go
{{ $ext := getFileExtension "/path/to/file.txt" }}
{{ if eq $ext "txt" }}This is a text file.{{ end }}
```

---

### getFileName

Returns the file name, excluding the path. It can be used to display only the file name in templates.

**Signature:**

```go
func getFileName(filePath string) string
```

**Parameters:**

- `filePath`: The full path of the file.

**Returns:**

- The file name as a string.

**Example**

```go
{{ $fileName := getFileName "/path/to/file.txt" }}
{{ $fileName }}
```

---

### getFilePath

Returns the directory where the file is located. It can be used to access the directory path within a Go template.

**Signature:**

```go
func getFilePath(filePath string) string
```

**Parameters:**

- `filePath`: The full path of the file.

**Returns:**

- The directory path as a string.

**Example**

```go
{{ $dir := getFilePath "/path/to/file.txt" }}
{{ $dir }}
```

---

### fileExists

Checks if a file exists in the filesystem. It is useful for verifying the existence of files before using them in Go templates.

**Signature:**

```go
func fileExists(filePath string) bool
```

**Parameters:**

- `filePath`: The full path of the file.

**Returns:**

- `true` if the file exists, `false` otherwise.

**Example**

```go
{{ if fileExists "/path/to/file.txt" }}The file exists.{{ else }}The file does not exist.{{ end }}
```

---

### isDirectory

Checks if a path is a directory. It can be used to differentiate directories from files in a Go template.

**Signature:**

```go
func isDirectory(filePath string) bool
```

**Parameters:**

- `filePath`: The full path to be checked.

**Returns:**

- `true` if the path is a directory, `false` otherwise.

**Example**

```go
{{ if isDirectory "/path/to/directory" }}This is a directory.{{ else }}This is a file.{{ end }}
```

---

### isFile

Checks if a path is a file. It can be used to differentiate files from directories in a Go template.

**Signature:**

```go
func isFile(filePath string) bool
```

**Parameters:**

- `filePath`: The full path to be checked.

**Returns:**

- `true` if the path is a file, `false` otherwise.

**Example**

```go
{{ if isFile "/path/to/file.txt" }}This is a file.{{ else }}This is not a file.{{ end }}
```

---

### getFileSize

Returns the size of a file in bytes.

**Signature:**

```go
func getFileSize(filePath string) int64
```

**Parameters:**

- `filePath`: The full path of the file.

**Returns:**

- The size of the file in bytes.
- `0` if an error occurs.

**Example**

```go
{{ $size := getFileSize "/path/to/file.txt" }}
{{ $size }} bytes
```

---
