export const APPLICATIONS_KEY = 'ser.demo.applications.v1'
export const CANDIDATE_ID = 'candidate-demo'
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // Demo assumption, not an agreed backend limit.
export const statuses = ['nowa', 'do rozmowy', 'odrzucona', 'zaakceptowana']
export const processingStates = ['w kolejce', 'w trakcie', 'gotowe', 'błąd']
export const categories = ['Techniczne', 'Behawioralne', 'Weryfikujące']
export function defaultQuestions() {
  return [
    ['Techniczne', 'Jak organizujesz komponenty w większej aplikacji React?'],
    ['Techniczne', 'Jak diagnozujesz problem z wydajnością interfejsu?'],
    ['Techniczne', 'Jak zapewniasz dostępność formularzy?'],
    ['Behawioralne', 'Opowiedz o trudnej współpracy w zespole i swoim wkładzie w rozwiązanie.'],
    ['Behawioralne', 'Jak reagujesz na zmianę wymagań w trakcie zadania?'],
    ['Behawioralne', 'Jak przekazujesz i przyjmujesz feedback podczas code review?'],
    ['Weryfikujące', 'Jaki był Twój konkretny zakres odpowiedzialności w ostatnim projekcie?'],
    ['Weryfikujące', 'Które wymaganie oferty wymaga od Ciebie dalszej nauki?'],
  ].map(([category, text], i) => ({id: `q-${i}`, category, text}))
}
export function seedApplications() {
  return [
    {name:'Alex — profil A', score:86, skills:[90,80,88], quote:'Tworzenie komponentów React, testy interfejsu i audyt dostępności.'},
    {name:'Robin — profil B', score:73, skills:[78,76,65], quote:'Rozwój aplikacji JavaScript i stylowanie interfejsów CSS.'},
    {name:'Sam — profil C', score:65, skills:[65,60,70], quote:'Prototypy interfejsów, formularze i podstawowe komponenty React.'},
  ].map((p,i) => ({...p,id:`sample-${i}`,candidateId:`sample-person-${i}`,offerId:'demo-1',offerTitle:'Frontend Developer',fileName:'fikcyjny-profil.pdf',fileSize:12000,status:'nowa',processing:'gotowe',sample:true,notes:'',questions:defaultQuestions(),history:[],createdAt:'2026-10-21T10:00:00.000Z'}))
}
export function validApplication(a) {
  return a && ['id','candidateId','offerId','offerTitle','name','fileName','notes','createdAt'].every(k=>typeof a[k]==='string') && statuses.includes(a.status) && processingStates.includes(a.processing) && typeof a.sample==='boolean' && Number.isFinite(a.fileSize) && Array.isArray(a.questions) && a.questions.every(q=>q && typeof q.id==='string' && typeof q.text==='string' && categories.includes(q.category)) && Array.isArray(a.history) && a.history.every(h=>h && statuses.includes(h.status) && typeof h.at==='string') && (!a.sample || (Number.isFinite(a.score) && a.score>=0 && a.score<=100 && typeof a.quote==='string' && Array.isArray(a.skills) && a.skills.length===3 && a.skills.every(n=>Number.isFinite(n)&&n>=0&&n<=100)))
}
export function readApplications(storage) {
  try {
    const raw=storage.getItem(APPLICATIONS_KEY)
    if(raw===null) return {items:seedApplications(),warning:''}
    const items=JSON.parse(raw)
    if(!Array.isArray(items)||!items.every(validApplication)||new Set(items.map(a=>a.id)).size!==items.length) throw Error()
    return {items,warning:''}
  } catch { return {items:seedApplications(),warning:'Nie udało się odczytać zgłoszeń. Przywrócono podgląd fikcyjnych profili; zapis nastąpi dopiero po zmianie.'} }
}
export function validateFile(file) {
  if(!file) return 'Wybierz plik CV.'
  if(!/\.(pdf|docx)$/i.test(file.name)) return 'Dozwolone są wyłącznie pliki PDF i DOCX.'
  if(!file.size) return 'Plik jest pusty.'
  if(file.size>MAX_FILE_SIZE) return 'Limit demonstracyjny to 5 MiB.'
  return ''
}
export function withStatus(application,status,at=new Date().toISOString()) {
  if(!statuses.includes(status)) throw Error('Nieprawidłowy status')
  return application.status===status ? application : {...application,status,history:[...application.history,{status,at}]}
}
