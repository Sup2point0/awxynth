import adapter from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";
import { mdsvex } from "mdsvex";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex-svelte";
import { visit } from "unist-util-visit";


const config = {
  extensions: [".svelte", ".svx", ".md"],

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
      "#parts":   "./src/parts/",
      "#styles":  "./src/styles/",
      "#scripts": "./src/scripts/",
      "#docs":    "./docs/"
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
        () => tree => visit(tree, "code", node => {
          if (node.lang !== "desmos") return;

          /* NOTE: Need extra escaping since otherwise MDsveX removes them :skull: */
          node.value = node.value.replaceAll("\\", "\\\\");
        }),
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
          @use 'mixins/interact' as *;
        `,
      }
    }),
  ],
};

export default config;
