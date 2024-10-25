---
title: When Handler
description: Visão geral de When Handler (Kuma Framework)
---

Executa condicionalmente uma run.

**Propriedades**:
- **condition**: A condição que deve ser avaliada como verdadeira para executar a run.
- **run**: O nome da run que será executada se a condição for atendida.

**Exemplo**:
```yaml
- when:
    when:
      condition: "{{ if .data.createBasicStructure }}"
      run: "generateBasicStructure"
```