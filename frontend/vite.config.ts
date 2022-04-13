/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import path from "path";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  build: {
    target: "esnext",
  },
  plugins: [
    vue(),
    Components({
      dirs: ["src/components", "src/views"],
      dts: true,
      resolvers: [
        HeadlessUiResolver({ prefix: "" }),
        IconsResolver({
          prefix: "icon",
          alias: { heros: "heroicons-outline", heross: "heroicons-solid" },
          customCollections: ["local"],
        }),
      ],
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true,
      scale: 2,
      customCollections: {
        local: FileSystemIconLoader("./src/assets/icons", (svg: string) =>
          svg.replace(/#6c63ff/g, "currentColor")
        ),
      },
    }),
  ],
  test: {
    environment: "happy-dom",
  },
});
