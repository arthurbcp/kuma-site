---
title: run
description: Descrição do comando Run (Mr. Smith Framework)
---

Executa um pipeline.


```bash
mr run [flags]
```

## Flags
- `--pipeline, -r`: O nome da pipeline que será executada.
- `--module, -m`: O nome do módulo que será executado.
- `--vars, -v`: Array de variáveis que serão passadas para os templates.
  A flag `--vars` substitui os campos do formulário. Se uma variável for informada com o mesmo nome do `out` de um campo de formulário, o campo em questão não será exebido.
  
## Exemplo

```bash
mr run --module crud-maker --pipeline setup-database  --vars controller:"users",method:"get",middlewares:"auth|validate",createTable:true
```