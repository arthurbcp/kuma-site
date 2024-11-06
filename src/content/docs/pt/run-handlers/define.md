---
title: Define Handler
description: Visão geral de Define Handler (Mr. Smith Framework)
---

Define variáveis que podem ser utilizadas em etapas posteriores da [run](/overview/runs), [builders](/overview/builders) ou [templates](/overview/templates).

**Propriedades**:
- **variable**: O nome da variável que será definida.
- **value**: O valor atribuído à variável.

**Exemplo**:
```yaml
- define:
      variable: "dbConnection"
      value: "{{.data.dbType}}"
```