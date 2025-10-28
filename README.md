## KindGarden (Frontend-only)

A colorful, kid-friendly preschool learning app built with React + Vite + Tailwind. No backend: data is stored in localStorage with a small seeding mechanism.

### Features
- Language lessons with video, karaoke song, and quiz
- Math basics with visual manipulatives and timed mode
- Movement exercises with a simple mascot animator
- Karaoke viewer for songs
- Cartoons player (drop videos in public/assets/videos)
- Gamification: coins, leaderboard (top 5), nominations
- Profiles with avatar upload and group assignment
- Accessibility: keyboardable controls, aria labels, large touch targets

### Tech
- React (function components + hooks)
- Vite
- Tailwind CSS v4 via `@import "tailwindcss"` in `src/index.css`
- localStorage DB wrapper (`src/lib/localDB.js`)
- Vitest tests (optional)

### Run
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

### Data model
- groups: [{ id, name }]
- kids: [{ id, name, avatar, groupId, coins, nominations:[], stats:{ wins, played } }]
- languageLessons, mathLessons, movementExercises
- coinsTransactions: { [kidId]: [{ ts, amount, reason, lessonId? }] }

### Seeding
On first run, `seedIfEmpty()` writes sample groups, kids, and lessons to `localStorage["kg_db"]`. To reset seed:
- Clear localStorage for this origin (DevTools > Application > Clear storage), or
- Run `localStorage.removeItem('kg_db')` and reload.

### Assets
- Place placeholder images/audio/videos under:
  - `public/assets/avatars/`
  - `public/assets/audio/`
  - `public/assets/videos/`
- Example references: `/assets/videos/fruits_1.mp4`, `/assets/audio/fruits_song.mp3`.

### Configure languages / add lessons
- Extend `src/lib/localDB.js` seed arrays (`languageLessons`, `mathLessons`, `movementExercises`).
- Or import from JSON and merge before `setDb(seed)`.

### Simulate a group competition
1. Go to Competitions.
2. Choose a group and click Run Competition.
3. The app randomly awards small coin amounts to kids and shows a celebration modal.
4. Check the updated Leaderboard in Results.

### Accessibility
- All actionable elements have clear focus styles and `aria-label` where applicable.
- Videos have controls and a captions track placeholder.
- Motion is approachable and limited; movement content can be paused.

### Tests
- `localDB` seeds and updates coins
- `coins` awards update totals
- Leaderboard sorts by coins

### Notes
- Default font: Poppins (see `public/index.html`).
- Hash-based router to avoid extra dependencies.
- All writes go through `src/lib/localDB.js`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
