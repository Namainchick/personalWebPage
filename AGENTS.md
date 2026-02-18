# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js App Router project (TypeScript + Tailwind). Keep code organized by responsibility:

- `app/`: route files (`page.tsx`, `layout.tsx`) and route folders like `erfahrungen/`, `projekte/`, `kontakt/`.
- `components/`: reusable UI components (PascalCase filenames, e.g. `SectionHeading.tsx`).
- `data/`: typed content sources (`experiences.ts`, `projects.ts`).
- `contexts/`, `hooks/`: shared React state/hooks.
- `translations/`: locale JSON files (`en.json`, `de.json`).
- `public/`: static images/icons.
- `docs/plans/`: design and implementation plans.

## Build, Test, and Development Commands
Use npm (lockfile is `package-lock.json`):

- `npm run dev`: start local dev server at `http://localhost:3000`.
- `npm run build`: create production build.
- `npm run start`: run built app in production mode.
- `npm run lint`: run ESLint with Next.js + TypeScript rules.

## Coding Style & Naming Conventions
- Formatting is defined in `.prettierrc`: 2-space indent, semicolons, double quotes, trailing commas (`es5`), `printWidth: 100`.
- Follow ESLint config in `eslint.config.mjs` (`eslint-config-next` core-web-vitals + TypeScript).
- Use strict TypeScript patterns (`tsconfig.json` has `"strict": true`).
- Components: PascalCase (`Nav.tsx`); hooks: `useX` (`useTranslatedData.ts`); route folders: lowercase.
- Prefer `@/` path alias imports over deep relative paths when practical.

## Testing Guidelines
There is currently no dedicated test runner or `npm test` script in this repository. Minimum validation for changes:

- Run `npm run lint`.
- Manually verify impacted routes in `app/` (desktop + mobile).
- For UI edits, confirm translations and image assets still load correctly.

If you add tests, use colocated `*.test.ts(x)` files or a `__tests__/` folder and include a script in `package.json`.

## Commit & Pull Request Guidelines
Recent history mostly follows Conventional Commit-style prefixes: `feat:`, `style:`, `docs:`, `i18n:`. Continue that pattern and keep subjects concise and imperative.

PRs should include:

- Clear summary of user-visible changes and affected routes/components.
- Linked issue/task when applicable.
- Screenshots or short recordings for visual changes.
- A quick verification checklist (at least `npm run lint` + manual route checks).
