import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [vue(), tailwindcss()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	publicDir: false,
	build: {
		outDir: "dist/lib",
		emptyOutDir: true,
		cssCodeSplit: false,
		lib: {
			entry: "src/index.ts",
			formats: ["es"],
		},
		rollupOptions: {
			external: [
				"vue",
				/^vue\/.+/,
				"motion-v",
				"@floating-ui/vue",
				/^@floating-ui\/.+/,
				"@vueuse/core",
				"@vueuse/integrations",
				/^@vueuse\/.+/,
				"embla-carousel-vue",
				/^embla-carousel.*/,
				"focus-trap",
				"class-variance-authority",
				"tailwind-merge",
				"tailwind-merge-vue-directive",
				"@iconify/vue",
				/^@iconify\/.*/,
			],
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
				entryFileNames: "[name].js",
				assetFileNames: "assets/[name][extname]",
			},
		},
	},
});
