# Agent Instructions

## Commands

```bash
npm start        # Dev server at http://localhost:4200
npm run build    # Production build to dist/portfolio
npm run test     # Karma unit tests (Chrome browser)
npm run watch    # Watch mode with development config
```

## Architecture

Angular 16 **module-based** SPA — **not standalone components**. All components are declared in `AppModule` ([src/app/app.module.ts](src/app/app.module.ts)).

**Layout (single page):**
```
AppComponent (root, OnPush)
  ├── HeaderComponent   — toolbar with nav links + dark mode toggle
  ├── SideBarComponent  — collapsible profile/resume sidebar (4 cols)
  └── WorkComponent     — GitHub repos grid fetched from API (8 cols)
```

**Data flow:**
- `AppComponent` holds theme state via `ThemeService`; passes `isDarkMode` input to `HeaderComponent` which emits `darkModeToggle` output back
- `SideBarComponent` is self-contained with static `ProfileModel` data
- `WorkComponent` fetches from GitHub API via `GithubReposService` on `ngOnInit`

## Key Files

| Path | Purpose |
|------|---------|
| [src/app/app.module.ts](src/app/app.module.ts) | Module — add new components/imports here |
| [src/app/models/](src/app/models/) | `GithubRepo`, `ProfileModel`, `LinkModel`, `EducationModel`, `ExperienceModel`, `ContactModel` |
| [src/app/services/github-repos.service.ts](src/app/services/github-repos.service.ts) | GitHub API — endpoint: `api.github.com/users/aletomba/repos` |
| [src/app/services/theme.service.ts](src/app/services/theme.service.ts) | Dark/light mode — persists to `localStorage`, applies `data-theme` on `<html>` |
| [src/app/side-bar/side-bar.component.ts](src/app/side-bar/side-bar.component.ts) | Edit here to update resume/profile content |
| [src/styles.scss](src/styles.scss) | Global CSS variables for theming; dark mode via `[data-theme="dark"]` |

## Conventions

- **New components**: `ng generate component <name>` — then declare in `AppModule`
- **Change detection**: `OnPush` everywhere; `WorkComponent` calls `ChangeDetectorRef.markForCheck()` after async data
- **RxJS cleanup**: use `takeUntil(destroy$)` + `Subject` completed in `ngOnDestroy` (see `WorkComponent`)
- **Theme**: CSS variables on `:root`, overridden by `[data-theme="dark"]` — never hardcode colors
- **SCSS**: component-scoped + global in `src/styles.scss`; no CSS modules
- Material modules already imported: `MatToolbar`, `MatDivider`, `MatIcon`, `MatButton`
- Strict TypeScript; no implicit `any`

## Theme System

`ThemeService`: reads `localStorage('darkMode')` or system preference on init → sets `data-theme="dark|light"` on `<html>` and `dark-mode` class on `<body>`. All colors are CSS variables in [src/styles.scss](src/styles.scss).

## Testing

- Jasmine/Karma; one `.spec.ts` per component in its directory
- Run in Chrome (headless not configured)
- VS Code launch config available for debugging tests

## Deployment

- **CI**: GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) auto-deploys to GitHub Pages on push to `main` with `--base-href=/Portfolio/`
- Manual deploy: `ng deploy --base-href=/Portfolio-1/` (note: CI uses `/Portfolio/`, not `/Portfolio-1/`)
- Production build budgets: 500 KB warning, 1 MB error

## Gotchas

- **`Portfolio-audit-base/`**: read-only snapshot of the pre-refactor state — do not edit it
- **`angular-component` skill** (`.agents/skills/angular-component/`) targets Angular v20+ standalone — **does not apply here**; use module-based patterns instead
- Analytics disabled (`angular.json` `cli.analytics: false`)
- `dist/` and `node_modules/` are gitignored
