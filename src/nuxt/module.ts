import {
	addComponent,
	addImports,
	createResolver,
	defineNuxtModule,
} from "@nuxt/kit";

export default defineNuxtModule({
	meta: {
		name: "@bruhabruh/vui",
		configKey: "vui",
		compatibility: { nuxt: ">=3.0.0" },
	},
	setup(_options, nuxt) {
		const resolver = createResolver(import.meta.url);
		const libDir = resolver.resolve("../lib");

		const components: { name: string; dir: string }[] = [
			// actions
			{ name: "Button", dir: "components/actions/ui-button" },
			{ name: "ExtendedFab", dir: "components/actions/ui-extended-fab" },
			{ name: "Fab", dir: "components/actions/ui-fab" },
			{ name: "IconButton", dir: "components/actions/ui-icon-button" },
			{
				name: "SegmentedButton",
				dir: "components/actions/ui-segmented-button",
			},
			{
				name: "SegmentedButtonGroup",
				dir: "components/actions/ui-segmented-button",
			},
			// communications
			{ name: "Badge", dir: "components/communications/ui-badge" },
			{ name: "Tooltip", dir: "components/communications/ui-tooltip" },
			{
				name: "TooltipContent",
				dir: "components/communications/ui-tooltip",
			},
			{
				name: "TooltipTrigger",
				dir: "components/communications/ui-tooltip",
			},
			// containments
			{ name: "Card", dir: "components/containments/ui-card" },
			{ name: "Carousel", dir: "components/containments/ui-carousel" },
			{
				name: "CarouselDots",
				dir: "components/containments/ui-carousel",
			},
			{
				name: "CarouselNextButton",
				dir: "components/containments/ui-carousel",
			},
			{
				name: "CarouselPrevButton",
				dir: "components/containments/ui-carousel",
			},
			{
				name: "CarouselSlide",
				dir: "components/containments/ui-carousel",
			},
			{
				name: "CarouselSlideContent",
				dir: "components/containments/ui-carousel",
			},
			{
				name: "CarouselView",
				dir: "components/containments/ui-carousel",
			},
			{ name: "Container", dir: "components/containments/ui-container" },
			{
				name: "ContainerContent",
				dir: "components/containments/ui-container",
			},
			{ name: "Dialog", dir: "components/containments/ui-dialog" },
			{
				name: "DialogActions",
				dir: "components/containments/ui-dialog",
			},
			{
				name: "DialogContent",
				dir: "components/containments/ui-dialog",
			},
			{
				name: "DialogDivider",
				dir: "components/containments/ui-dialog",
			},
			{ name: "DialogIcon", dir: "components/containments/ui-dialog" },
			{
				name: "DialogSubhead",
				dir: "components/containments/ui-dialog",
			},
			{ name: "DialogText", dir: "components/containments/ui-dialog" },
			{ name: "Divider", dir: "components/containments/ui-divider" },
			{ name: "Grid", dir: "components/containments/ui-grid" },
			{ name: "GridCell", dir: "components/containments/ui-grid" },
			{ name: "Modal", dir: "components/containments/ui-modal" },
			{
				name: "ModalContent",
				dir: "components/containments/ui-modal",
			},
			{
				name: "ModalTrigger",
				dir: "components/containments/ui-modal",
			},
			{
				name: "ModalUnderlay",
				dir: "components/containments/ui-modal",
			},
			{ name: "Popover", dir: "components/containments/ui-popover" },
			{
				name: "PopoverContent",
				dir: "components/containments/ui-popover",
			},
			{
				name: "PopoverTrigger",
				dir: "components/containments/ui-popover",
			},
			// inputs
			{ name: "Field", dir: "components/inputs/ui-field" },
			{ name: "MaskField", dir: "components/inputs/ui-mask-field" },
			{ name: "NumberField", dir: "components/inputs/ui-number-field" },
			{ name: "SearchBar", dir: "components/inputs/ui-search-bar" },
			{ name: "TextAreaField", dir: "components/inputs/ui-textarea-field" },
			{ name: "TextField", dir: "components/inputs/ui-text-field" },
			// navigations
			{ name: "AppBar", dir: "components/navigations/ui-app-bar" },
			{ name: "AppBarSlot", dir: "components/navigations/ui-app-bar" },
			{ name: "Breadcrumbs", dir: "components/navigations/ui-breadcrumbs" },
			{
				name: "BreadcrumbsItem",
				dir: "components/navigations/ui-breadcrumbs",
			},
			{
				name: "NavigationBar",
				dir: "components/navigations/ui-navigation-bar",
			},
			{
				name: "NavigationBarItem",
				dir: "components/navigations/ui-navigation-bar",
			},
			{
				name: "NavigationRail",
				dir: "components/navigations/ui-navigation-rail",
			},
			{
				name: "NavigationRailItem",
				dir: "components/navigations/ui-navigation-rail",
			},
			{
				name: "NavigationRailSection",
				dir: "components/navigations/ui-navigation-rail",
			},
			{ name: "Pagination", dir: "components/navigations/ui-pagination" },
			// selections
			{ name: "Checkbox", dir: "components/selections/ui-checkbox" },
			{ name: "Menu", dir: "components/selections/ui-menu" },
			{ name: "MenuContent", dir: "components/selections/ui-menu" },
			{ name: "MenuItem", dir: "components/selections/ui-menu" },
			{ name: "MenuSection", dir: "components/selections/ui-menu" },
			{ name: "Radio", dir: "components/selections/ui-radio" },
			{ name: "Slider", dir: "components/selections/ui-slider" },
			{ name: "Switch", dir: "components/selections/ui-switch" },
			// utility
			{ name: "Icon", dir: "components/utility" },
			{ name: "MotionComponent", dir: "components/utility" },
		];

		for (const comp of components) {
			addComponent({
				name: `Ui${comp.name}`,
				export: comp.name,
				filePath: `${libDir}/${comp.dir}/index.js`,
			});
		}

		addImports([
			{
				name: "useButton",
				from: `${libDir}/composables/use-button.js`,
			},
			{
				name: "useCarousel",
				from: `${libDir}/composables/use-carousel.js`,
			},
			{
				name: "useInteractions",
				from: `${libDir}/composables/use-interactions.js`,
			},
			{
				name: "useRipple",
				from: `${libDir}/composables/use-ripple.js`,
			},
			{
				name: "useToggleButton",
				from: `${libDir}/composables/use-toggle-button.js`,
			},
		]);

		// Tailwind v3 (@nuxtjs/tailwindcss): scan compiled VUI files for class names

		(nuxt.hook as any)("tailwindcss:config", (config: Record<string, unknown>) => {
			const content = config.content as
				| { files?: string[] }
				| string[]
				| undefined;
			if (Array.isArray(content)) {
				content.push(`${libDir}/**/*.js`);
			}
			else if (content && typeof content === "object" && "files" in content) {
				content.files ??= [];
				content.files.push(`${libDir}/**/*.js`);
			}
		});
	},
});
