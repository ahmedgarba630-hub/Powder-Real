// ---------- Header shadow on scroll ----------
const header = document.getElementById('site-header');
function updateHeader(){
  if(window.scrollY > 8){ header.classList.add('scrolled'); }
  else{ header.classList.remove('scrolled'); }
}
document.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ---------- Mobile drawer nav ----------
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobile-drawer');
const overlay = document.getElementById('drawer-overlay');
const drawerClose = document.getElementById('drawer-close');
const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

function openDrawer(){
  drawer.classList.add('open');
  overlay.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('drawer-open');
}
function closeDrawer(){
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('drawer-open');
}
if(hamburger && drawer && overlay){
  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    isOpen ? closeDrawer() : openDrawer();
  });
  overlay.addEventListener('click', closeDrawer);
  if(drawerClose) drawerClose.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeDrawer();
  });
}

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

// ---------- Contact form (demo only, no backend) ----------
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const status = document.getElementById('form-status');
    const original = btn.textContent;
    btn.textContent = 'Sent ✓';
    btn.disabled = true;
    if(status) status.textContent = "Thanks — we'll be in touch shortly.";
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      contactForm.reset();
      if(status) status.textContent = '';
    }, 2600);
  });
}
