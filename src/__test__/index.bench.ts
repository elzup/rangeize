import { bench, describe } from "vitest"

import { rangeize } from "../index.js"

const SIZES = [1_000, 10_000, 100_000]

// Dense input: long consecutive runs that collapse into few spans.
const dense = (n: number) => Array.from({ length: n }, (_, i) => i)

// Sparse input: every value is isolated, so every value becomes its own span.
const sparse = (n: number) => Array.from({ length: n }, (_, i) => i * 2)

// Mixed input: alternating runs of consecutive and gapped values.
const mixed = (n: number) =>
  Array.from({ length: n }, (_, i) => i + Math.floor(i / 5))

for (const n of SIZES) {
  const denseInput = dense(n)
  const sparseInput = sparse(n)
  const mixedInput = mixed(n)

  describe(`rangeize (${n.toLocaleString("en-US")} items)`, () => {
    bench("dense (single long run)", () => {
      rangeize(denseInput)
    })

    bench("sparse (every value isolated)", () => {
      rangeize(sparseInput)
    })

    bench("mixed (alternating runs)", () => {
      rangeize(mixedInput)
    })

    bench("custom adjacency rule", () => {
      rangeize(mixedInput, (left, right) => right - left <= 2)
    })
  })
}
