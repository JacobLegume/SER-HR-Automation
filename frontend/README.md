# SER — lokalne demo frontendu

React + JavaScript/JSX + Tailwind CSS + Vite. To klikalny prototyp procesu rekrutacji z danymi lokalnymi, nie produkcyjny system HR. Zestawienie etapów i następnych kroków: [ETAPY.md](../docs/ETAPY.md).

## Pobranie wersji do review

Przed scaleniem PR demo znajduje się na gałęzi funkcjonalnej:

```powershell
git clone --branch feature/US-04-US-10-recruitment-demo https://github.com/JacobLegume/SER-HR-Automation.git
cd SER-HR-Automation
```

Jeśli repo już masz, najpierw sprawdź `git status` i zachowaj własne zmiany, następnie:

```powershell
git fetch origin
git switch feature/US-04-US-10-recruitment-demo
git pull --ff-only
```

## VS Code i uruchomienie

Otwórz cały folder SER-HR-Automation w VS Code. Wymagany Node.js 22.12+ z npm (zalecany 24 LTS). W terminalu:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Otwórz adres z terminala, zwykle http://127.0.0.1:3000. Zajęty port powoduje wybór kolejnego. Ctrl+C zatrzymuje serwer. Na macOS/Linux użyj `npm` zamiast `npm.cmd`. Nie potrzebujesz Dockera, Pythona, .env ani kluczy API.

## Jak korzystać — prezentacja w 5 minut

1. **Wejście:** obejrzyj logowanie/rejestrację. Formularze walidują dane, ale nie tworzą kont. Kliknij „Demo rekrutera” lub „Demo kandydata”; hasło nie jest potrzebne. Odświeżenie wraca do ekranu wejścia.
2. **Rekruter / oferty:** dodaj ofertę, podaj opis, poziom i wymagania (każde w osobnym wierszu). Sprawdź edycję, podgląd, wyszukiwarkę, filtr i usuwanie z potwierdzeniem.
3. **Kandydat / aplikowanie:** wyjdź z demo, wybierz kandydata i szczegóły oferty. Wybierz fikcyjny PDF/DOCX do 5 MiB i zapisz zgłoszenie demo. Do jednej oferty można zgłosić się raz. Dokument nie jest wysyłany ani odczytywany.
4. **Moje zgłoszenia:** uruchom symulację przetwarzania, zasymuluj błąd, ponów i zakończ. Statusy przetrwają odświeżenie; „gotowe” nie oznacza analizy AI.
5. **Rekruter / Kandydaci i rozmowy:** zobacz lokalne zgłoszenie i trzy fikcyjne profile. Otwórz Alex: briefing, pytania, notatki i status. Edytuj pytania/notatki i kliknij Zapisz. Zmiana statusu zapisuje historię. Przed przejściem do innego profilu zapisz szkic.
6. **Porównanie:** zaznacz dwa fikcyjne profile — tabela i słupki porównują ich przykładowe kompetencje. Oceny i briefingi są stałymi danymi demonstracyjnymi.
7. **Wygląd:** przełącz jasny/nocny motyw przyciskiem w prawym dolnym rogu. Wybór zostaje zapamiętany. Logo i żółto-fioletowa paleta są wspólne dla obu paneli.

## Zapis i ograniczenia

localStorage: `ser.demo.offers.v1` (oferty), `ser.demo.applications.v1` (zgłoszenia, nazwy/rozmiary plików, pytania, notatki, historia), `ser.theme` (motyw). Używaj tylko fikcyjnych danych. Nie zapisujemy haseł, tokenów ani zawartości CV. Dane są zależne od przeglądarki i adresu strony; localhost i 127.0.0.1 mają oddzielny zapis. Brak synchronizacji między kartami/użytkownikami.

Role są tylko prezentacją UI. Backend musi dopiero egzekwować własność danych i RBAC. Filtr candidate-demo nie jest zabezpieczeniem. Rekruter demo widzi całą lokalną przestrzeń. Usunięcie oferty nie usuwa historii zgłoszeń. Fikcyjne profile są niezależnymi danymi demonstracyjnymi Frontend Developer. Brak prawdziwego logowania, publikacji ofert, parsowania CV, API, AI, kolejki i bazy.

Przy błędzie zapisu ofert zmiany mogą pozostać tylko w pamięci (komunikat ostrzegawczy). Przy błędzie zapisu zgłoszeń zmiana jest odrzucana z komunikatem. Uszkodzony zapis powoduje pokazanie danych przykładowych z ostrzeżeniem.

## Kontrole przed PR

```powershell
npm.cmd test
npm.cmd run build
```

16 testów node:test obejmuje walidację ofert/plików, odczyt uszkodzonego zapisu, pytania i historię statusów. Scenariusz ręczny: [DEMO-WORKFLOW.md](../docs/DEMO-WORKFLOW.md).

## Struktura

- main.jsx — wejście, wybór widoku i zarządzanie ofertami.
- Auth.jsx / Candidate.jsx — formularze wejścia i panel kandydata.
- ApplicationForm.jsx — wybór pliku i zapis zgłoszenia demo.
- RecruitmentBoard.jsx — profile, briefing, pytania, notatki i porównanie.
- offers.js / recruitment.js / useApplications.js — dane, walidacja, lokalny zapis.
- style.css / ThemeToggle.jsx / BrandMark.jsx — style, motywy i logo SVG.

Commitujemy package-lock.json; node_modules i dist są ignorowane. PR kierujemy do main; wymagane review co najmniej jednej osoby. Nie zamykamy całych US na podstawie samego demo. Opis bieżącego PR: [PR-DEMO.md](../docs/PR-DEMO.md).
