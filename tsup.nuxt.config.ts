import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	dts: false,
	entry: ["src/nuxt/module.ts"],
	format: ["esm"],
	sourcemap: false,
	minify: false,
	target: "esnext",
	outDir: "dist/nuxt",
	external: ["@nuxt/kit", "@nuxt/schema", "vue"],
});
