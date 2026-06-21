import { bench, describe } from "vitest"

import { rangeize } from "../index.js"

// Dense input: long consecutive runs that collapse into few spans.
const dense = Array.from({ length: 10_000 }, (_, i) => i)

// Sparse input: every value is isolated, so every value becomes its own span.
const sparse = Array.from({ length: 10_000 }, (_, i) => i * 2)

// Mixed input: alternating runs of consecutive and gapped values.
const mixed = Array.from({ length: 10_000 }, (_, i) => i + Math.floor(i / 5))

describe("rangeize", () => {
  bench("dense (single long run)", () => {
    rangeize(dense)
  })

  bench("sparse (every value isolated)", () => {
    rangeize(sparse)
  })

  bench("mixed (alternating runs)", () => {
    rangeize(mixed)
  })

  bench("custom adjacency rule", () => {
    rangeize(mixed, (left, right) => right - left <= 2)
  })
})
