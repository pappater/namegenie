
import './style.css';

// Load adjectives and nouns from JSON files
let adjectives = [];
let nouns = [];

// Fetch word lists (works in Vite dev/prod)
async function loadWordLists() {
  const adjRes = await fetch('adjectives.json');
  const nounRes = await fetch('nouns.json');
  const adjData = await adjRes.json();
  const nounData = await nounRes.json();
  adjectives = adjData.adjs;
  nouns = nounData.nouns;
}

const tlds = [
  '.com', '.net', '.org', '.io', '.co', '.app', '.dev', '.tech',
  '.online', '.site', '.website', '.store', '.shop', '.cloud',
  '.digital', '.solutions', '.services', '.agency', '.studio', '.works'
];

// Generate fun Codespaces-style name
function generateFunName() {
  if (!adjectives.length || !nouns.length) return 'Loading...';
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj.toLowerCase()}-${noun.toLowerCase()}`;
}

// Generate random domain name (old style)
function generateDomain() {
  const funName = generateFunName();
  const tld = tlds[Math.floor(Math.random() * tlds.length)];
  return `${funName.replace(/\s+/g, '-')}${tld}`;
}


// Setup the UI after loading word lists
async function setup() {
  // Add toast container
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = 'position:fixed;left:50%;bottom:2em;transform:translateX(-50%);background:var(--color-domain-generated-bg);color:var(--color-domain-generated);padding:0.7em 1.2em;border-radius:8px;font-size:1em;box-shadow:0 2px 8px rgba(0,0,0,0.08);opacity:0;pointer-events:none;z-index:9999;transition:opacity 0.3s;';
  document.body.appendChild(toast);

  function showToast(msg) {
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 1500);
  }
  await loadWordLists();
  document.querySelector('#app').innerHTML = `
    <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 0.5em;">
      <button id="theme-toggle" aria-label="Toggle light/dark mode" style="background: none; border: none; cursor: pointer; font-size: 1.3em; padding: 0.2em 0.5em;">
        <span id="theme-icon">🌙</span>
      </button>
    </div>
    <h1 id="main-title">Domain Name Generator</h1>
    <p class="description">Generate a fun, memorable domain name.</p>
    <form id="options-form" style="margin-bottom:1em;display:flex;flex-wrap:wrap;gap:0.7em;justify-content:center;align-items:center;">
      <label for="num-names" style="font-size:1em;">How many?</label>
      <input id="num-names" name="num-names" type="number" min="1" max="10" value="1" aria-label="Number of names to generate" style="width:3em;" />
      <label for="tld-select" style="font-size:1em;">TLD:</label>
      <select id="tld-select" name="tld-select" aria-label="Choose TLD">
        <option value="">Any</option>
        ${tlds.map(tld => `<option value="${tld}">${tld}</option>`).join('')}
      </select>
    </form>
    <div class="domain-display" aria-live="polite">
      <div id="domain" class="domain" tabindex="0">Click Generate to start</div>
    </div>
    <div class="card">
      <button id="generate-btn" type="button" aria-label="Generate domain names">Generate</button>
      <button id="copy-btn" type="button" style="display: none;" aria-label="Copy domain names">Copy</button>
    </div>
    <footer class="footer">
      <p>
        <strong>NameGenie</strong> helps you generate creative, memorable, and fun domain names using open datasets.<br>
        Inspired by Codespaces/Heroku-style names. Built with Vite, deployed on GitHub Pages.<br>
        Word lists sourced from <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>
        Main site: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>
      </p>
    </footer>
    <style>
      @keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
    </style>
  `;
  // Theme toggle logic
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  function setTheme(mode) {
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }
  // Initial theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) setTheme(savedTheme);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  else setTheme('light');
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });


  const domainDisplay = document.querySelector('#domain');
  const generateBtn = document.querySelector('#generate-btn');
  const copyBtn = document.querySelector('#copy-btn');
  const numNamesInput = document.getElementById('num-names');
  const tldSelect = document.getElementById('tld-select');

  let currentDomains = [];
  let selectedDomainIdx = 0;

  function generateDomainCustom(tldOverride) {
    const funName = generateFunName();
    const tld = tldOverride || tlds[Math.floor(Math.random() * tlds.length)];
    return `${funName.replace(/\s+/g, '-')}${tld}`;
  }

  function renderDomains() {
    domainDisplay.innerHTML = currentDomains.map((d, i) =>
      `<span class="domain-item${i === selectedDomainIdx ? ' selected' : ''}" tabindex="0" data-idx="${i}" aria-label="Domain ${i+1}: ${d}">${d}</span>`
    ).join('<br>');
    domainDisplay.classList.add('generated');
    copyBtn.style.display = 'inline-block';
    // Info for selection if more than one
    let info = document.getElementById('select-info');
    if (currentDomains.length > 1) {
      if (!info) {
        info = document.createElement('div');
        info.id = 'select-info';
        info.style.cssText = 'font-size:0.95em;color:var(--color-description);margin:0.5em 0;';
        domainDisplay.parentElement.insertBefore(info, domainDisplay.nextSibling);
      }
      info.textContent = 'Select a domain to copy.';
    } else if (info) {
      info.remove();
    }
  }

  domainDisplay.addEventListener('click', (e) => {
    if (e.target.classList.contains('domain-item')) {
      selectedDomainIdx = Number(e.target.getAttribute('data-idx'));
      renderDomains();
    }
  });
  domainDisplay.addEventListener('keydown', (e) => {
    if (!currentDomains.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      selectedDomainIdx = (selectedDomainIdx + 1) % currentDomains.length;
      renderDomains();
      e.preventDefault();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      selectedDomainIdx = (selectedDomainIdx - 1 + currentDomains.length) % currentDomains.length;
      renderDomains();
      e.preventDefault();
    }
  });

  generateBtn.addEventListener('click', () => {
    const num = Math.max(1, Math.min(10, parseInt(numNamesInput.value) || 1));
    const tldOverride = tldSelect.value || null;
    currentDomains = Array.from({length: num}, () => generateDomainCustom(tldOverride));
    selectedDomainIdx = 0;
    renderDomains();
    domainDisplay.focus();
  });

  copyBtn.addEventListener('click', async () => {
    if (!currentDomains.length) return;
    let textToCopy = currentDomains[selectedDomainIdx] || currentDomains[0];
    if (currentDomains.length > 1 && (selectedDomainIdx === undefined || selectedDomainIdx === null)) {
      showToast('Select a domain to copy!');
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('Copied to clipboard!');
    } catch (err) {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('Copied to clipboard!');
    }
  });
}

setup();
