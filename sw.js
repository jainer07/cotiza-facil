const CACHE_NAME = 'cotiza-facil-v1';

// Instalar SW y cachear recursos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return fetch('/cotiza-facil/manifest.json')
                .then(res => res.json())
                .then(() => {
                    return cache.addAll([
                        '/cotiza-facil/',
                        '/cotiza-facil/index.html'
                    ]);
                });
        })
    );
});

// Servir desde cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Actualizar caché
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            );
        })
    );
});
