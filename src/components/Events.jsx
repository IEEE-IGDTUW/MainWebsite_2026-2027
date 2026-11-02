
import { useEffect, useState } from 'react'
import CircularCarousel from './CircularCarousel'

// Supports the base path configured in vite.config.js for GitHub Pages.
const eventImage = (filename) =>
  `${import.meta.env.BASE_URL}Events/Images/${filename}`

const events = [
  {
    id: 1,
    title: 'Vibeathon',
    subtitle: 'APP DEVELOPMENT CHALLENGE',
    category: 'APP DEVELOPMENT & INNOVATION',
    date: '16 February',
    year: '2026',
    description:
      'VIBE-A-THON was an offline app development challenge organized by IEEE IGDTUW on 16th February, where participants designed and developed a functional digital platform for IEEE IGDTUW within a day. The event emphasized practical problem-solving, real-world development, and deployment, allowing participants to leverage AI tools with proper disclosure. The winning solution earned recognition, exciting goodies, and the opportunity to become the official IEEE IGDTUW application.',
    images: [
      eventImage('Ev 1.1.jpeg'),
      eventImage('Ev 1.2.jpeg'),
      eventImage('Ev 1.3.jpeg'),
    ],
    type: 'App Development Challenge',
  },
  {
    id: 2,
    title: 'WIEgnite 3.0',
    subtitle: 'IDEAS INTO IMPACT',
    category: 'WOMEN IN ENGINEERING',
    date: 'Date to be confirmed',
    year: '',
    description:
      'WIEgnite 3.0 brought together brilliant minds to showcase innovative ideas, creative prototypes, and impactful solutions, fostering a spirit of collaboration, technical excellence, and innovation. The event concluded with an award ceremony recognizing the outstanding teams for their exceptional ideas and execution.',
    images: [
      eventImage('Ev 2.1.jpeg'),
      eventImage('Ev 2.2.jpeg'),
      eventImage('Ev 2.3.jpeg'),
    ],
    type: 'Innovation Event',
  },
  {
    id: 3,
    title: 'Mastering Cybersecurity',
    subtitle: 'A HANDS-ON WORKSHOP',
    category: 'CYBERSECURITY',
    date: '14 February',
    year: '2026',
    description:
      'As part of WIEmPower Week 7.0, IEEE IGDTUW organized Mastering Cybersecurity: A Hands-On Workshop on 14th February 2026, featuring Dr. Vandana Sharma, a cybersecurity and forensics expert. The session introduced participants to real-world cyber defense techniques, threat detection, and system security, helping them strengthen their understanding of cybersecurity and develop practical skills.',
    images: [
      eventImage('Ev 3.1.jpeg'),
      eventImage('Ev 3.2.jpeg'),
      eventImage('Ev 3.3.jpeg'),
    ],
    type: 'Technical Workshop',
  },
  {
    id: 4,
    title: 'Navigating Your Career in the AI Era',
    subtitle: 'BUILD YOUR FUTURE',
    category: 'ARTIFICIAL INTELLIGENCE & CAREERS',
    date: '17 February',
    year: '2026',
    description:
      'IEEE IGDTUW organized Navigating Your Career in the AI Era, an insightful session led by Kushal Vijay on 17th February 2026. The session explored the evolving role of artificial intelligence in shaping career opportunities, emphasizing the importance of adaptability, continuous learning, and developing relevant skills to thrive in an AI-driven world.',
    images: [eventImage('Ev 4.jpeg')],
    type: 'Expert Session',
  },
  {
    id: 5,
    title: 'Navigating the World of Open Source',
    subtitle: 'EXPLORE OPEN SOURCE',
    category: 'OPEN SOURCE & SOFTWARE DEVELOPMENT',
    date: '1 October',
    year: '2024',
    description:
      'On October 1st, 2024, IEEE IGDTUW welcomed Harkirat Singh, an open-source enthusiast and IIT Roorkee graduate, to share his experiences. A software engineer who has worked at FAANG, finance, and startup companies, Harkirat captivated the audience with his unique journey in the world of coding. His session provided valuable insights into open-source projects and career growth.',
    images: [
      eventImage('Ev 5.1.jpeg'),
      eventImage('Ev 5.2.jpeg'),
      eventImage('Ev 5.3.jpeg'),
    ],
    type: 'Expert Session',
  },
  {
    id: 6,
    title: 'From NASA to CEO',
    subtitle: 'INSPIRING WOMEN IN TECH',
    category: 'WOMEN IN TECHNOLOGY',
    date: '11 September',
    year: '2024',
    description:
      'On September 11th, 2024, IEEE IGDTUW had the honor of hosting Aisha Bowe, a former NASA rocket scientist, entrepreneur, and CEO of STEMBoard. As the first Black woman to break barriers in space tech, Aisha shared her journey, inspiring women to pursue careers in technology. Her story of determination and leadership left the audience empowered to reach for the stars.',
    images: [
      eventImage('Ev 6.1.jpeg'),
      eventImage('Ev 6.2.jpeg'),
      eventImage('Ev 6.3.jpeg'),
    ],
    type: 'Guest Session',
  },
  {
    id: 7,
    title: 'Quadcopter: The Drone Workshop',
    subtitle: 'BUILD. FLY. INNOVATE.',
    category: 'DRONE TECHNOLOGY',
    date: '8–9 February',
    year: '2024',
    description:
      'On February 8th–9th, 2024, IEEE IGDTUW successfully conducted the Quadcopter: The Drone Workshop, where participants delved into the exciting world of drone technology. Attendees assembled and piloted drones, gaining hands-on experience and insights into aerial innovation, making it a memorable event for all tech enthusiasts.',
    images: [
      eventImage('Ev 7.1.jpeg'),
      eventImage('Ev 7.2.jpeg'),
      eventImage('Ev 7.3.jpeg'),
    ],
    type: 'Hands-on Technical Workshop',
  },
]

