# Фрагменты кода: TypeScript

Здесь собраны небольшие фрагменты кода, которые можно скопировать в проект.

### Типы {#types}

```ts
/** Примитивные типы данных JS (кроме symbol). */
type PrimitiveValue = string | number | boolean | null | undefined;

/** Двумерный массив чисел. */
type Matrix = number[][];
```

```ts
/** Строка, обозначающая какую-либо дату.
 * @example
 * '2024-03-03'
 * '03.03.2024'
 */
type DateString = string;

/** Строка, обозначающая какой-либо цвет.
 * @example
 * '#112233'
 * 'rgb(255, 255, 255)'
 */
type ColorString = string;
```

### Utils

```ts
/** Находит элемент в дереве по условию. */
export function findInTree<T>(
  tree: T[], callback: (node: T) => boolean,
  childrenField: string = 'children',
): T | undefined {
  for (const node of tree) {
    if (callback(node)) return node;
    const children = node[childrenField];
    if (Array.isArray(children)) {
      const item = findInTree(children, callback, childrenField);
      if (item !== undefined) return item;
    }
  }
}
```

```ts
/**
 * @example
 * let array = [0, 0, 1, 0, 1, 0, 0];
 * trimArray(array, item => !item); // [1, 0, 1]
 * */
function trimArray<T>(array: T[], criterion: (e: T) => boolean): T[] {
  let from = 0;
  let to = array.length;

  for (let i = 0; i < array.length; i++) {
    if (!criterion(array[i])) { from = i; break; }
  }
  for (let i = array.length - 1; i >= 0; i--) {
    if (!criterion(array[i])) { to = i + 1; break; }
  }
  return array.slice(from, to);
}
```

### Math

```ts
/** Округляет число до заданного количества знаков после запятой.
 * @param n число, которое нужно округлить
 * @param digits количество знаков после запятой
 * @example
 * round(0.234, 2) => 0.23
 * round(234, -2) => 200
 */
function round(n: number, digits: number = 0): number {
  const multiplier = Math.pow(10, digits);
  return Math.round(n * multiplier) / multiplier;
}
```

```ts
/** Возвращает случаное число между `min` и `max`. */
function random(min: number = 0, max: number = 1): number {
  return min + Math.random() * (max - min);
}
```

### Set

```ts
function setEquality<T>(a: Set<T>, b: Set<T>): boolean {
  if (a === b) return true;
  if (a.size !== b.size) return false;
  for (const element of a) {
    if (!b.has(element)) return false;
  }
  return true;
}
```

```ts
/**
 * @example
 * let a = new Set([1, 2]);
 * let b = new Set([2, 3]);
 * setUnion(a, b); // Set { 1, 2, 3 }
 */
function setUnion<T>(a: Set<T>, b: Set<T>): Set<T> {
  const union = new Set(a);
  for (const element of b) union.add(element);
  return union;
}
```

```ts
/**
 * @example
 * let a = new Set([1, 2, 3]);
 * let b = new Set([2, 3, 4]);
 * setIntersection(a, b); // Set { 2, 3 }
 */
function setIntersection<T>(a: Set<T>, b: Iterable<T>): Set<T> {
  const intersection = new Set<T>();
  for (const element of b) {
    if (a.has(element)) intersection.add(element);
  }
  return intersection;
}
```

```ts
function setDifference<T>(a: Set<T>, b: Iterable<T>): Set<T> {
  const result = new Set(a);
  for (const element of b) {
    if (result.has(element)) result.delete(element);
  }
  return result;
}
```

```ts
/** Декартово произведение.
 * @example
 * cartesianProduct([1, 2], [3, 4]) => [[1, 3], [1, 4], [2, 3], [2, 4]]
 * */
function cartesianProduct(...values: any[][]): any[][] {
  return values.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
}
```

### Работа со строками {#strings}

```ts
/** Разделяет строку по первому вхождению искомой подстроки.
 * @example
 * splitByFirstOccurrence('1, 2, 3', ', ') => ['1', '2, 3']
 * */
function splitByFirstOccurrence(input: string, search: string): [string, string] {
  const index = input.indexOf(search);
  if (index === -1) return [input, ''];
  return [input.substring(0, index), input.substring(index + search.length)];
}
```

```ts
/** Разделяет строку по последнему вхождению искомой подстроки.
 * @example
 * splitByLastOccurrence('1, 2, 3', ', ') => ['1, 2', '3']
 * */
function splitByLastOccurrence(input: string, search: string): [string, string] {
  const index = input.lastIndexOf(search);
  if (index === -1) return ['', input];
  return [input.substring(0, index), input.substring(index + search.length)];
}
```

```ts
/** Разделяет строку по указанному индексу.
 * @example
 * splitByIndex('1234', 2) => ['12', '34']
 * splitByIndex('1234', 0)  => ['', '1234']
 * */
function splitByIndex(input: string, index: number): [string, string] {
  return [input.substring(0, index), input.substring(index)];
}
```

### Регулярные выражения {#regex}

```ts
/** Число с разделителем в виде точки или запятой. */
const intOrDecimalRegExp = /^[+-]?((\d+([.,]\d*)?)|([.,]\d+))$/;

/** Хекс цвета, допускается сокращённая форма и альфа канал. */
const colorHexRegExp = /^#([\da-f]{8}|[\da-f]{6}|[\da-f]{3})$/i;
```

### Работа с цветом {#colors}

```ts
type RGBA = [number, number, number, number];

/** Накладывает цвет на основной.
 * @example
 * overlayColor([0, 0, 0, 0.5], [255, 255, 255, 0.5]) => [170, 170, 170, 0.75]
 * */
function overlayColor(base: RGBA, additive: RGBA): RGBA {
  const baseAlpha = base[3];
  const addedAlpha = additive[3];
  if (!baseAlpha) return additive;
  if (!addedAlpha) return base;

  const alpha = 1 - (1 - addedAlpha) * (1 - baseAlpha);
  const additiveWeight = addedAlpha / alpha;
  const baseWeight = baseAlpha * (1 - baseAlpha) / alpha;

  const red   = Math.round(additive[0] * additiveWeight + base[0] * baseWeight);
  const green = Math.round(additive[1] * additiveWeight + base[1] * baseWeight);
  const blue  = Math.round(additive[2] * additiveWeight + base[2] * baseWeight);

  return [red, green, blue, alpha];
}
```
