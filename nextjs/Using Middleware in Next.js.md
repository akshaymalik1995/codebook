

## Introduction

Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can either modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Middleware runs before cached content and routes are matched.


## Convention

Using the file `middleware.js` in the root of your project to define Middleware. 

## Example

```js
import {NextResponse} from "next/server"

export function middleware(req, res) {
	return NextResponse.redirect(new URL("/home", request.url ))
}

export const config = {
	matcher : "/about/:path"
}
```


## Matching Paths

Middleware will be invoked for **every route in your project**. The following is the execution order:

1. `headers` from `next.config.js`
2. `redirects` from `next.config.js`
3. Middleware (`rewrites`, `redirects`, etc.)
4. `beforeFiles` (`rewrites` ) from `next.config.js`
5. Filesystem routes (`public/`, `_next/static/`, `pages/`, `app/`, etc.)
6. `afterFiles` (`rewrites` ) from `next.config.js`
7. Dynamic Routes (`/blog/[slug]`)
8. `fallback` (`rewrite` ) from `next.config.js`

There are two wats to define which paths Middleware will run on:

1. Custom matcher config
2. Conditional statements

### Matcher

`matcher` allows you to filter Middleware to run on specific paths.

```js
export const config = {
	matcher : "/about/:path"
}
```

You can match a single path or multiple paths with an array syntax:

```js
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
};
```

The `matcher` config allows you full regex so matching like negative lookaheads or character matching is supported. The regex must be enclosed within the parenthesis.

```js
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

Configured matches:

1. MUST start with `/`
2. Can include named parameters: `/about/:path` matches `/about/a` and `/about/b` but not `/about/a/c`
3. Can have modifiers on named parameters (starting with `:`): `/about/:path*` matches `/about/a/b/c` because `*` is _zero or more_. `?` is _zero or one_ and `+` _one or more_
4. Can use regular expression enclosed in parenthesis: `/about/(.*)` is the same as `/about/:path*`


### Conditional Statements

```js
import { NextResponse } from 'next/server';
 
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url));
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url));
  }
}
```

### NextResponse

The `NextResponse` API allows you to:

- `redirect` the incoming request to a different URL
- `rewrite` the response by displaying a given URL
- Set request headers for API Routes, `getServerSideProps`, and `rewrite` destinations
- Set response cookies
- Set response headers

To produce a response from Middleware, you can:

1. `rewrite` to a route ([Page](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts) or [Edge API Route](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)) that produces a response
2. return a `NextResponse` directly. See [Producing a Response](https://nextjs.org/docs/pages/building-your-application/routing/middleware#producing-a-response)


## Using Cookies

Cookies are regular headers. On a `Request`, they are stored in the `Cookie` header. On a `Response` they are in the `Set-Cookie` header. Next.js provides a convenient way to access and manipulate these cookies through the `cookies` extension on `NextRequest` and `NextResponse`

1. For income requests, `cookies` comes with the following methods: `get`, `getAll`, `set` , and `delete` cookies. You can check for existence of a cookie with `has` or remove all cookies with `clear`
2. For outgoing responses, `cookies` have the following methods: `get`, `getAll`, `set`, and `delete`.

```js
import {NextResponse} from "next/server"
export function middleware(request) {
	let cookie = request.cookies.get("nextjs")?.value
	const allCookies = request.cookies.getAll()
	request.cookies.has("nextjs")
	request.cookies.delete("nextjs")

	const response = NextResponse.next()
	response.cookies.set({
		name : "Vercel",
		value : "fast"
	})
	cookie = response.cookies.get("vercel")
	return response
}
```


## Setting Headers

You can set request and response headers using the `NextResponse` API (setting _request_ headers is available since Next.js v13.0.0).

```js
import { NextResponse } from 'next/server';
export function middleware(request) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hello-from-middleware1', 'hello');
 
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
 
  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello');
  return response;
}
```

### Producing a Response

You can respond from Middleware directly by returning a `Response` or `NextResponse` instance. (This is available since [Next.js v13.1.0](https://nextjs.org/blog/next-13-1#nextjs-advanced-middleware))

```js
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@lib/auth';
 
// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/:function*',
};
 
export function middleware(request) {
  // Call our authentication function to check the request
  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } },
    );
  }
}
```