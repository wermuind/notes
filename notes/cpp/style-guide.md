# C++ Style Guide

На данной странице описаны некоторые правила по стилю кода C++, включая
рекомендации по архитектуре, форматированию, названиям сущностей и другое.
Подразумеваеся, что используется стандарт C++20 или выше.

Многое из описанного ниже заимствованно из
[Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html).

#### Главные принципы: {#main-concepts}

> Код должен быть ориентирован на читабельность.<br/>
> На чтение кода будет тратиться существенно больше времени, чем на написание.

> При внесении изменений в уже реализованный код, должен использоваться тот
> стиль, который уже используется.

### EditorConfig

```toml
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
max_line_length = 100
```

### Именование {#naming}

| Item             | Style                           |
|------------------|---------------------------------|
| directory & file | dash-case                       |
| variable & field | lowerCamelCase                  |
| function         | lowerCamelCase                  |
| type & enum      | UpperCamelCase                  |
| struct & class   | UpperCamelCase                  |
| class method     | lowerCamelCase                  |
| namespace        | snake_case (prefer single word) |
| macro            | ALL_CAPS                        |

Расширение заголовочных файлов: `.hpp`<br/>
Расширение файлов с реализацией: `.cpp`

### Разделение кода {#code-splitting}

+ защита от повторного включения через include guard (`#pragma once` нежелателен)
+ включать только те заголовки, которые используются непосредственно в файле
+ в `#include` не используются UNIX псевдонимы (`.`, `..`)

### Переменные {#variables}

Использовать синтаксис с присваиванием. Компилятор всегда оптимизирует
копирование, начиная с C++17 это закреплено в стандарте.

```cpp
auto idx = 1;
auto width = 1.0f;
auto success = true;

auto point = Point{0, 0}; // copy elision
auto& pointRef = point;
```

При инициализации переменной можно использовать как классический синтаксис,
так и унифицированный (_uniform initialization_).

```cpp
auto v1 = std::vector<int>{255, 0};  // 255 and 0
auto v2 = std::vector<int>(255, 0);  // 255 copies of 0
const auto m = std::map<int, char>({{1, 'a'}, {2, 'b'}});
```

Использовать ключевое слово `auto` при инициализации, если тип достаточно
очевиден.

```cpp
auto pair = std::make_pair(success, result);
SomeType someValue = x.get();
```

Можно использовать стандартные литералы, кастомные использовать не рекомендуется.

```cpp
#include <string>

auto fn() -> void {
  using namespace std::string_literals;
  auto str = "example"s;
}
```

### Функции {#functions}

Используется постфиксная запись типа (_trailing return type_).<br/>
Исключение: тип возврата `void` (процедуры).

Не использовать выходные аргументы, если это возможно.

```cpp
void printHello() {
  std::cout << "Hello" << std::endl;
}

auto originPoint() noexcept -> const Point {
  return Point{0, 0};
}

inline auto mean(float x, float y, float z) -> float {
  return (x + y + z) / 3;
}
```

### Типы {#types}

Из встроенных целочисленных типов используется только `int`.
Если требуется тип точного размера, используются типы, определённые
в стандартном заголовоке `<cstdint>`, например `int64_t`.
Если это возможно, не использовать беззнаковые типы.

Не использовать `typedef`, вместо него есть `using`.

```cpp
using f32 = float;
using f64 = double;

using MyMap = std::map<int, int>;
```

### Перечисления {#enums}

Используется только `enum class`. Если нужно убрать scope, можно использовать
`using enum` (например в switch). Тип для перечислений указывается для всего
кроме `int`. Инициализаторы заданы либо для всех значений, либо ни для каких.

Название перечисления в единственном числе; например,
`Color` вместо `Colors`.

```cpp
enum class Day {
  Monday, Tuesday, Wednesday, Thursday, Friday,
  Saturday, Sunday,
};

enum class Bracket : char {
  CurlyOpen = '{',
  CurlyClose = '}',
  SquareOpen = '[',
  SquareClose = ']',
};
```

### Структуры {#structs}

Используется только для типов, у которых (по задумке) все поля публичные
и нет методов.

