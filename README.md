# SER aka Screening & Evaluation for Recruiters

Aplikacja webowa z obszaru HR-Tech automatyzująca wstępną analizę CV oraz przygotowująca rekrutera do rozmowy kwalifikacyjnej z wykorzystaniem mechanizmu RAG i modeli LLM.

## Zespół i podział ról

* **[Paweł A.]** (@ghorshy) – **Scrum Master** & **Architekt Backend & AI** 
* **[Kacper N.]** (@p1mp3qq) – **Deweloper Frontend & UI/UX** 
* **[Jakub W.]** (@JacobLegume) – **Inżynier Jakości (QA) & DevOps** 
* **[Piotr K.]** (@DriedTomatoes) – **Analityk Danych & Walidacja AI** 

---

## Stos technologiczny

* **Backend:** Python (FastAPI), Celery, Redis
* **Frontend:** React + Tailwind CSS
* **Baza danych & AI:** PostgreSQL (Alembic), ChromaDB (Vector Store), OpenAI API / LangChain
* **DevOps:** Docker Compose, GitHub Actions, Render

---

## Szybkie uruchomienie — lokalne demo frontendu

Repozytorium zawiera lokalne demo procesu rekrutacji w React + Tailwind CSS: oferty, osobne widoki ról, zgłoszenia, fikcyjne briefingi, pytania, porównanie i notatki.

```powershell
git clone --branch feature/US-04-US-10-recruitment-demo https://github.com/JacobLegume/SER-HR-Automation.git
cd SER-HR-Automation/frontend
npm.cmd ci
npm.cmd run dev
```

Wymagany Node.js 22.12+ z npm (zalecany Node 24 LTS). Otwórz adres z terminala, domyślnie http://localhost:3000. Jeśli repo już jest pobrane, pomiń klonowanie. Instrukcja VS Code, testów i przygotowania PR: [frontend/README.md](frontend/README.md).

Przed scaleniem demo pobieraj z powyższej gałęzi funkcjonalnej. [Instrukcja użytkowania](frontend/README.md), [etapy wykonane i następne kroki](docs/ETAPY.md), [scenariusz testowy](docs/DEMO-WORKFLOW.md). Demo zapisuje fikcyjne oferty i zgłoszenia tylko w przeglądarce. Nie wymaga `.env`, kluczy API ani Dockera. Backend, baza i integracja AI nie są jeszcze zaimplementowane. Uruchomienie pełnego systemu przez Docker Compose będzie dostępne po realizacji SER-02; obecnie brak pliku Compose.

---

## Jak pracujemy :)

Wszyscy członkowie zespołu przestrzegają poniższych zasad pracy na Git:

1. **Praca na dedykowanych branchach:**
   Nie commitujemy bezpośrednio do gałęzi `main`. Dla każdego zadania (Issue) tworzymy nową gałąź z `main`:
   * `git checkout main && git pull`
   * `git checkout -b feature/US-01-nazwa-zadania`

2. **Tworzenie Pull Requesta (PR):**
   Po wykonaniu i przetestowaniu zmian wysyłamy branch na GitHuba i otwieramy **Pull Request do gałęzi `main`**:
   * `git push origin feature/US-01-nazwa-zadania`

3. **Code Review & DoD:**
   * Każdy PR musi zostać zaakceptowany przez **co najmniej 1 osobę z zespołu** (Code Review) przed scaleniem.
   * Upewnij się, że zmiany spełniają kryteria w szablonie PR (brak zakodowanych kluczy API, przechodzące testy, uzupełnione `.env`).

4. **Tablica Projektowa:**
   Prace i statusy zadań śledzimy na naszej tablicy [GitHub Projects](https://github.com/users/JacobLegume/projects/3).
