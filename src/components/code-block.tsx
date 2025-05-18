import type { CSSProperties, ReactElement } from 'react';


interface CodeBlockProps {
  theme: 'idea' | 'fleet-dark';
  tokens: Token[];
  styles?: Record<StyleID, CSSProperties>;
  ligatures?: boolean;
}
interface Token {
  value: string;
  type?: string;
  style?: StyleID;
}
type StyleID = string;


/**
 * Компонент блока кода. Настраивается цветовая схема (`idea` и `fleet-dark`),
 * а также наличие или отсутствие лигатур.
 *
 * Содержимое задаётся массивом токенов, каждый из которых это объект
 * с полем `value` и опциональными полями `type` и `style`.
 *
 * Для использования `style` у токена нужно задать словарь стилей,
 * значения которого соответствуют типу {@link CSSProperties}.
 */
export const CodeBlock = ({theme, tokens, styles, ligatures}: CodeBlockProps) => {
  const classes = theme === 'idea' ? themeIdeaClasses : themeFleetDarkClasses;
  const getClassName = getTokenClass.bind(classes);

  const toElement = (token: Token, i: number): ReactElement => {
    const className = getClassName(token.type);
    const style = token.style && styles ? styles[token.style] : undefined;
    return <span key={i} className={className} style={style}>{token.value}</span>;
  };

  const style: CSSProperties = ligatures === false
    ? {fontVariantLigatures: 'none'}
    : undefined;

  return (
    <div className={'code-block'}>
      <pre className={theme} style={style}>{tokens.map(toElement)}</pre>
    </div>
  );
};

function getTokenClass(this: Record<string, string>, tokenType: string): string | undefined {
  while (tokenType) {
    const className = this[tokenType];
    if (className !== undefined) return className;
    tokenType = tokenType.substring(0, tokenType.lastIndexOf('.'));
  }
  return undefined;
}

/* --- --- */

const themeIdeaClasses: Record<string, string> = {
  "comment": "gray",
  "comment.doc": "dark-green italic",
  "comment.doc.tag": "shamrock italic",
  "comment.doc.value": "light-gray italic",

  "keyword": "orange",
  "boolean": "orange",
  "number": "turquoise",

  "string": "green",
  "string.escape": "orange",
  "string.regex": "light-blue",
  "string.regex.text": "green",
  "string.regex.escape": "orange",
  "string.regex.metacharacter": "yellow",
  "string.regex.quantifier": "turquoise",
  "string.regex.operator": "orange",
  "string.regex.anchor": "orange",
  "string.regex.punctuation": "",
  "string.url": "green underline",

  "identifier.constant.global": "magenta italic",
  "identifier.this": "orange",
  "identifier.field": "magenta",
  "identifier.field.cpp": "dark-purple",
  "identifier.field.static": "magenta italic",
  "identifier.field.static.cpp": "dark-purple italic",

  "identifier.function": "yellow",
  "identifier.method": "yellow",
  "identifier.method.static": "yellow italic",

  "identifier.type.struct.cpp": "purple",
  "identifier.type.class.cpp": "purple",
  "identifier.type.enum.cpp": "purple",
  "identifier.type.generic": "teal",
  "identifier.enum-member": "magenta italic",
  "identifier.namespace.cpp": "purple",
  "identifier.template-value.cpp": "magenta italic",

  "punctuation.operator.overload.cpp": "teal",

  "preprocessor.cpp": "olive-green",
  "preprocessor.macro.cpp": "pear",
  "preprocessor.argument.cpp": "pear",
  "preprocessor.argument.include.cpp": "green",

  "tag.name": "yellow",
  "punctuation.xml": "green",
  "punctuation.tag": "yellow",
  "attribute.value": "green",
  "entity-reference": "blue",

  "decorator": "yellow",
  "selector": "yellow",

  "markup.heading": "magenta",
  "markup.list-marker": "orange",
  "markup.code": "green",
  "markup.code.block": "green",
  "markup.code.block.meta": "magenta",
  "markup.link.text": "orange",
  "markup.link.label": "orange",
  "markup.link.href": "yellow",
  "markup.blockquote": "green",
  "markup.horizontal-rule": "orange",
  "punctuation.markup": "orange",
};

const themeFleetDarkClasses: Record<string, string> = {
  "comment": "gray-90",
  "comment.doc.tag": "cyan",

  "keyword": "cyan",
  "boolean": "cyan",
  "number": "yellow",

  "string": "pink",
  "string.escape": "cyan",
  "string.regex": "cyan",
  "string.url": "pink underline",

  "identifier.constant": "violet",
  "identifier.this": "coral",
  "identifier.field": "violet",
  "identifier.field.json": "cyan",
  "identifier.field.static": "violet inline",

  "identifier.function": "yellow",
  "identifier.method": "yellow",
  "identifier.method.static": "yellow inline",

  "identifier.type": "blue",
  "identifier.enum-member": "violet",
  "identifier.template-value.cpp": "",

  "preprocessor.cpp": "lime",
  "preprocessor.macro.cpp": "",
  "preprocessor.argument.include.cpp": "pink",

  "tag.name": "blue",
  "punctuation.tag": "gray-90",
  "attribute": "violet",
  "attribute.value": "pink",
  "entity-reference": "orange",

  "markup.heading": "blue",
  "markup.bold": "bold",
  "markup.italic": "italic",
  "markup.list-marker": "cyan",
  "markup.code": "pink",
  "markup.label": "cyan",
  "markup.link.text": "cyan",
  "markup.link.label": "violet",
  "markup.link.href": "pink underline",
  "markup.blockquote": "pink",
  "markup.horizontal-rule": "violet",

  "punctuation.tag.md": "cyan",
  "punctuation.markup": "cyan",
  "punctuation.markup.link": "",
  "punctuation.markup.table": "",
};
