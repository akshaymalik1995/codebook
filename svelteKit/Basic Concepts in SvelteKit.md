

## What is SvelteKit?

It is a framework for building high-performance apps. Whereas Svelte is `component framework`, SvelteKit is an `app framework` that solves the tricky problems of building something production-ready:

-   Routing
-   Server-side rendering
-   Data fetching
-   Service workers
-   TypeScript integration
-   Prerendering
-   Single-page apps
-   Library packaging
-   Optimised production builds
-   Deploying to different hosting providers
-   ...and so on

SvelteKit apps are server-rendered by default( like traditional 'multi-page apps' or MPAs) for excellent first load performance and SEO characterstics, but then can then transition to client-side navigation (like modern 'single-page apps' or SPAs) to avoid jankily reloading everything (including things like third-party analytics code) when the user navigates. 

## Project structure

```
my-sveltekit-project/
├── src/
│   ├── routes/
│   │   ├── index.svelte
│   │   └── about.svelte
│   ├── lib/
│   │   ├── api.js
│   │   └── utils.js
│   ├── components/
│   │   ├── Button.svelte
│   │   └── Card.svelte
│   ├── app.html
│   └── app.js
├── static/
│   ├── img/
│   ├── css/
│   └── js/
├── package.json
├── README.md
├── .gitignore
└── node_modules/
```

Let's break down the structure and its contents:

-   `src/`: This directory contains all the source code of your SvelteKit project.
    
    -   `routes/`: This directory contains all the routes of your application. Each `.svelte` file in this directory will automatically become a page in your app.
        
    -   `lib/`: This directory contains any reusable utility functions, constants, or API integrations.
        
    -   `components/`: This directory contains all the reusable components that are used in your pages.
        
    -   `app.html`: This file contains the HTML structure of your app, and any meta tags, scripts, or links you want to include in the head of your page.
        
    -   `app.js`: This file contains the initialization code for your SvelteKit app.
        
-   `static/`: This directory contains all the static assets like images, CSS, and JavaScript files that need to be served as-is.
    
-   `package.json`: This file contains all the dependencies, scripts, and metadata of your project.
    
-   `README.md`: This file contains the documentation of your project.
    
-   `.gitignore`: This file specifies the files and directories that should be ignored by Git.
    
-   `node_modules/`: This directory contains all the installed dependencies of your project.
    


## Server and client

A SvelteKit app can be thought of as two distinct entities working in tandem - the *server* and the *client*.

SvelteKit makes  the two communicate with each other seamlessly. On the initial page load, the server renders the HTML, meaning the content is visible as quickly as possible. The client then takes over in a process called `hydration`, so that subsequent naviagtions happen without full page reloads. It will request additonal code and data from the server as needed.