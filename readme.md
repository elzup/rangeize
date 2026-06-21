# unspan

> Convert ordered numbers into inclusive spans using customizable adjacency rules.

## Install

```sh
npm install unspan
```

## Usage

```ts
import { unspan } from "unspan"

unspan([2, 3, 4, 10, 21, 22, 23])
// [
//   { start: 2, end: 4 },
//   { start: 10, end: 10 },
//   { start: 21, end: 23 },
// ]
```

Pass a custom adjacency rule when consecutive values follow a different rule:

```ts
unspan([1, 2, 4, 10, 12], (left, right) => right - left <= 2)
// [
//   { start: 1, end: 4 },
//   { start: 10, end: 12 },
// ]
```

Input order is preserved. Sort the input first when numeric ordering is required.

## License

MIT © [elzup](https://github.com/elzup)
