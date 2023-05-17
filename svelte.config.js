//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
//import adapter from "sveltekit-adapter-firebase";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            pages:"build",
            assets:"build",
            fallback: null,
            precompress: false,
            strict:true
        }),
	}
};

export default config;
