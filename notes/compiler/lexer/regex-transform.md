# Преобразования регулярных выражений

#### Композиция квантификаторов:

$$
\begin{array}{ccc}
  (r^*)^*=r^* & (r^+)^*=r^* & (r^?)^*=r^* \\
  (r^*)^+=r^* & (r^+)^+=r^+ & (r^?)^+=r^* \\
  (r^*)^?=r^* & (r^+)^?=r^* & (r^?)^?=r^?
\end{array}
$$

#### Оптимизации с квантификатором `*`:

$$
\begin{align*}
  (r^*|s^*)^* = (r|s)^* \\
  (r^*s^*)^*  = (r|s)^* \\
  (r^*|s)^*   = (r|s)^*
\end{align*}
$$

#### Оптимизации с альтернативами:

$$
\begin{align*}
  rs|rt       = r(s|t)  \\
  sr|tr       = (s|t)r
\end{align*}
$$

#### Отрицание последовательности символов:

$$
\text{\textasciitilde} (ab) =
a \space \text{\textasciitilde} b \space |
\space \text{\textasciitilde} a \space .
$$
