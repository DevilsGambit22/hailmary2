const CACHE="acfa-v3-5-podium";
const STATIC=["./","index.html","manifest.json","assets/icons/logo.svg",
"assets/images/acfa-emblem.png","assets/images/lady-justice.png",
"assets/images/new-members-board.png","assets/images/titled-players-board.png","assets/images/acfa-champions-podium.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(u.pathname.includes("/generated/")||u.pathname.includes("/data/")){
   e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));
   return;
 }
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});