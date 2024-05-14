# Создание ДКА на основе регулярного выражения

1. [дерево](regex-tree.md)
2. набор позиций
3. `nullable`, множества `firstpos` и `lastpos`
4. множества `followpos`
5. генерация таблицы

`nullable`, множества `firstpos` и `lastpos` вычисляются для каждого _узла_
дерева, а `followpos` вычисляется для каждой _позиции_.

### Алгоритм для `nullable`, `firstpos` и `lastpos`

| Node                     | nullable(n)                     | firstpos(n)                                              | lastpos(n)                                               |
|--------------------------|---------------------------------|----------------------------------------------------------|----------------------------------------------------------|
| A leaf labeled `ε`       | `true`                          | `{}`                                                     | `{}`                                                     |
| A leaf with position `i` | `false`                         | `{i}`                                                    | `{i}`                                                    |
| An "or"-node `c1 \| c2`  | `nullable(c1) or nullable(c2)`  | `firstpos(c1) U firstpos(c2)`                            | `lastpos(c1) U lastpos(c2)`                              |
| A "cat"-node `c1 c2`     | `nullable(c1) and nullable(c2)` | `nullable(c1) ? firspos(c1) U firspos(c2) : firspos(c1)` | `nullable(c2) ? lastpos(c1) U lastpos(c2) : lastpos(c2)` |
| A "star"-node `c1*`      | `true`                          | `firstpos(c1)`                                           | `lastpos(c1)`                                            |

При вычислении этих множеств рекурсия неприемлема, т.к. размер дерева
может быть очень большим.

### Алгоритм для followpos

```text
for each node n in the tree:
  if n is a concat node with left child c1 and right child c2:
	  for each i in lastpos(c1):
      followpos(i) = followpos(i) U firstpos(c2)
  else if n is a Kleene star node:
    for each i in lastpos(n):
      followpos(i) = followpos(i) U firstpos(n)
```

### Алгоритм построения ДКА

```text
s0 = firstpos(root-node); designate it the start state
states = [s0] and is unmarked

while there is an unmarked state T in states:
  mark T
  for each input symbol 'a' in the alphabet:
    let U be the union of followpos(p) for all positions p in T such that
            the symbol at position p is 'a'
    if U is not empty and not in states:
      add U as an unmarked state in states
    trans[T,a] = U

Designate any state containing the #-position as a final state
```
