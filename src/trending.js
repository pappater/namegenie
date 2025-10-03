// trending.js
// Trending/Popular Names logic for NameGenie

export function getTrendingNames(favorites, max = 5) {
  // Count occurrences of each name in favorites
  const counts = {};
  for (const name of favorites) {
    counts[name] = (counts[name] || 0) + 1;
  }
  // Sort by count descending, then alphabetically
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, max)
    .map(([name, count]) => ({ name, count }));
}

export function renderTrending(names, containerId = 'trending-names') {
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.marginTop = '2em';
    document.getElementById('app').appendChild(container);
  }
  // Hide the trending section for now
  container.style.display = 'none';
  // (Rendering logic is kept for future use)
}
