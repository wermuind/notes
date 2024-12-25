# Code snippets

Здесь собраны небольшие фрагменты кода на TypeScript, которые можно скопировать
в проект.

### Math

```ts
/**
 * Округляет число до заданного количества знаков после запятой.
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
/** Возвращает случайное число между `min` и `max`. */
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
function setUnion<T>(a: Set<T>, b: Set<T>): Set<T> {
  const union = new Set(a);
  for (const element of b) union.add(element);
  return union;
}
```

```ts
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

### Strings

```ts
/**
 * Разделяет строку по первому вхождению искомой подстроки.
 * @example
 * splitByFirstOccurrence('1, 2, 3', ', ') => ['1', '2, 3']
 */
function splitByFirstOccurrence(input: string, search: string): [string, string] {
  const index = input.indexOf(search);
  if (index === -1) return [input, ''];
  return [input.substring(0, index), input.substring(index + search.length)];
}
```

```ts
/**
 * Разделяет строку по последнему вхождению искомой подстроки.
 * @example
 * splitByLastOccurrence('1, 2, 3', ', ') => ['1, 2', '3']
 */
function splitByLastOccurrence(input: string, search: string): [string, string] {
  const index = input.lastIndexOf(search);
  if (index === -1) return ['', input];
  return [input.substring(0, index), input.substring(index + search.length)];
}
```

```ts
/**
 * Разделяет строку по указанному индексу.
 * @example
 * splitByIndex('1234', 2) => ['12', '34']
 * splitByIndex('1234', 0)  => ['', '1234']
 */
function splitByIndex(input: string, index: number): [string, string] {
  return [input.substring(0, index), input.substring(index)];
}
```
