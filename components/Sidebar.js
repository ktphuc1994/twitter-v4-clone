import Image from 'next/image';
import SidebarMenuIcon from './SidebarMenuIcon';

import { HomeIcon } from '@heroicons/react/24/solid';
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full'>
      {/** Twitter logo */}
      <div className='hoverEffect hover:bg-blue-100 w-14 h-14 flex items-center justify-center'>
        <Image
          width={50}
          height={50}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png'
          alt='twitter-logo'
        />
      </div>

      {/** Menu */}
      <div className='mt-4 mb-2.5 xl:items-start'>
        <SidebarMenuIcon text='Home' Icon={HomeIcon} active />
        <SidebarMenuIcon text='Explore' Icon={HashtagIcon} />
        <SidebarMenuIcon text='Notifications' Icon={BellIcon} />
        <SidebarMenuIcon text='Messages' Icon={InboxIcon} />
        <SidebarMenuIcon text='Bookmark' Icon={BookmarkIcon} />
        <SidebarMenuIcon text='Lists' Icon={ClipboardIcon} />
        <SidebarMenuIcon text='Profile' Icon={UserIcon} />
        <SidebarMenuIcon text='More' Icon={EllipsisHorizontalCircleIcon} />
      </div>

      {/** Buttons */}
      <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>
        Tweet
      </button>

      {/** Mini Profile */}
      <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
        <img
          className='h-10 w-10 rounded-full xl:mr-2'
          src='https://media.licdn.com/dms/image/C5603AQEeDVn0pnKpDQ/profile-displayphoto-shrink_800_800/0/1623814405277?e=2147483647&v=beta&t=6KsthbGW6_lqQg_GVW7rjiaeHk9rs4-uJx1eN_4OYtg'
          alt='user-image'
        />
        <div className='leading-5 hidden xl:inline'>
          <h4 className='font-bold'>Robert Khuc</h4>
          <p className='text-gray-500'>@ktphuc1994</p>
        </div>
        <EllipsisHorizontalIcon className='h-5 w-5 xl:ml-8' />
      </div>
    </div>
  );
}
