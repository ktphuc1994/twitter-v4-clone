import { useState } from 'react';

import News from './News';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

export default function Widgets({ newsResults, randomUserResults }) {
  const [articleNumber, setArticleNumber] = useState(3);
  const [randomUserNumber, setRandomUserNumber] = useState(3);
  const isShowMoreAvailable = articleNumber < newsResults.length;
  const isShowMoreRandomUser = randomUserNumber < randomUserResults.length;

  const handleShowMoreArticle = () => {
    if (!isShowMoreAvailable) return;
    setArticleNumber(articleNumber + 3);
  };

  const handleShowMoreUser = () => {
    if (!isShowMoreRandomUser) return;
    setRandomUserNumber(randomUserNumber + 3);
  };

  return (
    <div className='xl:w-[600px] hidden lg:inline ml-8 space-y-5'>
      <div className='w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50'>
        <div className='flex items-center p-3 rounded-full relative'>
          <MagnifyingGlassIcon className='h-5 w-5 z-50 text-gray-500' />
          <input
            className='absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100'
            type='text'
            placeholder='Search Twitter'
          />
        </div>
      </div>

      <div className='text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]'>
        <h4 className='font-bold text-xl px-4'>What&apos;s happening</h4>
        <AnimatePresence>
          {newsResults.slice(0, articleNumber).map((article) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <News article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isShowMoreAvailable ? (
          <button
            onClick={handleShowMoreArticle}
            className='text-blue-300 pl-4 pb-3 hover:text-blue-400'
          >
            Show more
          </button>
        ) : null}
      </div>

      <div className='sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]'>
        <h4 className='font-bold text-xl px-4'>Who to follow</h4>
        <AnimatePresence>
          {randomUserResults.slice(0, randomUserNumber).map((randomUser) => (
            <motion.div
              key={randomUser.login.username}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out'>
                <img
                  className='rounded-full'
                  width='40'
                  src={randomUser.picture.thumbnail}
                />
                <div className='truncate ml-4 leading-5'>
                  <h4 className='font-bold hover:underline text-[14px] truncate'>
                    {randomUser.login.username}
                  </h4>
                  <h5 className='text-[13px] text-gray-500 truncate'>
                    {randomUser.name.first + ' ' + randomUser.name.last}
                  </h5>
                </div>
                <button className='ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold'>
                  Follow
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isShowMoreRandomUser ? (
          <button
            onClick={handleShowMoreUser}
            className='text-blue-300 pl-4 pb-3 hover:text-blue-400'
          >
            Show more
          </button>
        ) : null}
      </div>
    </div>
  );
}
