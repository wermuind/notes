import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import './index.css';


interface SectionProps {
  link: string;
  title: string;
  children?: any;
}


export default function Home() {
  const context = useDocusaurusContext();
  const title = context.siteConfig.title;

  return (
    <Layout title={'Index'}>
      <header className={'index-header'}>
        <h1>{title}</h1>
      </header>
      <main className={'index-sections'}>
        <Section link={'/cpp'} title={'C++'}>
          Конструкции языка с примерами, мини-гайды и стандартная библиотека.
        </Section>
        <Section link={'/js'} title={'JavaScript'}>
          Заметки, внутреннее устройство языка, стандарты.
        </Section>
        <Section link={'/db'} title={'Базы данных'}>
          SQL, устройство БД.
        </Section>
        <Section link={'/compiler'} title={'Теория компиляции'}>
          <ul>
            <li>Грамматики</li>
            <li>Лесический анализ</li>
            <li>Синтаксический анализ</li>
          </ul>
        </Section>
        <Section link={'/category/низкоуровневое-программирование'} title={'Низкоуровневое программирование'}>
          <ul>
            <li>Архитектура процессора</li>
            <li>Аппаратный стек</li>
            <li>Машинные инструкции</li>
          </ul>
        </Section>
        <Section link={'/category/закладки'} title={'Закладки'}>
          Полезные ссылки на разные темы.
        </Section>
      </main>
    </Layout>
  );
}

function Section({link, title, children}: SectionProps) {
  return (
    <Link to={link}>
      <h2>{title}</h2>
      {children && <div>{children}</div>}
    </Link>
  );
}
