

This page will guide you through how to define and organize routes in your Next.js application.

## Creating Routes

Next.js uses a file-system based router where **folders** are used to define routes.

Each folder represents a [**route** segment](https://nextjs.org/docs/app/building-your-application/routing#route-segments) that maps to a **URL** segment. To create a [nested route](https://nextjs.org/docs/app/building-your-application/routing#nested-routes), you can nest folders inside each other.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75)

A special [`page.js` file](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages) is used to make route segments publicly accessible.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fdefining-routes.png&w=1920&q=75)

In this example, the `/dashboard/analytics` URL path is _not_ publicly accessible because it does not have a corresponding `page.js` file. This folder could be used to store components, stylesheets, images, or other colocated files.

## Creating UI

[Special file conventions](https://nextjs.org/docs/app/building-your-application/routing#file-conventions) are used to create UI for each route segment. The most common are [pages](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages) to show UI unique to a route, and [layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts) to show UI that is shared across multiple routes.

For example, to create your first page, add a `page.js` file inside the `app` directory and export a React component:

```js
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}
```

