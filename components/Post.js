import { useEffect, useMemo, useState } from 'react';
import { db } from '@/firebase';
import {
  EllipsisHorizontalIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { signIn, useSession } from 'next-auth/react';
import Moment from 'react-moment';

export default function Post({ post }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);

  const hasLiked = useMemo(() => {
    const likeIndex = likes.findIndex((like) => like.id === session?.user.uid);
    return likeIndex !== -1;
  }, [likes]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', post.id, 'likes'),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );

    return unsubscribe;
  }, []);

  async function likePost() {
    if (!session) {
      signIn();
      return;
    }

    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', post.id, 'likes', session?.user.uid));
      return;
    }

    await setDoc(doc(db, 'posts', post.id, 'likes', session?.user.uid), {
      username: session.user.username,
    });
  }

  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
      {/** user image */}
      <img
        className='h-11 w-11 rounded-full mr-4'
        src={post.data().userImg}
        alt='user-img'
      />

      {/** right side */}
      <div>
        {/** Header */}
        <div className='flex items-center justify-between'>
          {/** post user info */}
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {post.data().name}
            </h4>
            <span className='text-sm sm:text-[15px]'>
              @{post.data().username} -{' '}
            </span>
            <span className='text-sm sm:text-[15px] hover:underline'>
              <Moment fromNow>{post.data().timestamp?.toDate()}</Moment>
            </span>
          </div>

          {/** dot icon */}
          <EllipsisHorizontalIcon className='h-10 w-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2' />
        </div>

        {/** post text */}
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>
          {post.data().text}
        </p>

        {/** post image */}
        <img className='rounded-2xl mr-2' src={post.data().image} alt='' />

        {/** icons */}
        <div className='flex justify-between text-gray-500 p-2'>
          <ChatBubbleOvalLeftEllipsisIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
          <TrashIcon className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' />
          <div className='flex items-center'>
            {hasLiked ? (
              <HeartIconFilled
                className='h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100'
                onClick={likePost}
              />
            ) : (
              <HeartIcon
                className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
                onClick={likePost}
              />
            )}
            {likes.length > 0 ? (
              <span
                className={`text-sm select-none ${hasLiked && 'text-red-600'}`}
              >
                {likes.length}
              </span>
            ) : null}
          </div>
          <ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
          <ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
        </div>
      </div>
    </div>
  );
}
