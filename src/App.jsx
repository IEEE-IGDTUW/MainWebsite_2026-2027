//App.jsx
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Chapters from './components/Chapters';
import People from './components/People';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import GhostCursor from './components/GhostCursor';
import CustomCursor from './components/CustomCursor';
import LeadCast from './components/LeadCast';
// import PhotoHelix from './components/PhotoHelix';
import Fold3D from './components/Fold3D';
import Intro from './components/Intro';

function App() {
  const mainRef = useRef(null);
  const progressRef = useRef(null);
  const [introVisible, setIntroVisible] = useState(() => !window.location.hash);
  const [startNewspaperUnroll, setStartNewspaperUnroll] = useState(() => Boolean(window.location.hash));

  const finishIntro = () => {
    setIntroVisible(false);
    setStartNewspaperUnroll(true);
  };

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    let resetSeal = () => {};
    let handleHeroPointerMove = () => {};

    const context = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.25,
        },
      });

      gsap.to('.newspaper-hero__photo', {
        scale: 1.06,
        yPercent: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.newspaper-hero__stage', {
        yPercent: -5,
        scale: 0.98,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      const hero = mainRef.current?.querySelector('#home');
      const seal = hero?.querySelector('.newspaper-seal');
      const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      if (hero && seal && hasFinePointer) {
        const moveX = gsap.quickTo(seal, 'x', { duration: 0.7, ease: 'power3.out' });
        const moveY = gsap.quickTo(seal, 'y', { duration: 0.7, ease: 'power3.out' });
        const tiltX = gsap.quickTo(seal, 'rotationX', { duration: 0.7, ease: 'power3.out' });
        const tiltY = gsap.quickTo(seal, 'rotationY', { duration: 0.7, ease: 'power3.out' });

        handleHeroPointerMove = (event) => {
          const bounds = hero.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          moveX(x * 7);
          moveY(y * 5);
          tiltX(y * -7);
          tiltY(x * 9);
        };
        resetSeal = () => {
          moveX(0);
          moveY(0);
          tiltX(0);
          tiltY(0);
        };

        hero.addEventListener('pointermove', handleHeroPointerMove);
        hero.addEventListener('pointerleave', resetSeal);
      }

      gsap.utils.toArray('main > section:not(#home)').forEach((section) => {
        const heading = section.querySelector('h2');
        if (heading) {
          gsap.fromTo(
            heading,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              clearProps: 'transform,opacity,visibility',
              scrollTrigger: {
                trigger: heading,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            },
          );
        }

        const selector = section.id === 'team'
          ? '.none-team'
          : section.id === 'faq'
            ? '#faq button'
            : '.card, .ch-card, .circular-carousel';
        const items = section.querySelectorAll(selector);

        if (section.id === 'team') {
          items.forEach((item, index) => {
            gsap.fromTo(
              item,
              { autoAlpha: 0, y: 24 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                delay: (index % 7) * 0.025,
                ease: 'power2.out',
                clearProps: 'transform,opacity,visibility',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 92%',
                  toggleActions: 'play none none none',
                },
              },
            );
          });
        } else if (items.length) {
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.07,
              ease: 'power2.out',
              clearProps: 'transform,opacity,visibility',
              scrollTrigger: {
                trigger: items[0],
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            },
          );
        }
      });
    }, mainRef);

    return () => {
      const hero = mainRef.current?.querySelector('#home');
      if (hero) {
        hero.removeEventListener('pointermove', handleHeroPointerMove);
        hero.removeEventListener('pointerleave', resetSeal);
      }
      context.revert();
    };
  }, []);

  return (
    <>
      <GhostCursor
        color="#F5EEDC"
        brightness={1.2}
        size={40}
        trailLength={6}
        inertia={0}
        turbulence={0.12}
        drift={0.015}
        bloomStrength={0.45}
        bloomRadius={0.55}
        zIndex={9998}
      />
      <CustomCursor />
      {introVisible && <Intro onFinish={finishIntro} />}
      <div className="site-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <main ref={mainRef} inert={introVisible ? true : undefined}>
        <Hero startUnroll={startNewspaperUnroll} />
        <div className="signal-marquee" aria-hidden="true">
          <div className="signal-marquee__track">
            <span>IEEE IGDTUW</span><i>✳</i><span>TECHNOLOGY FOR HUMANITY</span><i>✳</i><span>CAMPUS EDITION · NEW DELHI</span><i>✳</i><span>IEEE IGDTUW</span><i>✳</i><span>TECHNOLOGY FOR HUMANITY</span><i>✳</i><span>CAMPUS EDITION · NEW DELHI</span><i>✳</i>
          </div>
        </div>
        <About />
        <Events />
        {/* <PhotoHelix /> */}
        <Chapters />
        <LeadCast />
        <People />
        <FAQ />
        <Footer />
        <Fold3D />
      </main>
    </>
  );
}

export default App;
