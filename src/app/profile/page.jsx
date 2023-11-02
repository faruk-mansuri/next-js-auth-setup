'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    try {
      const response = await axios.get('/api/auth/logout');
      console.log(response);
      toast.success('Logout successfully');
      router.replace('/login');
    } catch (error) {
      console.log(error);
      toast.error(error.meg);
    }
  };

  const getCurrentUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/users/current-user');
      setUser(response.data.user);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) {
    return (
      <div className='grid place-items-center justify-center h-screen'>
        <div className='animate-spin h-16 w-16 bg-white rounded-full border-4 border-white border-l-purple-600'></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='grid place-items-center justify-center h-screen'>
        <h1 className='text-3xl'>user not found</h1>
      </div>
    );
  }

  return (
    <div className='flex flex-col place-items-center justify-center  min-h-screen py-2 '>
      <h1 className='text-3xl'>Profile</h1>
      <hr />
      <h2 className='text-lg'>{user.username}</h2>

      <Link
        type='button'
        className='text-white bg-purple-400 py-2 px-4 rounded-md font-bold mt-4 hover:bg-purple-500 transition-all'
        href={`/profile/${user._id}`}
      >
        single page
      </Link>

      <button
        type='button'
        className='text-white bg-blue-400 py-2 px-4 rounded-md font-bold mt-4 hover:bg-blue-500 transition-all'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
