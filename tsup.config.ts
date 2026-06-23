import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	dts: false,
	entry: ["src/cli/client/index.ts"],
	format: ["esm"],
	platform: "node",
	sourcemap: false,
	minify: true,
	target: "esnext",
	outDir: "dist",
	treeshake: true,
	noExternal: [/.*/],
	banner: {
		js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
	},
});
