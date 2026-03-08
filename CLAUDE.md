# Portfolio — Project Docs

## Stack
- React 19 + TypeScript (strict, verbatimModuleSyntax) + Vite
- `lucide-react` for icons

## Dev Commands
```bash
npm run dev       # dev server → http://localhost:5173
npm run build     # TypeScript compile + Vite production build
npm run preview   # serve production build locally
npm run lint      # ESLint check
```

## Color System (`src/index.css` `:root`)

| Variable | Value | Usage |
|---|---|---|
| `--color-bg-base` | `#050911` | Page background |
| `--color-bg-surface` | `#0b1120` | Cards, navbar |
| `--color-bg-elevated` | `#111827` | Skill pills, hovers |
| `--color-accent` | `#1d4ed8` | Electric blue CTAs/highlights |
| `--color-accent-hover` | `#2563eb` | Hover on accent elements |
| `--color-accent-muted` | `#1e3a8a` | Subtle accent borders |
| `--color-text-primary` | `#f1f5f9` | Headings |
| `--color-text-secondary` | `#94a3b8` | Body copy |
| `--color-text-muted` | `#64748b` | Timestamps, metadata |
| `--color-border` | `#1e293b` | Card borders, dividers |

## Photo
- Place your photo at `public/sajad.jpg`.
- The `<img>` tag is in `src/App.tsx` in the `About` component: `<img src="/sajad.jpg" alt="Sajad Daneshmand" className="about__photo" />`
- Displayed at 240×240px, `object-fit: cover`, slightly desaturated.

## Updating Links
All external links are in `src/App.tsx`. Search for the following strings to find and update them:
- GitHub: `https://github.com/saji2000`
- LinkedIn: `https://www.linkedin.com/in/sajad-d/`
- Email: `mailto:sajaddaneshmand79@gmail.com`

## Data Constants (in `src/App.tsx`)
- **`JOBS`** array — experience timeline. Each entry has: `role`, `company`, `period`, `bullets[]`, `tags[]`.
- **`SKILL_GROUPS`** array — skills section. Each entry has: `category`, `skills[]`.

Both are defined near the top of `src/App.tsx`, above the hook and components.

## TypeScript Notes
- Type-only imports must use `import type` or inline `type` keyword (verbatimModuleSyntax).
- `noUnusedLocals` is enabled — every imported icon must appear in JSX.
- All component props must be typed via interfaces.
