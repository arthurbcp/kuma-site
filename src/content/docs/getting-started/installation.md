---
title: Installation
description: Installation guide for the Mr. Smith Framework
---

### Requirements

- [Go](https://golang.org/dl/) version 1.23 or higher.
- [Git](https://git-scm.com/downloads) installed and configured on your system.

### Step by Step

1. **Run the installation command:**

   ```bash
   go install github.com/mr-smith-org/mr@latest
   ```

2. **Add the Go bin directory to your PATH (if it is not already included):**

   Add the following line to your shell configuration file (`.bashrc`, `.zshrc`, etc.):

   ```bash
   export PATH=$PATH:$(go env GOPATH)/bin
   ```

   Then, reload your shell or run:

   ```bash
   source ~/.bashrc
   ```

   _Replace `.bashrc` with your shell configuration file if necessary._

3. **Verify that \$GOPATH is configured correctly:**

   Run the following command to display the current value of \$GOPATH:

   ```bash
   echo $GOPATH
   ```

   **Expected Results:**

   - **If \$GOPATH is configured correctly:** The command will return the path to the GOPATH directory, usually something like `/home/user/go` on Linux or `C:Users/user/go` on Windows.
   - **If \$GOPATH is empty or incorrect:** You will need to configure it by adding the following line to your shell configuration file:

     ```bash
     export GOPATH=$(go env GOPATH)
     ```

     Then, reload your shell or run:

     ```bash
     source ~/.bashrc
     ```

     _Replace `.bashrc` with your shell configuration file if necessary._

4. **Verify the installation:**

   ```bash
   mr --help
   ```

   You should see the help for the Mr. Smith CLI, confirming that the installation was successful.
