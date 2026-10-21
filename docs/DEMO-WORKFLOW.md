# Demo procesu rekrutacyjnego — odbiór

Gałąź: feature/US-04-US-10-recruitment-demo. Zawiera wspólną podstawę frontendu, motywy i widoki ról. Aktualne zestawienie etapów: ETAPY.md.

## Zakres
- US-04: formularz CV, wybór pliku i drag & drop, kontrola PDF/DOCX, pustego pliku i limitu 5 MiB (założenie demo do uzgodnienia z zespołem), blokada ponownego zgłoszenia do tej samej oferty.
- US-05 / US-12: ręczna symulacja kolejki, przetwarzania, sukcesu, błędu i ponowienia. Brak Celery, automatycznego retry i exponential backoff.
- US-06 / US-07: trzy fikcyjne profile, przykładowe oceny, briefing ze wskazaniem fikcyjnych źródeł. Wartości nie pochodzą z przesłanych CV; to stała makieta oferty Frontend Developer, niezależna od edycji ofert.
- US-08: po 8 pytań startowych dla fikcyjnych profili, kategorie, edycja/dodawanie/usuwanie, jawny zapis. Nowe zgłoszenia mają pustą listę pytań do ręcznego uzupełnienia.
- US-09: tabela z wykresami słupkowymi wybranych fikcyjnych profili; aktualizacja wyboru bez odświeżania.
- US-10: notatki rekrutera, cztery statusy i historia zmian przypisana do zgłoszenia.

## Ograniczenia
Plik CV nie jest odczytywany ani wysyłany. Rozszerzenie i rozmiar nie dowodzą poprawności zawartości. Nazwa i rozmiar są zapisywane w localStorage, razem z fikcyjnym identyfikatorem kandydata. Używaj wyłącznie plików testowych bez danych osobowych w nazwie.

Stan zgłoszeń: klucz ser.demo.applications.v1. Kandydat widzi tylko rekordy candidate-demo; nie widzi notatek, pytań, briefingu ani fikcyjnych profili innych osób. Jest to filtr UI, nie autoryzacja. Demo rekrutera ma dostęp do całej lokalnej przestrzeni. Brak synchronizacji równoczesnych kart, API, JWT, RAG i zapisu w PostgreSQL. Usunięcie oferty nie usuwa zgłoszeń — przechowują kopię jej tytułu. Usunięcie wszystkich ofert pozostawia przykładowe profile jako niezależne fixture demo.

Nowe zgłoszenie nawet po symulowanym statusie gotowe nie otrzymuje wymyślonego wyniku AI. Przejście między profilami usuwa niezapisany szkic pytań/notatek — użyj Zapisz przed zmianą profilu.

## Testowanie
1. Demo kandydata → Szczegóły oferty → zapisz zgłoszenie z fikcyjnym PDF/DOCX.
2. Sprawdź pusty plik, niedozwolony typ, ponad 5 MiB i brak pliku.
3. Moje zgłoszenia → Rozpocznij symulację → Symuluj błąd → Ponów próbę → Rozpocznij → Zakończ.
4. Odśwież i wróć do kandydata: zgłoszenie pozostaje. Próba ponownego aplikowania do tej samej oferty jest zablokowana.
5. Wyjdź → Demo rekrutera → Kandydaci i rozmowy. Otwórz Alex, sprawdź briefing, edytuj pytanie i zapisz.
6. Zapisz notatkę, zmień status. Odśwież i ponownie wejdź w profil: dane i historia pozostają.
7. Zaznacz dwa profile do porównania i odznacz jeden. Tabela i wykresy odpowiadają wyborowi.
8. Wróć do kandydata: widzi status swojego zgłoszenia, ale nie notatki ani dane pozostałych kandydatów.

Kontrole automatyczne: w frontend `npm.cmd test` (16 testów), `npm.cmd run build`.

## Proponowany PR
Tytuł: feat(frontend): extend local recruitment workflow demo
Powiązania: Refs #4, #5, #6, #7, #8, #9, #10, #12, #18. Nie używaj Closes — demonstracja nie spełnia backendowych kryteriów tych zgłoszeń.
DoD: build i testy node:test; pytest/AI retry/Alembic nie dotyczą samego frontendu. Brak sekretów i .env. Wymagane review jednej osoby przed scaleniem.
