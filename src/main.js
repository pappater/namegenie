import './style.css'

// Domain name parts
const prefixes = [
  'super', 'mega', 'ultra', 'pro', 'quick', 'smart', 'fast', 'easy',
  'best', 'top', 'cool', 'fun', 'happy', 'bright', 'fresh', 'prime',
  'max', 'next', 'blue', 'green', 'red', 'alpha', 'beta', 'new',
  'star', 'cloud', 'digital', 'cyber', 'net', 'web', 'tech', 'data'
];

const words = [
  'hub', 'zone', 'spot', 'place', 'space', 'point', 'base', 'site',
  'link', 'net', 'web', 'box', 'lab', 'studio', 'works', 'systems',
  'solutions', 'services', 'group', 'team', 'corp', 'company', 'ventures',
  'media', 'digital', 'tech', 'soft', 'ware', 'cloud', 'data', 'mind'
];

const tlds = [
  '.com', '.net', '.org', '.io', '.co', '.app', '.dev', '.tech',
  '.online', '.site', '.website', '.store', '.shop', '.cloud',
  '.digital', '.solutions', '.services', '.agency', '.studio', '.works'
];

// Generate random domain name
function generateDomain() {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const word = words[Math.floor(Math.random() * words.length)];
  const tld = tlds[Math.floor(Math.random() * tlds.length)];
  
  return `${prefix}${word}${tld}`;
}

// Setup the UI
document.querySelector('#app').innerHTML = `
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
