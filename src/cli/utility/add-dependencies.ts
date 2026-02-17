import { exec } from "node:child_process";
import { logger } from "./logger";

export async function addDependencies(dependencies: string[], packageManager: "yarn" | "pnpm" | "bun" | "npm" | "deno", isDev = false) {
	let command = `npm i${isDev ? " --save-dev" : ""} ${dependencies.join(" ")}`;
	if (packageManager === "yarn") {
		command = `yarn add${isDev ? " --dev" : ""} ${dependencies.join(" ")}`;
	}
	else if (packageManager === "pnpm") {
		command = `pnpm add${isDev ? " --save-dev" : ""} ${dependencies.join(" ")}`;
	}
	else if (packageManager === "bun") {
		command = `bun add${isDev ? " --dev" : ""} ${dependencies.join(" ")}`;
	}
	else if (packageManager === "deno") {
		logger.error("Deno is not supported!");
		process.exit(1);
	}

	return new Promise<string>((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(new Error(`Fail run command: ${error.message}`));
				return;
			}
			if (stderr) {
				reject(new Error(`Error: ${stderr}`));
				return;
			}
			resolve(stdout);
		});
	});
}
