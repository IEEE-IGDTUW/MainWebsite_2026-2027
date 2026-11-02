import { useState } from 'react';

// People.jsx — IEEE IGDTUW Senior Execom 2026–2027

const BASE = `${import.meta.env.BASE_URL}IEEE Senior Execomm 2026-2027/`;

// ─── Team data ───────────────────────────────────────────────────────────────
// Leadership cluster is shown first and larger; the rest in a uniform grid.
const leadershipAll = [
  {
    id: '01',
    name: 'Himani Gupta',
    role: 'IEEE Chairperson',
    image: `${BASE}HimaniGupta_IEEEChairperson.png`,
    heicFallback: false,
    initials: 'HG',
  },
  {
    id: '02',
    name: 'Anushree Jain',
    role: 'WIE Chairperson',
    image: `${BASE}Anushree Jain_WIE_Chairperson.jpeg`,
    heicFallback: false,
    initials: 'AJ',
  },
  {
    id: '03',
    name: 'Gunjan Aggarwal',
    role: 'IEEE Vice-Chairperson',
    image: `${BASE}Gunjan Aggarwal_IEEE Vice-chairperson.JPG`,
    heicFallback: false,
    initials: 'GA',
  },
  {
    id: '04',
    name: 'Sneha Yadav',
    role: 'WIE Vice-Chairperson',
    image: `${BASE}Sneha Yadav _WIE Vice Chairperson_.jpg`,
    heicFallback: false,
    initials: 'SY',
  },
  {
    id: '05',
    name: 'Jessica Malik',
    role: 'IEEE General Secretary',
    image: `${BASE}Jessica Malik_IEEE GenSec.jpg`,
    heicFallback: false,
    initials: 'JM',
  },
  {
    id: '06',
    name: 'Muskan Goel',
    role: 'WIE General Secretary',
    image: `${BASE}Muskan Goel_WIE GenSec.png`,
    heicFallback: false,
    initials: 'MG',
  },
  {
    id: '07',
    name: 'Saanvi Singh',
    role: 'Treasurer',
    image: `${BASE}Saanvi_Singh_Treasurer.jpg`,
    heicFallback: false,
    initials: 'SS',
  },
];
const leadership = leadershipAll.slice(4);

const compactRoles = {
  'Event Management Head': 'EM Head',
  'IEEE General Secretary': 'IEEE Gen. Sec.',
  'WIE General Secretary': 'WIE Gen. Sec.',
  'IEEE Vice-Chairperson': 'IEEE Vice-Chair',
  'WIE Vice-Chairperson': 'WIE Vice-Chair',
};

function updateProfileCard(event) {
  if (event.pointerType === 'touch') return;

  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  const style = event.currentTarget.style;

  style.setProperty('--profile-x', `${x * 100}%`);
  style.setProperty('--profile-y', `${y * 100}%`);
  style.setProperty('--profile-rotate-x', `${(0.5 - y) * 12}deg`);
  style.setProperty('--profile-rotate-y', `${(x - 0.5) * 12}deg`);
}

function resetProfileCard(event) {
  const style = event.currentTarget.style;
  style.setProperty('--profile-x', '50%');
  style.setProperty('--profile-y', '50%');
  style.setProperty('--profile-rotate-x', '0deg');
  style.setProperty('--profile-rotate-y', '0deg');
}

