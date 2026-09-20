# JobScout

**Scout once. Search everywhere.**

JobScout is a lightweight job-search utility that turns a list of job titles into direct search links across multiple job boards. Add your titles, choose your boards and location, and JobScout handles the rest.

🌐 **[Live Demo](https://JobScout-za.vercel.app/)**

## ✨ Features

- Add multiple job titles at once.
- Automatically trim, clean, and deduplicate titles.
- Generate searches for:

  - Indeed
  - LinkedIn
  - PNet
  - Careers24

- Optional location filtering.
- Enable or disable job boards in Settings.
- Save titles and preferences with `localStorage`.
- Manage or clear saved searches.
- Responsive across mobile, tablet, and desktop.
- Vitest tests for URL generation.

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Vitest
- `localStorage`
- No backend or database required.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm 7+

### Installation

```bash
git clone https://github.com/hlakokabelo/JobScout
cd jobscout
npm install
npm run dev
```

Then open `http://localhost:5173`.

### Production Build

```bash
npm run build
```

### Tests

```bash
npm test
```

## 📖 Usage

1. **Home** — Paste your job titles, one per line.
2. **Settings** — Select job boards and optionally enter a location.
3. **Generate Searches** — Save your titles and open the Searches page.
4. **Searches** — Open each title directly on your selected job boards.
5. **Manage** — Delete individual titles or clear all searches.

## 🧱 Architecture

Each job board implements a shared `JobBoard` interface with a pure `generateUrl(title, location)` function. This keeps board-specific logic isolated and makes adding new boards straightforward.

User preferences and searches are persisted through a small `localStorage` utility, while React state handles the application's UI state.

## 🔮 Planned

- Search groups and categories
- Application tracking
- Search history
- Favorite job titles
- Multiple locations and remote filters
- Preset title lists

## 📄 License

MIT License © 2026 JobScout
