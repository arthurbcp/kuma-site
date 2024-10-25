---
title: Load Handler
description: Visão geral de Load Handler (Kuma Framework)
---

Carrega dados de um arquivo local ou remoto (JSON ou YAML) e os armazena em uma variável.

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