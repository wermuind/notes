# Синтаксический анализ

<dfn>Синтаксический анализ</dfn>, парсинг (parsing) — это процесс сопоставления
последовательности токенов с [грамматикой](grammar.md) языка.

Программа, которая принимает на вход последовательность токенов и определяет,
соответствует ли она грамматике, называется *распознаватель* (recognizer).

Программа, которая принимает на вход последовательность токенов и строит
синтаксическое представление называется синтаксическим анализатором или просто
*парсером* (parser).

Результатом работы парсера как правило является *дерево разбора* (parse tree).
Листьями такого дерева являются токены. Корню дерева соответствует начальный
символ грамматики.

## Реализации

Существует два основных подхода к построению дерева разбора: сверху вниз
(top-bottom) и снизу вверх ([bottom-up](bottom-up.md)). Анализ сверху вниз
называется *нисходящим*, а анализ снизу вверх — *восходящим*.

Нисходящий парсер пытается построить вывод, выполняя последовательность
шагов от начального правила грамматики. Свое название он получил из-за
порядка, в котором строятся узлы дерева разбора: каждый узел создается раньше
своих дочерних.

Восходящий парсер пытается построить вывод в обратном порядке, выводя начальный
символ из разбираемой строки. Название также связано с порядком построения
узлов: сначала создаются листья, затем промежуточные узлы, а в конце корень.

### Вычислительная сложность

Минимальная теоретическая сложность синтаксического анализа — линейная
(нельзя разобрать последовательность, не дойдя до её конца). Это означает,
что количество действий парсера пропорционально количеству входных токенов.

Вычислительная сложность во многом зависит от грамматики языка. Для некоторых
типов грамматик существуют реализации, которые позволяют построить дерево
разбора за линейное время.

Большинство реализаций основано на конечных автоматах. Имеется некоторое
множество состояний и таблица переходов. Для сложных грамматик цена разбора
за линейное время может быть неприемлема за счёт очень большого размера таблицы
переходов. В таких случаях используются другие реализации, которые имеют
бо́льшую вычислительную сложность.

### Классификация

+ `LL(k)` – left-to-right, leftmost derivation, k tokens of lookahead
+ `LR(k)` – left-to-right, rightmost derivation, k tokens of lookahead

На практике чаще используются LR-парсеры, среди реализаций можно отметить:
+ [`LALR`](lalr.mdx) – lookahead LR parser
+ `SLR` – simple LR parser
+ `GLR` – generalized LR parser
