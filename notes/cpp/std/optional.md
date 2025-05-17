# std::optional

`std::optional` — это вспомогательный класс для хранения значения, которое
может быть инициализированно или нет.

Шаблон принимает один обязательный аргумент — тип значения. Если опциональный
тип содержит значение, это значение будет выделено как часть объекта, т.е.
динамического выделения памяти не произойдет.

Распространённые сценарии использования:

+ явное использование nullable типа вместо использования уникального
  значения (-1, `nullptr` и т.п.)
+ использование значения с отложенной инициализацией
+ передача опциональных параметров в функции
+ возврат из функции, когда вычислить нужное значение не удалось, но
  это не является ошибкой

Не рекомендуется использовать опциональный тип для хранения указателей.

### Создание

```cpp
// empty
auto p1 = std::optional<Point>();
std::optional<Point> p2 = std::nullopt;

// with value
auto p3 = std::optional<Point>({0, 0});
auto p4 = std::make_optional<Point>(0, 0);
```

### Проверка на наличие значения

Когда опциональный тип преобразуется в `bool`, преобразование возвращает
`true`, если объект содержит значение.

```cpp
  auto mayBePoint = std::make_optional<Point>(0, 0);

  if (mayBePoint.has_value()) {
    // ...
  }
  if (mayBePoint) {
    // ...
  }
```

### Получение значения

Для получения значения есть несколько вариантов:

+ через методы `value` или `value_or`
+ через перегрузки `operator*` и `operator->`

Если значение не задано, `value` бросает исключение `std::bad_optional_access`,
а для `operator*` и `operator->` **неопределённое поведение**.

```cpp
auto point = std::make_optional<Point>(0, 0);
auto pointCopy = mayBePoint.value();
auto& pointRef = mayBePoint.value();

auto zeroPoint = Point{0, 0};
auto mayBePoint = std::optional<Point>();
std::cout << mayBePoint.value_or(zeroPoint).x;
```

```cpp
auto point = std::make_optional<Point>(0, 0);
point->x = 1;
point->y = 2;

auto str = std::make_optional<std::string>("data");
(*str)[3] = 'e';
```

### Сравнение

```cpp
std::optional<int> empty = std::nullopt;
std::optional<int> two = 2;
std::optional<int> ten = 10;

std::cout << (ten > two) << '\n';             // true
std::cout << (ten < two) << '\n';             // false
std::cout << (empty < two) << '\n';           // true
std::cout << (empty == std::nullopt) << '\n'; // true
std::cout << (ten == 10) << '\n';             // true
```

### Изменение значения

Если уже существует опциональный объект, поменять его значение можно с
помощью методов `emplace`, `reset` и `swap`, а также присваивания.

Вызов `reset` и присваивание `std::nullopt` эквивалентны. Если присвоить
объекту `std::nullopt`, то у хранящегося объекта будет вызван деструктор.

```cpp
auto s = std::make_optional<std::string>("first");

s.emplace("second");
s = "second";

s.reset();
s = std::nullopt;

std::optional<std::string> s1 = std::nullopt;
std::optional<std::string> s2 = "value";
s1.swap(s2);
```

### Возврат из функции

```cpp
auto parse(Value value) -> std::optional<std::string> {
  if (value.valid()) return value.asString();
  return std::nullopt;
}
```

--- --- ---

Источники:
+ https://habr.com/ru/articles/372103/
+ https://en.cppreference.com/w/cpp/utility/optional
