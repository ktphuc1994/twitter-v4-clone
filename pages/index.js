import CommentModal from '@/components/CommentModal';
import Feed from '@/components/Feed';
import Sidebar from '@/components/Sidebar';
import Widgets from '@/components/Widgets';
import Head from 'next/head';

export default function Home({ newsResults, randomUserResults }) {
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <meta
          name='description'
          content='An Twitter Clone App by Robert Khuc, under guidance of Dr. Sahand Ghavidel'
        />
        <link ref='icon' href='/favicon.ico' />
      </Head>

      <main className='flex min-h-screen mx-auto'>
        {/** Sidebar */}
        <Sidebar />

        {/** Feed */}
        <Feed />

        {/** Widgets */}
        <Widgets
          newsResults={newsResults.articles}
          randomUserResults={randomUserResults.results}
        />

        {/** Modal */}
        <CommentModal />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const [newsResults, randomUserResults] = await Promise.allSettled([
    // news
    fetch(
      'https://saurav.tech/NewsAPI/top-headlines/category/business/us.json'
    ).then((res) => res.json()),

    // random user
    fetch('https://randomuser.me/api/?results=30&inc=name,login,picture').then(
      (res) => res.json()
    ),
  ]);

  return {
    props: {
      newsResults: newsResults.value,
      randomUserResults: randomUserResults.value,
    },
  };
}
