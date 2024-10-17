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
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        "pt-br": {
          label: "Português",
        },
      },
      sidebar: [
        {
          label: "Comece por aqui",
          items: [
            { label: "Começando", slug: "getting-started" },
            { label: "Instalação", slug: "getting-started/installation" },
            { label: "Primeiros passos", slug: "getting-started/usage" },
            { label: "Pastas e arquivos", slug: "getting-started/files" },
          ],
        },
      ],
      customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
