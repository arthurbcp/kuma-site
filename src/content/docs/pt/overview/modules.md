---
title: Módulos
description: Visão geral de Módulos (Mr. Smith Framework)
---

O sistema de módulos do Mr. Smith permite que desenvolvedores criem, compartilhem e reutilizem estruturas de templates de forma modular. Esses módulos são repositórios independentes que contêm [templates](/overflow/templates), [builders](/overflow/builders) e [pipelines](/overview/pipelines).

## Estrutura

A estrutura de um módulo no Mr. Smith é a mesma que você já está acostumado. Qualquer repositório do Github com uma pasta `.mr-smith` na raiz contendo pelo menos um pipeline, pode se tornar um módulo se você adicionar um arquivo chamado `mr-config.yaml` na raiz do repositório.

O arquivo `mr-config.yaml`, deve seguir o seguinte formato:

```yaml
description: Meu módulo # Descrição do módulo
version: 1.0.0 # Versão do módulo
```


## Adicionando um módulo

Para adicionar um módulo do Mr. Smith ao seu projeto, execute o comando `mr module add -repository myorgazitaion/myrepository`.
Ou se preferir, você pode digitar apenas `mr module add`, e escolher um dos nossos módulos oficiais.

Ao adicionar um módulo ao seu projeto, o Mr. Smith copiará o repositório do módulo  para dentro da pasta `.mr-smith`. Para gerenciar os módulos, o Mr. Smith também criará um arquivo chamado `mr-modules.yaml`, que será editado automaticamente sempre que um módulo for adicionado ou removido do seu projeto.

Confira a documentação completa do comando `mr module add` [aqui](/commands-cli/module-add).

## Chamando um pipeline de um módulo

Confira a documentação completa do comando `mr run` [aqui](/commands-cli/run)

## Removendo um módulo

Confira a documentação completa do comando `mr module rm` [aqui](/commands-cli/module-rm)