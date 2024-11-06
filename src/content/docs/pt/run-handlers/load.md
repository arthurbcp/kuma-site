---
title: Load Handler
description: Visão geral de Load Handler (Mr. Smith Framework)
---

Carrega dados de um arquivo local ou remoto (JSON ou YAML ou arquivo de texto) e os armazena em uma variável.

Para arquivos de texto que não JSON ou YAML, o Mr. Smith criará uma variável `content` para o conteúdo do arquivo.

**Propriedades**:
- **from**: Caminho do arquivo a ser carregado. Pode ser um arquivo local ou remoto.
- **out**: O nome da variável que armazenará os dados carregados.

**Exemplos**:

**arquivo local**:
```yaml
- load:
    from: "./unreleased.json"
    out: "unreleased"
```

**arquivo remoto**:
```yaml
- load:
    from: "https://petstore.swagger.io/v2/swagger.json"
    out: "swaggerData"
```

** lendo dados de um arquivo de texto**:
```yaml
- load:
    from: "./README.md"
    out: "readme"

- log: "Readme: {{.data.readme.content}}"
```