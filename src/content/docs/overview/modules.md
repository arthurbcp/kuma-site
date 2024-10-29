---
title: Modules
description: Overview of Modules (Kuma Framework)
---

The Kuma module system allows developers to create, share, and reuse template structures in a modular way. These modules are independent repositories that contain [templates](/overflow/templates), [builders](/overflow/builders), and [runs](/overview/runs).

## Structure

The structure of a module in Kuma is the same as you are already familiar with. Any GitHub repository with a `.kuma` folder at the root containing at least one run can become a module if you add a file called `kuma-config.yaml` in the root of the repository.

The `kuma-config.yaml` file should follow the following format:

```yaml
description: My module # Module description
version: 1.0.0 # Module version
```


## Adding a module

To add a Kuma module to your project, run the command `kuma module add -repository myorganization/myrepository`.
Or if you prefer, you can simply type `kuma module add` and choose one of our official modules.

When adding a module to your project, Kuma will copy the module repository into the `.kuma` folder. To manage the modules, Kuma will also create a file called `kuma-modules.yaml`, which will be automatically updated whenever a module is added or removed from your project.

Check the complete documentation of the `kuma module add` command [here](/commands-cli/module-add).

## Calling a run from a module

Check the complete documentation of the `kuma exec module` command [here](/commands-cli/exec-module).

## Removing a module

Check the complete documentation of the `kuma module rm` command [here](/commands-cli/exec-module).