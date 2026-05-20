# QA Navigation Validation

This note documents the front-end navigation checks run against the local DNSMin stack and the back-end assumptions needed for those checks.

## Back-end setup

The validation used the sibling `dnsmin-api` repository with the Docker Compose development stack running locally.

Required services:

- DNSMin API on `http://127.0.0.1:8000`
- MySQL and Redis containers from the API stack
- PowerDNS authoritative service from the API stack

The front end proxies `/api` to `http://127.0.0.1:8000` through Vite, so API routes are exercised through the same browser origin as the UI.

The tenant-scoped browser checks used the development seed data from:

- `GET /api/dev/test/data`

The tenant login used the seeded tenant user:

- tenant: `12f9d754-47e2-4f4a-9cc6-b5579ea72acd`
- username: `test`
- password: `test`

The tenant id was set temporarily in `src/public/config.json` during local browser validation and removed afterwards.

## Front-end checks

The UI was served with:

```sh
cd src
npm run dev -- --host 127.0.0.1
```

The production build was checked with:

```sh
cd src
npm run build
```

Selenium was used with Chromium to validate:

- tenant login succeeds through `/user/login`
- dashboard loads after login
- main menus render content instead of blank pages
- system, server, and zone overview counters load from API search endpoints
- tenant users can create DNS records in their authoritative zone
- visible create/update/delete actions either open an implemented dialog or are hidden until the route exists

## Validated routes

The navigation sweep covered:

- `/`
- `/settings`
- `/settings/ui`
- `/settings/registration`
- `/settings/authentication`
- `/settings/synchronization`
- `/system`
- `/system/stopgap-domains`
- `/system/timezones`
- `/system/tenants`
- `/system/clients`
- `/system/users`
- `/system/sessions`
- `/servers`
- `/servers/servers`
- `/servers/servers/:serverId/auto-primaries`
- `/zones`
- `/zones/authoritative`
- `/zones/authoritative/:zoneId/records`
- `/zones/recursive`
- `/audits`
- `/audits/clients`
- `/audits/users`
- `/audits/servers`
- `/audits/zones`
- `/audits/synchronization`
- `/audits/tasks`

## Findings addressed

- Settings and Audits routes rendered only a page header. They now expose section cards so the pages are not empty.
- System, Servers, and Zones overview pages displayed hard-coded zero values. They now load counts from the API.
- Several list views displayed actions for missing routes. Those actions are hidden until the corresponding dialogs/routes are implemented.
- The server list now exposes the implemented Auto-Primaries child route.

## Remaining implementation gaps

The API and front-end service layers already include additional resources that are not yet exposed as full pages:

- server networks
- server views
- server TSIG keys
- authoritative zone metadata
- authoritative zone servers
- authoritative zone crypto keys
- recursive zone records

Those should be wired as dedicated list/detail workflows before exposing menu or row actions for them.
