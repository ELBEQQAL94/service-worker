const cacheName = 'v2';

const assets = ['index.html'];

// call install event
self.addEventListener('install', (e) => {
  console.log('Service Worker Installed');

  /* e.waitUntil(
      caches
      .open(cacheName)
      .then(cache => {
         console.log('Service Worker: caching files..');
         cache.addAll(assets)
      })
      .then(() => self.skipWaiting())
  ) */
});

// call activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker Activated');
    e.waitUntil(
        caches
        .keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: delete old caching...');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});


// fetch event
/* self.addEventListener('fetch', e => {
    console.log('Service Working: fetching..');
    e.respondWith(
    fetch(e.request)
    .catch(() => caches.match(e.request))
    );
}); */

// call fetch event (register all web site)
// before that remove all install caches
self.addEventListener('fetch', e => {
    console.log('Service Worker: fetching...');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const resClone = res.clone();
            caches
            .open(cacheName)
            .then(cache => {
                cache.put(e.request, resClone)
            });
            return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
})