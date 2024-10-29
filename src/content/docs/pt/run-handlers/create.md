---
title: Create Handler
description: Visão geral de Create Handler (Kuma Framework)
---

Gera novos arquivos ou diretórios a partir de templates com base em uma estrutura predefinida.

**Propriedades**:
- **from**: Caminho do [builder](/overview/builders) onde o template está localizado. 

**Exemplo**:
```yaml
- create:
    from: "builders/projectStructure.yaml"
```
