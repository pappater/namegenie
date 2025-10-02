
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
    // Add animation
    domainDisplay.style.animation = 'none';
    setTimeout(() => {
      domainDisplay.style.animation = 'slideIn 0.5s ease-out';
    }, 10);
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(currentDomain);
      copyBtn.textContent = 'Copied! ✓';
      setTimeout(() => {
        copyBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentDomain;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copyBtn.textContent = 'Copied! ✓';
      setTimeout(() => {
        copyBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    }
  });
}

setup();
