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
        github: "https://github.com/withastro/starlight",
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
          label:"Comandos CLI",
          items: [
            { label: "create", slug: ""},
            { label: "exec run", slug: ""},
            { label: "exec module", slug: ""},
            { label: "module add", slug: ""},
            { label: "module rm", slug: ""},
            { label: "modify", slug: ""},
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
