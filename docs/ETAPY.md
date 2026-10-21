# Etapy realizacji i dalsze kroki

Stan: lokalne demo frontendu. Poniższe etapy opisują wykonaną pracę, nie zmieniają statusów tablicy GitHub Projects. Pełne User Stories wymagające backendu pozostają nieukończone.

| Etap / zgłoszenie | Co działa w tej wersji | Co pozostaje |
|---|---|---|
| Fundament frontendu — SER-01 #14 | React, JSX, Tailwind, Vite, lockfile, testy, instrukcje VS Code | Struktura backendu i uzgodniona integracja |
| Makiety — SER-05 #18 | Klikalne widoki ofert, kandydata, aplikacji, briefingu i pytań; dwa motywy i logo | Akceptacja UX przez zespół, ewentualny plik Figma, badanie użyteczności |
| Wejście — US-01 #1 | Formularze logowania i rejestracji kandydata, walidacja, komunikaty | Konta, bcrypt, JWT, endpointy logowania, decyzja o tworzeniu kont rekruterów |
| Role — US-02 #2 | Osobne panele i akcje; kandydat nie widzi notatek rekrutera | RBAC i własność danych na serwerze, HTTP 403, testy dostępu |
| Oferty — US-03 #3 | CRUD, tytuł, opis, poziom, must/nice-to-have, filtry, localStorage | Zapis PostgreSQL, API, przypisanie do rekrutera |
| CV — US-04 #4 | Wybór/drag & drop PDF/DOCX, rozmiar/pusty plik, zgłoszenia lokalne | Bezpieczny upload, walidacja zawartości, parsowanie; uzgodnienie limitu (demo: 5 MiB) |
| Kolejka i błędy — US-05 #5 / US-12 #12 | Ręczna symulacja kolejki, pracy, sukcesu, błędu i ponowienia | Celery/Redis, odpytywanie statusu, retry/backoff i obsługa HTTP 429/timeout |
| Ocena i briefing — US-06 #6 / US-07 #7 | Fikcyjne wyniki, sortowanie, briefing ze źródłami demonstracyjnymi | RAG, rzeczywiste cytaty z CV, generowanie asynchroniczne, walidacja jakości AI |
| Pytania — US-08 #8 | 8 przykładowych pytań / 3 kategorie, CRUD i zapis lokalny | Generowanie na podstawie CV/oferty i trwały zapis w bazie |
| Porównanie — US-09 #9 | Tabela i słupki fikcyjnych kompetencji, wybór profili | Podłączenie realnego modelu danych i aktualizacji wyników |
| Notatki — US-10 #10 | Notatki, 4 statusy, historia i zapis lokalny | Zapis/autoryzacja API, spójność przy współpracy rekruterów |

## Proponowana kolejność dalszych prac

1. **Review i UX:** obejrzeć demo wspólnie, zaakceptować zakres ekranów. Ustalić limit CV, sposób tworzenia kont rekruterów i zasady usuwania ofert ze zgłoszeniami.
2. **Kontrakt API:** z backendem ustalić DTO ofert, aplikacji, statusów kolejki, ocen ze źródłami i pytań. Oddzielić adapter demo od adaptera HTTP, dodać loading/error/empty states dla żądań.
3. **Tożsamość i baza:** backend US-01/02, SER-04 #17; potem integracja CRUD ofert. Zachować weryfikację ról po stronie serwera.
4. **Upload i przetwarzanie:** backend US-04/05 i US-12; połączyć istniejące UI z prawdziwymi statusami i ponowieniem.
5. **AI i rozmowy:** SER-06 #19, US-06/07/08; zastąpić fixture rzeczywistymi wynikami i cytatami; zapisywać notatki/statusy/pytania przez API.
6. **QA / DevOps:** uzgodnić testy frontendowe w CI obok pytest (SER-07 #20), Docker Compose (SER-02 #15), zbiór testowy (SER-08 #21), następnie wdrożenie (SER-09 #22).
7. **Dalszy backlog:** koszty LLM US-11 #11 i usuwanie danych US-13 #13 nie są zaimplementowane.

## Odbiór

Uruchomienie i prezentacja: frontend/README.md. Szczegółowy scenariusz: docs/DEMO-WORKFLOW.md. Zmiany trafiają przez gałąź funkcjonalną i PR do main, z akceptacją minimum jednej osoby. W PR używamy Refs, nie Closes: demo nie kończy całości tych zgłoszeń.
