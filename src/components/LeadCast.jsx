
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const B = `${import.meta.env.BASE_URL}IEEE Senior Execomm 2026-2027/`;
const img = (f) => encodeURI(B + f);

const CAST = [
  {
    big: true,
    role: 'IEEE Chairperson',
    first: 'Himani',
    last: 'Gupta',
    file: 'HimaniGupta_IEEEChairperson.png',
    linkedin: '',
    email: '',
  },
  {
    big: true,
    role: 'WIE Chairperson',
    first: 'Anushree',
    last: 'Jain',
    file: 'Anushree Jain_WIE_Chairperson.jpeg',
    linkedin: 'https://www.linkedin.com/in/anushree-jain-2990a0285/',
    email: 'jainanushree2005@gmail.com',
  },
  {
    role: 'IEEE Vice-Chairperson',
    first: 'Gunjan',
    last: 'Aggarwal',
    file: 'Gunjan Aggarwal_IEEE Vice-chairperson.JPG',
    linkedin:
      'https://www.linkedin.com/in/aggarwalgunjan2908?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    email: 'aggarwalgunjan2908@gmail.com',
  },
  {
    role: 'WIE Vice-Chairperson',
    first: 'Sneha',
    last: 'Yadav',
    file: 'Sneha Yadav _WIE Vice Chairperson_.jpg',
    linkedin: '',
    email: '',
  },
];

const socialStyles = `
  /* Dark gradient rising from the bottom */
  .poster__dark-overlay {
    position: absolute;
    inset: auto 0 0;
    height: 42%;
    z-index: 6;
    pointer-events: none;

    background: linear-gradient(
      to top,
      rgba(0,0,0,0.98) 0%,
      rgba(0,0,0,0.78) 35%,
      rgba(0,0,0,0.35) 70%,
      transparent 100%
    );

    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .poster:hover .poster__dark-overlay {
    opacity: 1;
  }

  /* Social icons: top-right corner */
  .poster__socials {
    position: absolute !important;
    top: 75px !important;
    right: 18px !important;
    bottom: auto !important;
    left: auto !important;

    z-index: 20 !important;

    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 14px !important;

    width: auto !important;
    height: auto !important;

    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateX(10px);
    transition: all 0.3s ease;
  }

  .poster:hover .poster__socials,
  .poster:focus-within .poster__socials {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(0);
  }

  /* Prominent icon buttons */
  .poster__social {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    flex-shrink: 0;

    border: 1.5px solid rgba(255,255,255,0.9);
    border-radius: 12px;
    background: rgba(10,10,12,0.92);
    color: white;

    box-shadow: 0 4px 15px rgba(0,0,0,0.6);
    backdrop-filter: blur(8px);
    text-decoration: none;
    transition: all 0.25s ease;
  }

  .poster__social:hover {
    background: #e4202f;
    border-color: #ff5965;
    box-shadow: 0 0 20px rgba(228,32,47,0.7);
    transform: scale(1.1);
  }

  .poster__social svg {
    width: 23px;
    height: 23px;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .poster__shade {
    z-index: 2;
  }

  .poster__role {
    z-index: 4;
  }

  .poster__name {
    z-index: 4;
    right: 18px !important;
  }

  .poster__glare {
    z-index: 8;
  }

  @media (max-width: 600px) {
    .poster__socials {
      top: 75px !important;
      right: 10px !important;
      gap: 10px !important;
    }

    .poster__social {
      width: 38px;
      height: 38px;
    }

    .poster__social svg {
      width: 19px;
      height: 19px;
    }
  }
`;
function Poster({ p }) {
  const ref = useRef(null);

  const move = (e) => {
    if (!ref.current) return;

    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const s = ref.current.style;

    s.setProperty('--ry', `${(x - 0.5) * 22}deg`);
    s.setProperty('--rx', `${(0.5 - y) * 18}deg`);
    s.setProperty('--gx', `${x * 100}%`);
    s.setProperty('--gy', `${y * 100}%`);
  };

  const leave = () => {
    if (!ref.current) return;

    const s = ref.current.style;
    s.setProperty('--ry', '0deg');
    s.setProperty('--rx', '0deg');
  };

  return (
    <div
      className={`poster${p.big ? ' poster--big' : ''}`}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      <article className="poster__in group" ref={ref}>
        <img
          src={img(p.file)}
          alt={`${p.first} ${p.last}, ${p.role}`}
        />

        <div className="poster__shade" />

        <div className="poster__role">
          {p.role}
        </div>

        <div className="poster__name">
          <h3>
            {p.first}
            <br />
            {p.last}
          </h3>
        </div>

        {/* Black gradient rises from the bottom on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-36 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 45%, transparent 100%)',
          }}
        />

        {/* Vertically stacked social icons on the right */}
        <nav
          className="poster__socials"
          aria-label={`${p.first} ${p.last}'s social links`}
        >
          {/* LinkedIn */}
          <a
            className="poster__social"
            href={p.linkedin || undefined}
            target={p.linkedin ? '_blank' : undefined}
            rel={p.linkedin ? 'noopener noreferrer' : undefined}
            aria-disabled={!p.linkedin}
            onClick={(event) => {
              if (!p.linkedin) event.preventDefault();
            }}
            aria-label={
              p.linkedin
                ? `${p.first} ${p.last}'s LinkedIn profile`
                : 'LinkedIn profile unavailable'
            }
            title={
              p.linkedin
                ? 'LinkedIn profile'
                : 'LinkedIn profile unavailable'
            }
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M8 10v7M8 7.5v.1M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" />
            </svg>
          </a>

          {/* Email */}
          <a
            className="poster__social"
            href={p.email ? `mailto:${p.email}` : undefined}
            aria-disabled={!p.email}
            onClick={(event) => {
              if (!p.email) event.preventDefault();
            }}
            aria-label={
              p.email
                ? `Email ${p.first} ${p.last}`
                : 'Email unavailable'
            }
            title={p.email || 'Email unavailable'}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </a>
        </nav>

        <div className="poster__glare" />
      </article>
    </div>
  );
}

export default function LeadCast() {
  const root = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.poster',
        {
          y: 140,
          rotationX: 40,
          opacity: 0,
          transformPerspective: 1200,
        },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.lead__beam',
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 60%',
            end: 'center 50%',
            scrub: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="lead" className="lead" ref={root}>
      <style>{socialStyles}</style>

      <div className="lead__beam" aria-hidden="true" />

      <p className="lead__label">
        ★ NOW STARRING ★
      </p>

      {/* First row: Chairpersons */}
      <div className="lead__row">
        {CAST.slice(0, 2).map((p) => (
          <Poster key={p.role} p={p} />
        ))}
      </div>

      {/* Second row: Vice-Chairpersons */}
      <div className="lead__row lead__row--sm">
        {CAST.slice(2).map((p) => (
          <Poster key={p.role} p={p} />
        ))}
      </div>
    </section>
  );
}
