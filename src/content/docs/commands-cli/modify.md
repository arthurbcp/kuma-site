---
title: modify
description: Descrição do comando modify (Kuma Framework)
---

Altera arquivos existentes com base em templates, permitindo inserir, substituir ou remover conteúdo.


```bash
kuma modify [flags]
```

## Flags

- `--variables, -v`: O caminho ou URL do arquivo de variáveis que será usado para gerar o arquivo. **Required**
- `--file, -f`: O caminho do arquivo que será modificado. **Required**
- `--template, -t`: O caminho do arquivo de template que será usado para modificar o arquivo. **Required**
- `--mark, -m`: O marcador no arquivo que define onde a alteração será feita.
- `--action, -r`: A ação a ser realizada, que pode ser:
  - **replace**: Substitui o marcador com o conteúdo do template (Deixe vazio se quiser que todo o conteúdo seja substituído).
  - **insert-before**: Insere o conteúdo antes do marcador.
  - **insert-after**: Insere o conteúdo após o marcador.
  - **replace-between**: Substitui o conteúdo entre dois marcadores separados por `,`.


## Exemplo

  ```bash
  kuma modify --file "./services/service.go" --template "./templates/service.yaml" --mark "#DB_CONNECTION" --action "replace"
  ```