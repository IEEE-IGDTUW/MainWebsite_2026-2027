import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sections fold in like turning a page; cards tilt in 3D under the pointer.
export default function Fold3D() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.utils.toArray('main > section:not(#home)').forEach((sec) => {
        gsap.fromTo(sec, { rotationX: 9, y: 50, transformPerspective: 1400, transformOrigin: '50% 0%' },
          { rotationX: 0, y: 0, ease: 'none', immediateRender: false,
            scrollTrigger: { trigger: sec, start: 'top 100%', end: 'top 55%', scrub: true },
            onComplete: () => gsap.set(sec, { clearProps: 'transform' }) });
      });
    });
    if (!reduced) gsap.set('#team article', { autoAlpha: 0 });
    const dev = ScrollTrigger.batch('#team article', { start: 'top 92%', once: true, onEnter: (b) => gsap.fromTo(b, { autoAlpha: 0, rotationY: -75, y: 50, scale: 0.9, transformPerspective: 900, filter: 'brightness(.2)' }, { autoAlpha: 1, rotationY: 0, y: 0, scale: 1, filter: 'brightness(1)', duration: 0.9, ease: 'power3.out', stagger: 0.07, clearProps: 'transform,filter,opacity,visibility' }) });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { gsap.to(e.target, { autoAlpha: 1, y: 0, duration: 0.6, overwrite: 'auto' }); io.unobserve(e.target); } }), { threshold: 0.1 });
    document.querySelectorAll('main .circular-carousel, main .ch-card').forEach((n) => io.observe(n));
    const rf = setTimeout(() => ScrollTrigger.refresh(), 1200);
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const sel = 'main .card, main .ch-card, #team article';
    const move = (e) => {
      const el = e.target.closest?.(sel); if (!el) return;
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = 'transform .08s'; el.style.transform = `perspective(800px) rotateX(${-y * 11}deg) rotateY(${x * 14}deg) translateZ(12px)`;
    };
    const out = (e) => {
      const el = e.target.closest?.(sel); if (!el || el.contains(e.relatedTarget)) return;
      el.style.transition = 'transform .5s'; el.style.transform = '';
    };
    if (fine) { document.addEventListener('pointermove', move); document.addEventListener('pointerout', out); }
    return () => { io.disconnect(); clearTimeout(rf); ctx.revert(); dev.forEach((t) => t.kill()); document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', out); };
  }, []);
  return null;
}
