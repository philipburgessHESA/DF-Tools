import {
    cleanupOutdatedCaches,
    createHandlerBoundToURL,
    precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { PrecacheEntry } from "workbox-precaching";

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is default injection point
declare interface ServiceWorkerGlobalScope {
    skipWaiting(): Promise<void>;
    __WB_MANIFEST: (string | PrecacheEntry)[];
}

precacheAndRoute(self.__WB_MANIFEST || []);

// clean old assets
cleanupOutdatedCaches();

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) allowlist = [/^\/$/];

// to allow work offline
registerRoute(
    new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

self.skipWaiting();
clientsClaim();
