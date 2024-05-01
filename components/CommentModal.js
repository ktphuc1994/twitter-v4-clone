import { useEffect, useState } from 'react';
import { modalState, postIdState } from '@/atom/modalAtom';
import { useRecoilState } from 'recoil';
import Modal from 'react-modal';
import {
  XMarkIcon,
  PhotoIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';
import { db } from '@/firebase';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import Moment from 'react-moment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

Modal.setAppElement('#react-modal-root');

export default function CommentModal() {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState(null);
  const [input, setInput] = useState('');
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'posts', postId), (snapshot) => {
      setPost(snapshot);
    });

    return unsubscribe;
  }, [postId, db]);

  function closeModal() {
    setOpen(false);
  }

  async function sendComment() {
    await addDoc(collection(db, 'posts', postId, 'comments'), {
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setOpen(false);
    setInput('');
    router.push(`/posts/${postId}`);
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-400 rounded-xl shadow-md outline-none'
    >
      <div className='p-1'>
        <div className='border-b border-gray-200 py-2 px-1.5'>
          <div
            className='hoverEffect w-9 h-9 flex items-center justify-center p-0'
            onClick={closeModal}
          >
            <XMarkIcon className='h-[22px] text-gray-700' />
          </div>
        </div>
        <div className='p-2 flex items-center space-x-1 relative'>
          <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300' />
          <img
            className='h-11 w-11 rounded-full mr-4'
            src={post?.data()?.userImg}
            alt='user-img'
          />
          <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
            {post?.data()?.name}
          </h4>
          <span className='text-sm sm:text-[15px]'>
            @{post?.data()?.username} -{' '}
          </span>
          <span className='text-sm sm:text-[15px] hover:underline'>
            <Moment fromNow>{post?.data()?.timestamp.toDate()}</Moment>
          </span>
        </div>
        <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>
          {post?.data()?.text}
        </p>

        <div className='flex p-3 space-x-3'>
          <img
            src={session?.user?.image}
            alt='user-img'
            className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
          />
          <div className='w-full divide-y divide-gray-200'>
            <div>
              <textarea
                className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700'
                placeholder='Tweet your reply'
                rows='2'
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
            <div className='flex items-center justify-between pt-2.5'>
              <div className='flex'>
                <div
                  onClick={() => {
                    // filePickerRef.current.click();
                  }}
                >
                  <PhotoIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                  {/* <input
                    type='file'
                    hidden
                    accept='image/png, image/gif, image/jpeg'
                    ref={filePickerRef}
                    onChange={addImageToPost}
                  /> */}
                </div>
                <FaceSmileIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
              </div>
              <button
                className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                disabled={!input.trim()}
                onClick={sendComment}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
