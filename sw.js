const CACHE_NAME = 'remplakine-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

// Installation du Service Worker et mise en cache des fichiers
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Fichiers mis en cache avec succès');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interception des requêtes pour faire fonctionner l'app hors ligne
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // On retourne le fichier en cache s'il existe, sinon on va le chercher sur le réseau
                return response || fetch(event.request);
            })
    );
});