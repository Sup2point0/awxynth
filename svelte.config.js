import adapter from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";
import { mdsvex } from "mdsvex";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex-svelte";


const config = {
  extensions: [".svelte", ".md", ".svx"],

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: false,
      strict: true,
    }),
    paths: {
      base: process.argv.includes("dev") ? "" : process.env.BASE_PATH
    },
    alias: {
      "#src":     "./src/",
      "#parts":   "./src/parts",
      "#styles":  "./src/styles",
      "#scripts": "./src/scripts",
    },
    prerender: {
      handleHttpError: "warn",
      handleMissingId: "warn",
    },
  },

  preprocess: [
    mdsvex({
      extensions: [".md", ".svx"],
      remarkPlugins: [
        remarkMath,
      ],
      rehypePlugins: [
        rehypeKatex,
      ],
    }),
    sveltePreprocess({
      scss: {
        includePaths: ["src/styles"],
        prependData: `
          @use 'mixins/colours' as *;
          @use 'mixins/fonts' as *;
        `,
      }
    }),
  ],
};

export default config;
