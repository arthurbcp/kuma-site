---
title: Instalação
description: Guia de instalação do Kuma Framework
---

### Requisitos

- [Go](https://golang.org/dl/) versão 1.23 ou superior.
- [Git](https://git-scm.com/downloads) instalado e configurado no seu sistema.

### Passo a Passo

1. **Execute o comando de instalação:**

   ```bash
   go install github.com/arthurbcp/kuma@latest
   ```

2. **Adicione o diretório bin do Go ao seu PATH (se ainda não estiver incluído):**

   Adicione a seguinte linha ao seu arquivo de configuração do shell (`.bashrc`, `.zshrc`, etc.):

   ```bash
   export PATH=$PATH:$(go env GOPATH)/bin
   ```

   Em seguida, recarregue seu shell ou execute:

   ```bash
   source ~/.bashrc
   ```

   _Substitua `.bashrc` pelo seu arquivo de configuração do shell, se necessário._

3. **Verifique se o \$GOPATH está configurado corretamente:**

   Execute o seguinte comando para exibir o valor atual de \$GOPATH:

   ```bash
   echo $GOPATH
   ```

   **Resultados Esperados:**

   - **Se \$GOPATH estiver configurado corretamente:** O comando retornará o caminho para o diretório GOPATH, geralmente algo como `/home/usuario/go` no Linux ou `C:Users/usuario/go` no Windows.
   - **Se \$GOPATH estiver vazio ou incorreto:** Você precisará configurá-lo adicionando a seguinte linha ao seu arquivo de configuração do shell:

     ```bash
     export GOPATH=$(go env GOPATH)
     ```

     Em seguida, recarregue seu shell ou execute:

     ```bash
     source ~/.bashrc
     ```

     _Substitua `.bashrc` pelo seu arquivo de configuração do shell, se necessário._

4. **Verifique a instalação:**

   ```bash
   kuma --help
   ```

   Você deve ver a ajuda do CLI do Kuma, confirmando que a instalação foi bem-sucedida.
