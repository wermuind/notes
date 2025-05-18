# Библиотеки

[Boost](https://www.boost.org) | [Abseil](https://abseil.io)

### fmt

Библиотека для форматирования. Быстрая и безопасная альтернатива `iostream`.

[GitHub](https://github.com/fmtlib/fmt) |
[Docs](https://fmt.dev/latest/index.html)

```cpp
#include <fmt/format.h>

std::string s = fmt::format("The answer is {}.", 42);
// s == "The answer is 42."
```

### nlohmann/json 

Современная библиотека для работы с JSON.

[GitHub](https://github.com/nlohmann/json) |
[Docs](https://json.nlohmann.me)

```cpp
#include <nlohmann/json.hpp>
using json = nlohmann::json;

json example = {
  {"happy", true},
  {"pi", 3.141},
};
```

### ctre

**C**ompile **T**ime **R**egular **E**xpressions.<br/>
Библиотека для работы с регулярными выражениями.

[GitHub](https://github.com/hanickadot/compile-time-regular-expressions)

```cpp
#include <ctre.hpp>

auto matcher = ctre::match<"regex">;
if (matcher(input)) ...
```

### glfw

Кроссплатформенная библиотека для разработки приложений OpenGL и Vulkan.
Предоставляет простой API для создания окон, контекстов и поверхностей, чтения
входных данных, обработки событий и т.д.

[GitHub](https://github.com/glfw/glfw) |
[Docs](https://www.glfw.org/docs/latest)

### glm

Математическая header only библиотека для графики, основанная на спецификациях
языка шейдинга OpenGL (GLSL).

[GitHub](https://github.com/g-truc/glm) |
[Docs](http://glm.g-truc.net/0.9.9/api/modules.html)

### ImGui

Библиотека графического интерфейса для C++.

[GitHub](https://github.com/ocornut/imgui) |
[Docs](https://github.com/ocornut/imgui/wiki/Getting-Started)

```cpp
ImGui::Text("Hello, world %d", 123);
ImGui::InputText("string", buf, IM_ARRAYSIZE(buf));
ImGui::SliderFloat("float", &f, 0.0f, 1.0f);
```
