# Расширения грамматики

TODO: BNF, EBNF, ANTLR syntax

## Приведение к каноничному виду {#canonization}

### Группы и альтернативы

$$
\begin{align*}
  A \to B | C \rArr
  \begin{cases}
    A \to B \\
    A \to C \space\space
  \end{cases}
\\
  A \to B(x | y) \rArr
  \begin{cases}
    A \to Bx \\
    A \to By
  \end{cases}
\end{align*}
$$

### Квантификаторы

+ $$ A^? $$ — 0 или одно повторение
+ $$ A^* $$ — 0 или более повторений
+ $$ A^+ $$ — 1 или более повторений

$$
\begin{align*}
  A \to B^? \rArr
  \begin{cases}
    A \to B \space\space\space \\
    A \to \epsilon
  \end{cases}
\\
  A \to B^* \rArr
  \begin{cases}
    A \to BA \\
    A \to \epsilon
  \end{cases}
\\
  A \to B^+ \rArr
  \begin{cases}
    A \to BA \\
    A \to B
  \end{cases}
\end{align*}
$$

Часто можно избавиться от пустых строк:

$$
\begin{align*}
  A \to B^? \gamma \rArr
  \begin{cases}
    A \to B \gamma \space\space \\
    A \to   \gamma
  \end{cases}
\\
  A \to \gamma C^* \rArr
  \begin{cases}
    A \to \gamma \\
    A \to \gamma C^+
  \end{cases}
\end{align*}
$$

### Пример

$$
S \to n(+ n)^*
\rArr
\begin{cases} S \to n \\ S \to n(+n)^+ \end{cases}
\rArr \\ \rArr
\begin{cases} S \to n \\ S \to nG \\ G \to (+n)^+ \end{cases}
\rArr
\begin{cases} S \to n \\ S \to nG \\ G \to +nG \\ G \to +n \end{cases}
$$
