## Opis zmian

Dodaje działające lokalnie demo frontendu SER w React/JSX + Tailwind. Kandydat przegląda oferty i zapisuje symulowane zgłoszenie z metadanymi CV; rekruter zarządza ofertami, przegląda fikcyjne profile, briefing, porównanie kompetencji, edytuje pytania oraz zapisuje notatki i historię statusów. Oddzielne widoki ról, jasny/nocny motyw, logo SVG.

Nie jest to działające uwierzytelnianie ani AI: formularze nie tworzą kont, dokumenty nie są odczytywane/wysyłane, oceny są fikcyjne, a zapis używa localStorage. Odświeżenie wraca do wyboru demo i zachowuje lokalne dane. Gałąź zawiera wspólną podstawę i kolejne ekrany demonstracyjne; integracje backendowe należy realizować jako oddzielne zadania/PR-y.

## Powiązane zgłoszenie (Issue)

Refs #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #12, #14, #18.
Żadne zgłoszenie nie jest zamykane automatycznie. Szczegółowe mapowanie wykonane/pozostałe i kolejność dalszych prac: docs/ETAPY.md.

## Jak uruchomić i sprawdzić

Node.js 22.12+ (zalecany 24 LTS). Otwórz repo w VS Code, następnie:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Otwórz adres Vite (zwykle http://127.0.0.1:3000). Hasło nie jest potrzebne — wybierz Demo kandydata / Demo rekrutera pod formularzem. Nie wymaga .env, Dockera ani API.

Scenariusz: rekruter → dodaj/edytuj ofertę; kandydat → szczegóły → fikcyjny PDF/DOCX do 5 MiB → zgłoszenie → symulacja błędu/ponowienia; rekruter → Kandydaci i rozmowy → profil → briefing/pytania/notatki/status; porównaj dwa fikcyjne profile. Odśwież i sprawdź zapis. Pełne instrukcje: frontend/README.md i docs/DEMO-WORKFLOW.md.

## Typ zmiany
- [x] Nowa funkcjonalność (Feature)
- [ ] Poprawka błędu (Bugfix)
- [x] Refaktoryzacja / Dokumentacja

## Checklista Definition of Done (DoD)
- [x] Kod działa lokalnie: npm test (16 testów) i npm run build; główne ścieżki sprawdzone w przeglądarce.
- [x] Brak zakodowanych kluczy API / haseł — demo nie potrzebuje sekretów ani .env.
- [ ] Napisano/zaktualizowano testy w pytest — nie dotyczy wyłącznie frontendowej zmiany; walidacja i zapis testowane przez node:test.
- [ ] Obsłużono potencjalne błędy AI — tylko symulacja UI; prawdziwe timeouty/429/backoff wymagają backendu.
- [ ] Modyfikacje bazy posiadają migrację Alembic — nie dotyczy, nie zmieniamy bazy.

## Ograniczenia i następne kroki

To wspólna przestrzeń demo bez RBAC i synchronizacji kart. Używać fikcyjnych danych. Walidacja CV sprawdza wyłącznie rozszerzenie i rozmiar; limit 5 MiB wymaga uzgodnienia. Oceny/briefingi fikcyjnych profili są niezależne od edycji ofert. Niezapisane szkice pytań/notatek znikają po zmianie profilu. Backend musi zapewnić własność danych, autoryzację i walidację zawartości.

Dalej: review UX i ustalenia → kontrakt API → logowanie/RBAC/baza → integracja ofert/uploadu/kolejki → AI → testy integracyjne, CI i deployment. Minimum jedna akceptacja zespołu przed scaleniem. Bez bezpośredniego commita do main.
