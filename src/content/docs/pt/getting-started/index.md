---
title: Sobre o Mr. Smith
description: Guia inicial do Mr. Smith Framework
---

Mr. Smith é um framework poderoso projetado para gerar scaffolds para qualquer linguagem de programação, baseado em [templates Go](https://pkg.go.dev/text/template). Ele simplifica o processo de configuração de novos projetos automatizando a criação de diretórios, arquivos e código base, garantindo consistência e economizando tempo valioso de desenvolvimento. Além disso, o Mr. Smith possui uma TUI personalizável, proporcionando uma experiência intuitiva e eficiente tanto para quem cria scaffolds quanto para quem os utiliza, tornando o processo acessível e fluido para desenvolvedores de todos os níveis.

## Recursos

- Personalize a estrutura de diretórios e arquivos do seu projeto através de [templates Go](https://pkg.go.dev/text/template).
- Integração com o GitHub para baixar templates pré-definidos da comunidade ou para uso pessoal via repositórios privados.
- Capacidade de criar fluxos de trabalho de comandos personalizados CLI/TUI através de um arquivo YAML usando runs.
- Uso de variáveis dinâmicas aplicáveis aos templates. As variáveis podem ser extraídas de um arquivo YAML ou JSON local ou buscadas de uma URL pública. Elas também podem ser obtidas a partir da entrada do usuário durante a execução de um [run](cmd/commands/exec).
