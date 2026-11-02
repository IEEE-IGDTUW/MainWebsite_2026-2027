import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './scene3d.css';

const TITLES = ['Vibeathon', 'WIEgnite 3.0', 'Mastering Cybersecurity', 'Career in the AI Era', 'World of Open Source', 'From NASA to CEO', 'Quadcopter Drone Workshop'];
const FILES = [['Ev 1.1', 0], ['Ev 2.1', 1], ['Ev 3.1', 2], ['Ev 4', 3], ['Ev 5.1', 4], ['Ev 6.1', 5], ['Ev 7.1', 6],
  ['Ev 1.2', 0], ['Ev 2.2', 1], ['Ev 3.2', 2], ['Ev 5.2', 4], ['Ev 6.2', 5], ['Ev 7.2', 6]];
const N = FILES.length, DT = (Math.PI * 2) / N, DY = 0.5, R = 7.5;
const url = (f) => encodeURI(`${import.meta.env.BASE_URL}Events/Images/${f}.jpeg`);

const VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }';
const FRAG = `uniform sampler2D map; uniform float uF; varying vec2 vUv;
void main(){
  vec3 c = texture2D(map, vUv).rgb; float g = dot(c, vec3(.299,.587,.114));
  vec2 cell = fract(vUv*vec2(86.,64.)) - .5; float r = length(cell);
  float d = smoothstep(r-.1, r+.1, sqrt(1.-g)*.62);
  vec3 ht = mix(vec3(.94,.89,.77), vec3(.14,.1,.07), d);
  vec3 col = mix(ht, c, uF); col *= mix(.8, 1., uF);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

export default function PhotoHelix() {
  const sec = useRef(null);
  const mount = useRef(null);
  const [idx, setIdx] = useState(0);
  const last = useRef(0);

  useEffect(() => {
    const el = mount.current; let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { return undefined; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100); camera.position.set(0, 0.2, 13);
    const root = new THREE.Group(); scene.add(root);
    const loader = new THREE.TextureLoader(); const items = [];
    FILES.forEach(([f], i) => {
      const grp = new THREE.Group(); const th = i * DT;
      grp.position.set(Math.sin(th) * R, i * DY, Math.cos(th) * R); grp.rotation.y = th;
      const tex = loader.load(url(f)); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
      const mat = new THREE.ShaderMaterial({ uniforms: { map: { value: tex }, uF: { value: 0 } }, vertexShader: VERT, fragmentShader: FRAG });
      const photo = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.4), mat);
      const frame = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 2.95), new THREE.MeshBasicMaterial({ color: 0xf7efd9 }));
      const edge = new THREE.Mesh(new THREE.PlaneGeometry(3.62, 3.07), new THREE.MeshBasicMaterial({ color: 0x231a10 }));
      const tape = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.26), new THREE.MeshBasicMaterial({ color: 0xd9bf84, transparent: true, opacity: 0.85 }));
      edge.position.z = -0.04; frame.position.z = -0.02; photo.position.set(0, 0.1, 0); tape.position.set(0, 1.5, 0.02); tape.rotation.z = (i % 2 ? 1 : -1) * 0.06;
      grp.add(edge, frame, photo, tape); root.add(grp); items.push({ grp, mat, th });
    });
    const S = { f: 0, cf: 0, mx: 0, my: 0, vis: false };
    const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.position.z = w / h < 1 ? 20 : 15.5; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();
    const onScroll = () => {
      const r = sec.current.getBoundingClientRect();
      S.vis = r.top < innerHeight && r.bottom > 0;
      S.f = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight))) * (N - 1);
    };
    const onMove = (e) => { S.mx = e.clientX / innerWidth - 0.5; S.my = e.clientY / innerHeight - 0.5; };
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('pointermove', onMove, { passive: true }); onScroll();
    let raf; const tick = () => {
      raf = requestAnimationFrame(tick); if (!S.vis) return;
      S.cf += (S.f - S.cf) * 0.09; const f = S.cf;
      root.rotation.y = -f * DT; root.position.y = -f * DY;
      items.forEach((it) => {
        let d = it.th - f * DT; d = Math.atan2(Math.sin(d), Math.cos(d));
        const a = Math.abs(d); it.mat.uniforms.uF.value = 1 - Math.min(1, Math.max(0, (a - 0.12) / 0.45));
      });
      camera.position.x = S.mx * 1.6; camera.position.y = 0.2 - S.my * 1.0; camera.lookAt(0, 0, 3);
      renderer.render(scene, camera);
      const i = Math.round(f); if (i !== last.current) { last.current = i; setIdx(i); }
    };
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('pointermove', onMove); renderer.dispose(); el.removeChild(renderer.domElement); };
  }, []);

  const [, t] = FILES[idx];
  return (
    <div id="reel">
      <div className="hx" ref={sec}>
        <div className="hx__stick">
          <div className="hx__canvas" ref={mount} />
          <div className="hx__cap"><b></b><span>{TITLES[t]}</span></div>
        </div>
      </div>
    </div>
  );
}
