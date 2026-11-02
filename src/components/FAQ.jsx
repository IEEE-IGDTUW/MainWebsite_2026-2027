
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ACCENT = "#e4202f";
const ACCENT_INK = "#FFFFFF";
const CONTACT_EMAIL = "ieeeigdtu@gmail.com";

const FAQS = [
  {
    q: "What benefits do I get as a student member of IEEE?",
    a: "Technical communities, workshops and competitions, plus networking, learning resources and career-building opportunities.",
  },
  {
    q: "How can I stay updated on upcoming IEEE events?",
    a: "Follow our social media handles, check the Events section of this website, and join the branch community groups.",
  },
  {
    q: "Are IEEE events free for members?",
    a: "Many branch events are free or discounted for members. Larger conferences may charge a registration fee, and each event page lists the details.",
  },
  {
    q: "What types of conferences and events does IEEE host?",
    a: "Conferences, hackathons, workshops, webinars, expert talks and competitions across engineering and computing.",
  },
  {
    q: "How can I obtain IEEE research papers and publications?",
    a: "Through IEEE Xplore, via your IEEE membership or your institution's library subscription.",
  },
];

function ChipIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  );
}

function FlipCard({ item, index, reduce }) {
  const [flipped, setFlipped] = useState(false);

  const face = {
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  return (
    <div
      className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)]"
      style={{ perspective: 900 }}
    >
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={item.q}
        className="relative block h-[220px] w-full rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{ outlineColor: "var(--fg)" }}
      >
        <motion.span
          className="absolute inset-0 block"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 140, damping: 18 }
          }
        >
          {/* FRONT: Question */}
          <span
            aria-hidden={flipped}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border p-5 text-center"
            style={{
              ...face,
              background: "color-mix(in srgb, var(--bg) 60%, transparent)",
              borderColor: "var(--border)",
              color: "var(--fg)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            {/* Icon and number */}
            <span className="absolute left-5 right-5 top-5 flex items-center justify-between">
              <ChipIcon />

              <span
                className="rounded-full px-3.5 py-1 text-xs font-bold tracking-[0.2em]"
                style={{ background: ACCENT, color: ACCENT_INK }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </span>

            {/* Question */}
            <span className="block w-full px-1 text-base font-semibold leading-snug tracking-[-0.03em] sm:text-lg">
              {item.q}
            </span>

            {/* Flip instruction */}
            <span
              className="absolute bottom-5 border-b-4 pb-1 text-left text-[10px] font-bold tracking-[0.2em]"
              style={{ color: "var(--fg)", borderColor: ACCENT }}
            >
              FLIP FOR THE ANSWER
            </span>
          </span>

          {/* BACK: Answer */}
          <span
            aria-hidden={!flipped}
            className="absolute inset-0 flex flex-col rounded-xl border p-5"
            style={{
              ...face,
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--fg)",
              transform: "rotateY(180deg)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <span
              className="mb-3 block text-[11px] font-bold tracking-[0.2em]"
              style={{ color: "var(--accent)", opacity: 0.8 }}
            >
              ANSWER
            </span>

            <span className="block text-sm font-medium leading-relaxed sm:text-base">
              {item.a}
            </span>
          </span>
        </motion.span>
      </button>
    </div>
  );
}

export default function FAQ() {
  const reduce = useReducedMotion();

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = encodeURIComponent(`Website message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-bg text-fg"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          background: `
radial-gradient(
    ellipse at 82% 30%,
color-mix(in srgb, var(--palette-queen-blue) 38%, var(--bg)) 0%,
color-mix(in srgb, var(--palette-queen-blue) 14%, var(--bg)) 40%,
var(--bg) 75%
)
`,
        }}
      />

      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.16]"
        style={{
          backgroundImage: `
linear-gradient(to right, var(--palette-sage) 1px, transparent 1px),
linear-gradient(to bottom, var(--palette-sage) 1px, transparent 1px)
`,
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to right, transparent, black 35%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 35%, black 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[420px] w-[420px] rounded-full opacity-30 blur-[100px]"
        style={{ backgroundColor: ACCENT }}
      />

      <div className="mx-auto max-w-[1800px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">

        {/* Section header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">

          {/* Label */}
          <div className="lg:col-span-3">
            <p
              className="pt-2 text-xs font-semibold tracking-[0.2em]"
              style={{ color: "var(--fg-muted)" }}
            >
              
              FAQ
            </p>
          </div>

          {/* Main heading */}
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.075em]">
              Got
              <span className="block">questions?</span>
            </h2>
          </div>

        </div>

        {/* FAQ Cards */}
        <div
          className="mt-10 border-t pt-8 sm:mt-12 sm:pt-8"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-wrap justify-center gap-5">
            {FAQS.map((item, i) => (
              <FlipCard
                key={item.q}
                item={item}
                index={i}
                reduce={reduce}
              />
            ))}
          </div>
        </div>

        <div
          className="mt-12 border-t pt-8 sm:mt-16 sm:pt-10"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="mb-8">
            <div>
              <p
                className="mb-3 text-xs font-semibold tracking-[0.2em]"
                style={{ color: "var(--accent)" }}
              >
                STILL CURIOUS?
              </p>
              <h3 className="text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                Have another question?
              </h3>
              <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--fg-muted)" }}>
                Send us a message and we’ll get back to you.
              </p>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sr-only" htmlFor="faq-contact-name">Your name</label>
              <input
                id="faq-contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your Name"
                aria-label="Your name"
                required
                className="min-h-14 w-full border bg-transparent px-5 py-4 text-base outline-none transition-colors placeholder:text-[var(--fg-muted)] focus:border-[var(--accent)]"
                style={{ borderColor: "var(--border)", color: "var(--fg)" }}
              />
              <label className="sr-only" htmlFor="faq-contact-email">Email address</label>
              <input
                id="faq-contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email Address"
                aria-label="Email address"
                required
                className="min-h-14 w-full border bg-transparent px-5 py-4 text-base outline-none transition-colors placeholder:text-[var(--fg-muted)] focus:border-[var(--accent)]"
                style={{ borderColor: "var(--border)", color: "var(--fg)" }}
              />
            </div>
            <label className="sr-only" htmlFor="faq-contact-message">Your message</label>
            <textarea
              id="faq-contact-message"
              name="message"
              rows="5"
              placeholder="Your Message"
              aria-label="Your message"
              required
              className="w-full resize-y border bg-transparent px-5 py-4 text-base outline-none transition-colors placeholder:text-[var(--fg-muted)] focus:border-[var(--accent)]"
              style={{ borderColor: "var(--border)", color: "var(--fg)" }}
            />
            <button
              type="submit"
              className="inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-base font-bold text-white transition-colors hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ backgroundColor: ACCENT }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              Send Message
            </button>
            <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
              Messages go to {CONTACT_EMAIL}.
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}