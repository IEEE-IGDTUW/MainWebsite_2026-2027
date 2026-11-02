// Navbar.jsx
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

import './Navbar.css';

const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EVENTS', href: '#events' },
    { label: 'CHAPTERS', href: '#chapters' },
    { label: 'PEOPLE', href: '#team' },
     { label: 'FAQ', href: '#faq' },
];

const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ieee-igdtuw/', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/ieeeigdtuw', icon: 'instagram' },
    { label: 'Email', href: 'mailto:ieeeigdtu@gmail.com', icon: 'email' },
];

function SocialIcon({ type }) {
    if (type === 'linkedin') {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 8.5v10M5 5.5v.1M9.5 18.5v-10h4v1.8c.7-1.3 1.8-2 3.3-2 2.7 0 3.7 1.7 3.7 4.7v5.5h-4v-5c0-1.5-.3-2.5-1.8-2.5s-2.2 1-2.2 2.5v5h-3Z" />
            </svg>
        );
    }

    if (type === 'instagram') {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.7" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3.5 7 8.5 6 8.5-6" />
        </svg>
    );
}

const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
);

const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
);

function ThemeSwitch({ isDark, onClick }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            data-dark={isDark}
            onClick={onClick}
            className="theme-switch"
        >
            <span className="theme-switch__thumb">{isDark ? <MoonIcon /> : <SunIcon />}</span>
        </button>
    );
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState(0);
    const clicking = useRef(false);
    const { theme, toggle } = useTheme();

    const isDark = theme === 'dark';
    const accent = '#476998';

    // Scroll-spy: scroll karne par active nav item badalta hai
    useEffect(() => {
        const ids = navLinks.map((l) => l.href.slice(1));
        let timer;

        const update = () => {
            const line = window.scrollY + window.innerHeight * 0.35;
            let idx = 0;
            ids.forEach((id, i) => {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top + window.scrollY <= line) idx = i;
            });
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
                idx = ids.length - 1;
            }
            setActive(idx);
        };

        const onScroll = () => {
            if (clicking.current) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    clicking.current = false;
                    update();
                }, 150);
                return;
            }
            update();
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <header
            className="ieee-navbar fixed inset-x-0 top-0 z-[100]"
            data-dark={isDark}
            style={{ color: 'var(--fg)' }}
        >
            <nav className="mx-auto grid max-w-[1800px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 pt-2 sm:px-8 lg:px-12">
                {/* TUBE 1: Logo */}
                <a
                    href="#home"
                    aria-label="IEEE IGDTUW Home"
                    className="ieee-tube ieee-tube--logo justify-self-start"
                    onClick={() => setMenuOpen(false)}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}ieee-logo.png`}
                        alt="IEEE Logo"
                        className="h-8 w-auto object-contain sm:h-9"
                    />
                </a>

                {/* TUBE 2: Nav links */}
                <div className="ieee-tube ieee-tube--nav hidden justify-self-center lg:inline-flex">
                    <div className="ieee-plain-nav">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => {
                                    setActive(index);
                                    clicking.current = true;

                                    setTimeout(() => {
                                        clicking.current = false;
                                    }, 1500);
                                }}
                                className={`ieee-nav-pill ${active === index ? 'active' : ''}`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                
                {/* TUBE 3: Mobile menu + theme switch */}
                <div className="ieee-tube ieee-tube--actions justify-self-end">
                    <div className="ieee-social-links" aria-label="Social media and email">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                aria-label={link.label}
                                title={link.label}
                                target={link.icon === 'email' ? undefined : '_blank'}
                                rel={link.icon === 'email' ? undefined : 'noreferrer'}
                                className="ieee-social-link"
                            >
                                <SocialIcon type={link.icon} />
                            </a>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={menuOpen}
                        className="ieee-menu-btn"
                    >
                        {menuOpen ? 'CLOSE ×' : 'MENU ☰'}
                    </button>

                </div>

            </nav>

            {/* Mobile menu panel */}
            {menuOpen && (
                <div className="ieee-tube-panel lg:hidden">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="rounded-2xl px-4 py-3 text-sm font-semibold tracking-wide transition-transform duration-200 hover:translate-x-1"
                                style={{
                                    color: 'var(--fg)',
                                    borderLeft: `3px solid ${index === active ? accent : 'transparent'}`,
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}