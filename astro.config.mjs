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
        github: "https://github.com/kuma-framework/kuma",
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        "pt": {
          label: "Português",
          lang: "pt",
        },
      },
      sidebar: [
        {
          label: "Get Started",
          translations: {
            pt: "Comece por aqui",
          },
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: "Overview",
          translations: {
            pt: "Visão geral",
          },
          autogenerate: { directory: 'overview' },
        },
        {
          label: "Run Handlers",
          autogenerate: { directory: 'run-handlers' },
        },
        {
          label:"CLI Commands",
          translations: {
            pt: "Comandos CLI",
          },
          autogenerate: { directory: 'commands-cli' },
        },
        {
          label: "Complements",
          translations: {
            pt: "Complementos",
          },
          autogenerate: { directory: 'complements' },
        }       
      ],
      customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
