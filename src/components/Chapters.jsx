import { useState } from "react";

const chapters = [
  {
    id: "01",
    acronym: "WIE",
    name: "Women in Engineering",
    description:
      "A room for bold ideas, brave questions, and the next generation of women leaders.",
    link: "https://wie.ieee.org/",
  },
  {
    id: "02",
    acronym: "CS",
    name: "Computer Society",
    description:
      "Building the systems, communities, and open-source futures we want to see.",
    link: "https://www.computer.org/",
  },
  {
    id: "03",
    acronym: "RAS",
    name: "Robotics & Automation",
    description:
      "From first prototype to flight-ready thinking. Make something move.",
    link: "https://www.ieee-ras.org/",
  },
  {
    id: "04",
    acronym: "IAS",
    name: "Industry Applications",
    description:
      "Bringing engineering out of the lab and into the world around us.",
    link: "https://ias.ieee.org/",
  },
];

const css = `
.chapters-root {
  --bg: #F0E7D2;
  --fg: #30291F;
  --heading: #8C3027;
  --chapter-muted: #675A48;
  --chapter-line: rgba(48, 41, 31, 0.2);
  --card-bg: rgba(245, 238, 220, 0.7);
  --card-hover: rgba(245, 238, 220, 0.95);
  --card-border: rgba(48, 41, 31, 0.3);

  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: var(--bg);
  color: var(--fg);
  transition: background 0.3s ease, color 0.3s ease;
}

/* Dark theme */
.dark .chapters-root {
  --bg: #0f0f11;
  --fg: #E8DDC6;
  --heading: #e4202f;
  --chapter-muted: #C0B39C;
  --chapter-line: rgba(232, 221, 198, 0.2);
  --card-bg: rgba(255, 255, 255, 0.035);
  --card-hover: rgba(255, 255, 255, 0.07);
  --card-border: rgba(232, 221, 198, 0.2);
}

/* Background lighting */
.chapters-root::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse at 85% 10%,
      rgba(40, 81, 138, 0.12),
      transparent 55%
    ),
    radial-gradient(
      ellipse at 5% 85%,
      rgba(84, 116, 158, 0.10),
      transparent 50%
    );
}

.dark .chapters-root::before {
  background:
    radial-gradient(
      ellipse at 85% 10%,
      rgba(228, 208, 118, 0.10),
      transparent 55%
    ),
    radial-gradient(
      ellipse at 5% 85%,
      rgba(40, 81, 138, 0.3),
      transparent 50%
    );
}

/* Chapter list */
.ch-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Chapter cards */
.ch-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
  min-height: 260px;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  color: var(--fg);
  text-decoration: none;
  overflow: hidden;
  transition:
    flex 0.65s cubic-bezier(0.2, 0.8, 0.2, 1),
    background 0.4s,
    border-color 0.4s,
    box-shadow 0.4s;
}

/* Accent glow */
.ch-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    110% 100% at 0% 100%,
    rgba(40, 81, 138, 0.16),
    transparent 72%
  );
  opacity: 0;
  transition: opacity 0.45s;
}

.dark .ch-card::before {
  background: radial-gradient(
    110% 100% at 0% 100%,
    rgba(228, 208, 118, 0.24),
    transparent 72%
  );
}

.ch-top {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.ch-idx {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--chapter-muted);
}

/* Arrow button */
.ch-btn {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1.5px solid var(--heading);
  color: var(--heading);
  background: transparent;
  transition:
    background 0.35s,
    color 0.35s,
    transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 0.3s;
}

.ch-btn svg {
  width: 22px;
  height: 22px;
}

.ch-bottom {
  position: relative;
  min-width: 0;
}

.ch-acr {
  display: block;
  font-size: clamp(3.4rem, 6vw, 7rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.07em;
  color: var(--fg);
  transition: color 0.4s, transform 0.4s;
}

.ch-more {
  margin-top: 18px;
}

.ch-nm {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--heading);
}

.ch-dsc {
  margin: 8px 0 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--chapter-muted);
  max-width: 34ch;
}

.ch-visit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  font-size: 14px;
  font-weight: 700;
  color: var(--heading);
  border-bottom: 1.5px solid var(--heading);
  padding-bottom: 4px;
}

.ch-card:focus-visible {
  outline: 2px solid var(--heading);
  outline-offset: 3px;
}

/* Desktop: expandable horizontal cards */
@media (min-width: 900px) {
  .ch-list {
    flex-direction: row;
    height: 480px;
  }

  .ch-card {
    flex: 1;
    min-width: 0;
    min-height: 0;
  }

  .ch-card.on {
    flex: 3.4;
    border-color: var(--heading);
    background: var(--card-hover);
    box-shadow: 0 14px 36px rgba(11, 57, 120, 0.10);
  }

  .dark .ch-card.on {
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.15);
  }

  .ch-card.on::before {
    opacity: 1;
  }

  .ch-card.on .ch-acr {
    color: var(--heading);
    transform: translateX(4px);
  }

  .ch-card.on .ch-btn {
    background: var(--heading);
    color: var(--bg);
    transform: rotate(45deg);
  }

  .ch-more {
    width: min(360px, 90%);
    opacity: 0;
    transform: translateY(14px);
    transition:
      opacity 0.35s,
      transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .ch-card.on .ch-more {
    opacity: 1;
    transform: none;
    transition-delay: 0.2s;
  }

  .ch-card:not(.on) .ch-btn {
    opacity: 0.8;
  }

  .ch-card:not(.on):hover {
    border-color: var(--heading);
    background: var(--card-hover);
  }
}

/* Tablet */
@media (min-width: 600px) and (max-width: 899px) {
  .ch-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .ch-card {
    min-height: 300px;
  }

  .ch-acr {
    font-size: clamp(3rem, 7vw, 5rem);
  }

  .ch-more {
    opacity: 1;
    transform: none;
  }

  .ch-card.on {
    border-color: var(--heading);
    background: var(--card-hover);
  }

  .ch-card.on::before {
    opacity: 1;
  }
}

/* Mobile */
@media (max-width: 599px) {
  .ch-list {
    gap: 14px;
  }

  .ch-card {
    min-height: 230px;
    padding: 22px;
    border-radius: 16px;
  }

  .ch-acr {
    font-size: clamp(3.5rem, 15vw, 5rem);
  }

  .ch-more {
    opacity: 1;
    transform: none;
  }

  .ch-card.on {
    border-color: var(--heading);
    background: var(--card-hover);
  }

  .ch-card.on::before {
    opacity: 1;
  }

  .ch-nm {
    font-size: 1.1rem;
  }

  .ch-dsc {
    font-size: 0.9rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .ch-card,
  .ch-card *,
  .ch-card::before {
    transition: none !important;
  }
}
`;

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 19L19 5M8 5h11v11" />
  </svg>
);

