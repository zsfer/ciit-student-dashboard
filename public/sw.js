if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/455-5857f478d2d3c844.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/488-0e640bc1ba1db924.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/4bd1b696-70fca2bd404470b2.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/745-2597ae7cb36d96e9.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/871-914893888d940721.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/970-665a4425e959daf8.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/977-14dc9026d5553f21.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/989-9fc10e675bdfa7ed.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/app/(app)/carehub/layout-86534c9113b28ade.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/app/(app)/carehub/page-bb4476013adf03e4.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/app/(app)/clinic/consult/page-0e3a51255c45747a.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/app/(app)/layout-a3715c2aff30d1a7.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/app/(app)/page-3cec302370822f02.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/app/(app)/profile/page-dbf299b1c3adce29.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/app/(app)/student-corner/page-2b04cd4006e0fdc2.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/app/(app)/student-services/orgs/page-231e91f75c64f4e1.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/app/_not-found/page-0af412b492934b6d.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/app/layout-64af6b571a2d48d8.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/framework-0d635b52335dc518.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/main-app-13a0f5f37f5db4fe.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/main-ca90754bdd578094.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/pages/_app-d23763e3e6c904ff.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-7510ab9a91ab24d6.js",revision:"he_qIKjJMK8Ns4TCaO9O4"},{url:"/_next/static/css/5404a2d4770102bd.css",revision:"5404a2d4770102bd"},{url:"/_next/static/he_qIKjJMK8Ns4TCaO9O4/_buildManifest.js",revision:"9420724c49c5e9ab3d63fa4cefd40c3d"},{url:"/_next/static/he_qIKjJMK8Ns4TCaO9O4/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/795741d9bfdeec5e-s.woff2",revision:"a2b108352bc7051cbaa740b317bfe220"},{url:"/_next/static/media/b0cd4c49b37239c4-s.p.woff2",revision:"980e2ce5c16b1f38c84bd6f3bcac4edd"},{url:"/_next/static/media/carehub-logo.37e8714a.png",revision:"061dd09c08360eb8084e981847374b73"},{url:"/_next/static/media/chill.bc98277f.webp",revision:"80e038b0dabcef1a2382aa6200bdc64f"},{url:"/_next/static/media/ciit-logo.4ba6604c.png",revision:"86a30ba80a9aeb2ea9763210765fb8b3"},{url:"/bg-carehub.png",revision:"ff23e223a4242e693fd69bf056eeb454"},{url:"/carehub-logo.png",revision:"061dd09c08360eb8084e981847374b73"},{url:"/chill.webp",revision:"80e038b0dabcef1a2382aa6200bdc64f"},{url:"/ciit-logo.png",revision:"86a30ba80a9aeb2ea9763210765fb8b3"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon-384x384.png",revision:"0779990101300e80c756704ec698e5fa"},{url:"/icon-512x512.png",revision:"8b1fdca1b53397d2bd896e4d36b95134"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.sameOrigin,a=e.url.pathname;return!(!s||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,a=e.url.pathname,n=e.sameOrigin;return"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&n&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,a=e.url.pathname,n=e.sameOrigin;return"1"===s.headers.get("RSC")&&n&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.url.pathname;return e.sameOrigin&&!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
