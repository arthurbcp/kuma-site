---
title: Runs
description: Overview of Runs (Kuma Framework)
---

Runs are configurable action pipelines that allow you to define a step-by-step execution process from a CLI command. With a run, you can create anything from a form with user interaction via terminal, make HTTP calls, transform JSON or YAML files into variables for use in templates, generate custom code structures, add logs, and conditionally execute other runs.

## Structure

Runs are YAML files and must be located within the `.kuma/runs` folder to be recognized.

The file must be in map format, where the key represents the declaration of a run.

A run is composed of the following structure:

- **description:** Description of the action to be performed by the run.
- **steps:** Array of steps (handlers) that will be executed in order when calling a run.
- **visible:** Boolean value that determines if the run will be visible for execution via terminal (`true`) or only for other runs (`false`). Default value: `true`.

## Handlers

- [Form](/run-handlers/form): Used to display interactive forms in the terminal.
- [Cmd](/run-handlers/cmd): Executes commands in the terminal during the run.
- [Define](/run-handlers/define): Defines new variables during the run execution.
- [Log](/run-handlers/log): Allows displaying messages in the terminal during the run execution.
- [Load](/run-handlers/load): Loads data from a local or remote file (JSON or YAML) and stores it in a variable.
- [Create](/run-handlers/create): Generates new files or directories from templates based on a predefined structure.
- [Modify](/run-handlers/modify): Alters existing files based on templates, allowing for content insertion, replacement, or removal.
- [Run](/run-handlers/run): Executes another run within the current one.
- [When](/run-handlers/when): Conditionally executes a run.

## Using Variables

The values of each property of each handler are Go template strings, which may contain variables, functions, and expressions just like any other template. Usage: `.data.variableName`.

To learn more about text templates and how to use them with Kuma, visit the link: [Text Templates in Go](/complements/go-templates)


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

## Running a Run

Check the complete documentation for the `kuma exec run` command [here](/commands-cli/exec-run)