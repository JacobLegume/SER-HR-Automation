import RecruitmentBoard from './RecruitmentBoard'
import BrandMark from './BrandMark'
import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { emptyOffer, levels, loadOffers, requirements, STORAGE_KEY, validateOffer } from './offers'
import './style.css'
import Auth from './Auth'
import ThemeToggle from './ThemeToggle'
import Candidate from './Candidate'

function Recruiter({ onLogout, onCandidates }) {
  const [initial] = useState(() => { try { return loadOffers(window.localStorage) } catch { return loadOffers({ getItem() { throw Error() } }) } })
  const [offers, setOffers] = useState(initial.offers)
  const [warning, setWarning] = useState(initial.warning)
  const [message, setMessage] = useState('')
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('')
  const [draft, setDraft] = useState(null)
  const [errors, setErrors] = useState({})
  const [selected, setSelected] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const editor = useRef(null), detail = useRef(null), confirm = useRef(null)
  const visible = offers.filter(o => o.title.toLocaleLowerCase('pl').includes(query.toLocaleLowerCase('pl')) && (!level || o.level === level))
  function persist(next, text) {
    setOffers(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setWarning(''); setMessage(text) }
    catch { setWarning('Zmiany działają tylko do odświeżenia strony. Przeglądarka odmówiła zapisu — sprawdź dostępne miejsce i ustawienia prywatności.'); setMessage('') }
  }
  function edit(offer) { setDraft(offer ? { ...offer } : { ...emptyOffer }); setErrors({}); editor.current.showModal() }
  function save(event) {
    event.preventDefault()
    const found = validateOffer(draft)
    setErrors(found)
    if (Object.keys(found).length) { requestAnimationFrame(() => document.getElementById(Object.keys(found)[0])?.focus()); return }
    const value = { ...draft, title: draft.title.trim(), description: draft.description.trim(), must: requirements(draft.must).join('\n'), nice: requirements(draft.nice).join('\n'), id: draft.id || crypto.randomUUID(), createdAt: draft.createdAt || new Date().toISOString().slice(0, 10) }
    persist(draft.id ? offers.map(o => o.id === draft.id ? value : o) : [value, ...offers], draft.id ? 'Zapisano zmiany w ofercie.' : 'Dodano nową ofertę.')
    editor.current.close()
  }
  function field(key, label, multiline = false, hint = '') {
    const props = { id: key, value: draft[key], onChange: e => setDraft({ ...draft, [key]: e.target.value }), 'aria-invalid': !!errors[key], 'aria-describedby': `${key}-hint ${key}-error`, maxLength: key === 'title' ? 120 : 5000 }
    return <div className="field"><label htmlFor={key}>{label}</label>{multiline ? <textarea {...props} rows={key === 'description' ? 4 : 3}/> : <input {...props}/> }<small id={`${key}-hint`}>{hint}</small><span className="error" id={`${key}-error`}>{errors[key]}</span></div>
  }
  return <div className="shell">
    <aside className="sidebar"><a className="brand" href="#main"><BrandMark/> SER<span className="brand-dot">●</span></a><div className="workspace">WORKSPACE<span>Zespół rekrutacji</span></div><nav aria-label="Nawigacja główna"><a href="#main" aria-current="page"><span>▦</span> Oferty pracy <b>{offers.length}</b></a><button className="recruitment-nav" onClick={onCandidates}>Kandydaci i rozmowy →</button></nav><div className="sidebar-bottom"><span className="avatar">KN</span><div>Rekruter demo<small>Przestrzeń demonstracyjna</small></div></div></aside>
    <div className="content"><header className="topbar"><span>Workspace <span className="slash">/</span> <strong>Oferty pracy</strong></span><div className="session-actions"><span className="demo-dot">Rekruter · Demo</span><button onClick={onLogout}>Wyjdź z demo</button></div></header>
    <main id="main"><div className="eyebrow">REKRUTACJA ZACZYNA SIĘ TUTAJ</div><div className="page-heading"><div><h1>Znajdź miejsce dla talentów.</h1><p>Twoje oferty, wymagania i kolejny krok rekrutacji — w jednym miejscu.</p></div><button className="primary" onClick={() => edit(null)}>＋ Dodaj ofertę</button></div>
    <section className="demo-banner" aria-label="Informacja o demonstracji"><span className="info-icon">i</span><div><strong>Przestrzeń do testowania pomysłów</strong><p>Dane przykładowe zapisują się tylko w tej przeglądarce. To demo interfejsu, bez backendu i analizy AI.</p></div><span className="pill">US-03 · Frontend</span></section>
    {warning && <div className="warning" role="alert">{warning}</div>}<div className="notice" role="status">{message}</div>
    <section className="stats" aria-label="Podsumowanie"><div><span>Wszystkie oferty</span><strong>{offers.length.toString().padStart(2, '0')}</strong><small>W Twojej przestrzeni</small></div><div><span>Poziomy stanowisk</span><strong>{new Set(offers.map(o => o.level)).size.toString().padStart(2, '0')}</strong><small>Junior, Mid i Senior</small></div><div className="stats-note"><span>Dobry opis. Lepszy początek.</span><p>Oddziel wymagania obowiązkowe od dodatkowych, aby jasno określić profil kandydata.</p><span className="decor">↗</span></div></section>
    <section aria-labelledby="offers-heading"><div className="list-heading"><h2 id="offers-heading">Oferty pracy <span>{visible.length}</span></h2><span className="muted">Twoja baza stanowisk</span></div><div className="filters"><label className="search"><span>Szukaj stanowiska</span><input type="search" placeholder="Szukaj po nazwie stanowiska…" value={query} onChange={e => setQuery(e.target.value)}/></label><label><span>Poziom stanowiska</span><select value={level} onChange={e => setLevel(e.target.value)}><option value="">Wszystkie poziomy</option>{levels.map(l => <option key={l}>{l}</option>)}</select></label></div>
    <div className="offer-grid">{visible.map((offer, index) => <article className="offer-card" key={offer.id}><div className="card-top"><span className={`job-icon icon-${index % 3}`}>{offer.title.slice(0, 2).toUpperCase()}</span><span className="level">{offer.level}</span></div><h3>{offer.title}</h3><p className="description">{offer.description}</p><div className="requirements-label">WYMAGANIA OBOWIĄZKOWE</div><div className="tags">{requirements(offer.must).slice(0,3).map((r,i) => <span key={i}>{r}</span>)}{requirements(offer.must).length > 3 && <span>+{requirements(offer.must).length - 3}</span>}</div><div className="card-footer"><button className="text-button" onClick={() => {setSelected(offer); detail.current.showModal()}}>Zobacz ofertę ↗</button><div><button className="icon-button" aria-label={`Edytuj: ${offer.title}`} onClick={() => edit(offer)}>Edytuj</button><button className="icon-button delete" aria-label={`Usuń: ${offer.title}`} onClick={() => {setDeleting(offer); confirm.current.showModal()}}>Usuń</button></div></div></article>)}</div>
    {!visible.length && <div className="empty"><h3>{offers.length ? 'Brak pasujących ofert' : 'Pierwsza oferta czeka na Ciebie'}</h3><p>{offers.length ? 'Zmień nazwę lub poziom stanowiska.' : 'Dodaj stanowisko i określ wymagania dla kandydatów.'}</p><button onClick={() => offers.length ? (setQuery(''), setLevel('')) : edit(null)}>{offers.length ? 'Wyczyść filtry' : 'Dodaj pierwszą ofertę'}</button></div>}</section>
    <footer>SER <span>Screening & Evaluation for Recruiters</span><span>Prototyp interfejsu · 2026</span></footer></main></div>
    <dialog ref={editor} aria-labelledby="editor-title">{draft && <form onSubmit={save} noValidate><div className="modal-heading"><div><div className="eyebrow">TWOJA REKRUTACJA</div><h2 id="editor-title">{draft.id ? 'Edytuj ofertę' : 'Nowa oferta pracy'}</h2></div><button type="button" aria-label="Zamknij formularz" onClick={() => editor.current.close()}>×</button></div><p className="muted">Pola oznaczone * są wymagane. Zapis lokalny w trybie demo.</p>{field('title', 'Nazwa stanowiska *')}<div className="field"><label htmlFor="level">Poziom stanowiska *</label><select id="level" value={draft.level} onChange={e => setDraft({...draft, level: e.target.value})}>{levels.map(l => <option key={l}>{l}</option>)}</select></div>{field('description', 'Opis stanowiska *', true)}<div className="form-columns">{field('must', 'Wymagania obowiązkowe *', true, 'Jedno wymaganie w każdym wierszu.')}{field('nice', 'Wymagania dodatkowe', true, 'Opcjonalnie, jedno wymaganie w wierszu.')}</div><div className="modal-actions"><button type="button" onClick={() => editor.current.close()}>Anuluj</button><button className="primary" type="submit">Zapisz ofertę</button></div></form>}</dialog>
    <dialog ref={detail} aria-labelledby="detail-title">{selected && <><div className="modal-heading"><h2 id="detail-title">{selected.title}</h2><button aria-label="Zamknij podgląd" onClick={() => detail.current.close()}>×</button></div><span className="level">{selected.level}</span><p className="detail-description">{selected.description}</p>{[['must','Wymagania obowiązkowe'],['nice','Mile widziane']].map(([key,title]) => <section key={key}><h3>{title}</h3>{requirements(selected[key]).length ? <ul className="requirement-list">{requirements(selected[key]).map((r,i) => <li key={i}>{r}</li>)}</ul> : <p>Nie określono.</p>}</section>)}<div className="modal-actions"><button onClick={() => detail.current.close()}>Zamknij</button><button className="primary" onClick={() => {detail.current.close(); edit(selected)}}>Edytuj ofertę</button></div></>}</dialog>
    <dialog ref={confirm} className="confirm-dialog" aria-labelledby="delete-title"><h2 id="delete-title">Usunąć ofertę?</h2><p>Oferta „{deleting?.title}” zostanie usunięta z lokalnego demo. Tej operacji nie można cofnąć.</p><div className="modal-actions"><button autoFocus onClick={() => confirm.current.close()}>Anuluj</button><button className="danger" onClick={() => {persist(offers.filter(o => o.id !== deleting.id), 'Usunięto ofertę.'); confirm.current.close()}}>Usuń ofertę</button></div></dialog>
  </div>
}
function App() {
  const [role, setRole] = useState(null)
  const [recruiterView, setRecruiterView] = useState('offers')
  const logout = () => { setRole(null); setRecruiterView('offers') }
  return <><ThemeToggle/>{role === 'candidate' ? <Candidate onLogout={logout}/> : role === 'recruiter' ? (recruiterView === 'offers' ? <Recruiter onLogout={logout} onCandidates={() => setRecruiterView('candidates')}/> : <RecruitmentBoard onLogout={logout} onOffers={() => setRecruiterView('offers')}/>) : <Auth onEnter={setRole}/>}</>
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
