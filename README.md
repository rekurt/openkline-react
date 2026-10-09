<div align="center">

# @rekurt/openkline-react

### React 18+/19 wrapper for [OpenKline](https://github.com/rekurt/openkline)

An idiomatic `<OHLCVChart>` component and a `useOHLCVChart` hook — full API
parity with the framework-agnostic [`@rekurt/openkline-core`](https://github.com/rekurt/openkline)
charting engine.

[![CI](https://github.com/rekurt/openkline-react/actions/workflows/ci.yml/badge.svg)](https://github.com/rekurt/openkline-react/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg)](./tsconfig.json)

</div>

---

## Ecosystem

| Package | Repository | Role |
| --- | --- | --- |
| `@rekurt/openkline-core` | [rekurt/openkline](https://github.com/rekurt/openkline) | Engine: rendering, data, interaction, indicators, drawings. |
| **`@rekurt/openkline-react`** | **this repo** | **React 18+/19 wrapper.** |
| `@rekurt/openkline-vue` | [rekurt/openkline-vue](https://github.com/rekurt/openkline-vue) | Vue 3 wrapper. |

---

## Install

```bash
npm install @rekurt/openkline-core@^0.2.0 @rekurt/openkline-react
```

For development from a repository checkout, this repo uses a tested core
0.2.0 tarball at `vendor/rekurt-openkline-core.tgz`. Application installations
use the npm peer dependency shown above.

---

## Usage

```tsx
import { useRef, useMemo } from 'react';
import { OHLCVChart, type OHLCVChartRef } from '@rekurt/openkline-react';
import type { Candle, IndicatorConfig } from '@rekurt/openkline-core';

export function App({ candles }: { candles: Candle[] }) {
  const chartRef = useRef<OHLCVChartRef>(null);

  // Indicators are a plain config array — no `new SMA(20)` in user code.
  // The wrapper runs them through createIndicator() + diffIndicatorConfigs()
  // so the reference stays stable across hover-driven re-renders.
  const indicators = useMemo<IndicatorConfig[]>(
    () => [
      { type: 'sma', period: 20 },
      { type: 'ema', period: 50 },
      { type: 'bb', period: 20, stdDev: 2 },
    ],
    [],
  );

  return (
    <div style={{ width: '100%', height: 600 }}>
      <OHLCVChart
        ref={chartRef}
        symbol="BTC/USDT"
        resolution="1H"
        data={candles}
        theme="auto"
        chartType="candles"
        indicators={indicators}
        onHover={(info) => console.log('hovered', info?.index)}
        onError={(err) => console.error('[openkline]', err)}
      />
      <button onClick={() => chartRef.current?.goToLive()}>Go live</button>
    </div>
  );
}
```

### Imperative API

Everything the core exposes is reachable through the typed `OHLCVChartRef`:
`goToLive()`, `saveLayoutState()` / `loadState()`, drawing and indicator
management, PNG/SVG export, and more. Prefer declarative props for state that
React owns; reach for the ref for imperative actions (export, share, fit).

---

## Why a wrapper, not a rewrite

All chart logic lives in `@rekurt/openkline-core`. This package owns only the
React glue — mounting the canvas, wiring props to engine calls, and forwarding a
stable ref. That is why it tracks the core's features automatically and stays at
**full API parity** with the vanilla and Vue entry points.

---

## Development

```bash
npm install          # installs deps incl. the vendored core tarball
npm run build        # tsup → dist/ (esm + cjs + d.ts)
npm test             # vitest (jsdom)
npm run lint         # ESLint, --max-warnings 0
npm run typecheck    # strict tsc (run after build — example needs dist/)
npm run dev:example  # vite demo app → http://localhost:5174
npm run update:core  # refresh vendor/rekurt-openkline-core.tgz from the monorepo
```

The `example/` workspace is a full-featured Vite demo (drawing tools,
indicators, live simulation, Heikin-Ashi/Renko transforms, PNG export).

---

## License

[MIT](./LICENSE) © OpenKline contributors
