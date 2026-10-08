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

## Szybkie uruchomienie

1. **Sklonuj repozytorium:**
   git clone https://github.com/twoja-organizacja/SER-HR-Automation.git
   cd SER-HR-Automation

2. **Skonfiguruj zmienne środowiskowe:**
   Skopiuj plik `.env.example` i uzupełnij klucze API:
   cp .env.example .env

3. **Uruchom projekt za pomocą Docker Compose:**
   docker-compose up --build

   * **API Backend:** http://localhost:8000
   * **Frontend:** http://localhost:3000
   * **Dokumentacja Swagger:** http://localhost:8000/docs

---

## Jak pracujemy :)

Wszyscy członkowie zespołu przestrzegają poniższych zasad pracy na Git:

1. **Praca na dedykowanych branchach:**
   Nie commitujemy bezpośrednio do gałęzi `main`. Dla każdego zadania (Issue) tworzymy nową gałąź z `main`:
   git checkout main && git pull
   git checkout -b feature/US-01-nazwa-zadania
   # lub: task/TASK-01-opis, bugfix/US-02-opis

2. **Tworzenie Pull Requesta (PR):**
   Po wykonaniu i przetestowaniu zmian wysyłamy branch na GitHuba i otwieramy **Pull Request do gałęzi `main`**:
   git push origin feature/US-01-nazwa-zadania

3. **Code Review & DoD:**
   * Każdy PR musi zostać zaakceptowany przez **co najmniej 1 osobę z zespołu** (Code Review) przed scaleniem.
   * Upewnij się, że zmiany spełniają kryteria w szablonie PR (brak zakodowanych kluczy API, przechodzące testy, uzupełnione `.env`).

4. **Tablica Projektowa:**
   Prace i statusy zadań śledzimy na naszej tablicy [GitHub Projects](https://github.com/users/JacobLegume/projects/3).
