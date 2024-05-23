# Конструкторы и деструктор

<dfn>Конструктор класса</dfn> — это специальный метод, который вызывается
при создании объекта этого класса. Он используется для инициализации членов
класса, выделения ресурсов и выполнения других операций, необходимых
для корректной работы объекта.

В C++ существует несколько видов конструкторов:

+ конструктор по умолчанию (default constructor)
+ конструктор с параметрами (parameterized constructor)
+ конструктор копирования (copy constructor)
+ конструктор перемещения (move constructor)

## Синтаксис {#syntax}

```cpp
class Matrix3 {
public:
  Matrix3();
  Matrix3(int value);
  Matrix3(const Matrix3& other);
  Matrix3(Matrix3&& other) noexcept;
  ~Matrix3();

private:
  int* data;
};
```

Конструктор с одним параметром может быть помечен как `explicit`, это
запретит неявное преобразование из параметра в объект класса.

```cpp
class Matrix3 {
  // ...
  explicit Matrix3(int value);
  // ...
};

```

Если какой-либо из конструкторов не указан в описании класса, компилятор
может неявно добавить его на этапе компиляции. Компилятору можно прямо указать,
чтобы он создал стандартный конструктор или, наоборот, не создавал его.
В первом случае используется синтаксис `= default`, а во втором — `= delete`.

```cpp
class Matrix3 {
  // ...
  Matrix3() = default;
  Matrix3(Matrix3&& other) = delete;
  // ...
}
```

Для инициализации полей класса используется специальный синтаксис.
После сигнатуры ставится двоеточие и через запятую указываются начальные
значения для полей.

```cpp
Class::Class(T1 v1, T2 v2) : field1(v1), field2(v2) {
  // ...
}
```

## Конструктор по умолчанию {#default-constructor}

<dfn>Конструктор по умолчанию</dfn> — вид конструктора, который не принимает
никаких аргументов. Он автоматически вызывается при создании объекта класса
без передачи параметров конструктору.

```cpp
Matrix3::Matrix3() : data(new int[9]) {
  for (size_t i = 0; i < 9; i++) {
    this->data[i] = 0;
  }
}
```

## Конструктор с параметрами {#parameterized-constructor}

<dfn>Конструктор с параметрами</dfn> — вид конструктора, принимающий аргументы,
которые используются для задания нестандартного начального состояния объекта.

```cpp
Matrix3::Matrix3(int value) : data(new int[9]) {
  for (size_t i = 0; i < 9; i++) {
    this->data[i] = value;
  }
}
```

## Конструктор копирования {#copy-constructor}

<dfn>Конструктор копирования</dfn> — вид конструктора, который создает новый
объект на основе объекта того же типа.

По умолчанию значения полей старого объекта копируются в новый.
Как правило, копирование должно гарантировать, что изменения в одном объекте
не влияют на другой.

```cpp
Matrix3::Matrix3(const Matrix3& other) : data(new int[9]) {
  for (size_t i = 0; i < 9; i++) {
    this->data[i] = other.data[i];
  }
}
```

## Конструктор перемещения {#move-constructor}

<dfn>Конструктор перемещения</dfn> — это специальный метод, который позволяет
эффективно перемещать ресурсы объекта, вместо их копирования. В первую очередь
это позволяет оптимизировать работу с динамической памятью.

При этом после перемещения старый объект должен перестать быть валидным и более
не использоваться.

```cpp
Matrix3::Matrix3(Matrix3&& other) noexcept : data(other.data) {
  other.data = nullptr;
}
```

Как правило конструктор перемещения маркируется как `noexcept`.

## Деструктор {#destructor}

<dfn>Деструктор</dfn> — это специальный метод, который вызывается
при уничтожении объекта. Его задача — освобождение ресурсов, выделенных
объектом, и выполнение других операций, необходимых перед удалением объекта
из памяти.

Деструктор вызывается автоматически при выходе из области видимости объекта
и при вызове оператора `delete` для динамически выделенных объектов.

```cpp
Matrix3::~Matrix3() {
  delete[] data;
}
```