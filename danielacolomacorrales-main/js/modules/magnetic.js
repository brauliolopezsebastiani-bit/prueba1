// Subtle "magnetic" pull toward the cursor on primary buttons — a small,
// slow-eased offset (max ~8px), not a gimmick. Skipped entirely for
// touch devices (no hover) and for prefers-reduced-motion users.
export function initMagnetic(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduce || !canHover) return;

  const STRENGTH = 0.28;   // fraction of cursor offset the button follows
  const MAX = 8;           // px cap so it stays subtle

  document.querySelectorAll('.btn, .nav-cta').forEach(el => {
    el.style.transition = 'transform .35s var(--ease, ease)';

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      const dx = Math.max(-MAX, Math.min(MAX, x * STRENGTH));
      const dy = Math.max(-MAX, Math.min(MAX, y * STRENGTH));
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}
