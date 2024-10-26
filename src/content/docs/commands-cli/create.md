---
title: create
description: Descrição do comando create (Kuma Framework)
---

Gera novos arquivos ou diretórios a partir de templates com base em uma estrutura predefinida.

```bash
kuma create [flags]
```

## Flags

- `--variables, -v`: O caminho ou URL do arquivo de variáveis que será usado para gerar o arquivo. **Required**
- `--project, -p`: O caminho do diretório que será criado.
- `--from, -f`: O caminho do arquivo YAML ([builder](/overview/builders)) que será usado para gerar o arquivo. **Required**

## Exemplo

```bash
kuma create --project "./my-project" --from "./my-project-structure.yaml"
```