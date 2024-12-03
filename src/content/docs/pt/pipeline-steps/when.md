---
title: When Step
description: Visão geral de When Step (Mr. Smith Framework)
---

Executa condicionalmente um pipeline.

**Propriedades**:
- **condition**: A condição que deve ser avaliada como verdadeira para executar o pipeline.
- **pipeline**: O nome do pipeline que será executada se a condição for atendida.

**Exemplo**:
```yaml
- when:
      condition: "{{.data.createBasicStructure }}"
      pipeline: "generateBasicStructure"
```