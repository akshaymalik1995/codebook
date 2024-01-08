
### Create your SvelteKit project

```
npm init svelte@latest my-app
cd my-app

```

### Install Tailwind CSS

```
npm install -D tailwindcss postcss autoprefixer
```

Then, run the following command to generate both `tailwind.config.cjs` and `postcss.config.cjs`:

```
npx tailwindcss init -p
```

Next, change the created `tailwind.config.js` to a CommonJS module by renaming it to `tailwind.config.cjs`. You just need to change the extension to `cjs`.

Next, change the created `tailwind.config.js` to a CommonJS module by renaming it to `tailwind.config.cjs`. You just need to change the extension to `cjs`.

```js
// tailwind.config.cjs
module.exports = {
    purge: ['src/app.html', 'src/**/*.svelte'],
    ...
}
```

Create a `styles.css` file in the `src` folder with the following content:

```css
// ./src/style.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now, create a layout component to import the styles from:

```js
// ./src/routes/+layout.svelte 
<script> 
import '../style.css'; 
</script>
```

### Add Tailwind includes to your Svelte App

In your `svelte.config.cjs` file, add postcss as a preprocessor:

```js
// svelte.config.cjs
const sveltePreprocess = require('svelte-preprocess');
module.exports = {
    preprocess: sveltePreprocess({
        postcss: true,
        defaults: {
            style: 'postcss',
        },
    }),
};

```

And create a `postcss.config.cjs` file in the root of the project:

```js
// postcss.config.cjs
module.exports = {
    plugins: {
        'tailwindcss': {},
        autoprefixer: {},
    },
};

```

In your Svelte app, add the following code to your `index.svelte` file or any other Svelte component:

```html
<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

```

