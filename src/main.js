
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
  // History and favorites state
  let history = JSON.parse(localStorage.getItem('ng-history') || '[]');
  let favorites = JSON.parse(localStorage.getItem('ng-favorites') || '[]');

  function saveHistory() {
    localStorage.setItem('ng-history', JSON.stringify(history.slice(-20)));
  }
  function saveFavorites() {
    localStorage.setItem('ng-favorites', JSON.stringify(favorites));
  }

  function renderHistory() {
    let histDiv = document.getElementById('history');
    if (!histDiv) {
      histDiv = document.createElement('div');
      histDiv.id = 'history';
      histDiv.setAttribute('aria-label', 'History and Favorites');
      histDiv.style.marginTop = '2em';
      document.getElementById('app').appendChild(histDiv);
    }
    let favSet = new Set(favorites);
    histDiv.innerHTML = `<h2 style="font-size:1.1em;margin-bottom:0.5em;">History</h2>` +
      (history.length ?
        `<ul style="list-style:none;padding:0;">` +
        history.slice(-20).reverse().map(domain =>
          `<li style="margin-bottom:0.3em;display:flex;align-items:center;gap:0.5em;">
            <span>${domain}</span>
            <button class="fav-btn" data-domain="${domain}" aria-label="${favSet.has(domain) ? 'Remove from favorites' : 'Add to favorites'}" style="background:none;border:none;cursor:pointer;font-size:1.2em;">${favSet.has(domain) ? '★' : '☆'}</button>
          </li>`
        ).join('') + `</ul>`
        : '<div style="color:var(--color-description);">No history yet.</div>') +
      `<h2 style="font-size:1.1em;margin:1em 0 0.5em 0;">Favorites</h2>` +
      (favorites.length ?
        `<ul style="list-style:none;padding:0;">` +
        favorites.slice().reverse().map(domain =>
          `<li style="margin-bottom:0.3em;display:flex;align-items:center;gap:0.5em;">
            <span>${domain}</span>
            <button class="fav-btn" data-domain="${domain}" aria-label="Remove from favorites" style="background:none;border:none;cursor:pointer;font-size:1.2em;">★</button>
          </li>`
        ).join('') + `</ul>`
        : '<div style="color:var(--color-description);">No favorites yet.</div>');
    // Add event listeners for fav buttons
    histDiv.querySelectorAll('.fav-btn').forEach(btn => {
      btn.onclick = () => {
        const domain = btn.getAttribute('data-domain');
        if (favorites.includes(domain)) {
          favorites = favorites.filter(f => f !== domain);
        } else {
          favorites.push(domain);
        }
        saveFavorites();
        renderHistory();
      };
    });
  }
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
  // Localization strings
  const locales = {
    en: {
      title: 'Domain Name Generator',
      desc: 'Generate a fun, memorable domain name.',
      howMany: 'How many?',
      tld: 'TLD:',
      any: 'Any',
      generate: 'Generate',
      copy: 'Copy',
      clickToStart: 'Click Generate to start',
      selectToCopy: 'Select a domain to copy or favorite.',
      history: 'History',
      noHistory: 'No history yet.',
      favorites: 'Favorites',
      noFavorites: 'No favorites yet.',
      helps: '<strong>NameGenie</strong> helps you generate creative, memorable, and fun domain names using open datasets.<br>Inspired by Codespaces/Heroku-style names. Built with Vite, deployed on GitHub Pages.<br>Word lists sourced from <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>Main site: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>'
    },
    ta: {
      title: 'டொமைன் பெயர் உருவாக்கி',
      desc: 'விளையாட்டு, நினைவில் நிற்கும் டொமைன் பெயரை உருவாக்குங்கள்.',
      howMany: 'எத்தனை?',
      tld: 'TLD:',
      any: 'எதுவும்',
      generate: 'உருவாக்கு',
      copy: 'நகலெடு',
      clickToStart: 'உருவாக்கு என்பதை கிளிக் செய்யவும்',
      selectToCopy: 'நகலெடுக்க ஒரு டொமைனை தேர்வு செய்யவும்.',
      history: 'வரலாறு',
      noHistory: 'வரலாறு இல்லை.',
      favorites: 'பிடித்தவை',
      noFavorites: 'பிடித்தவை இல்லை.',
      helps: '<strong>NameGenie</strong> திறமையான, நினைவில் நிற்கும், விளையாட்டு டொமைன் பெயர்களை உருவாக்க உதவுகிறது.<br>Codespaces/Heroku-வின் பெயர்களால் ஈர்க்கப்பட்டது. Vite மூலம் உருவாக்கப்பட்டது, GitHub Pages-இல் வெளியிடப்பட்டது.<br>வார்த்தை பட்டியல்கள் <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>முக்கிய தளம்: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>'
    },
    hi: { title: 'डोमेन नाम जनरेटर', desc: 'मज़ेदार, यादगार डोमेन नाम बनाएं।', howMany: 'कितने?', tld: 'TLD:', any: 'कोई भी', generate: 'जनरेट करें', copy: 'कॉपी करें', clickToStart: 'शुरू करने के लिए जनरेट पर क्लिक करें', selectToCopy: 'कॉपी के लिए डोमेन चुनें।', history: 'इतिहास', noHistory: 'कोई इतिहास नहीं।', favorites: 'पसंदीदा', noFavorites: 'कोई पसंदीदा नहीं।', helps: '<strong>NameGenie</strong> आपको रचनात्मक, यादगार और मज़ेदार डोमेन नाम बनाने में मदद करता है।<br>Codespaces/Heroku-शैली के नामों से प्रेरित। Vite के साथ बनाया गया, GitHub Pages पर डिप्लॉय किया गया।<br>शब्द सूची <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>मुख्य साइट: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>' },
    te: { title: 'డొమెయిన్ పేరు జనరేటర్', desc: 'వినోదాత్మకమైన, గుర్తుండిపోయే డొమెయిన్ పేరును రూపొందించండి.', howMany: 'ఎన్ని?', tld: 'TLD:', any: 'ఏదైనా', generate: 'రూపొందించు', copy: 'కాపీ చేయి', clickToStart: 'ప్రారంభించడానికి రూపొందించు క్లిక్ చేయండి', selectToCopy: 'కాపీ చేయడానికి డొమెయిన్ ఎంచుకోండి.', history: 'చరిత్ర', noHistory: 'చరిత్ర లేదు.', favorites: 'ఇష్టమైనవి', noFavorites: 'ఇష్టమైనవి లేవు.', helps: '<strong>NameGenie</strong> మీకు సృజనాత్మకమైన, గుర్తుండిపోయే, వినోదాత్మకమైన డొమెయిన్ పేర్లను రూపొందించడంలో సహాయపడుతుంది.<br>Codespaces/Heroku-శైలిలో పేర్లతో ప్రేరణ పొందింది. Viteతో నిర్మించబడింది, GitHub Pagesలో డిప్లాయ్ చేయబడింది.<br>పదజాలం <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>ప్రధాన సైట్: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>' },
    kn: { title: 'ಡೊಮೇನ್ ಹೆಸರು ಜನರೇಟರ್', desc: 'ಮೋಜಿನ, ನೆನಪಿನಲ್ಲಿರುವ ಡೊಮೇನ್ ಹೆಸರನ್ನು ರಚಿಸಿ.', howMany: 'ಎಷ್ಟು?', tld: 'TLD:', any: 'ಯಾವುದೇ', generate: 'ರಚಿಸಿ', copy: 'ನಕಲು', clickToStart: 'ಪ್ರಾರಂಭಿಸಲು ರಚಿಸಿ ಕ್ಲಿಕ್ ಮಾಡಿ', selectToCopy: 'ನಕಲು ಮಾಡಲು ಡೊಮೇನ್ ಆಯ್ಕೆಮಾಡಿ.', history: 'ಇತಿಹಾಸ', noHistory: 'ಇತಿಹಾಸ ಇಲ್ಲ.', favorites: 'ಇಷ್ಟಗಳು', noFavorites: 'ಇಷ್ಟಗಳು ಇಲ್ಲ.', helps: '<strong>NameGenie</strong> ನಿಮಗೆ ಸೃಜನಾತ್ಮಕ, ನೆನಪಿನಲ್ಲಿರುವ, ಮೋಜಿನ ಡೊಮೇನ್ ಹೆಸರುಗಳನ್ನು ರಚಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.<br>Codespaces/Heroku ಶೈಲಿಯ ಹೆಸರಿನಿಂದ ಪ್ರೇರಿತವಾಗಿದೆ. Vite ಬಳಸಿ ನಿರ್ಮಿಸಲಾಗಿದೆ, GitHub Pages ನಲ್ಲಿ ಡಿಪ್ಲಾಯ್ ಮಾಡಲಾಗಿದೆ.<br>ಪದಗಳ ಪಟ್ಟಿ <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>ಮುಖ್ಯ ಸೈಟ್: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>' },
    ml: { title: 'ഡൊമെയ്ൻ പേര് ജനറേറ്റർ', desc: 'വിനോദകരമായ, ഓർമ്മയിൽ നിൽക്കുന്ന ഡൊമെയ്ൻ പേര് സൃഷ്ടിക്കുക.', howMany: 'എത്ര?', tld: 'TLD:', any: 'ഏതെങ്കിലും', generate: 'സൃഷ്ടിക്കുക', copy: 'പകർത്തുക', clickToStart: 'ആരംഭിക്കാൻ സൃഷ്ടിക്കുക ക്ലിക്ക് ചെയ്യുക', selectToCopy: 'പകർത്താൻ ഡൊമെയ്ൻ തിരഞ്ഞെടുക്കുക.', history: 'ചരിത്രം', noHistory: 'ചരിത്രം ഇല്ല.', favorites: 'പ്രിയപ്പെട്ടവ', noFavorites: 'പ്രിയപ്പെട്ടവ ഇല്ല.', helps: '<strong>NameGenie</strong> നിങ്ങൾക്ക് സൃഷ്ടിപരമായ, ഓർമ്മയിൽ നിൽക്കുന്ന, വിനോദകരമായ ഡൊമെയ്ൻ പേരുകൾ സൃഷ്ടിക്കാൻ സഹായിക്കുന്നു.<br>Codespaces/Heroku ശൈലിയിൽ നിന്നുള്ള പേരുകളിൽ നിന്ന് പ്രചോദനം ലഭിച്ചു. Vite ഉപയോഗിച്ച് നിർമ്മിച്ചു, GitHub Pages-ൽ വിന്യസിച്ചു.<br>വാക്കുകളുടെ പട്ടിക <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>പ്രധാന സൈറ്റ്: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>' },
    bn: { title: 'ডোমেইন নাম জেনারেটর', desc: 'মজার, স্মরণীয় ডোমেইন নাম তৈরি করুন।', howMany: 'কত?', tld: 'TLD:', any: 'যেকোনো', generate: 'তৈরি করুন', copy: 'কপি করুন', clickToStart: 'শুরু করতে তৈরি করুন ক্লিক করুন', selectToCopy: 'কপি করতে ডোমেইন নির্বাচন করুন।', history: 'ইতিহাস', noHistory: 'কোনো ইতিহাস নেই।', favorites: 'প্রিয়', noFavorites: 'কোনো প্রিয় নেই।', helps: '<strong>NameGenie</strong> আপনাকে সৃজনশীল, স্মরণীয় এবং মজার ডোমেইন নাম তৈরি করতে সাহায্য করে।<br>Codespaces/Heroku-স্টাইলের নাম দ্বারা অনুপ্রাণিত। Vite দিয়ে তৈরি, GitHub Pages-এ ডিপ্লয় করা হয়েছে।<br>শব্দ তালিকা <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>প্রধান সাইট: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>' },
    gu: { title: 'ડોમેન નામ જનરેટર', desc: 'મજા, યાદગાર ડોમેન નામ બનાવો.', howMany: 'કેટલા?', tld: 'TLD:', any: 'કોઈપણ', generate: 'બનાવો', copy: 'કૉપિ કરો', clickToStart: 'શરૂ કરવા માટે બનાવો ક્લિક કરો', selectToCopy: 'કૉપિ કરવા માટે ડોમેન પસંદ કરો.', history: 'ઇતિહાસ', noHistory: 'કોઈ ઇતિહાસ નથી.', favorites: 'પ્રિય', noFavorites: 'કોઈ પ્રિય નથી.', helps: '<strong>NameGenie</strong> તમને સર્જનાત્મક, યાદગાર અને મજા ડોમેન નામ બનાવવા માટે મદદ કરે છે.<br>Codespaces/Heroku-શૈલીના નામોથી પ્રેરિત. Vite સાથે બનાવ્યું, GitHub Pages પર ડિપ્લોય કર્યું.<br>શબ્દોની યાદી <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>મુખ્ય સાઇટ: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>' },
    mr: { title: 'डोमेन नाव जनरेटर', desc: 'मजेशीर, लक्षात राहणारे डोमेन नाव तयार करा.', howMany: 'किती?', tld: 'TLD:', any: 'कोणतेही', generate: 'तयार करा', copy: 'कॉपी करा', clickToStart: 'सुरू करण्यासाठी तयार करा क्लिक करा', selectToCopy: 'कॉपीसाठी डोमेन निवडा.', history: 'इतिहास', noHistory: 'इतिहास नाही.', favorites: 'आवडते', noFavorites: 'आवडते नाहीत.', helps: '<strong>NameGenie</strong> तुम्हाला सर्जनशील, लक्षात राहणारे आणि मजेशीर डोमेन नावे तयार करण्यात मदत करते.<br>Codespaces/Heroku-शैलीच्या नावांपासून प्रेरित. Vite ने तयार केले, GitHub Pages वर डिप्लॉय केले.<br>शब्दांची यादी <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>मुख्य साइट: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>' },
  pa: { title: 'ਡੋਮੇਨ ਨਾਮ ਜਨਰੇਟਰ', desc: 'ਮਜ਼ੇਦਾਰ, ਯਾਦਗਾਰ ਡੋਮੇਨ ਨਾਮ ਬਣਾਓ।', howMany: 'ਕਿੰਨੇ?', tld: 'TLD:', any: 'ਕੋਈ ਵੀ', generate: 'ਬਣਾਓ', copy: 'ਕਾਪੀ ਕਰੋ', clickToStart: 'ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਬਣਾਓ ਤੇ ਕਲਿੱਕ ਕਰੋ', selectToCopy: 'ਕਾਪੀ ਕਰਨ ਲਈ ਡੋਮੇਨ ਚੁਣੋ।', history: 'ਇਤਿਹਾਸ', noHistory: 'ਕੋਈ ਇਤਿਹਾਸ ਨਹੀਂ।', favorites: 'ਪਸੰਦੀਦਾ', noFavorites: 'ਕੋਈ ਪਸੰਦੀਦਾ ਨਹੀਂ।', helps: "<strong>NameGenie</strong> ਤੁਹਾਨੂੰ ਰਚਨਾਤਮਕ, ਯਾਦਗਾਰ ਅਤੇ ਮਜ਼ੇਦਾਰ ਡੋਮੇਨ ਨਾਮ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।<br>Codespaces/Heroku-ਸ਼ੈਲੀ ਦੇ ਨਾਵਾਂ ਤੋਂ ਪ੍ਰੇਰਿਤ। Vite ਨਾਲ ਬਣਾਇਆ ਗਿਆ, GitHub Pages 'ਤੇ ਡਿਪਲੌਇ ਕੀਤਾ ਗਿਆ।<br>ਸ਼ਬਦ ਸੂਚੀ <a href=\"https://github.com/dariusk/corpora\" target=\"_blank\" rel=\"noopener\">dariusk/corpora</a>.<br>ਮੁੱਖ ਸਾਈਟ: <a href=\"https://pappater.github.io/\" target=\"_blank\" rel=\"noopener\">https://pappater.github.io/</a>" },
    ur: { title: 'ڈومین نام جنریٹر', desc: 'مزے دار، یادگار ڈومین نام بنائیں۔', howMany: 'کتنے؟', tld: 'TLD:', any: 'کوئی بھی', generate: 'بنائیں', copy: 'کاپی کریں', clickToStart: 'شروع کرنے کے لیے بنائیں پر کلک کریں', selectToCopy: 'کاپی کے لیے ڈومین منتخب کریں۔', history: 'تاریخ', noHistory: 'کوئی تاریخ نہیں۔', favorites: 'پسندیدہ', noFavorites: 'کوئی پسندیدہ نہیں۔', helps: '<strong>NameGenie</strong> آپ کو تخلیقی، یادگار اور مزے دار ڈومین نام بنانے میں مدد کرتا ہے۔<br>Codespaces/Heroku-انداز کے ناموں سے متاثر۔ Vite کے ساتھ بنایا گیا، GitHub Pages پر ڈپلائے کیا گیا۔<br>الفاظ کی فہرست <a href="https://github.com/dariusk/corpora" target="_blank" rel="noopener">dariusk/corpora</a>.<br>مرکزی سائٹ: <a href="https://pappater.github.io/" target="_blank" rel="noopener">https://pappater.github.io/</a>' }
  };
  let lang = localStorage.getItem('ng-lang') || 'en';
  function t(key) { return locales[lang][key] || key; }

  await loadWordLists();
  document.querySelector('#app').innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5em;">
      <button id="theme-toggle" aria-label="Toggle light/dark mode" style="background: none; border: none; cursor: pointer; font-size: 1.3em; padding: 0.2em 0.5em;">
        <span id="theme-icon">🌙</span>
      </button>
      <select id="lang-select" aria-label="Select language" style="font-size:1em;">
        <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
        <option value="ta" ${lang === 'ta' ? 'selected' : ''}>தமிழ்</option>
        <option value="hi" ${lang === 'hi' ? 'selected' : ''}>हिन्दी</option>
        <option value="te" ${lang === 'te' ? 'selected' : ''}>తెలుగు</option>
        <option value="kn" ${lang === 'kn' ? 'selected' : ''}>ಕನ್ನಡ</option>
        <option value="ml" ${lang === 'ml' ? 'selected' : ''}>മലയാളം</option>
        <option value="bn" ${lang === 'bn' ? 'selected' : ''}>বাংলা</option>
        <option value="gu" ${lang === 'gu' ? 'selected' : ''}>ગુજરાતી</option>
        <option value="mr" ${lang === 'mr' ? 'selected' : ''}>मराठी</option>
        <option value="pa" ${lang === 'pa' ? 'selected' : ''}>ਪੰਜਾਬੀ</option>
        <option value="ur" ${lang === 'ur' ? 'selected' : ''}>اردو</option>
      </select>
    </div>
    <h1 id="main-title">${t('title')}</h1>
    <p class="description">${t('desc')}</p>
    <form id="options-form" style="margin-bottom:1em;display:flex;flex-wrap:wrap;gap:0.7em;justify-content:center;align-items:center;">
      <label for="num-names" style="font-size:1em;">${t('howMany')}</label>
      <input id="num-names" name="num-names" type="number" min="1" max="10" value="1" aria-label="${t('howMany')}" style="width:3em;" />
      <label for="tld-select" style="font-size:1em;">${t('tld')}</label>
      <select id="tld-select" name="tld-select" aria-label="${t('tld')}">
        <option value="">${t('any')}</option>
        ${tlds.map(tld => `<option value="${tld}">${tld}</option>`).join('')}
      </select>
    </form>
    <div class="domain-display" aria-live="polite">
      <div id="domain" class="domain" tabindex="0">${t('clickToStart')}</div>
    </div>
    <div class="card">
      <button id="generate-btn" type="button" aria-label="${t('generate')}">${t('generate')}</button>
      <button id="copy-btn" type="button" style="display: none;" aria-label="${t('copy')}">${t('copy')}</button>
      <button id="export-btn" type="button" aria-label="Export" style="margin-left:0.7em;">Export</button>
      <select id="export-format" aria-label="Export format" style="margin-left:0.5em;">
        <option value="csv">CSV</option>
        <option value="txt">Text</option>
      </select>
    </div>
    <footer class="footer">
      <p>${t('helps')}</p>
    </footer>
    <style>
      @keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
    </style>
  `;
  // Export logic
  function exportDomains(format) {
    if (!currentDomains.length) {
      showToast('No domains to export!');
      return;
    }
    let content = '';
    let mime = '';
    let filename = '';
    if (format === 'csv') {
      content = currentDomains.map(d => `"${d}"`).join(',\n');
      mime = 'text/csv';
      filename = 'domains.csv';
    } else {
      content = currentDomains.join('\n');
      mime = 'text/plain';
      filename = 'domains.txt';
    }
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  const exportBtn = document.getElementById('export-btn');
  const exportFormat = document.getElementById('export-format');
  if (exportBtn && exportFormat) {
    exportBtn.onclick = () => exportDomains(exportFormat.value);
  }

  // Language selector logic
  const langSelect = document.getElementById('lang-select');
  langSelect.addEventListener('change', () => {
    lang = langSelect.value;
    localStorage.setItem('ng-lang', lang);
    setup(); // re-render UI in new language
  });
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
      `<span class="domain-item${i === selectedDomainIdx ? ' selected' : ''}" tabindex="0" data-idx="${i}" aria-label="Domain ${i+1}: ${d}">${d} <button class='fav-btn' data-domain='${d}' aria-label='${favorites.includes(d) ? 'Remove from favorites' : 'Add to favorites'}' style='background:none;border:none;cursor:pointer;font-size:1.1em;'>${favorites.includes(d) ? '★' : '☆'}</button></span>`
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
      info.textContent = 'Select a domain to copy or favorite.';
    } else if (info) {
      info.remove();
    }
    // Add event listeners for favorite buttons
    domainDisplay.querySelectorAll('.fav-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const domain = btn.getAttribute('data-domain');
        if (favorites.includes(domain)) {
          favorites = favorites.filter(f => f !== domain);
        } else {
          favorites.push(domain);
        }
        saveFavorites();
        renderDomains();
        renderHistory();
      };
    });
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
    // Add to history
    for (const d of currentDomains) {
      if (!history.includes(d)) history.push(d);
    }
    saveHistory();
    renderDomains();
    renderHistory();
    domainDisplay.focus();
  });
  // Initial render of history/favorites
  renderHistory();

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
