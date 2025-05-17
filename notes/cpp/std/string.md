# std::string

`std::string` — это класс для организации работы со строками.
В отличие от большинства языков, строки в C++ изменяемые.

## Создание

```cpp
auto s1 = std::string();       // ""
auto s2 = std::string(4, '0'); // "0000"
auto s3 = std::string("text");

std::string s4 = "text";
std::string s5 = {'t', 'e', 'x', 't'};

using namespace std::string_literals;
auto s6 = "text"s;
```

## Доступ к содержимому

Для доступа к элементам есть методы `at`, `front` и `back`, `operator[]`.
Все они возвращают **ссылку** на символ.

```cpp
std::string s = "012345";

char ch1 = s[1];      // '1'
char ch2 = s.at(3);   // '3'

char ch3 = s.front(); // '0'
char ch4 = s.back();  // '5'
```

Размер, количество символов:

```cpp
std::string s = "text";

s.empty();     // false
s.size();      // 4
s.length();    // 4

s.reserve(50);
s.capacity();  // 50
```

Доступ к данным (C-style string):

```cpp
std::string s = "text";

const char* p1 = s.c_str();
char* p2 = s.data(); // no const
```

### Подстроки

Получить подстроку можно двумя способами:

1. через начальную позицию и длину
2. через начальную и конечную позицию

```cpp
const char* raw = "hello world";
std::string s = raw;

// "world"
auto s1 = s.substr(6);
auto s2 = std::string(s, 6);

// "hello"
auto s3 = s.substr(0, 5);
auto s4 = std::string(s, 0, 5);

// "lo wo"
auto s5 = std::string(raw + 3, raw + 8);
auto s6 = std::string(s.begin() + 3, s.begin() + 8);
```

## Поиск

Для поиска подстроки есть методы `find` и `rfind` (поиск с конца).
В качестве аргумента можно указать как символ, так и другую строку.
Также можно указать позицию, с которой нужно начинать поиск;
по умолчанию для `find` это `0`, а для `rfind` это `npos`.

Если подстрока найдена, будет возвращена позиция символа, иначе вернёт
`std::string::npos` (константа, равна `0xffffffffffffffff`).

```cpp
std::string s = "hello world";
s.find(':');    // npos

s.find('o');    // 4
s.find("o", 5); // 7

s.rfind('l');   // 9
s.rfind("ll");  // 2
```

Кроме этого есть метод `contains`, позволяющий узнать, присутствует ли
в строке заданный символ или подстрока.

```cpp
std::string str = "some text";
std::string substr = "some";

str.contains('t');    // true
str.contains("123");  // false
str.contains(substr); // true
```

## Модификация строки

### Присвоение нового значения

Для присвоения нового значения строке, помимо оператора `=`, можно использовать
метод `assign`. Он присваивает новое значение строке "на месте" ("in place").

```cpp
std::string str;
std::string newStr = "new";

str.assign("raw");        // ""    -> "raw"
str.assign(newStr);       // "raw" -> "new"
str.assign(newStr, 1, 1); // "new" -> "e"
str.assign(3, 'w');       // "e"   -> "www"
```

### Изменение отдельно взятого символа

```cpp
std::string s = "hello world";
s[0] = 'H';
s.at(6) = 'W';
std::cout << s; // "Hello World"
```

### Изменение части строки, замена

Для замены части строки другой строкой или частью строки используется
метод `replace`.

```cpp
std::string s = "123 ??? 789";
s.replace(4, 3, "456"); // "123 456 789"

size_t a = 1;
size_t b = 10;
s.replace(a, b - a, ".."); // "1..9"
```

### Вставка

Для вставки символов или подстроки в определенное место используется метод
`insert`. Первый аргумент — это позиция в строке, куда будет вставлен
фрагмент, а остальные аргументы зависят от того, что нужно вставить.

```cpp
std::string s = "a";
s.insert(0, 1, 'd'); // "a" -> "da"
s.insert(2, "ta");   // "da" -> "data"

std::string addition = "big pig";
s.insert(0, addition, 0, 4); // "data" -> "big data"
```

Для вставки в конец строки есть методы `append` и `push_back`.

```cpp
std::string s1 = "a";
s1.append(1, 'b').append("cd");
s1.push_back('e');
// s1 == "abcde"

std::string s2 = "data";
std::string addition = "_base_";
s2.append(addition, 1, 4);
// s2 == "database"
```

Конкатенация:

```cpp
std::string s1 = "hello";
std::string s2 = "world";

auto s = s1 + ' ' + s2;
s += '!';
s += "!!";

std::cout << s; // "hello world!!!"
```

### Удаление

Для удаления символов или подстроки используется метод `erase`. Этот метод
предоставляет различные варианты удаления, позволяя указывать начальную
позицию и количество символов для удаления.

Ещё есть метод `pop_back`, позволяющий удалить символ с конца,
и метод `clear`, очищающий строку.

```cpp
std::string s1 = "overlook";
s1.erase(1, 6); // s1 == "ok"
s1.pop_back();  // s1 == "o"
s1.clear();     // s1 == ""

std::string s2 = "up to date";
s2.erase(s2.begin() + 2, s2.end() - 4);
// s2 == "update"
```

## Алгоритмическая сложность

#### Доступ к содержимому:

+ `at`: O(1)
+ `operator[]`: O(1)
+ `front`: O(1)
+ `back`: O(1)
+ `data`: O(1)
+ `empty`: O(1)
+ `size`: O(1)
+ `length`: O(1)
+ `max_size`: O(1)
+ `capacity`: O(1)

#### Сравнение и поиск:

+ `compare`: O(n)
+ `find`: O(n)
+ `rfind`: O(n)

#### Модификация содержимого:

+ `clear`: O(n)
+ `insert`: O(n)
+ `erase`: O(n)
+ `push_back`: O(n)
+ `pop_back`: O(1)
+ `append`: O(n)
+ `replace`: O(n)

#### Управление памятью:

+ `reserve`: O(n)
+ `shrink_to_fit`: O(n)
