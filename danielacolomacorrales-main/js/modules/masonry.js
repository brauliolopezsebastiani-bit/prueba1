function getColumnCount(){
  const w = window.innerWidth;
  if (w <= 560) return 1;
  if (w <= 900) return 2;
  return 3;
}

// Exact best split: tries every way to assign items to columns and keeps
// the one with the smallest (tallest - shortest) column gap. Cheap for the
// small item counts these galleries have (a handful of photos per
// collection), and skips columns that already have an identical running
// height to one already tried at that step (symmetry pruning), which cuts
// the search space drastically.
function bestPartition(ratios, cols){
  const n = ratios.length;
  const heights = new Array(cols).fill(0);
  const assignment = new Array(n).fill(0);
  let best = null, bestScore = Infinity;

  function backtrack(i){
    if (i === n){
      const max = Math.max(...heights), min = Math.min(...heights);
      const score = max - min;
      if (score < bestScore){ bestScore = score; best = assignment.slice(); }
      return;
    }
    const seenHeights = new Set();
    for (let c = 0; c < cols; c++){
      if (seenHeights.has(heights[c])) continue;
      seenHeights.add(heights[c]);
      heights[c] += ratios[i];
      assignment[i] = c;
      backtrack(i + 1);
      heights[c] -= ratios[i];
    }
  }
  backtrack(0);
  return best;
}

// Greedy shortest-column-first fallback for unusually large galleries,
// processed largest-item-first (LPT), where exact search would be too slow.
function greedyPartition(ratios, cols){
  const order = ratios.map((r, i) => i).sort((a, b) => ratios[b] - ratios[a]);
  const heights = new Array(cols).fill(0);
  const assignment = new Array(ratios.length).fill(0);
  order.forEach(i => {
    let shortest = 0;
    for (let c = 1; c < cols; c++) if (heights[c] < heights[shortest]) shortest = c;
    assignment[i] = shortest;
    heights[shortest] += ratios[i];
  });
  return assignment;
}

function layout(container){
  // Cache the original card list once, so re-layouts (on resize) always
  // redistribute from the same source instead of nested/duplicated columns.
  if (!container._masonryCards) {
    container._masonryCards = Array.from(container.querySelectorAll('.g-card'));
  }
  const cards = container._masonryCards;
  const cols = getColumnCount();

  const ratios = cards.map(card => {
    const img = card.querySelector('img');
    const w = parseFloat(img.getAttribute('width')) || 1;
    const h = parseFloat(img.getAttribute('height')) || 1;
    return h / w; // relative height per unit width, columns are equal width
  });

  const assignment = ratios.length <= 12
    ? bestPartition(ratios, cols)
    : greedyPartition(ratios, cols);

  const colEls = Array.from({length: cols}, () => {
    const d = document.createElement('div');
    d.className = 'masonry__col';
    return d;
  });
  cards.forEach((card, i) => colEls[assignment[i]].appendChild(card));

  container.innerHTML = '';
  colEls.forEach(c => container.appendChild(c));
}

export function initMasonry(){
  const containers = document.querySelectorAll('.masonry');
  if (!containers.length) return;
  containers.forEach(layout);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => containers.forEach(layout), 150);
  });
}
