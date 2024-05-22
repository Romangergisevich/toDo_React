import { defineConfig } from "vite";
import pages from "vite-plugin-pages";

export default defineConfig({
  base: "/toDo_React/",
  plugins: [pages()],
});
