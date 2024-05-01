import CommentModal from '@/components/CommentModal';
import Post from '@/components/Post';
import Sidebar from '@/components/Sidebar';
import Widgets from '@/components/Widgets';
import { db } from '@/firebase';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';

export default function PostDetail({ post, newsResults, randomUserResults }) {
  return (
    <div>
      <Head>
        <title>Post Page</title>
        <meta name='description' content={post.text} />
        <link ref='icon' href='/favicon.ico' />
      </Head>

      <main className='flex min-h-screen mx-auto'>
        {/** Sidebar */}
        <Sidebar />

        {/** Feed */}
        <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
          <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
            <Link href='/'>
              <div className='hoverEffect'>
                <ArrowLeftIcon className='h-5' />
              </div>
            </Link>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>
              Tweet
            </h2>
          </div>
          <Post postObject={post} />
        </div>

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

export async function getServerSideProps(context) {
  const postDocRef = doc(db, 'posts', context.params.id);
  const postDocSnap = await getDoc(postDocRef);
  if (!postDocSnap.exists()) {
    return {
      notFound: true,
    };
  }

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

  const post = postDocSnap.data();
  post.postId = context.params.id;
  post.timestamp = post.timestamp.toDate().toISOString();

  return {
    props: {
      post,
      newsResults: newsResults.value,
      randomUserResults: randomUserResults.value,
    },
  };
}
