---
title: Pipelines
description: Overview of Pipelines (Mr. Smith Framework)
---

Pipelines allow you to define a step-by-step execution process from a CLI command. With a pipeline, you can create anything from a form with user interaction via terminal, make HTTP calls, transform JSON or YAML files into variables for use in templates, generate custom code structures, add logs, and conditionally execute other pipelines.

## Structure

Pipelines are YAML files and must be located within the `.mr-smith/pipelines` folder to be recognized.

The file must be in map format, where the key represents the declaration of a pipeline.

A pipeline is composed of the following structure:

- **description:** Description of the action to be performed by the pipeline.
- **steps:** Array of steps  that will be executed in order when calling a pipeline.
- **visible:** Boolean value that determines if the pipeline will be visible for execution via terminal (`true`) or only for other pipelines (`false`). Default value: `true`.

## Steps

- [Form](/pipeline-steps/form): Used to display interactive forms in the terminal.
- [Cmd](/pipeline-steps/cmd): Executes commands in the terminal during the pipeline execution.
- [Define](/pipeline-steps/define): Defines new variables during the pipeline execution.
- [Log](/pipeline-steps/log): Allows displaying messages in the terminal during the pipeline execution.
- [Load](/pipeline-steps/load): Loads data from a local or remote file (JSON or YAML) and stores it in a variable.
- [Create](/pipeline-steps/create): Generates new files or directories from templates based on a predefined structure.
- [Modify](/pipeline-steps/modify): Alters existing files based on templates, allowing for content insertion, replacement, or removal.
- [Pipeline](/pipeline-steps/pipeline): Executes another pipeline within the current one.
- [When](/pipeline-steps/when): Conditionally executes a pipeline.

## Using Variables

The values of each property of each step are Go template strings, which may contain variables, functions, and expressions just like any other template. Usage: `.data.variableName`.

To learn more about text templates and how to use them with Mr. Smith, visit the link: [Text Templates in Go](/complements/go-templates)


## Example

```yaml

create-release:
    steps:
        - form:
            fields:
                - input:
                    label: "Release version"
                    placeholder: "e.g., v1.0.1"
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
            pipeline: create-unreleased-file
        
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

## Executing a Pipeline

Check the complete documentation for the `mr run` command [here](/commands-cli/run)