const heads = [
  // Event Management Heads
  {
    id: '08',
    name: 'Aakanksha Jha',
    role: 'Event Management Head',
    image: `${BASE}Aakanksha Jha _ EM Head.jpeg`,
    heicFallback: false,
    initials: 'AJ',
  },
  {
    id: '09',
    name: 'Eshita Nagaria',
    role: 'Event Management Head',
    image: `${BASE}EshitaNagaria_EMHead.jpg`,
    heicFallback: false,
    initials: 'EN',
  },
  {
    id: '10',
    name: 'Likhila Vydana',
    role: 'Event Management Head',
    image: `${BASE}LikhilaVydana_EMHead.jpg`,
    heicFallback: false,
    initials: 'LV',
  },
  // Technical Heads
  {
    id: '11',
    name: 'Aashi Garg',
    role: 'Technical Head',
    image: `${BASE}Aashi Garg_Tech Head.jpg`,
    heicFallback: false,
    initials: 'AG',
  },
  {
    id: '12',
    name: 'Parvati',
    role: 'Technical Head',
    image: `${BASE}PARVATI_TECH HEAD.png`,
    heicFallback: false,
    initials: 'P',
  },
  // Membership Heads
  {
    id: '13',
    name: 'Anushka Goyal',
    role: 'Membership Head',
    image: `${BASE}Anushka Goyal_MEMBERSHIP HEAD.jpg`,
    heicFallback: false,
    initials: 'AG',
  },
  {
    id: '14',
    name: 'Nikita',
    role: 'Membership Head',
    image: `${BASE}Nikita_Membership Head.jpg`,
    heicFallback: false,
    initials: 'N',
  },
  {
    id: '15',
    name: 'Tanishka Sharma',
    role: 'Membership Head',
    image: `${BASE}Tanishka_Sharma_Membership_Head.jpg`,
    heicFallback: false,
    initials: 'TS',
  },
  // Creative Heads
  {
    id: '16',
    name: 'Sanchita Yadav',
    role: 'Creative Head',
    image: `${BASE}Sanchita Yadav_Creative Head.jpg`,
    heicFallback: false,
    initials: 'SY',
  },
  {
    id: '17',
    name: 'Ria Saraswat',
    role: 'Creative Head',
    image: `${BASE}Ria_Saraswat_CreativeHead.png`,
    heicFallback: false,
    initials: 'RS',
  },
  // Media Heads
  {
    id: '18',
    name: 'Ekta Yadav',
    role: 'Media Head',
    image: `${BASE}EktaYadav_MediaHead.jpg`,
    heicFallback: false,
    initials: 'EY',
  },
  {
    id: '19',
    name: 'Tanisha Choudhary',
    role: 'Media Head',
    image: `${BASE}Tanisha Choudhary_Media Head.jpg`,
    heicFallback: false,
    initials: 'TC',
  },
  // PR Heads
  {
    id: '20',
    name: 'Hiti Panghal',
    role: 'PR Head',
    image: `${BASE}Hiti Panghal_PR Head.jpg`,
    heicFallback: false,
    initials: 'HP',
  },
  {
    id: '21',
    name: 'Mehak Taneja',
    role: 'PR Head',
    image: `${BASE}Mehak Taneja_PR Head.jpg`,
    heicFallback: false,
    initials: 'MT',
  },
  {
    id: '22',
    name: 'Vaishnavi Shukla',
    role: 'PR Head',
    image: `${BASE}VAISHNAVI SHUKLA_PR HEAD.jpg`,
    heicFallback: false,
    initials: 'VS',
  },
  // HR Heads
  {
    id: '23',
    name: 'Manya Gupta',
    role: 'HR Head',
    image: `${BASE}Manya Gupta_HR head.jpg`,
    heicFallback: false,
    initials: 'MG',
  },
  {
    id: '24',
    name: 'Unnati',
    role: 'HR Head',
    image: `${BASE}Unnati_HR Head.jpg`,
    heicFallback: false,
    initials: 'U',
  },
  // Sponsorship Heads
  {
    id: '25',
    name: 'Arushi',
    role: 'Sponsorship Head',
    image: `${BASE}Arushi_Sponsorship_Head.png`,
    heicFallback: false,
    initials: 'A',
  },
  {
    id: '26',
    name: 'Iti Goel',
    role: 'Sponsorship Head',
    image: `${BASE}Iti_Goel_Sponsorship_Head.jpg`,
    heicFallback: false,
    initials: 'IJ',
  },
  // Content Heads
  {
    id: '27',
    name: 'Prisha',
    role: 'Content Head',
    image: `${BASE}Prisha_Content Head.jpg`,
    heicFallback: false,
    initials: 'P',
  },
  {
    id: '28',
    name: 'Eti Jain',
    role: 'Content Head',
    image: `${BASE}Eti_Jain_Content Head.jpg`,
    heicFallback: false,
    initials: 'EJ',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function InitialsAvatar({ initials, large = false }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${large ? 'text-4xl' : 'text-2xl'} font-black tracking-tight`}
      style={{
        background:
          'linear-gradient(135deg, var(--palette-queen-blue) 0%, var(--palette-konjo) 100%)',
        color: 'var(--palette-papaya)',
      }}
    >
      {initials}
    </div>
  );
}

function ProfileCard({ member, blackAndWhite, onToggle }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      className="group min-w-0"
      onPointerMove={updateProfileCard}
      onPointerLeave={resetProfileCard}
      onPointerCancel={resetProfileCard}
    >
      <div className="profile-card__frame">
        <div className="profile-card__image">
          {member.heicFallback || !member.image || imageFailed ? (
            <InitialsAvatar initials={member.initials} large />
          ) : (
            <img
              src={member.image}
              alt={`${member.name}, ${member.role}`}
              loading="lazy"
              className={`people-portrait h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105${blackAndWhite ? ' people-portrait--bw' : ''}`}
              onError={() => setImageFailed(true)}
              role="button"
              tabIndex={0}
              aria-label={`Toggle ${member.name}'s portrait to ${blackAndWhite ? 'color' : 'black and white'}`}
              aria-pressed={blackAndWhite}
              onClick={onToggle}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onToggle();
                }
              }}
            />
          )}
          <div className="profile-card__details">
            <h3>{member.name}</h3>
            {member.heicFallback && <small>Photo pending conversion</small>}
          </div>
        </div>
        <div className="profile-card__footer">
          <p className="profile-card__role" title={member.role}>
            {compactRoles[member.role] || member.role}
          </p>
          <nav className="profile-card__socials" aria-label={`${member.name}'s links`}>
            <a
              className="profile-card__social"
              href="https://www.instagram.com/ieeeigdtuw"
              target="_blank"
              rel="noreferrer"
              aria-label="IEEE IGDTUW on Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              className="profile-card__social"
              href="https://www.linkedin.com/company/ieee-igdtuw/"
              target="_blank"
              rel="noreferrer"
              aria-label="IEEE IGDTUW on LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M8 10v7M8 7.5v.1M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" />
              </svg>
            </a>
            <a
              className="profile-card__social"
              href="mailto:ieeeigdtu@gmail.com"
              aria-label="Email IEEE IGDTUW"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </article>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function People() {
  const [blackAndWhite, setBlackAndWhite] = useState({});

  const togglePortrait = (id) => {
    setBlackAndWhite((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <section
      id="team"
      className="overflow-hidden bg-[#F0E7D2] text-[#30291F] dark:bg-[#211E19] dark:text-[#E8DDC6]"
    >
      <div className="mx-auto max-w-[1800px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">

          {/* Label */}
          

          {/* Main heading */}
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
              <span className="block text-[#282117] dark:text-[#F2E9D4]">
                Good ideas need
              </span>

              <span className="block text-[#8C3027] dark:text-[#e4202f]">
                good company.
              </span>

            </h2>
          </div>

          {/* Description */}
          <div className="flex items-end lg:col-span-3 lg:pb-3">
            <div>
              <p
                className="max-w-[290px] text-base leading-7 sm:text-lg sm:leading-8"
                style={{ color: 'var(--fg-muted)' }}
              >
                Meet the Senior Execom team making space for possibility — one
                chapter at a time.
              </p>
              <p className="mt-3 text-xs font-bold tracking-[0.16em] text-[#694B35] dark:text-[#a29c8e]">
                2026–2027
              </p>
            </div>
          </div>
        </div>

        {/* ── Leadership grid (3/4 portrait aspect) ── */}
        <div className="mt-16 sm:mt-20">
          <div
            className="mb-6 flex items-center gap-3 border-t pt-6"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="h-px w-6"
              style={{ backgroundColor: 'var(--secondary)' }}
            />
            <p className="text-[10px] font-semibold tracking-[0.2em]" style={{ color: 'var(--fg-muted)' }}>
              LEADERSHIP
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {leadership.map((member) => (
              <ProfileCard
                key={member.id}
                member={member}
                blackAndWhite={Boolean(blackAndWhite[member.id])}
                onToggle={() => togglePortrait(member.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Department heads grid (square aspect) ── */}
        <div className="mt-20 sm:mt-24">
          <div
            className="mb-6 flex items-center gap-3 border-t pt-6"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="h-px w-6"
              style={{ backgroundColor: 'var(--secondary)' }}
            />
            <p className="text-[10px] font-semibold tracking-[0.2em]" style={{ color: 'var(--fg-muted)' }}>
              DEPARTMENT HEADS
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {heads.map((member) => (
              <ProfileCard
                key={member.id}
                member={member}
                blackAndWhite={Boolean(blackAndWhite[member.id])}
                onToggle={() => togglePortrait(member.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom caption ── */}
        <div
          className="mt-16 flex flex-col justify-between gap-3 border-t pt-5 text-[10px] font-medium tracking-[0.15em] sm:mt-20 sm:flex-row sm:text-xs"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--fg-muted)',
          }}
        >
          
        </div>

      </div>
    </section>
  );
}