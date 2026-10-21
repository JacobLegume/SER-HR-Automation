export const STORAGE_KEY = 'ser.demo.offers.v1'
export const levels = ['Junior', 'Mid', 'Senior']
export const emptyOffer = { title: '', description: '', level: 'Mid', must: '', nice: '' }
export const samples = [
  { id: 'demo-1', title: 'Frontend Developer', level: 'Mid', description: 'Twórz z nami przejrzyste interfejsy aplikacji HR. Szukamy osoby, która łączy znajomość Reacta z dbałością o dostępność i doświadczenie użytkownika.', must: 'React\nJavaScript\nHTML i CSS', nice: 'Tailwind CSS\nTestowanie interfejsów', createdAt: '2026-10-19' },
  { id: 'demo-2', title: 'Python Backend Developer', level: 'Senior', description: 'Rozwijaj API oraz procesy przetwarzania dokumentów. Współpracuj z zespołem frontendowym przy projektowaniu niezawodnej aplikacji.', must: 'Python\nFastAPI\nPostgreSQL', nice: 'Celery i Redis\nDocker', createdAt: '2026-10-18' },
  { id: 'demo-3', title: 'UI/UX Designer', level: 'Junior', description: 'Pomóż nam projektować proste i przyjazne narzędzia dla rekruterów. Przygotowuj makiety i sprawdzaj pomysły z użytkownikami.', must: 'Projektowanie makiet\nPodstawy dostępności', nice: 'Figma\nBadania użyteczności', createdAt: '2026-10-17' },
]
export const requirements = value => value.split('\n').map(item => item.trim()).filter(Boolean)
export function validateOffer(offer) {
  const errors = {}
  if (!offer.title.trim()) errors.title = 'Podaj nazwę stanowiska.'
  if (!offer.description.trim()) errors.description = 'Dodaj opis stanowiska.'
  if (!levels.includes(offer.level)) errors.level = 'Wybierz poziom stanowiska.'
  if (!requirements(offer.must).length) errors.must = 'Dodaj przynajmniej jedno wymaganie obowiązkowe.'
  if (offer.title.length > 120) errors.title = 'Nazwa może mieć maksymalnie 120 znaków.'
  for (const key of ['description', 'must', 'nice']) if (offer[key].length > 5000) errors[key] = 'Maksymalnie 5000 znaków.'
  return errors
}
export function loadOffers(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (raw === null) return { offers: structuredClone(samples), warning: '' }
    const offers = JSON.parse(raw)
    if (!Array.isArray(offers) || !offers.every(o => o && ['id','title','description','level','must','nice','createdAt'].every(k => typeof o[k] === 'string') && !Object.keys(validateOffer(o)).length) || new Set(offers.map(o => o.id)).size !== offers.length) throw new Error('Invalid data')
    return { offers, warning: '' }
  } catch {
    return { offers: structuredClone(samples), warning: 'Nie udało się odczytać zapisanych ofert. Pokazujemy dane przykładowe; zapis zostanie zastąpiony dopiero po Twojej zmianie.' }
  }
}