export default function Chapters() {
  const [active, setActive] = useState(0);

  return (
    <section id="chapters" className="chapters-root scroll-mt-24">
      <style>{css}</style>

      <div className="mx-auto max-w-[1800px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        {/* Top label */}
        <div
          className="flex items-center justify-between border-b pb-9"
          style={{ borderColor: "var(--chapter-line)" }}
        >
          

          
        </div>

        {/* Heading and description */}
        <div className="grid grid-cols-1 gap-8 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24">
          <div className="lg:col-span-8">
            <h2 className="text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.91] tracking-[-0.075em]">
              Your curiosity
              <span className="block" style={{ color: "var(--heading)" }}>
                has a chapter.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pl-4">
            <p
              className="max-w-md text-base leading-7 sm:text-lg sm:leading-8"
              style={{ color: "var(--chapter-muted)" }}
            >
              Different disciplines. Same energy. Plug into the part of IEEE
              that makes you want to stay late.
            </p>
          </div>
        </div>

        {/* Chapter cards */}
        <div className="ch-list">
          {chapters.map((chapter, index) => (
            <a
              key={chapter.id}
              href={chapter.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`ch-card${active === index ? " on" : ""}`}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              <div className="ch-top">
                <span className="ch-idx">{chapter.id}</span>

                <span className="ch-btn" aria-hidden="true">
                  <Arrow />
                </span>
              </div>

              <div className="ch-bottom">
                <span className="ch-acr">{chapter.acronym}</span>

                <div className="ch-more">
                  <div className="ch-nm">{chapter.name}</div>

                  <p className="ch-dsc">{chapter.description}</p>

                  <span className="ch-visit">
                    Visit chapter <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-8 flex flex-col justify-between gap-3 text-[10px] tracking-[0.15em] sm:flex-row sm:text-xs"
          style={{ color: "var(--chapter-muted)" }}
        >
         
        </div>
      </div>
    </section>
  );
}