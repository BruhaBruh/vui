import antfu from "@antfu/eslint-config";

export default antfu(
	{
		type: "app",
		formatters: true,
		stylistic: {
			indent: "tab",
			quotes: "double",
			semi: true,
			overrides: {},
		},
		vue: {
			overrides: {
				"import/no-named-default": "off",
				"vue/custom-event-name-casing": ["error", "kebab-case"],
			},
		},
		typescript: {
			overrides: {
				"ts/consistent-type-definitions": ["error", "type"],
				"node/prefer-global/process": "off",
				"node/prefer-global/buffer": "off",
				"style/indent-binary-ops": "off",
			},
		},
	},
);
