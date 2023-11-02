'use client';

import Link from 'next/link';

const Home = () => {
  return (
    <div className='grid place-items-center justify-center h-screen bg-purple-100'>
      <div className='grid place-items-center justify-center'>
        <h1 className='text-3xl mb-4'>MORE CONTENT IS COMING... 😊</h1>
        <Link
          href='/profile'
          className='text-center tracking-wider bg-purple-400 px-4 py-2 rounded-md font-bold text-white hover:bg-purple-500'
        >
          VISIT PROFILE
        </Link>
      </div>
    </div>
  );
};

export default Home;
