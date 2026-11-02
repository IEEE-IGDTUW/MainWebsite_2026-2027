
import { useEffect, useRef, useState } from 'react'
import './Footer.css'

const LINKEDIN_URL = 'https://www.linkedin.com/company/ieee-igdtuw/'
const INSTAGRAM_URL = 'https://www.instagram.com/ieeeigdtuw'
const CONTACT_EMAIL = 'ieeeigdtu@gmail.com'

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const LinkedInIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 10.5V16M12 16v-3a2.2 2.2 0 0 1 4.4 0V16M12 10.5V16" />
    <circle cx="8" cy="7.6" r="0.6" fill="currentColor" />
  </svg>
)

const InstagramIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" />
  </svg>
)

const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7.5 8 6 8-6" />
  </svg>
)

const socials = [
  { label: 'LinkedIn', href: LINKEDIN_URL, Icon: LinkedInIcon, external: true },
  { label: 'Instagram', href: INSTAGRAM_URL, Icon: InstagramIcon, external: true },
  { label: 'Email', href: `mailto:${CONTACT_EMAIL}`, Icon: MailIcon, external: false },
]

export default function Footer() {
  const footerRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = footerRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className={`ieee-footer${revealed ? ' is-visible' : ''}`}
    >
      <div className="ieee-footer__inner">

        <div className="ieee-footer__grid">

          {/* Brand + tagline */}
          <div className="ieee-footer__col ieee-footer__brand">
            <a
              href="#home"
              className="ieee-footer__logo"
              aria-label="IEEE IGDTUW home"
            >
              <span
                className="ieee-footer__logo-mark"
                aria-hidden="true"
                style={{
                  '--logo-url': `url(${import.meta.env.BASE_URL}ieee-logo.png)`,
                }}
              />
            </a>

            <p className="ieee-footer__tagline">
              Advancing technology for humanity, powered by women who
              engineer the future.
            </p>
          </div>

          {/* Contact */}
          <div className="ieee-footer__col ieee-footer__contact">
            <h3 className="ieee-footer__label">Contact us</h3>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="ieee-footer__mail"
            >
              {CONTACT_EMAIL}
              <span className="ieee-footer__arrow" aria-hidden="true">
                ↗
              </span>
            </a>

            <address className="ieee-footer__address">
              Kashmere Gate,
              <br />
              Delhi 110006
            </address>
          </div>

          {/* Social */}
          <div className="ieee-footer__col ieee-footer__social">
            <h3 className="ieee-footer__label">Follow us</h3>

            <ul className="ieee-footer__tube">
              {socials.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    className="ieee-footer__icon"
                    {...(external
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="ieee-footer__rule" />

        {/* Copyright */}
        <div className="ieee-footer__legal">
          <p>© {new Date().getFullYear()} IEEE IGDTUW</p>
          <span aria-hidden="true">·</span>
          <p>Made with 💗</p>

          <a href="#home" className="ieee-footer__top">
            BACK TO TOP
            <span className="ieee-footer__arrow" aria-hidden="true">
              ↑
            </span>
          </a>
        </div>

      </div>
    </footer>
  )
}
