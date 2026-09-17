export function initLoader(){
  const loader = document.querySelector('.loader');
  if(!loader) { document.body.classList.add('loaded','hero-ready'); return; }

  const MIN = 1200, start = performance.now();

  const hide = () => {
    const rem = Math.max(MIN - (performance.now()-start), 0);
    setTimeout(() => {
      loader.setAttribute('data-hidden','');
      document.body.classList.add('loaded');
    }, rem);
  };

  // Fallback: if image load is slow, still show hero text after 2s
  setTimeout(() => document.body.classList.add('hero-ready'), 300);

  document.readyState === 'complete' ? hide() : window.addEventListener('load', hide);
}
