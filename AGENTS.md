# Agent Instructions

## Commands

```bash
npm start        # Dev server at http://localhost:4200
npm run build    # Production build to dist/portfolio
npm run test     # Karma unit tests (Chrome browser)
npm run watch    # Watch mode with development config
```

## Project Structure

- Angular 16 SPA (not standalone components)
- Entry: `src/main.ts` bootstraps `AppModule`
- Components: `HeaderComponent`, `SideBarComponent`, `WorkComponent`
- Styling: SCSS (component and global)

## Conventions

- Use `ng generate` for scaffolding: `ng generate component <name>`
- SCSS for all styles (configured in `angular.json`)
- Angular Material is pre-configured (MatToolbar, MatIcon, MatButton, MatDivider)
- `HttpClientModule` is already imported for HTTP requests
- Strict TypeScript enabled (`tsconfig.json`)

## Testing

- 4 spec files exist in component directories
- Tests run via Karma in Chrome browser
- VS Code launch config available for debugging tests

## Deployment

- `angular-cli-ghpages` installed: `ng deploy --base-href=/Portfolio-1/`
- Production build budgets: 500kb warning, 1mb error

## Gotchas

- Analytics disabled (`angular.json` cli.analytics: false)
- No pre-commit hooks or CI workflows exist
- `dist/` and `node_modules/` are gitignored
