# Copy elision

<dfn>Copy elision</dfn> (в контекстве C++) — оптимизация компилятора,
заключающаяся в исключении ненужного копирования объектов.

Стандарт C++ описывает несколько ситуаций, когда копирование можно исключить,
даже если это изменит поведение программы. В частности:

+ оптимизация копирования временного объекта в объект того же типа
+ оптимизация возвращаемого значения

## Оптимизация копирования временного объекта {#copy-optimization}

```cpp
// direct initialization, default constructor
std::string s1;

// copy initialization, copy contructor
auto s2 = std::string();
//      ^ will be optimized with standard compiler settings

// assignment initialization, implicit constructor for `const char*`
std::string s3 = "Hello";
```

## Оптимизация возвращаемого значения {#return-optimization}

При возврате объекта из функции происходит одна из трёх возможных ситуаций:

1. Копирование объекта из функции
2. Перемещение объекта (move)
3. Ни копирования, ни перемещения не происходит

Во втором и третьем случае компилятор применяет оптимизации.
Их разделяют на два вида:

1. Return Value Optimization (RVO) — возврат временного объекта, создаваемого
   в точке вызова `return`.

2. Named Return Value Optimization (NRVO) — оптимизация при возврате локальной
   переменной из функции.

Необходимые условия для применения этих оптимизаций:

+ тип объекта, возвращаемого из функции согласно сигнатуре, должен совпадать
  с типом локального объекта или конструироваться неявно из типа локального
  объекта

+ возвращаться должен именно локальный объект, а не ссылка на него
  или какая-то его часть.

+ в случае NRVO возвращаемый объект не должен быть `volatile`

Также оптимизация может не выполняться, если есть несколько путей выхода
из функции, которые возвращают разные локальные объекты.

```cpp
#include <iostream>

struct Struct {
  Struct() = default;
  Struct(const Struct&) { std::cout << "copy call\n"; }
};

auto fn() -> Struct {
  return Struct(); // optimization (RVO)
}

int main() {
  auto obj = fn(); // optimization
}
```

Со стандартными настройками компилятроа конструктор копирования скорее всего
не вызовется ни разу.

--- --- ---

Источники:
+ https://en.cppreference.com/w/cpp/language/copy_elision
+ https://en.wikipedia.org/wiki/Copy_elision
+ https://habr.com/ru/companies/vk/articles/666330/
