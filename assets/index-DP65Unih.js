(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`super.mega.ultra.pro.quick.smart.fast.easy.best.top.cool.fun.happy.bright.fresh.prime.max.next.blue.green.red.alpha.beta.new.star.cloud.digital.cyber.net.web.tech.data`.split(`.`),t=`hub.zone.spot.place.space.point.base.site.link.net.web.box.lab.studio.works.systems.solutions.services.group.team.corp.company.ventures.media.digital.tech.soft.ware.cloud.data.mind`.split(`.`),n=[`.com`,`.net`,`.org`,`.io`,`.co`,`.app`,`.dev`,`.tech`,`.online`,`.site`,`.website`,`.store`,`.shop`,`.cloud`,`.digital`,`.solutions`,`.services`,`.agency`,`.studio`,`.works`];function r(){let r=e[Math.floor(Math.random()*e.length)],i=t[Math.floor(Math.random()*t.length)],a=n[Math.floor(Math.random()*n.length)];return`${r}${i}${a}`}document.querySelector(`#app`).innerHTML=`
  <div>
    <h1>🌐 Random Domain Name Generator</h1>
    <p class="description">Click the button to generate a random domain name!</p>
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
        <li>✨ Generates creative domain names</li>
        <li>🎲 Random combinations every time</li>
        <li>📋 Copy to clipboard with one click</li>
        <li>🚀 Powered by Vite</li>
      </ul>
    </div>
  </div>
`;var i=document.querySelector(`#domain`),a=document.querySelector(`#generate-btn`),o=document.querySelector(`#copy-btn`),s=``;a.addEventListener(`click`,()=>{s=r(),i.textContent=s,i.classList.add(`generated`),o.style.display=`inline-block`,i.style.animation=`none`,setTimeout(()=>{i.style.animation=`slideIn 0.5s ease-out`},10)}),o.addEventListener(`click`,async()=>{try{await navigator.clipboard.writeText(s),o.textContent=`Copied! ✓`,setTimeout(()=>{o.textContent=`Copy to Clipboard`},2e3)}catch(e){console.error(`Failed to copy:`,e);let t=document.createElement(`textarea`);t.value=s,document.body.appendChild(t),t.select(),document.execCommand(`copy`),document.body.removeChild(t),o.textContent=`Copied! ✓`,setTimeout(()=>{o.textContent=`Copy to Clipboard`},2e3)}});