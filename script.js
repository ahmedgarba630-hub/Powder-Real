// ---------- Header shadow on scroll ----------
const header = document.getElementById('site-header');
function updateHeader(){
  if(window.scrollY > 8){ header.classList.add('scrolled'); }
  else{ header.classList.remove('scrolled'); }
}
document.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ---------- Parallax layers ----------
const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let ticking = false;
function updateParallax(){
  const scrollY = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed || '0.1');
    const offset = scrollY * speed;
    el.style.transform = `translateY(${offset}px)`;
  });
  ticking = false;
}
function onScroll(){
  if(!ticking && !reduceMotion){
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}
if(!reduceMotion){
  document.addEventListener('scroll', onScroll, { passive: true });
  updateParallax();
}

// ---------- Playful pop in / out on scroll (re-triggers both ways) ----------
const popEls = document.querySelectorAll('.pop');
const popObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, { threshold: 0.2 });
popEls.forEach(el => popObserver.observe(el));

// ---------- FAQ accordion ----------
const faqTriggers = document.querySelectorAll('.faq__trigger');
faqTriggers.forEach(trigger => {
  const panel = trigger.nextElementSibling;
  panel.style.maxHeight = '0px';

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    // close all others
    faqTriggers.forEach(t => {
      if(t !== trigger){
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.style.maxHeight = '0px';
      }
    });

    // toggle this one
    trigger.setAttribute('aria-expanded', String(!isOpen));
    panel.style.maxHeight = isOpen ? '0px' : panel.scrollHeight + 'px';
  });
});

// ---------- Waitlist form (demo only, no backend) ----------
const waitlistForm = document.getElementById('waitlist-form');
if(waitlistForm){
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = waitlistForm.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Joined ✓';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; waitlistForm.reset(); }, 2200);
  });
}
