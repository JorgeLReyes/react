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
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css",
  ]);
});

const urls = [
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css",
  "http://localhost:3001/api/events",
  "http://localhost:3001/api/auth/renew",
];
self.addEventListener("fetch", (event) => {
  if (!urls.includes(event.request.url)) return;

  const resp = fetch(event.request)
    .then((response) => {
      if (!response) return caches.match(event.request);

      caches.open("cache-dynamic").then((cache) => {
        cache.put(event.request, response);
      });
      return response.clone();
    })
    .catch(() => {
      return caches.match(event.request);
    });

  event.respondWith(resp as Response | PromiseLike<Response>);
});
