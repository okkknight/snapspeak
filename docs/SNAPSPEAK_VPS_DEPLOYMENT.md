# snapspeak VPS Deployment

This note records the live deployment shape for `snapspeak` on the `boringmax` VPS.

## Layout

- App source: `/opt/boringmax/snapspeak`
- Public static site: `/opt/boringmax/site/snapspeak`
- Local runtime port: `8093`
- API gateway: `boringapi` on `127.0.0.1:8091`
- Public site path: `https://boringmax.com/snapspeak`

## Runtime

- The VPS runs the backend with `node --import tsx server/index.ts`.
- The server uses the existing Codex CLI OAuth login state already present on the VPS.
- Temporary files should go under a writable `TMPDIR`, for example:
  - `/opt/boringmax/workspace/snapspeak-tmp`

## Routing

- Public UI:
  - `boringmax.com/snapspeak` serves the static site from `/opt/boringmax/site/snapspeak`
- API:
  - `boringmax.com/snapspeak/api/*` is reverse proxied to the local `boringapi` gateway
  - `boringapi` forwards `snapspeak` requests to `127.0.0.1:8093`

## Release flow

1. Build locally with `npm run build`.
2. Sync the app source to `/opt/boringmax/snapspeak`.
3. Sync `dist/` to `/opt/boringmax/site/snapspeak`.
4. Install dependencies on the VPS with `npm ci`.
5. Restart the `snapspeak` service and reload `caddy` / `boringapi` if routing changed.

## Notes

- The frontend uses a relative API path so the same build works under `/snapspeak`.
- The Vite production base is `/snapspeak/`, so the generated asset URLs stay correct under the subpath site.
