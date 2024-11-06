---
title: Runs
description: Visão geral de Runs (Mr. Smith Framework)
---

Runs são pipelines de ações configuráveis que permitem definir um processo de execução em etapas a partir de um comando de CLI. Com uma run, você pode criar desde um formulário com interação com o usuário via terminal, realizar chamadas HTTP, transformar arquivos JSON ou YAML em variáveis para uso em templates, gerar estruturas de código personalizadas, adicionar logs e executar outras runs de maneira condicional.

## Estrutura

Runs são arquivos YAML e devem estar dentro da pasta `.mr-smith/runs` para serem identificadas.

O arquivo deve estar em formato de mapa, onde a chave representa a declaração de uma run.

Uma run é composta pela seguinte estrutura:

- **description:** Descrição da ação que será realizada pela run.
- **steps:** Array de passos (handlers) que serão executados em ordem ao chamar uma run.
- **visible:** Valor booleano para determinar se a run será visível para execução via terminal (`true`) ou apenas para outras runs (`false`). Valor padrão: `true`.

## Handlers

- [Form](/run-handlers/form): É usado para exibir formulários interativos no terminal.
- [Cmd](/run-handlers/cmd): Executa comandos no terminal durante a run.
- [Define](/run-handlers/define): Define novas variáveis durante a execução da run.
- [Log](/run-handlers/log): Permite exibir mensagens no terminal durante a execução da run.
- [Load](/run-handlers/load): Carrega dados de um arquivo local ou remoto (JSON ou YAML) e os armazena em uma variável.
- [Create](/run-handlers/create): Gera novos arquivos ou diretórios a partir de templates com base em uma estrutura predefinida.
- [Modify](/run-handlers/modify): Altera arquivos existentes com base em templates, permitindo inserir, substituir ou remover conteúdo.
- [Run](/run-handlers/run): Executa outra run dentro da atual.
- [When](/run-handlers/when): Executa condicionalmente uma run.

## Uso de variáveis

Os valores de cada propriedade de cada handler são templates strings de Go, podendo conter variáveis, funções e expressões assim como qualquer outro template. Utilização: `.data.nomeVariavel`.

Para saber mais sobre text templates e como utilizá-los junto ao Mr. Smith, acesse o link: [Text Templates no Go](/complements/go-templates)


## Exemplo

```yaml

create-release:
    steps:
        - form:
            fields:
                - input:
                    label: "Release version"
                    placeholder: "e.g. v1.0.1"
                    out: releaseVersion
                
        - load:
            from: unreleased.json
            out: releaseData

        - modify:
            file: CHANGELOG.md
            template: templates/new-unreleased.gtpl
            mark: "<!-- UNRELEASED -->,<!-- /UNRELEASED -->"
            action: "replace-between"        

        - modify:
            file: CHANGELOG.md
            template: templates/new-release.gtpl
            mark: "<!-- NEXT RELEASE -->"
            action: "insert-after"        

        - modify:
            file: unreleased.json
            template: templates/unreleased.gtpl
            mark: ""
            action: "replace"


add-change:
    steps:
        - form:
            fields:
                - select:
                    label: What type of change is this?
                    options:
                        - label: Added
                        - label: Changed
                        - label: Deprecated
                        - label: Removed 
                        - label: Fixed
                        - label: Security
                    out: changeType

                - text:
                    placeholder: Describe your change
                    out: changeDescription
        - when:
            condition: "{{ not (fileExists \"unreleased.json\") }}"
            run: create-unreleased-file
        
        - load:
            from: unreleased.json
            out: unreleased

        - modify: 
            file: unreleased.json
            template: templates/unreleased-object.gtpl
            mark: "["
            action: "insert-after"

        - load:
            from: unreleased.json
            out: unreleased

        - modify:
            file: CHANGELOG.md
            template: templates/new-unreleased.gtpl
            mark: "<!-- UNRELEASED -->,<!-- /UNRELEASED -->"
            action: "replace-between"    
  


create-unreleased-file:
    visible: false
    steps:
       - modify:
            file: CHANGELOG.md
            template: templates/CHANGELOG.gtpl
   
       - modify:
            file: unreleased.json
            template: templates/unreleased.gtpl

```

## Executando uma run

Confira a documentação completa do comando `mr exec run` [aqui](/commands-cli/exec-run)