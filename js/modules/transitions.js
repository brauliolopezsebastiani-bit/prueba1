export function initTransitions(){
  const wipe=document.querySelector('.page-wipe');if(!wipe)return;
  document.querySelectorAll('a[href]').forEach(a=>{
    const h=a.getAttribute('href');
    if(!h||h.startsWith('#')||h.startsWith('http')||h.startsWith('mailto')||h.startsWith('tel')||a.target==='_blank')return;
    a.addEventListener('click',e=>{e.preventDefault();wipe.classList.add('active');setTimeout(()=>{window.location.href=h;},420);});
  });
  // Restoring from back/forward cache (or any re-show) can leave the wipe
  // stuck mid-transition — always clear it when the page becomes visible again.
  window.addEventListener('pageshow',()=>{wipe.classList.remove('active');});
}
