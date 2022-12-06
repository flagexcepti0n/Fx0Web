# FlagExcept0n Website

This is the source code for the FlagExcept0n website. It is built using [Vuejs](https://vuejs.org/) and [Vite](https://vitejs.dev/).

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tailwind](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Jetbrains IDEs](https://www.jetbrains.com/) + [Vue.js](https://plugins.jetbrains.com/plugin/16456-vue-js) + [Tailwind CSS](https://plugins.jetbrains.com/plugin/15321-tailwind-css)

## Development

To run the website locally, run the following commands:

```bash
npm install
npm run dev
```

## Deployment

### Building manually
To deploy the website, run the following commands:

```bash
npm install
npm run build
```

The website will be built into the `dist` directory. You can then deploy the contents of this directory to your web server.

### Using docker
To deploy the website using docker, run the following commands depending on weather you rather usr docker hub or ghcr.io:

```bash
docker pull ghcr.io/flagexcepti0n/fx0web:main
docker run -d -p 80:80 ghcr.io/flagexcepti0n/fx0web:main
```

```bash
docker pull flagexcept0n/fx0web:main
docker run -d -p 80:80 flagexcept0n/fx0web:main
```