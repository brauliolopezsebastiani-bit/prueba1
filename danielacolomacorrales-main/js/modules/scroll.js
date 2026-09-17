export function initScroll(){
  const bar=document.querySelector('.scroll-bar');
  const targets=document.querySelectorAll('.fade, .reveal-mask');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}});
  },{threshold:.12});
  targets.forEach((el,i)=>{
    const siblings=[...el.parentElement.querySelectorAll('.fade')];
    if(siblings.length>1)el.style.transitionDelay=`${siblings.indexOf(el)*.12}s`;
    obs.observe(el);
  });
  if(bar)window.addEventListener('scroll',()=>{
    const p=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;
    bar.style.width=p+'%';
  },{passive:true});
}
