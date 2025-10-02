# Random Domain Name Generator 🌐

A beautiful and interactive random domain name generator built with Vite.

## Features

- ✨ Generates creative domain names from combinations of prefixes, words, and TLDs
- 🎲 Random combinations every time you click
- 📋 Copy to clipboard with one click
- 📱 Responsive design for all devices
- 🚀 Fast performance powered by Vite v7.1.14
- 💜 Beautiful gradient UI design

## Live Demo

The site will be automatically deployed to GitHub Pages when this PR is merged to the main branch.

**Live URL:** https://pappater.github.io/test/

## Development

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173/test/`

### Build for Production

```bash
npm run build
```

The production files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Technology Stack

- **Framework:** Vite v7.1.14 (rolldown-vite)
- **Language:** JavaScript (ES6+)
- **Styling:** CSS3 with modern features
- **Deployment:** GitHub Pages via GitHub Actions

## How It Works

The generator randomly combines:
- **32 prefixes** (super, mega, ultra, pro, etc.)
- **32 words** (hub, zone, spot, place, etc.)
- **20 TLDs** (.com, .net, .io, .dev, etc.)

This creates thousands of possible domain name combinations!

## Deployment

The project is configured with GitHub Actions to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### GitHub Pages Setup

To enable GitHub Pages deployment:

1. Go to repository Settings > Pages
2. Under "Source", select "GitHub Actions"
3. The workflow will automatically deploy on push to main

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   └── vite.svg               # Vite logo
├── src/
│   ├── main.js                # Main application logic
│   └── style.css              # Styles and animations
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── README.md                  # This file
```

## License

This project is open source and available for anyone to use and modify.
