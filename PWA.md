# PWA - Progressive Web Application

- Accesos a la aplicación sin conexion
- Creación de base de datos local
- Push notifications
- Uso de recursos nativos como la cámara y GPS
- Sincronización en segundo plano
- Entre otras cosas

`Service Worker`

- Intercepta peticiones
- Esta pendiente de notificaciones push
- Corre segundo plano
- Maneja caché
- Servido en protocolo HTTPS (Funciona localmente solo con npm - sin yarn)

`Dependencias instaladas`

`npm install -D vite-plugin-pwa`

`npm i -D workbox-core workbox-routing workbox-strategies workbox-build`

`Archivo vite.config.ts`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
        suppressWarnings: true,
      },
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
    }),
  ],
  // preview: {
  //   port: 5173,
  // },
});
```

`Archivo src/sw.js`

```js
/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";

import { clientsClaim } from "workbox-core";

import { NavigationRoute, registerRoute } from "workbox-routing";

cleanupOutdatedCaches();

// self.__WB_MANIFEST is default injection point

precacheAndRoute(self.__WB_MANIFEST);

// to allow work offline

registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), {
    denylist: [/^\/backoffice/],
  })
);

self.skipWaiting();

clientsClaim();

self.addEventListener("install", async () => {
  const cache = await caches.open("cache-1");

  await cache.addAll([
    //aca lo que se quiere llevar al cache
  ]);
});
```

## Ciclo de vida

- Cuando se recibe el request (app) se hace el proceso de instalación (descarga del service worker) donde se pueden hacer descargas e instalaciones en el cache y pasa a la activación.
- Se definen eventos para saber que hará cuando pase por dicho evento

### Events

```javascript
self.addEventListener("event", async (event) => {
  const cache = await caches.open("cache-1");

  await cache.addAll([
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css",
  ]);
});
```

### CacheOnly

Ya no volver a solicitar ese recurso a menos que haya realmente un cambio

### Network first with cache fallback

Primero se pide el recurso al servidor, si no esta, se retornará el cache

## WORKBOX

`npm i -g workbox-cli`

`workbox wizard` para generar el workbox-config

> si se usa type module la extension del workbox-config debe ser cjs

`workbox generateSW workbox-config.cjs` para generar el service worker y spñp sirve para comandos entendidos por el sw

Debemos hacer una configuracion manual para que se instale el sw

Lo siguiente se agrega en una etiqueta script del html principal para instalar el sw

```js
const isProduction = "%MODE%" === "production";
if (isProduction && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

### Configurar SW con Wordbox

Construiremos un archivo para que lo tome wordbox

```js
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);
```

Ahora antes de proseguir, al workbox-config debemos agregar la propiedad `  swSrc:"src/sw-template.cjs"` que le indica el archivo que tomará para hacer el sw, el comando que se usara es:

`workbox injectManifest [path]` para generar el service worker con la configuracion que notros deseamos

```js
module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{css,js,html}"],
  swDest: "dist/sw.js",
  // ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swSrc: "src/sw-template.cjs", // generateSW no funciona con esta propiedad
};
```

## Base de datos Offline

backgroundSync es un plugin que permite almacenar datos como una BD que tendra un limite de tiempo indicado por uno mismo. Debemos crear el plugin y luego mandarlo.

```js
workbox.loadModule("workbox-background-sync");
const { NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const bgSyncPlugin = new BackgroundSyncPlugin("posteos-offline", {
  maxRetentionTime: 24 * 60,
});

registerRoute(
  new RegExp("http://localhost:3001/api/events"),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);
```
