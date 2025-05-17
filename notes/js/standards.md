# Стандарты JavaScript

[Таблица совместимости](http://compat-table.github.io/compat-table/es2016plus/)

## Нововведения

### ES2024

+ статический метод `Array.fromAsync()`
+ методы строки `.isWellFormed()` и `.toWellFormed()`
+ улучшения `WeakRef` и `FinalizationRegistry`
+ автоматическое преобразование между `BigInt` и `Number`
+ pattern matching

### ES2023

Методы Array и TypedArray для поиска с конца:<br/>
`.findLast()`, `.findLastIndex()`

Изменение Array и TypedArray через возвращение новой копии:<br/>
`.with()`, `.toSorted()`, `.toReversed()`, `.toSliced()`

### ES2022

+ приватные методы класса, приватные аксессоры
+ top-level `await` в модулях
+ метод `.at()` для Array, String и TypedArray
+ статический метод `Object.hasOwn()`
+ флаг `/d` у регулярных выражений
+ `Error.cause` — указание какая ошибка вызвала другую

### ES2021

+ метод строки `.replaceAll()`
+ numeric separators: новый синтаксис для литерала числа
+ операторы логического присваивания `&&=` , `||=` и `??=`
+ `Promise.any()` и `AggregateError`
+ `WeakRef` и `FinalizationRegistry`

### ES2020

+ оператор optional chaining: `?.`
+ оператор nullish coalescing: `??`
+ динамический импорт
+ тип данных `BigInt`
+ метод строки `.matchAll()`
+ статический метод `Promise.allSettled`
+ `globalThis`

### ES2019

+ `catch` без переменной
+ методы массива `.flat()` и `.flatMap()`
+ методы строки `.trimStart()` и `.trimEnd()`
+ статический метод `Object.fromEntries()`
+ доработанная реализация `JSON.stringify()`
+ доработанная реализация `.toString()` для Function
+ `Symbol.description`

### ES2018

+ rest/spread синтаксис
+ метод `.finally()` для Promise
+ конструкция `for-await-of`

Новые возможности для регулярных выражений:
+ lookbehind
+ `\p{...}` и `\P{...}`
+ захват именованных групп
+ флаг `/s` — single line

### ES2017

+ асинхронные функции (async-await)
+ статические методы `Object.values()` и `Object.entries()`
+ статический метод `Object.getOwnPropertyDescriptors()`
+ методы строк `.padStart()` и `.padEnd()`
+ разделяемая память и атомарные операции
+ trailing comma в объявлениях и при вызове функций

### ES2016

+ метод массива `.includes()`
+ оператор возведения в степень

### ES2015

+ ключевые слова `let` и `const`
+ параметры по умолчанию
+ методы массива `.find()` и `.findIndex()`

### ES5 (2009)

+ JSON
+ циклы `for..in` и `for..of`
+ метод строки `.trim()`
+ статический метод `Array.isArray()`
+ строгий режим
