// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Kuma",
      logo: {
        light: "./src/assets/icon.png",
        dark: "./src/assets/icon.png",
      },
      social: {
        github: "https://github.com/arthurbcp/kuma",
      },
      sidebar: [
        {
          label: "Comece por aqui",
          items: [
            { label: "Começando", slug: "getting-started" },
            { label: "Instalação", slug: "getting-started/installation" },
            { label: "Primeiros passos", slug: "getting-started/usage" },
          ],
        },
        {
          label: "Visão geral",
          items: [
            { label: "Builders", slug: "overview/builders" },
            { label: "Templates", slug: "overview/templates" },
            { label: "Runs", slug: "overview/runs" },
            { label: "Funções", slug: "overview/functions" },
            { label: "Módulos", slug: "overview/modules" },
          ]
        },
        {
          label: "Run handlers",
          items: [
            {label: "Form Handler", slug: "run-handlers/form"},
            {label: "Cmd Handler", slug: "run-handlers/cmd"},
            {label: "Define Handler", slug: "run-handlers/define"},
            {label: "Log Handler", slug: "run-handlers/log"},
            {label: "Load Handler", slug: "run-handlers/load"},
            {label: "Create Handler", slug: "run-handlers/create"},
            {label: "Modify Handler", slug: "run-handlers/modify"},
            {label: "Run Handler", slug: "run-handlers/run"},
            {label: "When Handler", slug: "run-handlers/when"},
          ]
        },
        {
          label:"Comandos CLI",
          items: [
            { label: "create", slug: "commands-cli/create"},
            { label: "exec run", slug: "commands-cli/exec-run"},
            { label: "exec module", slug: "commands-cli/exec-module"},
            { label: "module add", slug: "commands-cli/module-add"},
            { label: "module rm", slug: "commands-cli/module-rm"},
            { label: "modify", slug: "commands-cli/modify"},
          ]
        },
        {
          label: "Complementos",
          items: [
            { label: "Go Text Templates", slug: "complements/go-templates" },
          ]
        }       
      ],
      customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
