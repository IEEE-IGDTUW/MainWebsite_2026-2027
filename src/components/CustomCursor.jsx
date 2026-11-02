import { useEffect, useRef } from "react";
import "../styles/cursor.css";

const HOVER = 'a, button, [role="button"], [role="tab"], summary, label[for], select, input[type="checkbox"], input[type="radio"], input[type="submit"], .btn, .poster, [data-cursor="hover"]';
const TEXT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]';

/* Reads the site theme. Adjust this if your toggle works differently. */
function getTheme() {
    const r = document.documentElement;
    const b = document.body;
    const attr = r.getAttribute("data-theme") || b.getAttribute("data-theme");
    if (attr) return /dark/i.test(attr) ? "dark" : "light";
    if (r.classList.contains("dark") || b.classList.contains("dark")) return "dark";
    if (r.classList.contains("light") || b.classList.contains("light")) return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function CustomCursor() {
    const wrap = useRef(null);
    const dot = useRef(null);
    const ring = useRef(null);

    useEffect(() => {
        // only for mouse / trackpad devices, touch screens keep the normal pointer
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

        const root = document.documentElement;
        const w = wrap.current;
        root.classList.add("has-cursor");

        let theme = getTheme();
        let x = -100, y = -100, raf = 0;
        const state = { t: "", hover: false, text: false, down: false, hide: true };

        const set = (k, v, cls) => {
            if (state[k] === v) return;
            state[k] = v;
            if (cls) w.classList.toggle(cls, v);
        };
        const setTheme = (t) => {
            if (state.t !== t) { state.t = t; w.dataset.t = t; }
        };
        setTheme(theme);
        w.classList.add("is-hidden");

        const onMove = (e) => {
            x = e.clientX;
            y = e.clientY;
            set("hide", false, "is-hidden");
            const el = e.target;
            if (!(el instanceof Element)) return;
            set("hover", !!el.closest(HOVER), "is-hover");
            set("text", !!el.closest(TEXT), "is-text");
            // the Open Source Week page is always dark, so use the dark pointer there
            setTheme(theme);
        };
        const onDown = () => set("down", true, "is-down");
        const onUp = () => set("down", false, "is-down");
        const onLeave = () => set("hide", true, "is-hidden");

        const loop = () => {
            dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
            ring.current.style.transform = `translate3d(${x}px,${y}px,0)`;
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        // react to light/dark changes (class or data-theme change, or OS setting)
        const mo = new MutationObserver(() => { theme = getTheme(); setTheme(theme); });
        mo.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });
        mo.observe(document.body, { attributes: true, attributeFilter: ["class", "data-theme"] });
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onMq = () => { theme = getTheme(); setTheme(theme); };
        mq.addEventListener("change", onMq);

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown);
        window.addEventListener("pointerup", onUp);
        root.addEventListener("mouseleave", onLeave);

        return () => {
            cancelAnimationFrame(raf);
            mo.disconnect();
            mq.removeEventListener("change", onMq);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            root.removeEventListener("mouseleave", onLeave);
            root.classList.remove("has-cursor");
        };
    }, []);

    return (
        <div className="cur" ref={wrap} aria-hidden="true">
            <div className="cur-ring" ref={ring}><span /></div>
            <div className="cur-dot" ref={dot}><span /></div>
        </div>
    );
}