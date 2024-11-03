'use client';

import React, { useState } from 'react';

const GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_CLIENT_ID = "39782640793-4p1v7dp1bl9eaeaeb4mtk0s97fuq543v.apps.googleusercontent.com";

// const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
// const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;

const Login: React.FC = () => {
  // Setting for modal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const GOOGLE_CALLBACK_URL = 'http%3A//localhost:8000/api/account/google';
  const GOOGLE_OAUTH_SCOPES = [
    'https%3A//www.googleapis.com/auth/userinfo.email',

    'https%3A//www.googleapis.com/auth/userinfo.profile',
  ];
  const state = "some_state";
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;

  return (
    <>
      <button className="btn btn-ghost btn-circle" onClick={openModal}>
        Login
      </button>
      {/* isOpen &&  */}
      {isOpen && (
        <>
          <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white flex flex-col w-11/12 h-[90%] lg:w-5/12 p-0 rounded-xl shadow-lg relative overflow-y-auto">
              {/* Close Button */}
              <div className="basis-4/12 border-2 border-red-600">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-4 rounded text-gray-600 hover:text-gray-900 text-xl "
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <div className="basis-8/12 border-2 border-black h-full flex flex-col gap-4">
                Login
                <a href={GOOGLE_OAUTH_CONSENT_SCREEN_URL} target="__blank" className='border-2 border-red-600 h-fit w-fit rounded-xl p-4'>By Google</a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
