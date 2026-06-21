import { bench, describe } from "vitest"

import { unspan } from "../index.js"

// Dense input: long consecutive runs that collapse into few spans.
const dense = Array.from({ length: 10_000 }, (_, i) => i)

// Sparse input: every value is isolated, so every value becomes its own span.
const sparse = Array.from({ length: 10_000 }, (_, i) => i * 2)

// Mixed input: alternating runs of consecutive and gapped values.
const mixed = Array.from({ length: 10_000 }, (_, i) => i + Math.floor(i / 5))

describe("unspan", () => {
  bench("dense (single long run)", () => {
    unspan(dense)
  })

  bench("sparse (every value isolated)", () => {
    unspan(sparse)
  })

  bench("mixed (alternating runs)", () => {
    unspan(mixed)
  })

  bench("custom adjacency rule", () => {
    unspan(mixed, (left, right) => right - left <= 2)
  })
})
