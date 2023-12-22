# Installation

## Prerequisites
- `node.js` > v18.13.0 (and with that `npm`)

## Installation steps
- open command line and navigate to the project base dir
- run `npm install`
- run `npm run start`
- open browser and navigate to http://localhost:4200

# Architecture

- `app-logic`: contains any app-related logic (functionality, ...)
- `data-logic`: contains any data-related logic (models, services, ... for data handling)
- `global-components`: contains components that are used globally (e.g. in multiple modules)
- `pages`: contains the pages of the app

## Modules
Every module has a directory that contains (if existent):
- module-name.module.ts
- components
  - component-name
    - component-name.component.ts
    - component-name.component.html
    - component-name.component.scss
    - component-name.component.spec.ts
- enums
- models
- services

# Added features
- **translation** using `ngx-translate` (see `app.module.ts` and directory `assets/i18n`)
- **environment variables** (see directory `environments`)
- **logger** service for default logging logic (see `app-logic/services/logger.service.ts`)
- **rest service** for default rest communication logic (see `app-logic/services/rest.service.ts`)
- **routing** with `Home`-component as default page (see `app-routing.module.ts`)
- **short paths** for all 4 important architecture paths (see `tsconfig.json` -> `compilerOptions.paths`)
- **material icons** (see https://www.angularjswiki.com/de/angular/angular-material-icons-list-mat-icon-list/)
