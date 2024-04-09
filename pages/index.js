import Feed from '@/components/Feed';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

export default function Home() {
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

      <main className='flex min-h-screen max-w-7xl mx-auto'>
        {/** Sidebar */}
        <Sidebar />

        {/** Feed */}
        <Feed />

        {/** Widgets */}

        {/** Modal */}
      </main>
    </div>
  );
}
