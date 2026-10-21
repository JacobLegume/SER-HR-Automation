// A mouse recruiter: round ears, jacket lapels and a cheese briefcase.
// Solid shapes keep the mascot readable at navigation-icon sizes.
export default function BrandMark() {
  return <span className="brand-icon cheese-mark" aria-hidden="true">
    <svg viewBox="0 0 64 64" fill="none">
      <path d="M16 51C4 52 4 42 10 41" stroke="var(--mascot-ink)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M12 54V44c0-10 7-16 17-16s17 6 17 16v10H12Z" fill="var(--mascot-ink)"/>
      <path d="m23 31 6 6 6-6-6 19-6-19Z" fill="var(--mascot-shirt)"/>
      <path d="m29 36 3 4-3 10-3-10 3-4Z" fill="currentColor"/>
      <path d="m20 32-3 9 7 3-2 4 7 6m9-22 3 9-7 3" stroke="var(--mascot-lapel)" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="17" cy="15" r="9" fill="currentColor"/>
      <circle cx="41" cy="15" r="9" fill="currentColor"/>
      <circle cx="17" cy="15" r="4.5" fill="var(--mascot-ink)" opacity=".22"/>
      <circle cx="41" cy="15" r="4.5" fill="var(--mascot-ink)" opacity=".22"/>
      <path d="M16 21c0-10 26-10 26 0 0 8-8 15-13 15s-13-7-13-15Z" fill="currentColor"/>
      <circle cx="24" cy="22" r="1.8" fill="#443653"/>
      <circle cx="34" cy="22" r="1.8" fill="#443653"/>
      <path d="M26 28q3-3 6 0l-3 3-3-3Z" fill="#443653"/>
      <path d="M29 30v2m-3 0q3 3 6 0" stroke="#443653" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M43 41v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" stroke="var(--mascot-ink)" strokeWidth="3"/>
      <rect x="36" y="40" width="25" height="18" rx="4" fill="currentColor" stroke="var(--mascot-outline)" strokeWidth="1.5"/>
      <path d="M37 47h23" stroke="var(--mascot-ink)" strokeOpacity=".25" strokeWidth="1.5"/>
      <rect x="46" y="45" width="4" height="5" rx="1" fill="var(--mascot-ink)"/>
      <circle cx="41" cy="52" r="2.5" fill="var(--mascot-ink)" opacity=".28"/>
      <circle cx="56" cy="44" r="2" fill="var(--mascot-ink)" opacity=".28"/>
      <circle cx="54" cy="54" r="2" fill="var(--mascot-ink)" opacity=".28"/>
    </svg>
  </span>
}
