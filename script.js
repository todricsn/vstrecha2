(() => {
  const intro = document.querySelector('.site-intro');
  const removeIntro = () => intro?.remove();
  intro?.addEventListener('animationend', e => { if(e.animationName === 'intro-out') removeIntro(); });
  setTimeout(removeIntro, 3400);
  window.addEventListener('pageshow', e => { if(e.persisted) removeIntro(); });
  document.addEventListener('focusin', removeIntro, {once:true});
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced) removeIntro();
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const closeMenu = () => {nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');};
  menu.addEventListener('click', () => {const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});
  nav.addEventListener('click', e => {if(e.target.closest('a')) closeMenu();});
  document.addEventListener('keydown', e => {if(e.key==='Escape')closeMenu();});
  document.addEventListener('click', e => {if(!e.target.closest('header'))closeMenu();});
  if(!reduced && 'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});
    document.querySelectorAll('.head,.room,.about-photo,.feature,.dining-image,.dining-copy,.audience .card,.gallery img,.booking,.mapbox').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
  }
})();
