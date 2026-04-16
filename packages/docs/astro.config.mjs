import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://randagio13.github.io',
  base: 'rapid-form',
  integrations: [
    starlight({
      title: 'Rapid Form',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'Rapid Form'
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Randagio13/rapid-form'
        }
      ],
      sidebar: [
        { label: 'Why Rapid Form?', slug: 'why-rapid-form' },
        {
          label: 'Getting Started',
          items: [
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quick-start' }
          ]
        },
        {
          label: 'Guides',
          items: [
            { label: 'Customization', slug: 'guides/customization' },
            { label: 'Custom Validation', slug: 'guides/custom-validation' },
            { label: 'TypeScript', slug: 'guides/typescript' },
            { label: 'Styling Errors', slug: 'guides/styling-errors' }
          ]
        },
        {
          label: 'Examples',
          items: [
            { label: 'Login Form', slug: 'examples/login-form' },
            { label: 'Registration Form', slug: 'examples/registration-form' },
            { label: 'Multi-Field Form', slug: 'examples/multi-field' }
          ]
        },
        {
          label: 'Reference',
          items: [
            { label: 'API Reference', slug: 'reference/api-reference' },
            { label: 'Validation Rules', slug: 'reference/validation-rules' },
            {
              label: 'Migration v2 → v3',
              slug: 'reference/migration-from-v2-to-v3'
            }
          ]
        }
      ]
    })
  ]
});
