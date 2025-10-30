const CACHE_NAME = 'kartu-bayi-cache-v1';
const urlsToCache = [
    '/index.html',
    'https://cdn.tailwindcss.com'
    // Aset lain yang perlu di-cache bisa ditambahkan di sini
];

// Event install: cache file-file utama
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache dibuka');
                return cache.addAll(urlsToCache);
            })
    );
});

// Event fetch: sajikan file dari cache jika ada, jika tidak, ambil dari network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Jika ada di cache, kembalikan dari cache
                if (response) {
                    return response;
                }
                
                // Jika tidak ada di cache, fetch dari network
                return fetch(event.request);
            })
    );
});