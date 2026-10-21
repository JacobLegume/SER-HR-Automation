import BrandMark from './BrandMark'
import { useState } from 'react'

export default function Auth({ onEnter }) {
  const [register, setRegister] = useState(false)
  const [message, setMessage] = useState('')
  function submit(event) {
    event.preventDefault()
    // Only a UI prototype: never persist credentials or infer permissions from a form.
    event.currentTarget.reset()
    setMessage(register
      ? 'Formularz jest poprawny. Konto nie zostało utworzone — rejestracja wymaga podłączenia API. Użyj podglądu demo poniżej.'
      : 'Logowanie wymaga podłączenia API. Żadne dane nie zostały wysłane ani zapisane. Użyj podglądu demo poniżej.')
  }
  return <main className="auth-layout"><section className="auth-intro"><a className="brand" href="#auth"><BrandMark/>SER</a><div className="eyebrow">SCREENING & EVALUATION FOR RECRUITERS</div><h1>Dwie perspektywy.<br/>Jeden dobry początek.</h1><p>Kandydaci odkrywają oferty. Rekruterzy tworzą zespoły. Każdy ma swoją przestrzeń.</p><div className="demo-banner"><div><strong>Prototyp logowania i ról</strong><p>Nie wpisuj prawdziwego hasła. Formularze nie zakładają kont i nie uwierzytelniają użytkowników. Nie zapisujemy ani nie wysyłamy danych formularza.</p></div></div></section>
    <section className="auth-card" id="auth" aria-labelledby="auth-title"><div className="eyebrow">WITAJ W SER</div><h2 id="auth-title">{register ? 'Rejestracja kandydata' : 'Zaloguj się'}</h2><p className="muted">{register ? 'Makieta formularza — użyj fikcyjnych danych.' : 'Wersja demonstracyjna ekranu logowania.'}</p><form onSubmit={submit} key={String(register)}>
      {register && <div className="field"><label htmlFor="name">Imię *</label><input id="name" name="name" required maxLength={80} autoComplete="off"/></div>}
      <div className="field"><label htmlFor="email">Adres e-mail *</label><input id="email" name="email" type="email" required autoComplete="off" placeholder="kandydat@example.com"/></div>
      <div className="field"><label htmlFor="password">Hasło testowe *</label><input id="password" name="password" type="password" required minLength={register ? 8 : 1} autoComplete="off" aria-describedby="password-help"/><small id="password-help">{register ? 'Minimum 8 znaków w makiecie. ' : ''}Nie używaj prawdziwego hasła.</small></div>
      <button className="primary auth-submit" type="submit">{register ? 'Sprawdź formularz rejestracji' : 'Sprawdź formularz logowania'}</button>
    </form><p className="notice" role="status">{message}</p><button className="text-button" onClick={() => {setRegister(!register); setMessage('')}}>{register ? 'Masz już konto? Logowanie' : 'Nie masz konta? Rejestracja kandydata'}</button>
    {register && <p className="muted">Sposób tworzenia kont rekruterów ustali zespół. Ten formularz nie nadaje uprawnień rekrutera.</p>}
    <div className="demo-access"><h3>Obejrzyj demo bez logowania</h3><p>Wybór zmienia tylko widok interfejsu. Nie jest zabezpieczeniem dostępu.</p><div><button onClick={() => onEnter('candidate')}>Demo kandydata →</button><button onClick={() => onEnter('recruiter')}>Demo rekrutera →</button></div></div></section></main>
}
