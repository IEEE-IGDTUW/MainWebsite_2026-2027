import { useEffect, useState } from 'react';
import './Intro.css';

export default function Intro({ onFinish }) {
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!opening) return undefined;
    const timeout = window.setTimeout(onFinish, 1500);
    return () => window.clearTimeout(timeout);
  }, [opening, onFinish]);

  return (
    <div
      className={`intro-cover${opening ? ' is-opening' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && opening) onFinish();
      }}
    >
      <div className="intro-cover__grain" aria-hidden="true" />
      <div className="intro-cover__film intro-cover__film--top" aria-hidden="true" />
      <section className="intro-cover__stage">
        <p className="intro-cover__eyebrow">A STUDENT BRANCH OF IEEE · EST. 2004</p>
        <div className="intro-cover__mark">
          <span className="intro-cover__orbit intro-cover__orbit--outer" />
          <span className="intro-cover__orbit intro-cover__orbit--inner" />
          <img src={`${import.meta.env.BASE_URL}ieee-logo.png`} alt="" />
        </div>
        <p className="intro-cover__edition">PRESENTS · THE CAMPUS EDITION</p>
        <h1 id="intro-title">
          WOMEN WHO
          <span>ENGINEER CHANGE.</span>
        </h1>
        <div className="intro-cover__bottom">
          <p>Curiosity into technology. Community into change.</p>
          <span className="intro-cover__action">
            <button
              className="intro-cover__button"
              type="button"
              onClick={() => setOpening(true)}
              disabled={opening}
            >
              {opening ? 'ROLL CAMERA' : 'ENTER THE STORY'}
              <span aria-hidden="true">↗</span>
            </button>
            <span className="intro-cover__cursor-cue" aria-hidden="true">
              <svg viewBox="0 0 24 30" focusable="false">
                <path d="M3 2v22l6-6 4 9 4-2-4-9h8L3 2z" />
              </svg>
              <span>CLICK</span>
            </span>
          </span>
        </div>
      </section>
      <div className="intro-cover__film intro-cover__film--bottom" aria-hidden="true" />
    
    </div>
  );
}
