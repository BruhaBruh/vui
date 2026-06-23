import packageJson from "../../../package.json";

/**
 * Версии зависимостей из package.json проекта — единственный источник правды.
 *
 * Коллекторы реестра задают только СПИСОК имён нужных библиотеке зависимостей,
 * а версии берутся отсюда. Так реестр не разъезжается с package.json при бампе,
 * и при этом в него не утекает весь dev-обвес проекта.
 */
const versions: Record<string, string> = {
	...(packageJson.peerDependencies as Record<string, string> | undefined),
	...(packageJson.dependencies as Record<string, string> | undefined),
	...(packageJson.devDependencies as Record<string, string> | undefined),
};

/**
 * Резолвит версии указанных зависимостей из package.json.
 * Кидает ошибку, если зависимость не найдена — чтобы рассинхрон ловился
 * на генерации, а не у пользователя при установке компонентов.
 */
export function resolveDependencyVersions(
	names: string[],
): Record<string, string> {
	const result: Record<string, string> = {};
	for (const name of names) {
		const version = versions[name];
		if (!version) {
			throw new Error(
				`Dependency "${name}" not found in package.json (dependencies/devDependencies/peerDependencies)`,
			);
		}
		result[name] = version;
	}
	return result;
}
