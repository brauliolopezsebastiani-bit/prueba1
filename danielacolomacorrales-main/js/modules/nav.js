export function initNav(){
  const toggle=document.querySelector('.nav-toggle'),links=document.querySelector('.nav-links');
  if(!toggle||!links)return;
  const open=()=>{toggle.setAttribute('aria-expanded','true');links.classList.add('open');document.body.classList.add('nav-open');};
  const close=()=>{toggle.setAttribute('aria-expanded','false');links.classList.remove('open');document.body.classList.remove('nav-open');};
  toggle.addEventListener('click',()=>toggle.getAttribute('aria-expanded')==='true'?close():open());
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>e.key==='Escape'&&close());
}
