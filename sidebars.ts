import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';


const sidebar: SidebarsConfig[string] = [
  {
    type: 'category', label: 'Общее',
    link: {type: 'generated-index', title: 'Общее'},
    items: [
      {type: 'doc', id: 'common/licensing', label: 'Лицензирование'},
      {type: 'doc', id: 'common/semver', label: 'Semantic Versioning'},
      {type: 'doc', id: 'common/cli', label: 'Командная строка'},
      {type: 'doc', id: 'common/git', label: 'Git'},
      {type: 'doc', id: 'common/solid', label: 'Принципы SOLID'},
      {type: 'doc', id: 'common/tdd', label: 'Test Driven Development'},
      {type: 'doc', id: 'common/bookmarks', label: 'Закладки'},
    ],
  },
  {
    type: 'category', label: 'C++',
    link: {type: 'doc', id: 'cpp/index'},
    items: [
      {
        type: 'category', label: 'Язык',
        link: {type: 'generated-index', title: 'Язык'},
        items: [
          'cpp/language/reference',
          'cpp/language/constructor',
          'cpp/language/casting',
          'cpp/language/iterator',
          'cpp/language/copy-elision',
          'cpp/language/code-splitting',
        ],
      },
      {
        type: 'category', label: 'Стандартная библиотека',
        link: {type: 'doc', id: 'cpp/std/index'},
        items: [
          {type: 'doc', id: 'cpp/std/string', label: 'string'},
          {type: 'doc', id: 'cpp/std/map', label: 'map'},
          {type: 'doc', id: 'cpp/std/optional', label: 'optional'},
        ],
      },
      {type: 'doc', id: 'cpp/style-guide', label: 'Style Guide'},
      {type: 'doc', id: 'cpp/libraries', label: 'Библиотеки'},
      {type: 'doc', id: 'cpp/cmake', label: 'CMake'},
    ],
  },
  {
    type: 'category', label: 'JavaScript',
    link: {type: 'doc', id: 'js/index'},
    items: [
      {type: 'doc', id: 'js/standards', label: 'Стандарты языка'},
      {type: 'doc', id: 'js/object', label: 'Object'},
      {type: 'doc', id: 'js/iterator', label: 'Итераторы'},
      {type: 'doc', id: 'js/regex', label: 'Регулярные выражения'},
      {type: 'doc', id: 'js/jsdoc', label: 'JSDoc'},
    ],
  },
  {
    type: 'category', label: 'Базы данных',
    link: {type: 'doc', id: 'db/index'},
    items: [
      {type: 'doc', id: 'db/sql', label: 'SQL'},
      {type: 'doc', id: 'db/normalization', label: 'Нормализация'},
    ],
  },
  {
    type: 'category', label: 'Теория компиляции',
    link: {type: 'doc', id: 'compiler/index'},
    items: [
      {
        type: 'category', label: 'Лексический анализ',
        link: {type: 'doc', id: 'compiler/lexer/index'},
        items: [
          'compiler/lexer/regex-transform',
          'compiler/lexer/regex-to-dfa',
          'compiler/lexer/regex-tree',
        ],
      },
      {
        type: 'category', label: 'Синтаксический анализ',
        link: {type: 'doc', id: 'compiler/parser/index'},
        items: [
          'compiler/parser/grammar',
          'compiler/parser/grammar-extensions',
          'compiler/parser/bottom-up',
          'compiler/parser/lalr',
        ],
      },
    ],
  },
  {
    type: 'category', label: 'Низкоуровневое программирование',
    link: {type: 'generated-index', title: 'Низкоуровневое программирование'},
    items: [
      {type: 'doc', id: 'low-level/cpu', label: 'Процессор'},
      {type: 'doc', id: 'low-level/data-structures', label: 'Структуры данных'},
      {type: 'doc', id: 'low-level/program-structure', label: 'Структура программы'},
      {type: 'doc', id: 'low-level/asm', label: 'Ассемблер'},
      {type: 'doc', id: 'low-level/call-stack', label: 'Стек вызовов'},
    ],
  },
  {
    type: 'category', label: 'Математика',
    link: {type: 'doc', id: 'math/index'},
    items: [
      {type: 'doc', id: 'math/affine-transformation', label: 'Аффинные преобразования'},
    ],
  },
];

export default {main: sidebar};
