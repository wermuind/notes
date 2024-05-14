# FIRST и FOLLOW

**Множество FIRST** для символа в КС-грамматике — это множество терминальных
символов, которые могут появиться в начале строк, выводимых из символа.

**Множество FOLLOW** для символа в КС-грамматике — это множество терминальных
символов, которые могут следовать непосредственно за данным символов в выводе
(развёртывании).

### Алгоритм построения FIRST

```python
# T  - terminals
# NT - non-terminals
# P  - rules in grammar

for a in [*T, EOF, EPS]:
  FIRST(a) = a

for A in NT:
  FIRST(A) = set()

while FIRST changes:
  for A -> b[1..k] in P:
    rhs = FIRST(b[1]) - { EPS }
    i = 1

    # adding first for eps-gen symbols
    while EPS in FIRST(b[i]) and i <= k - 1:
      rhs |= FIRST(b[i + 1]) - { EPS }
      i += 1
    if i == k and EPS in FIRST(b[k]):
      rhs |= { EPS }
    FIRST(A) |= rhs
```

### Алгоритм построения FOLLOW

```python
# NT - non-terminals
# P  - rules in grammar

for A in NT:
  FOLLOW(A) = set()

FOLLOW(S) = { EOF }

while FOLLOW changes:
  for A -> b[1..k] in P:
    trailer = FOLLOW(A)
    for i in range(k, 0, -1):
      if b[i] in NT:
        FOLLOW(b[i]) |= trailer
        if EPS in FIRST(b[i]):
          trailer |= FIRST(b[i]) - { EPS }
        else:
          trailer = FIRST(b[i])
      else:
        trailer = FIRST(b[i])
```
