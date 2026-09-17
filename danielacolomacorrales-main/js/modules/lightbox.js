export function initLightbox(){
  const cards=document.querySelectorAll('.g-card'),lb=document.querySelector('.lb');
  if(!cards.length||!lb)return;
  const img=lb.querySelector('.lb__img'),cap=lb.querySelector('.lb__cap');
  const slides=[...cards].map(c=>({src:c.querySelector('img').src,alt:c.querySelector('img').alt,name:c.querySelector('.g-card__name')?.textContent||''}));
  let cur=0;
  const render=()=>{img.src=slides[cur].src;img.alt=slides[cur].alt;cap.textContent=slides[cur].name;};
  const openLb=i=>{cur=i;render();lb.classList.add('open');document.body.style.overflow='hidden';};
  const closeLb=()=>{lb.classList.remove('open');document.body.style.overflow='';};
  const next=()=>{cur=(cur+1)%slides.length;render();};
  const prev=()=>{cur=(cur-1+slides.length)%slides.length;render();};
  cards.forEach((c,i)=>c.addEventListener('click',()=>openLb(i)));
  lb.querySelector('.lb__close').addEventListener('click',closeLb);
  lb.querySelector('.lb__nav--n').addEventListener('click',next);
  lb.querySelector('.lb__nav--p').addEventListener('click',prev);
  lb.addEventListener('click',e=>e.target===lb&&closeLb());
  document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev();});
}
