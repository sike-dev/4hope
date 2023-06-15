'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"version.json": "e99c2dcac90f2c1b2f9f5c802fce2712",
"favicon.ico": "bcd78515c1fa17cbdc87e21080441e75",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"assets/FontManifest.json": "87e04ddd47dc3c85e29dd1916b289700",
"assets/NOTICES": "1320e4cbf36a0bf26b63dd1f95d1fbb4",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.json": "081d0cf26acffb30c345a5f00312305d",
"assets/fonts/MaterialIcons-Regular.otf": "91ac61679f894675fbf65d4cede826a4",
"assets/assets/fonts/roboto/Roboto-Italic.ttf": "465d1affcd03e9c6096f3313a47e0bf5",
"assets/assets/fonts/roboto/Roboto-Bold.ttf": "9ece5b48963bbc96309220952cda38aa",
"assets/assets/fonts/roboto/Roboto-BlackItalic.ttf": "c470ca2b5b4f4437a3fe71b113a289a2",
"assets/assets/fonts/roboto/Roboto-Regular.ttf": "f36638c2135b71e5a623dca52b611173",
"assets/assets/fonts/roboto/Roboto-Medium.ttf": "b2d307df606f23cb14e6483039e2b7fa",
"assets/assets/fonts/roboto/Roboto-BoldItalic.ttf": "0be9fa8f2863998d1e52c84165976880",
"assets/assets/fonts/roboto/Roboto-MediumItalic.ttf": "cabdb4a12e5de710afde298809306937",
"assets/assets/fonts/roboto/Roboto-Thin.ttf": "4f0b85f5b601a405bdc7b23aad6d2a47",
"assets/assets/fonts/roboto/Roboto-ThinItalic.ttf": "7384da64612787e3662872e9d19cbc2d",
"assets/assets/fonts/roboto/Roboto-Black.ttf": "301fe70f8f0f41c236317504ec05f820",
"assets/assets/fonts/roboto/Roboto-LightItalic.ttf": "2ffc058ddedacfeaa23542026c8108e2",
"assets/assets/fonts/roboto/Roboto-Light.ttf": "6090d256d88dcd7f0244eaa4a3eafbba",
"assets/assets/images/inFull.png": "0bcf8dc9e31ddc85ec42ca6a869ed58c",
"assets/assets/images/exampleimage.png": "f6231470b26569c3bac1d812a2046e68",
"assets/assets/images/in.png": "cdb6891c8d090911e6545b28997ce763",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b1bce415bb87160712ffa62fd61ffddd",
"assets/packages/flutterfire_ui/assets/countries.json": "8c937aac9f3b69162be779fbcd6199d2",
"assets/packages/flutterfire_ui/assets/fonts/SocialIcons.ttf": "c6d1e3f66e3ca5b37c7578e6f80f37d8",
"assets/packages/flutterfire_ui/assets/icons/google.svg": "3b5ceaea5e2391782d39df225a375d5d",
"assets/packages/flutterfire_ui/assets/icons/facebook.svg": "5fad3daafe7c7c5163fca56662d2738a",
"assets/packages/flutterfire_ui/assets/icons/apple_dark.svg": "1b587ffd7d75c462847f8137a93f3161",
"assets/packages/flutterfire_ui/assets/icons/twitter.svg": "6086e2aad26effea1344c8e118520e32",
"assets/packages/flutterfire_ui/assets/icons/apple_light.svg": "2508cc7c5d302fd37edff1b87fedb594",
"assets/AssetManifest.smcbin": "ac152258f238ca2283fbef145da184b1",
"favicon.png": "19bd9258ae8be87fd58c4eac4fd1d708",
"canvaskit/canvaskit.js": "59ed8478b398a8966eee147930f3d966",
"canvaskit/canvaskit.wasm": "641ba6d615314c42874bf914ef2d093e",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/chromium/canvaskit.js": "853c6cebea386c05aa9d954f11b2c1ca",
"canvaskit/chromium/canvaskit.wasm": "ffc522e9ff0a7bbe6bfd2a6f54f974e4",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"canvaskit/skwasm.wasm": "0d7c2e198fc5420d3940de2d44c19023",
"manifest.json": "4e2f1dcaf3475ba11790d39e4bd41145",
"main.dart.js": "e4700fc249e53a28cc50e898262e78a0",
"index.html": "c06ebc56e1ee7ab650380c116d689475",
"/": "c06ebc56e1ee7ab650380c116d689475"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
