# rangeize

> `[1,2,3,4,5] => [1,5]` Convert sequential numbers to ranges.

![rangeize folds consecutive numbers into inclusive ranges](./assets/rangeize.svg)

## Install

```sh
npm install rangeize
```

## Usage

```ts
import { rangeize } from "rangeize"

rangeize([2, 3, 4, 5, 7, 11, 12])
// [
//   { start: 2, end: 5 },
//   { start: 7, end: 7 },
//   { start: 11, end: 12 },
// ]
```

Pass a custom adjacency rule when consecutive values follow a different rule:

```ts
rangeize([1, 2, 4, 10, 12], (left, right) => right - left <= 2)
// [
//   { start: 1, end: 4 },
//   { start: 10, end: 12 },
// ]
```

Input order is preserved. Sort the input first when numeric ordering is required.

### Notes

- A span's `end` is always the latest value that the adjacency rule absorbed. The
  default rule (`left + 1 === right`) only merges strictly increasing values, so
  spans stay well-formed (`start <= end`). A custom rule that accepts a smaller
  `right` than `left` on unsorted input can produce an inverted span
  (`start > end`) — keep the rule monotonic, i.e. only return `true` when
  `left < right`.
- Duplicate values are not adjacent under the default rule, so they split into
  separate spans: `rangeize([1, 1, 2])` → `[{ start: 1, end: 1 }, { start: 1, end: 2 }]`.

## Performance

`rangeize` runs in `O(n)` — a single pass that folds each value into the current
span or opens a new one. Measured mean per call on an M-series laptop
(`npm run build && npm run bench`):

| Data Size     | dense (one long run) | mixed (alternating runs) | sparse (all isolated) |
| ------------- | -------------------- | ------------------------ | --------------------- |
| 1,000 items   | ~0.007 ms            | ~0.008 ms                | ~0.010 ms             |
| 10,000 items  | ~0.10 ms             | ~0.11 ms                 | ~0.15 ms              |
| 100,000 items | ~1.3 ms              | ~1.1 ms                  | ~2.7 ms               |

Time scales linearly with input length. Sparse input is the slowest case because
every value opens its own span (maximum output size); dense and mixed inputs
collapse into fewer spans and stay faster. A custom adjacency rule adds only the
cost of the predicate call and tracks the mixed numbers closely.

## License

MIT © [elzup](https://github.com/elzup)
