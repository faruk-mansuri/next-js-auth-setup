import React from 'react';

const UserProfile = ({ params }) => {
  const { userId } = params;

  return (
    <div className='flex flex-col place-items-center justify-center  min-h-screen py-2 '>
      <h1 className='text-3xl mb-4'>Single User </h1>
      <p>
        profile page{' '}
        <span className='p-2 rounded text-white bg-purple-500'>
          userId: {userId}
        </span>
      </p>
      <hr />
    </div>
  );
};

export default UserProfile;
