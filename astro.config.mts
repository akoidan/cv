import {defineConfig} from 'astro/config';
import config from "./src/config.json";
import image from "@astrojs/image";
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: config.domain,
  integrations: [
    robotsTxt(),
    image(),
  ]
});
