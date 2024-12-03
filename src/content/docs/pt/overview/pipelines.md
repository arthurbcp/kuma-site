---
title: Pipelines
description: Visão geral de Pipelines (Mr. Smith Framework)
---

Pipelines permitem definir um processo de execução em etapas a partir de um comando de CLI. Com uma pipeline, você pode criar desde um formulário com interação com o usuário via terminal, realizar chamadas HTTP, transformar arquivos JSON ou YAML em variáveis para uso em templates, gerar estruturas de código personalizadas, adicionar logs e executar outras pipelines de maneira condicional.

## Estrutura

Pipelines são arquivos YAML e devem estar dentro da pasta `.mr-smith/pipelines` para serem identificadas.

O arquivo deve estar em formato de mapa, onde a chave representa a declaração de uma pipeline.

Um pipeline é composta pela seguinte estrutura:

- **description:** Descrição da ação que será realizada pela pipeline.
- **steps:** Array de passos que serão executados em ordem ao chamar uma pipeline.
- **visible:** Valor booleano para determinar se a pipeline será visível para execução via terminal (`true`) ou apenas para outros pipelines (`false`). Valor padrão: `true`.

## Steps

- [Form](/pipeline-steps/form): É usado para exibir formulários interativos no terminal.
- [Cmd](/pipeline-steps/cmd): Executa comandos no terminal durante a execução de um pipeline.
- [Define](/pipeline-steps/define): Define novas variáveis durante a execução de um pipeline.
- [Log](/pipeline-steps/log): Permite exibir mensagens no terminal durante a execução de um pipeline.
- [Load](/pipeline-steps/load): Carrega dados de um arquivo local ou remoto (JSON ou YAML) e os armazena em uma variável.
- [Create](/pipeline-steps/create): Gera novos arquivos ou diretórios a partir de templates com base em uma estrutura predefinida.
- [Modify](/pipeline-steps/modify): Altera arquivos existentes com base em templates, permitindo inserir, substituir ou remover conteúdo.
- [Pipeline](/pipeline-steps/pipeline): Executa outro pipeline dentro da atual.
- [When](/pipeline-steps/when): Executa condicionalmente um pipeline.

## Uso de variáveis

Os valores de cada propriedade de cada passo são templates strings de Go, podendo conter variáveis, funções e expressões assim como qualquer outro template. Utilização: `.data.nomeVariavel`.

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

## Executando um pipeline

Confira a documentação completa do comando `mr run` [aqui](/commands-cli/run)