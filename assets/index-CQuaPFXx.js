(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=[];async function n(){let n=await fetch(`adjectives.json`),r=await fetch(`nouns.json`),i=await n.json(),a=await r.json();e=i.adjs,t=a.nouns}var r=[`.com`,`.net`,`.org`,`.io`,`.co`,`.app`,`.dev`,`.tech`,`.online`,`.site`,`.website`,`.store`,`.shop`,`.cloud`,`.digital`,`.solutions`,`.services`,`.agency`,`.studio`,`.works`];function i(){if(!e.length||!t.length)return`Loading...`;let n=e[Math.floor(Math.random()*e.length)],r=t[Math.floor(Math.random()*t.length)];return`${n.toLowerCase()}-${r.toLowerCase()}`}function a(){let e=i(),t=r[Math.floor(Math.random()*r.length)];return`${e.replace(/\s+/g,`-`)}${t}`}async function o(){await n(),document.querySelector(`#app`).innerHTML=`
    <div>
      <h1>🌐 Fun Domain Name Generator</h1>
      <p class="description">Click the button to generate a fun, memorable domain name!</p>
      <div class="domain-display">
        <div id="domain" class="domain">Click "Generate" to start</div>
      </div>
      <div class="card">
        <button id="generate-btn" type="button">Generate Domain</button>
        <button id="copy-btn" type="button" style="display: none;">Copy to Clipboard</button>
      </div>
      <div class="features">
        <h3>Features:</h3>
        <ul>
          <li>✨ Generates fun, Codespaces-style names</li>
          <li>🎲 Random combinations every time</li>
          <li>📋 Copy to clipboard with one click</li>
          <li>🚀 Powered by Vite</li>
          <li>🌍 Uses open GitHub datasets</li>
        </ul>
      </div>
    </div>
  `;let e=document.querySelector(`#domain`),t=document.querySelector(`#generate-btn`),r=document.querySelector(`#copy-btn`),i=``;t.addEventListener(`click`,()=>{i=a(),e.textContent=i,e.classList.add(`generated`),r.style.display=`inline-block`,e.style.animation=`none`,setTimeout(()=>{e.style.animation=`slideIn 0.5s ease-out`},10)}),r.addEventListener(`click`,async()=>{try{await navigator.clipboard.writeText(i),r.textContent=`Copied! ✓`,setTimeout(()=>{r.textContent=`Copy to Clipboard`},2e3)}catch(e){console.error(`Failed to copy:`,e);let t=document.createElement(`textarea`);t.value=i,document.body.appendChild(t),t.select(),document.execCommand(`copy`),document.body.removeChild(t),r.textContent=`Copied! ✓`,setTimeout(()=>{r.textContent=`Copy to Clipboard`},2e3)}})}o();