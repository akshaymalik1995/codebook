
## Pages

SvelteKit uses filesystem-based routing, which means that the *routes* of your app - in other words, what the app should do when a user navigates to a particular URL - are defined by the directories in your codebase. 

The routes are located within `src/routes`. Every directory within which contains a `+page.svelte` file creates a route in your app. 

`src/routes/+page.svelte` maps to `/`

`src/routes/about/+page.svelte` maps to `/about`

```html
<nav>
	<a href="/">home</a>
	<a href="/about">about</a>
</nav>
```

> Unlike traditional multi-page apps, navigating to `/about` and back updates the contents of the current page, like a single-page app. This gives us the best of both worlds — fast server-rendered startup, then instant navigation. (This behaviour can be [configured](https://kit.svelte.dev/docs/page-options).)


## Layouts

Different routes of your app will often share common UI. Instead of repeating it in each `+page.svelte` component, we can use a `+layout.svelte` component that applies to all routes in the same directory.

We have two routes, `src/routes/+page.svelte` and `src/routes/about/+page.svelte`, that contain the same navigation UI.

```html
<!--src/routes/+page.svelte-->
<nav>
  <a href="/">home</a>
  <a href="/about">about</a>
</nav>
<h1>home</h1>
<p>this is the home page.</p>
```

```html
<!--src/routes/about/+page.svelte-->
<nav>
  <a href="/">home</a>
  <a href="/about">about</a>
</nav>

<h1>about</h1>
<p>this is the about page.</p>
```

Let's create a new file `src/routes/+layout.svelte` and move the duplicated content from the `+page.svelte` files into the new `+layout.svelte` file. The `<slot />` element is where the page content will be rendered:

```html
<!--src/routes/+layout.svelte-->
<nav>
	<a href="/">home</a>
	<a href="/about">about</a>
</nav>

<slot />
```

```html
<!--src/routes/+page.svelte-->
<h1>home</h1> 
<p>this is the home page.</p>
```

```html
<!--src/routes/about/+page.svelte-->
<h1>about</h1>
<p>this is the about page.</p>
```


A `+layout.svelte` file applies to every child route, including the sibling `+page.svelte` (if it exists). You can nest layouts to arbitrary depth.

## Route parameters

To create routes with dynamic parameetrs, use square brackets around a valid variable name. For example, a file like `src/routes/blog/[slug]/+page.svelte` will create a route that matches `/blog/one`, `/blog/two`, `/blog/three` and so on.

> Multiple route parameters can appear _within_ one URL segment, as long as they are separated by at least one static character: `foo/[bar]x[baz]` is a valid route where `[bar]` and `[baz]` are dynamic parameters.