_Designated initializers_ используются, когда поля неочевидны.

```cpp
struct Point {
  float x;
  float y;
};
struct Rectangle {
  float width;
  float height;
};

auto p = Point{0, 1};
auto rect = Rectangle{.width = 1.0f, .height = 2.5f};
```

### Классы {#classes}

Порядок модификаторов доступа: `public`,  `protected`, `private`.
Модификаторы доступа пишутся без отступа, между секциями пустая строка.

В начале всегда следуют конструкторы и деструктор.
Внутренние переменные оканчиваются на `_`.

Не использовать implicit конструкторы.
По возможности не использовать множественное наследование.

```cpp
class Square {
public:
  Square();
  ~Square();

  inline auto area() -> double {
    return a_ * a_;
  }

private:
  double a_;
};
```

Форматирование для инициализаторов полей в конструкторе класса:

```cpp
// when everything fits on one line
Class::Class() : field1(), field2() {
  doSomething();
}

// if it doesn't fit, move it to a new line with indent
Class::Class(Type1 param1, Type2 param2)
  : field1(param1), field2(param2) {
  doSomething();
}

// when the list spans multiple lines, use alignment
Class::Class(Type1 param1, Type2 param2)
  : field1(param1),
    field2(param2) {
  doSomething();
}
```

### Пространства имён {#namespaces}

Не выделяются отступами (в т.ч. вложенные), отделяется пустыми строками.
Для закрывающей скобки ставится комментарий о том, какое пространство
имён она закрывает.

```cpp
namespace math::geometry {

class Square {...};

} // namespace math::geometry
```

Имя пространства имен верхнего уровня обычно должно совпадать с названием
проекта.

### if-else и switch {#if-else-switch}

Не переносить else на новую строку кроме случаев с большим телом if.

```cpp
if (x < 0) {
  // do something
} else if (x == 0) {
  // do something
} else {
  // do something
}
```

Фигурные скобки для обработки case.
Если обработка случая имеет большое тело, отделять пустой строкой.

```cpp
enum class MouseEventType { MouseDown, MouseUp, MouseMove };

switch (eventType) {
  using enum MouseEventType;

  case MouseDown: {
    state.canMove = true;
    break;
  }
  case MouseUp: {
    state.canMove = false;
    break;
  }
  default: {}
}
```

### Исключения {#exceptions}

Желательно не использовать исключения. `catch` с новой строки когда
try имеет большое тело или отлавливается несколько исключений.
В случае пустого тела для `catch` должен быть комментарий почему это допустимо.

```cpp
try {
  doSomethingUnstable();
} catch {
  // an explanation of why an empty body is ok
}

try {
  doSomethingUnstable();
}
catch (const Exception& e) {
  std::cout << "Exception" << std::endl;
}
catch (const AnotherException& e) {
  std::cout << "AnotherException" << std::endl;
}
```

Вывод ошибок в консоль: с большой буквы, без точки на конце.

### Комментарии {#comments}

Для doc-комментариев: `/** ... */`, `@`-теги.<br/>
Для комментариев по реализации: `// ...`.<br/>
Можно использовать специальные ключевые слова `TODO` и `FIXME`.

```cpp
/**
 * Check if is possible to construct a triangle from three points.
 * Time complexity: O(1)
 */
auto isTriangle(Point& a, Point& b, Point& c) -> bool {
  // checking by area
  return (a.x - b.x) * (a.y - c.y) - (a.x - c.x) * (a.y - b.y) != 0;
}
```

### Препроцессор {#preprocessor}

Не использовать препроцессор, если это возможно.

Решетка, с которой начинается директива препроцессора, всегда должна
находиться в начале строки. Даже если директивы препроцессора находятся
внутри тела кода с отступом, они должны начинаться с начала строки.

```cpp
if (condition) {
  someAction();
#if DEBUG_LOG
  logger.info("...");
#endif
}
```

--- --- ---

Другие источники:
+ [Chromium Style Guide](https://chromium.googlesource.com/chromium/src/+/HEAD/styleguide/c++/c++-dos-and-donts.md)
+ [LLVM Coding Standards](https://llvm.org/docs/CodingStandards.html)
