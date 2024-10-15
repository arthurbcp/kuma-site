// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Docs",
      logo: {
        light: "./src/assets/icon.png",
        dark: "./src/assets/icon.png",
      },
      social: {
        github: "https://github.com/withastro/starlight",
      },
      defaultLocale: "en",
      locales: {
        en: {
          label: "English",
        },
        "pt-br": {
          label: "Português",
        },
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
