# TypeScript Style Guide

Большая часть заимствованна из [Google TypeScript Style Guide][g].<br/>
Если правило применимо к JS, то оно относится и к JS.

[g]: https://google.github.io/styleguide/tsguide.html

### 1. Общее {#common}

Названия файлов: dash-case.

**[EditorConfig](https://editorconfig.org)**:
```toml
charset = utf-8
end_of_line = lf
indent_style = space
tab_width = 2
insert_final_newline = true
max_line_length = 100
trim_trailing_whitespace = true
```

Не использовать non-ASCII символы за исключением комментариев и строк.

Общая структура файла:
1. `@fileoverview` (необязательно): краткое описание
2. импорты, от overview отделяется одной пустой строкой
3. реализация, отделяется 2 пустыми строками (сначала типы, потом остальное)

### 2. Переменные {#variables}

Никогда не использовать `var` и не использовать `let`,
если переменная не должна изменяться.

Предпочтительнее использовать литералы вместо конструкторов.

```ts
const obj = {};           // new Object()
const arr = [];           // new Array()
const re  = /^[-+]?\d+$/; // new RegExp('^[-+]?\d+$')
```

#### Строки:

Кавычки — одинарные; если внутри строки есть одинарная кавычка — обратные.

```ts
const simpleString = 'simple string';
const stringWithQuote = `Don't care about it.`;
```

Для конкатенации лучше использовать шаблоны.

```ts
const badConcat = '"' + str + '"';
const goodConcat = `"${str}"`;
```

#### Объекты:

Не использовать строковые ключи без необходимости.
Стиль ключей всегда должен быть одинаковый.

```ts
const point: Point = {
  x: 0,
  y: 0,
};

const sizes = {
  'width': 200,
  'min-width': 100,
  'max-width': 250,
};
```

### 3. Функции {#functions}

Функции верхнего уровня — через ключевое слово `function`.<br/>
Вложенние функции — стрелочные.

```ts
function createGetter() {
  let i = 0;
  return () => { i++; return i; };
}
```

Группа связанных функций **от общего к частному**.

```ts
function randomArray(n: number, min: number, max: number): number[] {
  const array: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    array[i] = random(min, max);
  }
  return array;
}

function random(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
```

Допустимо, но не рекомендуется, опустить тип возвращаемого значения
если он очевиден. Для экспортируемых функций всегда указывается.

```ts
function square(x: number) {
  return x * x;
}

function getOrigin(): Point {
  return {x: 0, y: 0};
}
```

### 4. Типы {#types}

Для объектов использовать `interface` вместо `type`.
В интерфейсах в качестве разделителя использовать точку с запятой.

```ts
interface Token {
  kind: string;
  value: string;
}

type NumberMap = Map<number, number>;
```

Не создавать интерфейс класса, если он в точности повторяет сам класс.

### 5. Классы {#classes}

Порядок объявлений:
1. Статические поля, статические методы
2. Поля
3. Конструкторы
4. Методы

Порядок методов: `public`, `protected`, `private`, от общего к частному.

Не использовать нативные геттеры и сеттеры.

### 6. Enum {#enum}

Не использовать перечисления без лишней необходимости.<br/>
Название в единственном числе. Стиль элементов: `CONSTANT_CASE`.

```ts
enum ErrorCode {
  PARSE_ERROR = -32700,
  INVALID_REQUEST = -32600,
  METHOD_NOT_FOUND = -32601,
  INVALID_PARAMS = -32602,
  INTERNAL_ERROR = -32603,
}
```

### 7. Форматирование {#format}

Точки с запятой обязательны. Каждая операция с новой строки
(допускается исключение для `break`, `continue` и `return`).

**Использовать фигурные скобки для управляющих структур**:

Bad:
```ts
if (type === 'calc-data' && data !== null)
  calcData(data);

for (let i = 0; i < length; i++) data.push(i * i);
```
Good:
```ts
if (type === 'calc-data' && data !== null) {
  calcData(data);
}

for (let i = 0; i < length; i++) {
  data.push(i * i);
}
```

Исключение: `if` с одним оператором, помещающимся в одну строку.

```ts
if (arr.length === 2) return arr[1];
```

#### Горизонтальное выравнивание:

```ts
let x =  0;     // horizontal
let y =  0.5;   // alignment
let z = -0.025; // example
```

Горизонтальное выравнивание допускается, но является нежелательным. Зачастую
это требует множественных изменений строк кода, что может привести к конфликтам
в системе контроля версий. Исключение: файлы markdown.

#### Switch:
Использовать фигурные скобки для `case`, добавлять `default` в конец.<br/>
Тело `switch` имеет отступ.

```ts
switch (value.type) {
  case 'first-type': {
    // ...
  }
  case 'second-type': {
    // ...
  }
  default: {
    // ...
  }
}
```

#### Функции длинными параметрами:

```ts
function longLongNameFunction(
  firstLongNameParameter: LongNameType,
  secondLongNameParameter: LongNameType,
  thirdLongNameParameter: LongNameType,
) {
  // ...
}
```

### 8. Импорты и экспорты {#import-export}

+ предпочтительнее использовать именованные импорты
+ стараться избегать переименований
+ избегать циклических зависимостей
+ не экспортировать изменяемые переменные (`export let`), только константы

Сначала импорты из библиотек, затем импорты из проекта.
Сначала типы и классы, затем функции и константы.
Допустимо разделять группы импортов пустой строкой.
Фигурные скобки именованных импортов отделяются пробелами.
Расширение файла необязательно для только `.ts`/`.tsx` файлов.

Не использовать несколько импортов из одного файла:

Bad:
```ts
import { Point, Arc, Circle, Polyline, Polygon } from './geometry';
import { distance, polarToCartesian } from './geomtetry';
```
Good:
```ts
import {
  Point, Arc, Circle, Polyline, Polygon,
  distance, polarToCartesian,
} from './geometry';
```

Имена импортируемых модулей — это имена в lowerCamelCase,
полученные из имени импортированного файла.

```ts
import * as geometry from './geometry';
import * as someModule from './lib/some-module';
```

### 9. Комментарии {#comments}

Для комментариев по реализации предпочтительно использовать `//`.<br/>
В остальных случаях блочные `/* ... */`.

#### JSDoc:
Стиль комментария: `/** ... */`.
Содержимое как полноценный текст. Можно использовать markdown.

```ts
/** Описание сущности. */
interface Token {
  /** Описание поля. */
  kind: string;
  /** Описание поля. */
  value: string;
}
```

### 10. Другое {#other}

+ использовать строгое сравнение (`===`)
+ никогда не модифицировать встроенные типы (например, добавить метод строке)
+ в случае использования `@ts-ignore` или типа `any` должен быть комментарий,
  поясняющий, зачем это потребовалось
+ не использовать декораторы за исключением уже существующих в библиотеках

### 11. React {#react}

Расширение файлов: `.tsx`.

Для компонентов используются стрелочные функции.

Всегда создавать тип для пропса (исключение допустимо, если пропс содержит одно поле).
Название интерфейса как у компонента + `Props`.

```tsx
interface ListItemProps {
  text: string;
}

const ListItem = ({text}: ListItemProps) => {
  const onClick = () => alert('click');
  return <li onClick={onClick}>{text}</li>;
};
```
