self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.pathname.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          if (response.status >= 400) {
            const newHeaders = new Headers();
            for (const [key, val] of response.headers.entries()) {
              newHeaders.set(key, val);
            }
            newHeaders.set('X-Mock-Status', response.status.toString());
            newHeaders.set('X-Mock-Status-Text', response.statusText);

            const exposeHeaders = newHeaders.get('Access-Control-Expose-Headers');
            if (exposeHeaders) {
              if (!exposeHeaders.includes('X-Mock-Status')) {
                newHeaders.set('Access-Control-Expose-Headers', `${exposeHeaders}, X-Mock-Status, X-Mock-Status-Text`);
              }
            } else {
              newHeaders.set('Access-Control-Expose-Headers', 'X-Mock-Status, X-Mock-Status-Text');
            }

            const body = await response.blob();
            return new Response(body, {
              status: 200,
              statusText: 'OK',
              headers: newHeaders
            });
          }
          return response;
        })
        .catch((err) => {
          const errorHeaders = new Headers({
            'Content-Type': 'application/json',
            'X-Mock-Status': '503',
            'X-Mock-Status-Text': 'Network Error',
            'Access-Control-Expose-Headers': 'X-Mock-Status, X-Mock-Status-Text'
          });
          return new Response(JSON.stringify({ error: err.message }), {
            status: 200,
            statusText: 'OK',
            headers: errorHeaders
          });
        })
    );
  }
});