function EventModal({ event, onClose }) {
  useEffect(() => {
    if (!event) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [event, onClose])

  if (!event) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-[#8B9091]/40 bg-[#0b0b0c] text-[#D7D6AE] shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close event details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-3xl text-white transition hover:bg-[#e4202f]"
        >
          ×
        </button>

        <div className="max-h-[90vh] overflow-y-auto">

          {/* Event heading */}
          <div className="px-6 pb-5 pt-8 sm:px-9 sm:pt-10">
            

            <h3
              id="event-modal-title"
              className="max-w-3xl pr-8 text-3xl font-bold leading-tight tracking-tight text-[#D7D6AE] sm:text-5xl"
            >
              {event.title}
            </h3>

            <p className="mt-3 text-xs font-semibold tracking-[0.16em] text-[#8B9091]">
              {event.category}
            </p>

            <p className="mt-3 text-sm text-[#B2B39D]">
              {[event.date, event.year].filter(Boolean).join(', ')}
            </p>
          </div>

          {/* Event images */}
          <div className="grid grid-cols-1 gap-3 px-6 sm:grid-cols-3 sm:px-9">
            {event.images.map((image, index) => (
              <div
                key={image}
                className={`overflow-hidden rounded-xl border border-[#8B9091]/25 bg-[#8b0f1a]/20 ${
  event.images.length === 1 ? 'sm:col-span-3' : ''
}`}
              >
                <img
                  src={image}
                  alt={`${event.title} — photo ${index + 1}`}
                  className={`w-full object-cover transition duration-500 hover:scale-105 ${
  event.images.length === 1
      ? 'max-h-[420px]'
      : 'h-48 sm:h-44'
}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="px-6 py-7 sm:px-9 sm:py-9">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#e4202f]/70 px-4 py-2 text-xs text-[#D7D6AE]">
                {event.type}
              </span>

              <span className="rounded-full border border-[#8B9091]/40 px-4 py-2 text-xs text-[#B2B39D]">
                Event {event.id.toString().padStart(2, '0')}
              </span>
            </div>

            <h4 className="mb-3 text-lg font-semibold text-[#D7D6AE]">
              About the event
            </h4>

            <p className="text-sm leading-7 text-[#B2B39D] sm:text-base">
              {event.description}
            </p>

            <div className="mt-7 border-t border-[#8B9091]/25 pt-5">
              

              <p className="mt-2 text-sm text-[#B2B39D]">
                Follow IEEE IGDTUW to stay updated on upcoming events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <>
      <section id="events" className="bg-bg-alt text-fg">
        <div className="mx-auto max-w-[1800px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">

          {/* LEFT TEXT + RIGHT CAROUSEL */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">

            {/* LEFT: Text Content */}
            <div className="lg:col-span-5">

              {/* Section label */}
              <p className="mb-8 pt-2 text-xs font-semibold tracking-[0.22em] text-black/50">
                
                OUR JOURNEY
              </p>

              {/* Main heading */}
              <h2 className="text-[clamp(3.5rem,6.5vw,7rem)] font-bold leading-[0.88] tracking-[-0.07em]">
                <span className="block text-[#8b0f1a] dark:text-[#E4D076]">
                  Moments
                </span>

                <span className="block text-[#e4202f] dark:text-[#D7D6AE]">
                  that matter.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-8 max-w-[420px] text-base leading-[1.8] text-black/55 sm:text-lg">
                Ideas, people, and experiences that bring the IEEE IGDTUW
                community together. Select an event to explore its story.
              </p>

            </div>

            {/* RIGHT: Circular Carousel */}
            <div className="relative min-h-[420px] w-full lg:col-span-7 lg:mt-0">

              <CircularCarousel
                items={events.map((event) => ({
                  ...event,

                  // Use the third image as the thumbnail for Events 1 and 2.
                  src:
                    event.id === 1 || event.id === 2
                      ? event.images[2]
                      : event.images[0],

                  alt: event.title,
                  subtitle: event.subtitle,
                }))}
                onItemClick={(item) => setSelectedEvent(item)}
                cardWidth={280}
                aspectRatio={0.75}
                gap={24}
                autoplay={false}
                draggable
                momentum
                snap
                pauseOnHover
                focusOnClick
                parallax
                depthFade
                cornerRadius={18}
                captions
              />

            </div>

          </div>

          {/* Section footer */}
          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[#b3121f]/40 pt-5 text-xs tracking-wider text-black/45 dark:border-[#D7D6AE]/25 sm:flex-row">
           
            <p>PAST EVENTS / 2024–2026</p>
          </div>

        </div>
      </section>

      {/* Event details modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  )
}
