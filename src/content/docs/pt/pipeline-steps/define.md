---
title: Define Step
description: Visão geral de Define Step (Mr. Smith Framework)
---

Define variáveis que podem ser utilizadas em etapas posteriores de [pipelines](/overview/pipelines), [builders](/overview/builders) ou [templates](/overview/templates).

**Propriedades**:
- **variable**: O nome da variável que será definida.
- **value**: O valor atribuído à variável.

**Exemplo**:
```yaml
- define:
      variable: "dbConnection"
      value: "{{.data.dbType}}"
```