gsap.registerPlugin(ScrollTrigger);

/* HERO GSAP */
gsap.set(['.hero-eyebrow','.hero-title','.hero-subtitle','.hero-cta','.hero-scroll','.hero-dots','.hero-counter'],{opacity:0,y:30});
gsap.timeline({defaults:{ease:'power4.out'}})
  .to('.hero-eyebrow', {y:0,opacity:1,duration:.8},0.3)
  .to('.hero-title',   {y:0,opacity:1,duration:1.1},0.6)
  .to('.hero-subtitle',{y:0,opacity:1,duration:.8},0.95)
  .to('.hero-cta',     {y:0,opacity:1,duration:.7},1.2)
  .to('.hero-scroll',  {y:0,opacity:1,duration:.6},1.5)
  .to('.hero-dots',    {y:0,opacity:1,duration:.5},1.6)
  .to('.hero-counter', {y:0,opacity:1,duration:.5},1.7);

/* HERO SLIDER */
(function(){
  const slides  = document.querySelectorAll('.hero-slide');
  const dots    = document.querySelectorAll('.hero-dot');
  const countEl = document.getElementById('heroCounter');
  const labels  = ['01 / 03','02 / 03','03 / 03'];
  let cur = 0, timer = null;

  function goSlide(idx){
    if(idx === cur) return;
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = idx;
    slides[cur].classList.add('active');
    dots[cur].classList.add('active');
    if(countEl) countEl.textContent = labels[cur];
    clearInterval(timer);
    timer = setInterval(next, 5500);
  }
  function next(){ goSlide((cur+1) % slides.length); }
  timer = setInterval(next, 5500);

  // Dot butonlarına event listener
  dots.forEach((dot, i) => dot.addEventListener('click', () => goSlide(i)));

  // Touch swipe
  let tx = 0;
  const hero = document.querySelector('.hero');
  hero.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive:true});
  hero.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if(Math.abs(dx) > 50) dx < 0 ? next() : goSlide((cur-1+slides.length)%slides.length);
  }, {passive:true});
})();

/* HEADER SCROLL */
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: s => document.getElementById('mainHeader').classList.toggle('scrolled', s.progress > 0)
});

/* SCROLL REVEAL */
gsap.utils.toArray('[data-reveal]').forEach(el => {
  gsap.from(el, {
    scrollTrigger: {trigger:el, start:'top 88%', toggleActions:'play none none none'},
    y:35, opacity:0, duration:.9, ease:'power3.out'
  });
});

/* CUSTOM CURSOR */
const cursor = document.getElementById('cursor');
const dot    = document.getElementById('cursorDot');
let mx=0, my=0, cx=0, cy=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function tick(){
  cx += (mx-cx)*.12; cy += (my-cy)*.12;
  cursor.style.transform = `translate(${cx-20}px,${cy-20}px)`;
  dot.style.transform    = `translate(${mx-3}px,${my-3}px)`;
  requestAnimationFrame(tick);
})();
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
});

/* MAGNETIC CTA */
document.querySelectorAll('.hero-cta,.menu-cta-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX-(r.left+r.width/2))*.25}px,${(e.clientY-(r.top+r.height/2))*.25}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ANIMATED CARD GALLERY */
(function(){
  const panels = document.querySelectorAll('.card-panel');
  let auto = null, cur = 0;
  function activate(i){ panels.forEach((p,j) => p.classList.toggle('active', i===j)); cur=i; }
  panels.forEach((p,i) => {
    p.addEventListener('mouseenter', () => { clearInterval(auto); activate(i); });
    p.addEventListener('click', () => activate(i));
  });
  const gallery = document.getElementById('cardGallery');
  if(gallery){
    gallery.addEventListener('mouseleave', () => {
      auto = setInterval(() => activate((cur+1)%panels.length), 4000);
    });
  }
  auto = setInterval(() => activate((cur+1)%panels.length), 4000);
})();

/* MOBILE MENU */
function toggleMenu(){
  document.getElementById('navCenter').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
  document.body.style.overflow = document.getElementById('navCenter').classList.contains('open') ? 'hidden' : '';
}
function closeMenu(){
  document.getElementById('navCenter').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}

// Nav link event listener'ları
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

// Hamburger
const hamburgerBtn = document.getElementById('hamburger');
if(hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
