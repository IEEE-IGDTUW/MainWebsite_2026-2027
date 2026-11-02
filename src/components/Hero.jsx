import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import teamPhoto from '../assets/TeamPic.a2ef9f98.jpg';
import Navbar from './Navbar';
import './scene3d.css';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Draws the front page of "The IEEE IGDTUW Times" onto a canvas.
function drawPaper(ctx, W, H, img) {
  const ink = '#231a10';
  ctx.fillStyle = '#ece6d6'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 3000; i++) { ctx.fillStyle = `rgba(90,60,20,${Math.random() * 0.09})`; ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2); }
  ctx.strokeStyle = ink; ctx.fillStyle = ink; ctx.textAlign = 'center';
  ctx.lineWidth = 7; ctx.strokeRect(36, 36, W - 72, H - 72); ctx.lineWidth = 2; ctx.strokeRect(52, 52, W - 104, H - 104);
  ctx.font = '700 26px "Courier New",monospace';
  ctx.fillText('VOL. XXIV · NO. 1 · NEW DELHI · PRICE: ONE CURIOUS MIND', W / 2, 108);
  ctx.font = '900 124px Georgia,"Times New Roman",serif';
  ctx.fillText('THE IEEE', W / 2, 232); ctx.fillText('IGDTUW TIMES', W / 2, 350);
  ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(80, 382); ctx.lineTo(W - 80, 382); ctx.stroke();
  ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(80, 394); ctx.lineTo(W - 80, 394); ctx.stroke();
  ctx.fillStyle = '#c4161f'; ctx.font = 'italic 700 58px Georgia,serif'; ctx.fillText('Ideas into impact.', W / 2, 468);
  const px = 86, py = 500, pw = W - 172, ph = 520;
  ctx.fillStyle = '#b9ab8a'; ctx.fillRect(px, py, pw, ph);
  if (img) {
    const s = Math.max(pw / img.width, ph / img.height), w = img.width * s, h = img.height * s;
    ctx.save(); ctx.beginPath(); ctx.rect(px, py, pw, ph); ctx.clip();
    ctx.filter = 'grayscale(1) contrast(1.15) sepia(.3)';
    ctx.drawImage(img, px + (pw - w) / 2, py + (ph - h) * 0.42, w, h); ctx.restore(); ctx.filter = 'none';
  }
  ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.strokeRect(px, py, pw, ph);
  ctx.fillStyle = ink; ctx.font = '22px "Courier New",monospace'; ctx.textAlign = 'left';
  
  let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const colW = (W - 172 - 60) / 3;
  for (let c = 0; c < 3; c++) {
    for (let y = 1100; y < H - 100; y += 17) {
      ctx.fillStyle = 'rgba(35,26,16,.55)';
      ctx.fillRect(86 + c * (colW + 30), y, colW * (0.62 + rnd() * 0.38), 5);
    }
    if (c < 2) { ctx.fillStyle = ink; ctx.fillRect(86 + (c + 1) * (colW + 30) - 15, 1095, 2, H - 1200); }
  }
}

