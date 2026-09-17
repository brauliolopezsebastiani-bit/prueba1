export function initAnchorScroll(){
  if(!location.hash) return;
  const target = document.querySelector(location.hash);
  if(!target) return;

  const jump = () => target.scrollIntoView({behavior:'auto', block:'start'});

  // The browser's automatic jump-to-#hash fires before web fonts and
  // below-the-fold images finish settling the page's real height, so on a
  // taller page it can land short. Everything below is invisible to the
  // visitor — it all happens while the loader splash still covers the
  // screen — so we just redo the jump once the layout is trustworthy.
  const ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();

  window.addEventListener('load', () => {
    ready.then(() => {
      jump();
      requestAnimationFrame(() => requestAnimationFrame(jump)); // settle once more post-layout
      setTimeout(jump, 1300); // final correction, timed past the loader's minimum display
    });
  });
}
