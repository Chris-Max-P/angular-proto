# Architecture

- `app-logic`: contains any app-related logic (functionality, ...)
- `data-logic`: contains any data-related logic (models, services, ... for data handling)
- `global-components`: contains components that are used globally (e.g. in multiple modules)
- `pages`: contains the pages of the app

## modules
Every module has a directory that contains (if existent):
- module-name.module.ts
- components
- enums
- models
- services

# Added features
- translation using `ngx-translate`
- environment variables
- logger service for default logging logic
- rest service for default rest communication
- routing with `Home`-component as default page
- default paths for all 4 important architecture paths (in `tsconfig.json`)
