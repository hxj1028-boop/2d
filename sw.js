const CACHE_NAME = 'ly-game-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    'https://raw.githubusercontent.com/hxj1028-boop/2d/main/image-removebg-preview%20(1).png',
    'https://raw.githubusercontent.com/hxj1028-boop/2d/main/image-removebg-preview.png'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('快取已開啟');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// 攔截網路請求，優先從快取讀取
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 如果快取裡有，就回傳快取的檔案；否則透過網路去抓
                return response || fetch(event.request);
            })
    );
});
