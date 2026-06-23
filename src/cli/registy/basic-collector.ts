import type { BasicRegistry } from "../schema/registry";
import fs from "node:fs";
import path from "node:path";
import { resolveDependencyVersions } from "../utility/dependency-versions";
import { fileHash } from "../utility/file-hash";

/** Зависимости библиотеки компонентов (версии резолвятся из package.json). */
const dependencies = [
	"@floating-ui/vue",
	"@vueuse/core",
	"@vueuse/integrations",
	"class-variance-authority",
	"embla-carousel-vue",
	"focus-trap",
	"motion-v",
	"tailwind-merge",
];

const devDependencies = [
	"@bruhabruh/type-safe",
	"@tailwindcss/vite",
	"tailwindcss",
	"@iconify/vue",
];

export class BasicRegistryCollector {
	#registry: BasicRegistry = {
		dependecyVersions: resolveDependencyVersions([
			...dependencies,
			...devDependencies,
		]),
		dependencies,
		devDependencies,
		files: [],
	};

	get registry() {
		return this.#registry;
	}

	get #source() {
		return path.resolve("./src");
	}

	async collect() {
		this.addFile("index.ts");
		this.addFiles("components");
		this.addFiles("composables");
		this.addFiles("config");
		this.addFiles("tailwind");
		this.addFiles("types");
	}

	private addFiles(pathToDirectory: string) {
		const directory = path.resolve(this.#source, pathToDirectory);

		for (const filePath of fs.globSync(`${directory}/**/*`)) {
			const stats = fs.statSync(filePath);
			if (stats.isDirectory())
				continue;
			this.addFile(filePath, true);
		}
	}

	private addFile(pathToFile: string, absolute = false) {
		const filePath = absolute
			? pathToFile
			: path.resolve(this.#source, pathToFile);
		const content = fs.readFileSync(filePath, { encoding: "utf-8" });

		this.#registry.files.push({
			path: `${filePath.slice(this.#source.length + 1)}`,
			content,
			hash: fileHash(content),
		});
	}
}
