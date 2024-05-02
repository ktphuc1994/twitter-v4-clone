import { useEffect, useMemo, useState } from 'react';
import { db, storage } from '@/firebase';
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
import { deleteObject, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '@/atom/modalAtom';
import { useRouter } from 'next/router';

export default function Comment({ commentInfo, originalPostId }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  const hasLiked = useMemo(() => {
    const likeIndex = likes.findIndex((like) => like.id === session?.user.uid);
    return likeIndex !== -1;
  }, [likes]);

  useEffect(() => {
    const unsubscribeLikes = onSnapshot(
      collection(
        db,
        'posts',
        originalPostId,
        'comments',
        commentInfo.commentId,
        'likes'
      ),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );

    return unsubscribeLikes;
  }, []);

  async function likeComment() {
    if (!session) {
      signIn();
      return;
    }

    if (hasLiked) {
      await deleteDoc(
        doc(
          db,
          'posts',
          originalPostId,
          'comments',
          commentInfo.commentId,
          'likes',
          session?.user.uid
        )
      );
      return;
    }

    await setDoc(
      doc(
        db,
        'posts',
        originalPostId,
        'comments',
        commentInfo.commentId,
        'likes',
        session?.user.uid
      ),
      {
        username: session.user.username,
      }
    );
  }

  async function deleteComment() {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      await deleteDoc(
        doc(db, 'posts', originalPostId, 'comments', commentInfo.commentId)
      );
    }
  }

  function handleCommentIconClick() {
    if (!session) {
      signIn();
      return;
    }

    setOpen(!open);
    if (!open) {
      setPostId(originalPostId);
      return;
    }

    setPostId('');
  }

  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200 pl-20'>
      {/** user image */}
      <img
        className='h-11 w-11 rounded-full mr-4'
        src={commentInfo.userImg}
        alt='user-img'
      />

      {/** right side */}
      <div className='flex-1'>
        {/** Header */}
        <div className='flex items-center justify-between'>
          {/** post user info */}
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {commentInfo.name}
            </h4>
            <span className='text-sm sm:text-[15px]'>
              @{commentInfo.username} -{' '}
            </span>
            <span className='text-sm sm:text-[15px] hover:underline'>
              <Moment fromNow>{commentInfo.timestamp}</Moment>
            </span>
          </div>

          {/** dot icon */}
          <EllipsisHorizontalIcon className='h-10 w-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2' />
        </div>

        {/** post text */}
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>
          {commentInfo.comment}
        </p>

        {/** icons */}
        <div className='flex justify-between text-gray-500 p-2'>
          <div className='flex items-center select-none'>
            <ChatBubbleOvalLeftEllipsisIcon
              className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'
              onClick={handleCommentIconClick}
            />
          </div>
          {session?.user.uid === commentInfo.userId && (
            <TrashIcon
              className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
              onClick={deleteComment}
            />
          )}
          <div className='flex items-center'>
            {hasLiked ? (
              <HeartIconFilled
                className='h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100'
                onClick={likeComment}
              />
            ) : (
              <HeartIcon
                className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
                onClick={likeComment}
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
