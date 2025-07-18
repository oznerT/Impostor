const CACHE_NAME = "impostor-pro-v2.0.0"
const urlsToCache = [
  "/",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/sounds/start.wav",
  "/sounds/end.wav",
  "/sounds/beep.wav",
  "/favicon.ico",
]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
  self.skipWaiting()
})

// Fetch event - Cache first for static assets, network first for API
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Cache first for static assets
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image" ||
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.includes("/icon-") ||
    url.pathname === "/favicon.ico"
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request).then((fetchResponse) => {
            const responseClone = fetchResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
            return fetchResponse
          })
        )
      }),
    )
    return
  }

  // Network first for everything else
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request)
    }),
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})
