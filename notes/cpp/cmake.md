# CMake

<dfn>CMake</dfn> — кроссплатформенная система управления сборкой программного
обеспечения, в частности, позволяющая генерировать файлы для IDE и систем
сборки.

CMake де-факто стал стандартом в экосистеме C/C++ и используется во многих
проектах.

## Язык {#language}

CMake предоставляет скриптовый язык для описания процесса сборки:
[Reference](https://cmake.org/cmake/help/latest/manual/cmake-commands.7.html).

### cmake_minimum_required {#cmake-minimum-required}

```cmake
cmake_minimum_required(VERSION <min>[...<max>] [FATAL_ERROR])
```

Устанавливает минимальную и максимальную требуемую версию CMake для проекта.

```cmake
cmake_minimum_required(VERSION 3.25.0)
cmake_minimum_required(VERSION 3.20...3.25 FATAL_ERROR)
```

### set и unset {#set-unset}

```cmake
# normal variable
set(<variable> <value>... [PARENT_SCOPE])
unset(<variable> [PARENT_SCOPE])

# cache variable
set(<variable> <value>... CACHE <type> <docstring> [FORCE])
unset(<variable> CACHE)

# environment variable
set(ENV{<variable>} [<value>])
unset(ENV{<variable>})
```

Устанавливает заданное значение для переменной скрипта, кеша или окружения.
Выражение`<value>...`, означает, что ожидается ноль или более аргументов.

```cmake
set(PROJECT_NAME "app")

set(SOURCES "main.cpp" "lib.hpp" "lib.cpp")
unset(SOURCES)
```

### Ветвления {#if}

```cmake
if(<condition>)
  <commands>
elseif(<condition>) # optional block, can be repeated
  <commands>
else()              # optional block
  <commands>
endif()
```

Поддерживаются:
+ логические операторы (`NOT`, `AND`, `OR`)
+ проверки переменных
+ проверки на существование (`COMMAND`, `POLICY`, `TARGET`, `TEST`)
+ операции над путями к папкам или файлам
+ сравнения (в т.ч. `MATCHES`), сравнение версий

### add_subdirectory {#add-subdirectory}

```cmake
add_subdirectory(source_dir [binary_dir] [EXCLUDE_FROM_ALL] [SYSTEM])
```

Добавляет подкаталог в сборку; `source_dir` указывает каталог, в котором
находится исходный `CMakeLists.txt` и файлы кода.

Если указаны относительные пути, они будут оцениваться по отношению к текущему
каталогу (обычное использование), но это также может быть и абсолютный путь.

### add_executable {#add-executable}

```cmake
add_executable(
  <name> [WIN32] [MACOSX_BUNDLE] [EXCLUDE_FROM_ALL]
  [source1 ] [source2 ...]
)
```

Добавляет исполняемый файл с именем `<name>` для сборки из исходных файлов,
перечисленных в вызове команды. Имя должно быть уникальным в рамках проекта.

```cmake
add_executable(app
  "src/main.cpp"
  "src/fs/file-system.hpp"
  "src/fs/file-system.cpp"
)
```

## Модули в проекте

#### File Tree:

```
project/
├─ lib-as-module/
│  ├─ include/
│  ├─ src/
│  └─ CMakeLists.txt  # Lib CMake
│
├─ app/
│  ├─ src/
│  └─ CMakeLists.txt  # App CMake
│
└─ CMakeLists.txt     # Root CMake
```

#### Root CMake:
```cmake
cmake_minimum_required(VERSION 3.25.0)

project("project")
add_subdirectory("lib-as-module")
add_subdirectory("app")

set_property(
  DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
  PROPERTY VS_STARTUP_PROJECT "app"
)
```

#### Lib CMake:

```cmake
set(LIB_NAME "lib-as-module")
# список заголовков, которые предоставляет библиотека
set(LIB_EXPORTS "includes/lib.hpp" "includes/lib-utils.hpp")
# список файлов-реализаций библиотеки
set(LIB_SOURCES "src/lib.cpp" "src/lib-utils.cpp")

add_library(${LIB_NAME} STATIC ${LIB_EXPORTS} ${LIB_SOURCES})
target_include_directories(${LIB_NAME} PUBLIC "include")
```

#### App CMake:

```cmake
set(APP_NAME "app")
set(APP_SOURCES "src/main.cpp" "src/utils.hpp" "src/utils.cpp")

add_executable(${APP_NAME} ${APP_SOURCES})
target_link_libraries(${APP_NAME} "lib-as-module")

set_target_properties(
  ${APP_NAME} PROPERTIES
  RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)
```
