# SOLID

**SOLID** — это набор принципов объектно-ориентированного проектирования,
которые помогают создавать гибкий, поддерживаемый и масштабируемый код.
Каждая буква в аббревиатуре соответствует одному принципу.

## Single responsibility

<dfn>Принцип единственной ответственности</dfn> декларирует, что каждая
программная сущность должна выполнять одну (концептуально, а не буквально)
задачу.

На практике проявляется в декомпозиции сложных классов, которые выполняют
сразу несколько задач, на простые.

#### Нарушение:

```ts
class Order {
  public calculateTotal(): number {}
  public saveToDatabase(): Promise<void> {}
}
```

#### Решение:

```ts
class Order {
  public calculateTotal(): number {}
}
class OrderRepository {
  public save(order: Order): Promise<void> {}
}
```

## Open-closed

<dfn>Принцип открытости/закрытости</dfn> декларирует, что программные сущности
должны быть открыты для расширения, но закрыты для изменения.

На практике проявляется в том, что программное обеспечение изменяется не через
изменение существующего кода, а через добавление нового кода.

## Liskov substitution

<dfn>Принцип подстановки Лисков</dfn> декларирует, что код, который использует
базовый тип, должен иметь возможность использовать подтипы базового типа
не зная об этом.

На практике проявляется в том, что при построении иерархий наследования
создаваемые наследники должны корректно реализовывать поведение базового типа.

#### Нарушение:

```ts
class Rectangle {
  public setWidth(w: number) { this.width = w; }
  public setHeight(h: number) { this.height = h; }
}
class Square extends Rectangle {
  public setWidth(w: number) { this.width = w; this.height = w; }
}
```

#### Решение:

```ts
abstract class Shape {
  // ...
}
class Rectangle extends Shape {
  public setWidth(w: number) { this.width = w; }
  public setHeight(h: number) { this.height = h; }
}
class Square extends Shape {
  public setSide(s: number) { this.side = s; }
}
```

## Interface segregation

<dfn>Принцип разделения интерфейса</dfn> декларирует, что клиенты не должны
зависеть от методов интерфейса, которые они не используют.

На практике проявляется в том, что вместо одного большого интерфейса создаются
несколько небольших, специфических интерфейсов.

#### Нарушение:

```ts
interface Printer {
  print(): void;
  scan(): void;
}

class BasicPrinter implements Printer {
  public print() {}
  public scan() { throw new Error('Scan is not supported'); }
}
class AdvancedPrinter implements Printer {
  public print() {}
  public scan() {}
}
```

#### Решение:

```ts
interface Printable {
  print(): void;
}
interface Scannable {
  scan(): void;
}

class BasicPrinter implements Printable {
  public print() {}
}
class AdvancedPrinter implements Printable, Scannable {
  public print() {}
  public scan() {}
}
```

## Dependency inversion

<dfn>Принцип инверсии зависимостей</dfn> декларирует, что модули верхнего
уровня не должны зависеть от модулей нижнего уровня; оба должны зависеть
от абстракций. При этом абстракции не должны зависеть от деталей; детали должны
зависеть от абстракций.

На практике проявляется в том, что зависимости передаются извне
(через конструктор, методы или свойства), а не создаются внутри.
Это позволяет подменять реализации без изменения кода.

#### Нарушение:

```ts
function analyzeData() {
  const logger = new ConsoleLogger();
  // ...
}
```

#### Решение:

```ts
interface Logger {
  // ...
}
function analyzeData(logger: Logger) {
  // ...
}
```
