export function initForm(){
  const form=document.querySelector('.form');if(!form)return;
  const status=form.querySelector('.form__status');
  const v={name:v=>v.trim().length>=2,email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),message:v=>v.trim().length>=10};
  const m={name:'Ingresa tu nombre.',email:'Email inválido.',message:'Mensaje muy corto (mínimo 10 caracteres).'};

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    form.querySelectorAll('.field__err').forEach(el=>el.textContent='');
    const d={name:form.querySelector('#name')?.value||'',email:form.querySelector('#email')?.value||'',message:form.querySelector('#message')?.value||''};
    let ok=true;
    for(const k in v){if(!v[k](d[k])){form.querySelector(`[data-err="${k}"]`).textContent=m[k];ok=false;}}
    if(!ok)return;

    const submitBtn = form.querySelector('button[type="submit"]');
    status.textContent='Enviando…';
    if(submitBtn) submitBtn.disabled = true;

    try{
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await res.json();
      if(result.success){
        status.textContent='¡Gracias! Nos pondremos en contacto pronto.';
        form.reset();
      } else {
        status.textContent='No se pudo enviar. Escríbenos directo a daniela@danielacolomacorrales.com.';
      }
    }catch(err){
      status.textContent='No se pudo enviar. Escríbenos directo a daniela@danielacolomacorrales.com.';
    }finally{
      if(submitBtn) submitBtn.disabled = false;
    }
  });
}
