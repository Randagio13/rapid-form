import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://rapid-form.github.io',
	base: 'rapid-form',
	integrations: [
		starlight({
			title: 'Rapid Form',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Randagio13/rapid-form' },
			],
			sidebar: [
				{ label: 'Why Rapid Form?', link: '/why-rapid-form/' },
				{
					label: 'Getting started',
					items: [
						{ label: 'Installation', link: '/getting-started/installation/' },
						{ label: 'Quick start', link: '/getting-started/quick-start/' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Customization', link: '/guides/customization/' },
						{ label: 'Custom Validation', link: '/guides/custom-validation/' },
						{ label: 'TypeScript', link: '/guides/typescript/' },
						{ label: 'Styling Errors', link: '/guides/styling-errors/' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'API Reference', link: '/reference/api-reference/' },
						{ label: 'Validation Rules', link: '/reference/validation-rules/' },
						{ label: 'Migration v2 → v3', link: '/reference/migration-from-v2-to-v3/' },
					],
				},
				{
					label: 'Examples',
					items: [
						{ label: 'Login Form', link: '/examples/login-form/' },
						{ label: 'Registration Form', link: '/examples/registration-form/' },
						{ label: 'Multi-Field Form', link: '/examples/multi-field/' },
					],
				},
			],
		}),
	],
});
