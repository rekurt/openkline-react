# CLAUDE.md — @rekurt/openkline-react

Guidance for AI agents working in this repository.

## What this repo is

The **React 18+/19 wrapper** for [OpenKline](https://github.com/rekurt/openkline).
It ships `@rekurt/openkline-react`: an `<OHLCVChart>` component and a
`useOHLCVChart` hook. All chart logic lives in the core engine
([`@rekurt/openkline-core`](https://github.com/rekurt/openkline)) — this package
is **thin glue**, not a reimplementation.

> **Naming:** "OpenKline" is the brand. "OHLCV" is the financial data type
> (Open-High-Low-Close-Volume) and stays in domain symbols like `OHLCVChart`,
> `OHLCVChartRef`, `OHLCVChartProps`, and `useOHLCVChart`. Don't rename those.

## Layout

```
src/
  OHLCVChart.tsx     the <OHLCVChart> component (forwardRef → OHLCVChartRef)
  useOHLCVChart.ts   the hook
  index.ts           public exports
example/             full Vite demo app (port 5174)
vendor/
  rekurt-openkline-core.tgz   vendored build of the core (pre-publish)
scripts/update-core.mjs       refreshes the vendored tarball
```

## Commands

```bash
npm install          # installs deps incl. the vendored core tarball
npm run build        # tsup → dist/ (esm + cjs + d.ts)
npm test             # vitest (jsdom)
npm run lint         # ESLint, --max-warnings 0  (must stay at 0)
npm run typecheck    # strict tsc — run AFTER build (example needs dist/)
npm run dev:example  # vite demo → http://localhost:5174
npm run update:core  # re-pull + build + pack core into vendor/
```

Green bar before pushing: **build → typecheck → test → lint** all pass.

## The vendored core tarball

`@rekurt/openkline-core` is not published yet, so this repo installs it from
`vendor/rekurt-openkline-core.tgz` (`file:` dependency). After any change to the
core's public API, run `npm run update:core` to clone
[rekurt/openkline](https://github.com/rekurt/openkline), build `packages/core`,
and re-pack the tarball — then commit `vendor/` and the refreshed lockfile.

## Conventions

- **Don't reimplement engine logic here.** If something belongs to rendering,
  data, indicators or interaction, it goes in the core.
- Keep **full API parity** with the vanilla and Vue entry points.
- Indicators are **config objects**, never constructor calls, in the public API.
- Strict TypeScript; 0 lint warnings. Match the surrounding file's style.
- Don't rename the `OHLCVChart` / `useOHLCVChart` API symbols (domain terms).
