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

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Sidebar() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';

  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24'>
      {/** Twitter logo */}
      <div className='hoverEffect hover:bg-blue-100 w-14 h-14 flex items-center justify-center p-3'>
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
        {isAuthenticated ? (
          <>
            <SidebarMenuIcon text='Notifications' Icon={BellIcon} />
            <SidebarMenuIcon text='Messages' Icon={InboxIcon} />
            <SidebarMenuIcon text='Bookmark' Icon={BookmarkIcon} />
            <SidebarMenuIcon text='Lists' Icon={ClipboardIcon} />
            <SidebarMenuIcon text='Profile' Icon={UserIcon} />
            <SidebarMenuIcon text='More' Icon={EllipsisHorizontalCircleIcon} />
          </>
        ) : null}
      </div>

      {isAuthenticated ? (
        <>
          {/* Buttons */}
          <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>
            Tweet
          </button>

          {/* Mini Profile */}
          <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
            <img
              onClick={signOut}
              className='h-10 w-10 rounded-full xl:mr-2'
              src={session.user.image}
              alt='user-image'
            />
            <div className='leading-5 hidden xl:inline'>
              <h4 className='font-bold'>{session.user.name}</h4>
              <p className='text-gray-500'>@{session.user.username}</p>
            </div>
            <EllipsisHorizontalIcon className='h-5 w-5 xl:ml-8' />
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className='bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'
        >
          Sign in
        </button>
      )}
    </div>
  );
}
