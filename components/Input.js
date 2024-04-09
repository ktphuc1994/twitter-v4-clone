import { PhotoIcon, FaceSmileIcon } from '@heroicons/react/24/outline';

export default function Input() {
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3'>
      <img
        src='https://media.licdn.com/dms/image/C5603AQEeDVn0pnKpDQ/profile-displayphoto-shrink_800_800/0/1623814405277?e=2147483647&v=beta&t=6KsthbGW6_lqQg_GVW7rjiaeHk9rs4-uJx1eN_4OYtg'
        alt='user-img'
        className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
      />
      <div className='w-full divide-y divide-gray-200'>
        <div>
          <textarea
            className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700'
            placeholder="What's happening?"
            rows='2'
          />
        </div>
        <div className='flex items-center justify-between pt-2.5'>
          <div className='flex'>
            <PhotoIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
            <FaceSmileIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
          </div>
          <button
            className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
            disabled
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
