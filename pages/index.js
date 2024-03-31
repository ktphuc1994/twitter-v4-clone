import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Twiiter Clone</title>
        <meta
          name='description'
          content='An Instagram Clone App by Robert Khuc, under guidance of Dr. Sahand Ghavidel'
        />
        <link ref='icon' href='/favicon.ico' />
      </Head>

      <h1>Hellow!</h1>
    </div>
  );
}
