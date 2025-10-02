
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
  await loadWordLists();
  document.querySelector('#app').innerHTML = `
    <h1>Domain Name Generator</h1>
    <p class="description">Generate a fun, memorable domain name.</p>
    <div class="domain-display">
      <div id="domain" class="domain">Click Generate to start</div>
    </div>
    <div class="card">
      <button id="generate-btn" type="button">Generate</button>
      <button id="copy-btn" type="button" style="display: none;">Copy</button>
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


  const domainDisplay = document.querySelector('#domain');
  const generateBtn = document.querySelector('#generate-btn');
  const copyBtn = document.querySelector('#copy-btn');

  let currentDomain = '';

  generateBtn.addEventListener('click', () => {
    currentDomain = generateDomain();
    domainDisplay.textContent = currentDomain;
    domainDisplay.classList.add('generated');
    copyBtn.style.display = 'inline-block';
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(currentDomain);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 1500);
    } catch (err) {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = currentDomain;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 1500);
    }
  });
}

setup();
