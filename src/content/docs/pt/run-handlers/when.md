---
title: When Handler
description: Visão geral de When Handler (Mr. Smith Framework)
---

Executa condicionalmente uma run.

**Propriedades**:
- **condition**: A condição que deve ser avaliada como verdadeira para executar a run.
- **run**: O nome da run que será executada se a condição for atendida.

**Exemplo**:
```yaml
- when:
      condition: "{{ if .data.createBasicStructure }}"
      run: "generateBasicStructure"
```