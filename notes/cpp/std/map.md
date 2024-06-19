# std::map

`std::map` — это упорядоченный ассоциативный контейнер, реализованный через
[красно-чёрное дерево](https://ru.wikipedia.org/wiki/Красно-чёрное_дерево).

Шаблон принимает 4 аргумента, первые два из которых обязательны:
+ тип ключа
+ тип значения
+ функция сравнения
+ аллокатор

Пары "ключ-значение" отсортированны с помощью функции сравнения. Два ключа
считаются равными, если `!сompare(k1, k2) && !compare(k2, k1)`,
где `compare` — функция сравнения.

Алгоритмическая сложность базовых операций:
+ поиск: $O(\log n)$
+ вставка: $O(\log n)$
+ удаление: $O(\log n)$

### Инициализация

```cpp
#include <map>

// initializing an empty map
auto myMap = std::map<std::string, int>();

// using initializer list
std::map<std::string, int> myMap = {
  {"foo", 10},
  {"bar", 20},
};
```

### Добавление элементов

```cpp
auto myMap = std::map<int, Point>();
myMap[0] = Point{0, 0};

auto point = Point{1, 1};
myMap.emplace(1, point);
myMap.insert_or_assign(1, point);

auto pair = std::make_pair(2, Point{0, 0});
myMap.insert(pair);
```

Если указанный ключ уже существует:
+ для `operator[]` и `insert_or_assign` произойдёт перезапись
+ для `emplace` и `insert` ничего не произойдёт

```cpp
auto myMap = std::map<std::string, int>();
myMap["foo"] = 10;
myMap["foo"] = 20;
std::cout << myMap["foo"]; // expected 20
```

### Удаление элементов

```cpp
myMap.erase("bar");
myMap.erase("baz");
```

При попытке удалить несуществующий ключ ничего не происходит.

Удаление всех существующих элементов:

```cpp
myMap.clear();
```

### Доступ к элементам

Когда ключ гарантированно существует:

```cpp
auto value = myMap["foo"];
auto value = myMap.at("foo");
```

Безопасный поиск значения по ключу:

```cpp
auto it = myMap.find(key);
if (it != myMap.end()) {
  // found, value is `it->second`
} else {
  // not found
}
```

Проверка наличия элемента:

```cpp
if (myMap.contains(key)) {
  // key exists
} else {
  // key does not exist
}
```

Также есть методы для проверки количества элементов
и наличия элементов вообще:

```cpp
size_t size = myMap.size();
bool empty = myMap.empty();
```

### Перебор элементов

```cpp
for (auto& pair : myMap) {
  auto& key = pair.first;
  auto& value = pair.second;
}

for (auto& [key, value] : myMap) {
  // ...
}
```

Элементы будут идти в порядке возрастания относительно ключа.

---

Источники:
+ [cppreference.com](https://en.cppreference.com/w/cpp/container/map)
+ [metanit.com](https://metanit.com/cpp/tutorial/7.14.php)
