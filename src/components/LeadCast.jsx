import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const B = `${import.meta.env.BASE_URL}IEEE Senior Execomm 2026-2027/`;
const img = (f) => encodeURI(B + f);
const CAST = [
  { big: true, role: 'IEEE Chairperson', first: 'Himani', last: 'Gupta', file: 'HimaniGupta_IEEEChairperson.png'},
 
  { big: true, role: 'WIE Chairperson', first: 'Anushree', last: 'Jain', file: 'Anushree Jain_WIE_Chairperson.jpeg'},
   {role: 'IEEE Vice-Chairperson', first: 'Gunjan', last: 'Aggarwal', file: 'Gunjan Aggarwal_IEEE Vice-chairperson.JPG'},
  { role: 'WIE Vice-Chairperson', first: 'Sneha', last: 'Yadav', file: 'Sneha Yadav _WIE Vice Chairperson_.jpg'},
];

function Poster({ p }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const s = ref.current.style; s.setProperty('--ry', `${(x - 0.5) * 22}deg`); s.setProperty('--rx', `${(0.5 - y) * 18}deg`);
    s.setProperty('--gx', `${x * 100}%`); s.setProperty('--gy', `${y * 100}%`);
  };
  const leave = () => { const s = ref.current.style; s.setProperty('--ry', '0deg'); s.setProperty('--rx', '0deg'); };
  return (
    <div className={`poster${p.big ? ' poster--big' : ''}`} onPointerMove={move} onPointerLeave={leave}>
      <article
        className="poster__in"
        ref={ref}
      >
        <img src={img(p.file)} alt={`${p.first} ${p.last}, ${p.role}`} />
        <div className="poster__shade" />
        <div className="poster__role">{p.role}</div>
        <div className="poster__name"><small>IEEE IGDTUW · 2026—27</small><h3>{p.first}<br />{p.last}</h3></div>
        <div className="poster__glare" />
      </article>
    </div>
  );
}

export default function LeadCast() {
  const root = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo('.poster', { y: 140, rotationX: 40, opacity: 0, transformPerspective: 1200 },
        { y: 0, rotationX: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.14,
          scrollTrigger: { trigger: root.current, start: 'top 70%' } });
      gsap.fromTo('.lead__beam', { opacity: 0 }, { opacity: 1, scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'center 50%', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="lead" className="lead" ref={root}>
      <div className="lead__beam" aria-hidden="true" />
      <p className="lead__label">★ NOW STARRING ★</p>
      <div className="lead__row">
        {CAST.slice(0, 2).map((p) => (
          <Poster
            key={p.role}
            p={p}
          />
        ))}
      </div>
      <div className="lead__row lead__row--sm">
        {CAST.slice(2).map((p) => (
          <Poster
            key={p.role}
            p={p}
          />
        ))}
      </div>
    </section>
  );
}
