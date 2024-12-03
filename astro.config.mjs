// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [
    starlight({
      title: "Mr. Smith",
      logo: {
        light: "./src/assets/logo.png",
        dark: "./src/assets/logo.png",
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
          label: "Pipeline Steps",
          autogenerate: { directory: 'pipeline-steps' },
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
