# Разделение кода

Пусть есть три файла `main.cpp`, `lib.hpp`, `lib.cpp`.

```
project/
├─ lib.hpp
├─ lib.cpp
└─ main.cpp
```

В заголовочном файле описываются сигнатуры функций и методов, определяются
алиасы типов, пишутся doc-комментарии. Реализация, за исключением `inline`
выносится в файл реализации.

```cpp title="lib.hpp"
#ifndef PROJECT_LIB_HPP_
#define PROJECT_LIB_HPP_

#include <std_module>

using LibType = std::some_container<int>;

/** Doc comment */
void libFunction(const int a, int b = 0);

/** Doc comment */
class LibClass {
public:
  /** Doc comment */
  auto libMethod(LibType& value) -> Type;
}

#endif // PROJECT_LIB_HPP_
```

В файле реализации даётся определение вынесенным функциям и методам:

```cpp title="lib.cpp"
#include "lib.hpp"


void libFunction(const int a, int b) {
  // implementation
}

auto LibClass::libMethod(LibType& value) -> Type {
  // implementation
}
```

Подключение заголовка:

```cpp title="main.cpp"
#include "lib.hpp"


int main() {
  // available: LibType, LibClass, libFunction
}
```
