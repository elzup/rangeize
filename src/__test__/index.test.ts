import { describe, expect, it } from "vitest"

import { unspan } from "../index.js"

describe("unspan", () => {
  it("returns no spans for an empty array", () => {
    expect(unspan([])).toStrictEqual([])
  })

  it("combines consecutive numbers into inclusive spans", () => {
    expect(unspan([1, 2, 3, 4, 5])).toStrictEqual([{ start: 1, end: 5 }])
    expect(unspan([1, 5])).toStrictEqual([
      { start: 1, end: 1 },
      { start: 5, end: 5 },
    ])
    expect(unspan([2, 3, 4, 5, 6, 10, 21, 22, 23])).toStrictEqual([
      { start: 2, end: 6 },
      { start: 10, end: 10 },
      { start: 21, end: 23 },
    ])
  })

  it("wraps a single value in a one-element span", () => {
    expect(unspan([42])).toStrictEqual([{ start: 42, end: 42 }])
  })

  it("splits duplicate values into separate spans under the default rule", () => {
    expect(unspan([1, 1, 2])).toStrictEqual([
      { start: 1, end: 1 },
      { start: 1, end: 2 },
    ])
  })

  it("supports a custom adjacency rule", () => {
    expect(unspan([1, 2, 4, 10, 12], (left, right) => right - left <= 2)).toStrictEqual([
      { start: 1, end: 4 },
      { start: 10, end: 12 },
    ])
  })
})
