'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      formData.username === '' ||
      formData.email === '' ||
      formData.password === ''
    ) {
      toast.error('Please provide username, email and password');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/signup', formData);
      router.push('/login');
      toast.success(' Check your email(spam) to verify your account');
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='mx-20  flex justify-center my-20'>
      <div className='w-full max-w-md border-2 border-purple-200 rounded-md p-4 shadow-md hover:shadow-lg transition-all'>
        <h1 className='mt-8 mb-4 text-4xl font-bold text-center tracking-wider text-purple-500 uppercase  '>
          Signup
        </h1>
        <hr className='border-purple-200' />

        <form className='flex flex-col py-2 mt-8 gap-4'>
          {/* USERNAME */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='username'
              className='text-sm uppercase tracking-wider text-slate-500'
            >
              username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='username'
              className='px-2 py-1 bg-slate-100 rounded-sm tracking-wider'
              value={formData.username}
              onChange={handleFormData}
              required
            />
          </div>

          {/* EMAIL */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='email'
              className='text-sm uppercase tracking-wider text-slate-500'
            >
              email
            </label>
            <input
              id='email'
              name='email'
              placeholder='email'
              type='email'
              className='px-2 py-1 bg-slate-100 rounded-sm tracking-wider'
              value={formData.email}
              onChange={handleFormData}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='password'
              className='text-sm uppercase tracking-wider text-slate-500'
            >
              password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='password'
              className='px-2 py-1 bg-slate-100 rounded-sm tracking-wider '
              value={formData.password}
              onChange={handleFormData}
              required
            />
          </div>

          {/* SUBMIT BTN */}
          <button
            disabled={isLoading}
            onClick={handleSignUp}
            type='submit'
            className='mt-4 mb-4 px-2 py-1 border text-white uppercase  bg-purple-400  tracking-wide font-bold rounded-sm hover:bg-purple-500 transition-all '
          >
            {isLoading ? (
              <span className='animate-spin inline-block h-6 w-6  rounded-full border-4 border-white border-l-purple-600'></span>
            ) : (
              'Signup'
            )}
          </button>

          <p className='text-center'>
            Already have an account!{' '}
            <Link href='login' className='text-blue-400'>
              Login?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
