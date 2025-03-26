// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { generateSidebar } from './src/lib/sidebar';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'ABAP Docs',
			sidebar: generateSidebar({ cwd: 'abap' }),
		}),
	],
});
