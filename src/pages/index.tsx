import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import './index.css';


interface SectionProps {
  link: string;
  title: string;
  children: any;
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
        <Section link={'/common'} title={'Общее'}>
          Заметки на общие темы.
        </Section>
        <Section link={'/cpp'} title={'C++'}>
          Конструкции языка с примерами, мини-гайды и стандартная библиотека.
        </Section>
        <Section link={'/js'} title={'JavaScript'}>
          Внутреннее устройство, стандарты языка.
        </Section>
        <Section link={'/db'} title={'Базы данных'}>
          SQL, устройство БД.
        </Section>
        <Section link={'/compiler'} title={'Теория компиляции'}>
          <ul>
            <li>Грамматика</li>
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
        <Section link={'/math'} title={'Математика'}>
          Формулы и техники, которые могут пригодиться в разработке.
        </Section>
      </main>
      <div className={'index-description'}>
        <p>
          Этот сайт содержит заметки и небольшие статьи на различные темы в контексте IT,
          с которыми <a href={'https://github.com/wermuind'} target={'_blank'}>мне</a> доводилось
          разбираться достаточно глубоко, чтобы написать об этом. По своей сути, это открытая
          и обновляемая база знаний, живая документация моих профессиональных интересов.
        </p>
        <p>
          Первая заметка, посвящённая <Link to={'/js/regex'}>регулярным выражениям</Link>,
          появилась в июне 2023 года. Тогда я подумал, что если мне придётся писать о чем-то,
          то я выучу это лучше. Ожидания оправдались и я продолжил добавлять заметки, выкладывая
          их в открытый доступ.
        </p>
      </div>
    </Layout>
  );
}

function Section({link, title, children}: SectionProps) {
  return (
    <Link to={link}>
      <h2>{title}</h2>
      <div>{children}</div>
    </Link>
  );
}
