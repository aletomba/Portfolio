---
name: angular-component
description: Create Angular 16 module-based components for this portfolio project. Use when adding new components, implementing OnPush change detection, using RxJS patterns, or working with Angular Material. Do NOT use standalone component patterns — all components must be declared in AppModule.
---

# Angular Component (Angular 16, Module-Based)

This project uses **Angular 16 with NgModule**. Components are **not standalone** — every new component must be declared in `AppModule` ([src/app/app.module.ts](src/app/app.module.ts)).

## Generate & Register

```bash
ng generate component <name>
# Then add to AppModule declarations manually if not auto-added
```

## Component Structure

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Output() action = new EventEmitter<string>();

  data: SomeType[] = [];
  isLoading = false;
  errorMessage = '';

  private destroy$ = new Subject<void>();

  constructor(
    private someService: SomeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.someService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.data = data;
          this.cdr.markForCheck(); // required with OnPush + async
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.cdr.markForCheck();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## Template Syntax (Angular 16)

Use structural directives — Angular 16 does NOT support `@if`/`@for` block syntax.

```html
<!-- Conditional rendering -->
<div *ngIf="isLoading; else content">
  <p>Loading...</p>
</div>
<ng-template #content>
  <p>Loaded!</p>
</ng-template>

<!-- Loops with trackBy -->
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>
```

```typescript
trackById(index: number, item: Item): number {
  return item.id;
}
```

## Registering in AppModule

After generating a component, ensure it is in `AppModule`:

```typescript
// src/app/app.module.ts
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    WorkComponent,
    ExampleComponent, // ← add here
  ],
  ...
})
export class AppModule {}
```

## Theme-Aware Styling

Never hardcode colors. Use CSS variables defined in [src/styles.scss](src/styles.scss):

```scss
// component.scss
:host {
  background-color: var(--color-card-bg);
  color: var(--color-card-text);
  border: 1px solid var(--color-border);
}
```

Dark mode is handled automatically via `[data-theme="dark"]` on `<html>`.

## Angular Material

These Material modules are already imported in `AppModule` — no extra imports needed:
- `MatToolbarModule`, `MatDividerModule`, `MatIconModule`, `MatButtonModule`

To use others, import the module in `AppModule`.
