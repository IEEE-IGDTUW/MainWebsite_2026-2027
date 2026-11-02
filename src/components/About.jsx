
const aimCards = [
  {
    number: '01',
    heading: 'Who Are We?',
    description:
        'We are IEEE IGDTUW, the dynamic student branch of IEEE at Indira Gandhi Delhi Technical University for Women. As part of IEEE’s global mission, we’re dedicated to advancing technology for humanity under the prestigious Region 10 of the Delhi Section.',
  },
  {
    number: '02',
    heading: 'What Drives Us?',
    description:
        'At IEEE WIE IGDTUW, we empower young women to take the lead in technology. Our mission is to inspire the next generation to embrace technical roles with confidence and to leave a lasting, positive impact on society.',
  },
  {
    number: '03',
    heading: 'Why We Do It?',
    description:
        'We are driven by a commitment to push the boundaries of technology. By hosting engaging workshops, events, and hands-on activities, we ensure that our members stay ahead in the ever-evolving tech landscape, fostering innovation and learning.',
  },
  {
    number: '04',
    heading: 'Our Journey',
    description:
        'Since our inception as IEEE IGIT on 6th February 2004, we’ve grown from just 33 members to a thriving community of over 200 active changemakers. Our journey is a testament to the power of knowledge and collaboration.',
  },
]

export default function About() {
  return (
      <section
          id="about"
          className="relative overflow-hidden bg-bg text-fg"
      >
        <div className="mx-auto max-w-[1800px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">

          {/* Top divider & label */}
          <div className="flex items-center justify-between border-b border-border/30 pb-9">
          

           
          </div>

          {/* Main headline and intro */}
          <div className="grid grid-cols-1 gap-12 pt-14 lg:grid-cols-12 lg:gap-10">

            {/* Left: Heading */}
            <div className="lg:col-span-8">
              <h2 className="about-heading text-[clamp(3.5rem,8vw,7.5rem)] lg:text-[clamp(3rem,5.2vw,5.2rem)]">
                Technology is better
                <span>together.</span>
              </h2>
            </div>

            {/* Right: Description & Meet the Community */}
            <div className="flex flex-col justify-between lg:col-span-4 lg:pt-4">
              <p className="max-w-lg text-base leading-8 text-fg-muted sm:text-lg sm:leading-[2.2rem]">
                IEEE IGDTUW is where ambitious women engineers find their people,
                their practice, and their permission to take up space.
              </p>

              <div className="pt-6">
                <a
                    href="#team"
                    className="group inline-flex items-center gap-5 border-b border-border/60 pb-3 text-sm font-medium tracking-wide transition hover:border-secondary hover:text-heading"
                >
                  MEET THE COMMUNITY
                  <span className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
                </a>
              </div>
            </div>
          </div>

          {/* Central Aim Statement */}
          <div className="mt-14 sm:mt-20">
            <div className="about-aim-panel relative overflow-hidden rounded-2xl border border-border/50 bg-surface/60 p-8 sm:p-12 lg:p-14 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-secondary" />
                <p className="text-xs font-bold tracking-[0.22em] text-secondary">
                  OUR AIM
                </p>
              </div>

              <blockquote className="mt-6 max-w-5xl text-2xl font-bold leading-snug tracking-tight text-heading sm:text-3xl lg:text-4xl">
                &ldquo;We aim to foster innovation and technical excellence among young engineers, promoting socially responsible advancements that contribute to a globally competitive India.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Four Aim & Mission Cards */}
          <div className="mt-14 sm:mt-20">
            <div className="mb-8 flex items-center justify-between">
              <div>
                
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                  Aim & Mission
                </h3>
              </div>
              
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aimCards.map((card) => (
                  <div
                      key={card.number}
                      className="card flex h-full flex-col justify-between p-7 sm:p-8"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-6">
                    <span className="text-xs font-bold tracking-[0.2em] text-secondary">
                      {card.number}
                    </span>
                        <span className="h-2 w-2 rounded-full bg-secondary/40" />
                      </div>

                      <h4 className="text-xl font-bold tracking-tight text-heading">
                        {card.heading}
                      </h4>

                      <p className="mt-4 text-sm leading-7 text-fg-muted">
                        {card.description}
                      </p>
                    </div>
                  </div>
              ))}
            </div>
          </div>

        </div>
      </section>
  )
}
