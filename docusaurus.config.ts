import type { Config } from '@docusaurus/types';
import type { Options, ThemeConfig }  from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


const config: Config = {
  title: 'Notes',
  favicon: 'img/favicon.ico',

  url: 'https://wermuind.github.io',
  baseUrl: '/notes',

  organizationName: 'wermuind', // GitHub username
  projectName: 'notes',         // GitHub repository name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'notes',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: ['./src/css/custom.css', './src/css/mdx.css'],
        },
      } satisfies Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Главная',
      logo: {
        alt: 'logo',
        src: 'img/logo.svg',
      },
      items: [
        {type: 'doc', docId: 'cpp/index', label: 'C++'},
        {type: 'doc', docId: 'js/index', label: 'JavaScript'},
      ],
    },
    prism: {
      defaultLanguage: 'text',
      theme: prismThemes.nightOwlLight,
      darkTheme: prismThemes.vsDark,
    },
    // footer: {
    //   style: 'dark',
    //   copyright: `Copyright © ${new Date().getFullYear()} Wermuind. Built with Docusaurus.`,
    // },
  } satisfies ThemeConfig,

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};

export default config;
