# Git

<dfn>Система контроля версий</dfn> (version control system, VCS) — это ПО,
предназначенное для отслеживания и управления изменениями в файлах или коде
с течением времени. Она должна обеспечивать хранение истории изменений,
их отслеживание (кто и когда сделал) и давать возможность возврата назад.

Самой популярной системой контроля версий в мире является **Git**. Эта система
изначально была разработана для разработки ядра Linux, первая версия появилась
в 2005 году.

## Основные команды {#main-commands}

`git init` — инициализация нового репозитория<br/>
`git clone` — создание локальной копии удалённого репозитория<br/>
`git config` — управление конфигом (текущий репозиторий или глобально)<br/>
`git log` — просмотр истории коммитов<br/>
`git status` — получение текущего состояния репозитория<br/>
`git add` — добавление изменений в индекс<br/>
`git commit` — фиксация изменений<br/>
`git tag` — управление тегами (указатели на определённые коммиты)<br/>
`git push` — отправка изменений на удалённый репозиторий<br/>
`git pull` — получение актуального состояния удалённого репозитория<br/>
`git diff` — сравнение изменений в файлах<br/>
`git branch` — управление ветками<br/>
`git checkout` — переход между ветками<br/>
`git merge` — объединение веток<br/>
`git reset` — сброс указателя текущей ветки (HEAD) в указанное состояние<br/>

## Dot files

`.gitignore` — список неотслеживаемых файлов и каталогов<br/>
`.gitattributes` — атрибуты для файлов и каталогов<br/>

## Best Practices

+ **Мелкие коммиты лучше больших**: когда коммит содержит логически связанные
  изменения для *одной* конкретной задачи, это делает историю изменений более
  понятной и упрощает отладку.

+ **Синхронизация — основа командной работы**: чем чаще забираются обновления
  с удалённого репозитория, тем меньше вероятность возникновения конфликтов
  в коде.

+ Для каждой новой функциональности или исправления создаётся отдельная ветка:
  разработчики работают над разными задачами независимо.

+ Основная ветка (`main`/`master`) всегда содержит рабочий код. Новые функции
  сначала тестируются в своей ветке. Перед слиянием проводится code review.
