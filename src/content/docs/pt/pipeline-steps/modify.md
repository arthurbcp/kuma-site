---
title: Modify Step
description: Visão geral de Modify Step (Mr. Smith Framework)
---

Altera arquivos existentes com base em templates, permitindo inserir, substituir ou remover conteúdo.

**Propriedades**:
- **file**: O caminho do arquivo que será modificado.
- **template**: O caminho do template usado para modificar o arquivo.
- **mark**: Marcador no arquivo que define onde a alteração será feita.
- **action**: A ação a ser realizada, que pode ser:
  - **replace**: Substitui o marcador com o conteúdo do template (Deixe vazio se quiser que todo o conteúdo seja substituído).
  - **insert-before**: Insere o conteúdo antes do marcador.
  - **insert-after**: Insere o conteúdo após o marcador.
  - **replace-between**: Substitui o conteúdo entre dois marcadores separados por `,`.

**Exemplos**:

```yaml
- modify:
    file: "./services/{{.data.serviceName}}/config.yaml"
    template: "./templates/configTemplate.yaml"
    mark: "#CONFIG"
    action: "replace"
```

```yaml
- modify:
    file: "./services/{{.data.serviceName}}/config.yaml"
    template: "./templates/configTemplate.yaml"
    mark: "#CONFIG,#END CONFIG"
    action: "replace-between"
```