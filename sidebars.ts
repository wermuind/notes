import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';


const sidebar: SidebarsConfig[string] = [
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
      {type: 'doc', id: 'cpp/cpp-style-guide', label: 'Style Guide'},
      {type: 'doc', id: 'cpp/libraries', label: 'Библиотеки'},
      {type: 'doc', id: 'cpp/cmake', label: 'CMake'},
    ],
  },
  {
    type: 'category', label: 'JavaScript',
    link: {type: 'doc', id: 'js/index'},
    items: [
      {type: 'doc', id: 'js/ts-style-guide', label: 'Style Guide'},
      {type: 'doc', id: 'js/ts-code', label: 'Фрагменты кода'},
      {type: 'doc', id: 'js/object', label: 'Object'},
      {type: 'doc', id: 'js/iterator', label: 'Итераторы'},
      {type: 'doc', id: 'js/standards', label: 'Стандарты'},
      {type: 'doc', id: 'js/jsdoc', label: 'JSDoc'},
    ],
  },
  {
    type: 'category', label: 'Базы данных',
    link: {type: 'doc', id: 'db/index'},
    items: [
      {type: 'doc', id: 'db/sql', label: 'SQL'},
    ],
  },
  {
    type: 'category', label: 'Теория компиляции',
    link: {type: 'doc', id: 'compiler/index'},
    items: [
      {type: 'doc', id: 'compiler/language-model', label: 'Модель языка'},
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
          'compiler/parser/grammar-transform',
          'compiler/parser/first-follow',
          'compiler/parser/lalr1',
        ],
      },
    ],
  },
  {
    type: 'category', label: 'Низкоуровневое программирование',
    link: {type: 'generated-index', title: 'Низкоуровневое программирование'},
    items: [
      {type: 'doc', id: 'low-level/cpu', label: 'Процессор'},
      {type: 'doc', id: 'low-level/asm', label: 'Ассемблер'},
      {type: 'doc', id: 'low-level/call-stack', label: 'Стек вызовов'},
      {type: 'doc', id: 'low-level/program-structure', label: 'Структура программы'},
    ],
  },
  {
    type: 'category', label: 'Закладки',
    link: {type: 'generated-index', title: 'Закладки'},
    items: [
      {type: 'doc', id: 'bookmarks/common', label: 'Общее'},
      {type: 'doc', id: 'bookmarks/web', label: 'Web'},
      {type: 'doc', id: 'bookmarks/cpp', label: 'C++'},
      {type: 'doc', id: 'bookmarks/graphics', label: 'Компьютерная графика'},
    ],
  },
];

export default {main: sidebar};
