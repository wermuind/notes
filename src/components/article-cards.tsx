import Link from '@docusaurus/Link';


interface ArticleCardsProps {
  data: ArticleCardProps[];
}
interface ArticleCardProps {
  link: string;
  label: string;
  desc: string;
}


export const ArticleCards = ({data}: ArticleCardsProps) => {
  const toElement = (props: ArticleCardProps, i: number) => {
    return <ArticleCard key={i} {...props}/>;
  };
  return <div className={'article-cards'}>{data.map(toElement)}</div>;
};

const ArticleCard = ({link, label, desc}: ArticleCardProps) => {
  const children = [
    <div><code>{label}</code></div>,
    <div className={'card-desc'}>{desc}</div>
  ];

  if (!link) {
    return <a>{children}</a>;
  }
  if (link.startsWith('http')) {
    return <a href={link} target={'_blank'}>{children}</a>;
  }
  return <Link to={'/cpp/std' + link}>{children}</Link>;
};