function sheetTexture() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 360;
  const x = c.getContext('2d'); x.fillStyle = '#e8dbb8'; x.fillRect(0, 0, 256, 360);
  x.fillStyle = '#2a2015'; x.fillRect(20, 24, 216, 5); x.font = '900 34px Georgia,serif'; x.fillText('THE TIMES', 28, 70);
  for (let y = 100; y < 340; y += 12) { x.fillStyle = 'rgba(42,32,21,.5)'; x.fillRect(20, y, 150 + ((y * 7) % 80), 4); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export default function Hero({ startUnroll = true }) {
  const mount = useRef(null);
  const section = useRef(null);
  const overlay = useRef(null);
  const startUnrollRef = useRef(startUnroll);
  const [noGL, setNoGL] = useState(false);

  useEffect(() => {
    startUnrollRef.current = startUnroll;
  }, [startUnroll]);

  useEffect(() => {
    const el = mount.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { setNoGL(true); return undefined; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100); camera.position.z = 9.5;
    scene.add(new THREE.AmbientLight(0xfff6e4, 1.4));
    const sun = new THREE.DirectionalLight(0xffeccc, 1.5); sun.position.set(-3, 4, 6); scene.add(sun);

    // front page
    const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 1448;
    const cx = cv.getContext('2d'); drawPaper(cx, 1024, 1448, null);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
    const im = new Image(); im.onload = () => { drawPaper(cx, 1024, 1448, im); tex.needsUpdate = true; }; im.src = teamPhoto;
    const geo = new THREE.PlaneGeometry(3.4, 4.8, 32, 200);
    const base = geo.attributes.position.array.slice();
    const paper = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.9 }));
    // soft shadow
    const sc = document.createElement('canvas'); sc.width = sc.height = 128;
    const sx = sc.getContext('2d'); const g = sx.createRadialGradient(64, 64, 10, 64, 64, 64);
    g.addColorStop(0, 'rgba(228,32,47,.55)'); g.addColorStop(1, 'rgba(228,32,47,0)'); sx.fillStyle = g; sx.fillRect(0, 0, 128, 128);
    const shadowMaterial = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, opacity: 0, depthWrite: false });
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 6), shadowMaterial);
    shadow.position.set(0.25, -0.3, -0.35); paper.add(shadow);
    const roll = new THREE.Group();
    const rollMaterial = new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.95 });
    const rollTube = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.46, 48, 1, true), rollMaterial);
    rollTube.rotation.y = Math.PI / 2;
    roll.add(rollTube);
    const rollEndMaterial = new THREE.MeshStandardMaterial({ color: '#b7a37e', roughness: 1 });
    const spiralPoints = Array.from({ length: 81 }, (_, index) => {
      const angle = (index / 80) * Math.PI * 4;
      const radius = 0.006 + (index / 80) * 0.065;
      return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    });
    const spiralGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(spiralPoints), 120, 0.004, 5, false);
    const rollEndCaps = [];
    [-1, 1].forEach((side) => {
      const endCap = new THREE.Group();
      endCap.position.y = side * 1.74;
      const end = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.035, 32), rollEndMaterial);
      endCap.add(end);
      const spiral = new THREE.Mesh(spiralGeometry, rollMaterial);
      spiral.position.y = side * 0.019;
      endCap.add(spiral);
      roll.add(endCap);
      rollEndCaps.push(endCap);
    });
    roll.rotation.z = Math.PI / 2;
    paper.add(roll);
    scene.add(paper);

    // floating sheets
    const st = sheetTexture(); const sheets = []; const sg = new THREE.PlaneGeometry(0.72, 1.01);
    for (let i = 0; i < 10; i++) {
      const m = new THREE.Mesh(sg, new THREE.MeshStandardMaterial({
        map: st,
        side: THREE.DoubleSide,
        roughness: 1,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        color: new THREE.Color().setHSL(i % 4 === 0 ? 0 : 0.1, i % 4 === 0 ? 0.72 : 0.1, 0.42 + Math.random() * 0.22)
      }));
      const startY = 1.5 + Math.random() * 4;
      m.position.set((Math.random() - 0.5) * 13, startY, -5 - Math.random() * 3);
      m.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      m.userData = { startY, phase: Math.random() * Math.PI * 2, rotation: [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5] };
      scene.add(m); sheets.push(m);
    }

    const S = { p: 0, mx: 0, my: 0, cx: 0, cy: 0, visible: true };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const intro = { rz: reduced && startUnrollRef.current ? 0 : -9 };
    const unroll = {
      progress: reduced && startUnrollRef.current ? 1 : 0,
      started: reduced && startUnrollRef.current,
    };

    const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();
    const onScroll = () => {
      const r = section.current.getBoundingClientRect();
      S.p = clamp(-r.top / (r.height - innerHeight));
      S.visible = r.bottom > 0;
      if (overlay.current) { overlay.current.style.opacity = 1 - clamp(S.p / 0.22); overlay.current.style.transform = `translateY(${-S.p * 80}px)`; }
    };
    const onMove = (e) => { S.mx = e.clientX / innerWidth - 0.5; S.my = e.clientY / innerHeight - 0.5; };
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('pointermove', onMove, { passive: true }); onScroll();

    const clock = new THREE.Clock(); let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!S.visible) return;
      const t = clock.getElapsedTime(), dt = Math.min(clock.getDelta(), 0.05) || 0.016, p = S.p;
      if (startUnrollRef.current && !unroll.started) {
        unroll.started = true;
        if (reduced) {
          unroll.progress = 1;
          intro.rz = 0;
        } else {
          gsap.to(intro, { rz: 0, duration: 3.8, ease: 'power3.out' });
          gsap.to(unroll, { progress: 1, duration: 3.8, ease: 'power2.inOut' });
        }
      }
      S.cx += (S.mx - S.cx) * 0.06; S.cy += (S.my - S.cy) * 0.06;
      const wide = camera.aspect > 1.15;
      const bx = wide ? Math.min(3.2, camera.aspect * 1.35) : 0;
      const exit = Math.pow(clamp((p - 0.55) / 0.45), 2);
      paper.position.set(bx * (1 - clamp(p / 0.6) * 0.75), Math.sin(t * 0.8) * 0.1 + exit * 9, p * 2.4);
      paper.scale.setScalar((wide ? 1 : 0.8) * (1 + p * 0.25));
      paper.rotation.set(-S.cy * 0.22 + p * 0.3 + Math.sin(t * 0.5) * 0.03, S.cx * 0.45 + p * 1.15, intro.rz + Math.sin(t * 0.6) * 0.025 - p * 0.12);
      const pos = geo.attributes.position;
      const sheetHeight = 4.8;
      const revealedDistance = unroll.progress * sheetHeight;
      const rollY = sheetHeight / 2 - revealedDistance;
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3], y = base[i * 3 + 1];
        const distanceFromTop = sheetHeight / 2 - y;
        const revealed = distanceFromTop <= revealedDistance;
        pos.setY(i, revealed ? y : rollY);
        pos.setZ(i, revealed ? Math.sin(x * 1.2 + t * 0.9) * 0.05 + p * Math.sin(y * 1.1) * 0.3 + x * x * 0.02 : 0);
      }
      pos.needsUpdate = true; geo.computeVertexNormals();
      roll.position.set(0, rollY, 0.1);
      rollTube.rotation.y = unroll.progress * Math.PI / 2;
      rollEndCaps.forEach((endCap) => {
        endCap.rotation.y = unroll.progress * Math.PI / 2;
      });
      roll.visible = unroll.progress < 0.985;
      shadowMaterial.opacity = Math.min(1, unroll.progress * 2) * 0.55;
      sheets.forEach((m) => {
        const d = m.userData;
        const sway = t * 0.24 + d.phase;
        m.position.y = d.startY + Math.sin(sway) * 0.08;
        m.rotation.x += d.rotation[0] * 0.0007;
        m.rotation.y += d.rotation[1] * 0.0008;
        m.rotation.z += d.rotation[2] * 0.0006;
      });
      camera.position.x = S.cx * 0.8; camera.position.y = -S.cy * 0.5; camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('pointermove', onMove);
      gsap.killTweensOf([intro, unroll]);
      renderer.dispose(); el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="home" className="h3d" ref={section}>
      <div className="h3d__stick">
        <div className="h3d__canvas" ref={mount} aria-hidden="true" />
        <div className="h3d__wash" aria-hidden="true" />
        {noGL && <img className="h3d__fallback" src={teamPhoto} alt="" />}
        <Navbar />
        <div className="h3d__rec"><i />REC · </div>
        <div className="h3d__text" ref={overlay}>
          <h1>Build what<span> comes next.</span></h1>
          <p className="h3d__deck">A community of women engineers turning curiosity into capability, one experiment, one conversation, and one brave idea at a time.</p>
          <div className="h3d__cta">
            <a className="newspaper-button newspaper-button--primary" href="#events">Explore events <span aria-hidden="true">↗</span></a>
            <a className="newspaper-button newspaper-button--outline" href="#about">Our story <span aria-hidden="true">↓</span></a>
          </div>
        
        </div>
      </div>
    </section>
  );
}
