
The skeleton of every application is routing. This page will introduce you to the **fundamental concepts** of routing for the web and how to handle routing in Next.js.

## Terminology

First, you will see these terms being used throughout the documentation. Here's a quick reference:

![Terminology Component Tree](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fterminology-component-tree.png&w=1920&q=75)

- **Tree:** A convention for visualizing a hierarchical structure. For example, a component tree with parent and children components, a folder structure, etc.
- **Subtree:** Part of a tree, starting at a new root (first) and ending at the leaves (last).
- **Root**: The first node in a tree or subtree, such as a root layout.
- **Leaf:** Nodes in a subtree that have no children, such as the last segment in a URL path.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fterminology-url-anatomy.png&w=1920&q=75)

- **URL Segment:** Part of the URL path delimited by slashes.
- **URL Path:** Part of the URL that comes after the domain (composed of segments).

## The app directory

In version 13, Next.js introduced a new **App Router** built on [React Server Components](https://nextjs.org/docs/getting-started/react-essentials#server-components), which supports shared layouts, nested routing, loading states, error handling, and more.

The App Router works in a new directory named `app`. The `app` directory works alongside the `pages` directory to allow for incremental adoption. This allows you to opt some routes of your application into the new behavior while keeping other routes in the `pages` directory for previous behavior. If your application uses the `pages` directory, please also see the [Pages Router](https://nextjs.org/docs/pages/building-your-application/routing) documentation.

By default, components inside `app` are [React Server Components](https://nextjs.org/docs/getting-started/react-essentials#server-components). This is a performance optimization and allows you to easily adopt them, and you can also use [Client Components](https://nextjs.org/docs/getting-started/react-essentials#client-components).

> **Recommendation:** Check out the [Server and Client Components](https://nextjs.org/docs/getting-started/react-essentials) page if you're new to Server Components.

## Roles of Folders and Files

Next.js uses a file-system based router where:

- **Folders** are used to define routes. A route is a single path of nested folders, following the file-system hierarchy from the **root folder** down to a final **leaf folder** that includes a `page.js` file. See [Defining Routes](https://nextjs.org/docs/app/building-your-application/routing/defining-routes).
- **Files** are used to create UI that is shown for a route segment. See [special files](https://nextjs.org/docs/app/building-your-application/routing#file-conventions).



## Route Segments

Each folder in a route represents a **route segment**. Each route segment is mapped to a corresponding **segment** in a **URL path**.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75)

## Nested Routes

To create a nested route, you can nest folders inside each other. For example, you can add a new `/dashboard/settings` route by nesting two new folders in the `app` directory.

The `/dashboard/settings` route is composed of three segments:

- `/` (Root segment)
- `dashboard` (Segment)
- `settings` (Leaf segment)

## File Conventions

Next.js provides a set of special files to create UI with specific behavior in nested routes:

- **layout** : Shared UI for a segment and its children
- **page** :  Unique UI of a route and make routes publicly accessible
- **loading** : Loading UI for a segment and its children
- **not-found** : Not found UI for a segment and its children
- **error** : Error UI for a segment and its children
- **global-error** : Global error UI
- **route** : Server-side API endpoint
- **template** : Specialized re-rendered Layout UI
- **default** : Fallback UI for [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)



## Component Hierarchy

The React components defined in special files of a route segment are rendered in a specific hierarchy:

- `layout.js`
- `template.js`
- `error.js` (React error boundary)
- `loading.js` (React suspense boundary)
- `not-found.js` (React error boundary)
- `page.js` or nested `layout.js`

```jsx
<Layout>
	<Template>
		<ErrorBoundary fallback={<Error />}>
			<Suspense fallback={<Loading />}/>
				<ErrorBoundary fallback={<NotFound />}>
					<Page />
				</ErrorBoundary>
			</Suspense>
		</ErrorBoundary>
	</Template>
</Layout>
```

In a nested route, the components of a segment will be nested **inside** the components of its parent segment.

```jsx

<Layout>
	<ErrorBoundary fallback={<Error />}>
		<Suspense fallback={<Loading />}/>
			<Layout>
				<ErrorBoundary fallback={<Error />}>
					<Suspense fallback={<Loading />}>
						<Page />
					</Suspense>
				</ErrorBoundary>
			</Layout>
		</Suspense>
	</ErrorBoundary>
</Layout>

```


## Colocation

In addition to special files, you have the option to colocate your own files (e.g. components, styles, tests, etc.) inside folders in the `app` directory.

This is because while folders define routes, only the contents returned by `page.js` or `route.js` are publicly addressable.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-colocation.png&w=1920&q=75)


Learn more about [Project Organization and Colocation](https://nextjs.org/docs/app/building-your-application/routing/colocation).

## Server-Centric Routing with Client-side Navigation

Unlike the `pages` directory which uses client-side routing, the App Router uses **server-centric routing** to align with [Server Components](https://nextjs.org/docs/getting-started/react-essentials#server-components) and [data fetching on the server](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching). With server-centric routing, the client does not have to download a route map and **the same request for Server Components can be used to look up routes**. This optimization is useful for all applications, but has a larger impact on applications with many routes.

Although routing is server-centric, the router uses **client-side navigation** with the [Link Component](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component) - resembling the behavior of a Single-Page Application. This means when a user navigates to a new route, the browser will not reload the page. Instead, the URL will be updated and Next.js will [only render the segments that change](https://nextjs.org/docs/app/building-your-application/routing#partial-rendering).

Additionally, as users navigate around the app, the router will store the result of the React Server Component payload in an **in-memory client-side cache**. The cache is split by route segments which allows invalidation at any level and ensures consistency across [React's concurrent renders](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react). This means that for certain cases, the cache of a previously fetched segment can be re-used, further improving performance.

## Partial Rendering


When navigating between sibling routes (e.g. `/dashboard/settings` and `/dashboard/analytics` below), Next.js will only fetch and render the layouts and pages in routes that change. It will **not** re-fetch or re-render anything above the segments in the subtree. This means that in routes that share a layout, the layout will be preserved when a user navigates between sibling pages.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fpartial-rendering.png&w=1920&q=75)

Without partial rendering, each navigation would cause the full page to re-render on the server. Rendering only the segment that’s updating reduces the amount of data transferred and execution time, leading to improved performance.

