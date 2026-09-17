export function initCounters(){
  const els=document.querySelectorAll('[data-target]');
  if(!els.length)return;
  const run=el=>{
    const t=parseFloat(el.dataset.target),s=el.dataset.suffix||'',d=1400,st=performance.now();
    const step=now=>{const p=Math.min((now-st)/d,1),v=Math.round(t*(1-Math.pow(1-p,3)));el.textContent=v+s;if(p<1)requestAnimationFrame(step);};
    requestAnimationFrame(step);
  };
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){run(e.target);obs.unobserve(e.target);}});},{threshold:.5});
  els.forEach(el=>obs.observe(el));
}
