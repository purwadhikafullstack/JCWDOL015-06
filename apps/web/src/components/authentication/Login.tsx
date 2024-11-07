'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { IoLogoGoogle, IoLogoFacebook } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/store';
import { DecodedToken, IRegLogin } from '@/types/account';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { regulerLogin } from '@/lib/account';
import Swal from 'sweetalert2';
import { createToken } from '@/lib/cookie';
import { setLoginState } from '@/redux/slice/accountSlice';
import { jwtDecode } from 'jwt-decode';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format or contains forbidden characters',
    )
    .required('Email Is Required!'),
  // password: yup.string().matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  //   'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number. Special characters like quotation marks are not allowed.'
  // ).required('Password Is Required!')
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number. Special characters like quotation marks are not allowed.',
    )
    .required('Password Is Required!'),
});

const Login: React.FC = () => {
  // Setting for modal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Setting for modal pages
  const [isMain, setIsMain] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const openMain = () => {
    setIsMain(true);
    setIsForgot(false);
  };
  const openForgot = () => {
    setIsForgot(true);
    setIsMain(false);
  };

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    data: IRegLogin,
    action: FormikHelpers<IRegLogin>,
  ) => {
    try {
      // Sending Form Data To Action
      const { result } = await regulerLogin(data);

      // Checking Result From Action
      if (result.status != 'ok') {
        console.log('\n\n ===== LOGIN ERROR');
        console.log(result.msg)
        throw result.msg;

      } else {
        const setState = {
          accountState: true,
          id: result.user.id,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email,
        };

        Swal.fire({
          titleText: 'Login Successfull',
          // text: `Token: ${result.token}, ${setState.id}, ${setState.email}`,
          icon: 'success',
          confirmButtonText: 'Cool',
          timer: 7000,
        });

        // Setting token in cookie
        createToken(result.token);

        dispatch(setLoginState(setState));

        action.resetForm();

        closeModal();

        router.push('/');
      }
    } catch (error) {
      console.log('component login error, ', error);
      Swal.fire({
        title: 'Error While Login',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 4000,
      });
    }
  };

  //

  const openGoogleLoginPopup = async () => {
    const consentUrl = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}account/oauth-creds`,
      { method: 'GET' }
    );
  
    const resConsentUrl = await consentUrl.json();
  
    closeModal(); // Ignore this line if not relevant
  
    // Open Google OAuth in a new popup window
    const popup = window.open(resConsentUrl.url, '_blank', 'width=500,height=600');
  
    // Listen for message from the popup window
    window.addEventListener('message', (event) => {
      if (event.origin !== window.location.origin) return; // Ensure message is from a trusted source
  
      const { token } = event.data;
      
      if (token) {
        // Setting token in cookie
        createToken(token);

        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        
        const setState = {
          accountState: true,
          id: decodedToken.id,
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          email: decodedToken.email,
        };

        console.log('\n\n LOGIN PAGE CHECK setState \n');
        console.log(setState);        

        // Handle the token as needed (e.g., save it in Redux state)
        dispatch(setLoginState(setState));
  
        popup?.close(); // Close the popup
      }
    });
  };
  

  return (
    <>
      <button className="btn btn-ghost" onClick={openModal}>
        Login
      </button>
      {/* isOpen &&  */}
      {isOpen && (
        <>
          <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white flex flex-col w-11/12 h-[98%] lg:w-5/12 p-0 rounded-xl shadow-lg relative overflow-y-auto">
              {/* Top Side */}
              <div className="basis-4/12 bg-slate-300">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-4 rounded text-gray-600 hover:text-gray-900 text-xl "
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>

              {isMain && (
                <>
                  {/* Bottom/Main Side */}
                  <div className="basis-8/12 flex flex-col flex-wrap gap-3 h-full p-3 rounded-t-2xl bg-slate-100 relative bottom-4">
                    <h1 className="text-xl ml-2">Login</h1>

                    <Formik
                      initialValues={{ email: '', password: '' }}
                      validationSchema={LoginSchema}
                      onSubmit={handleSubmit}
                    >
                      {() => {
                        return (
                          <Form className="w-9/12 mx-auto flex flex-col gap-3">
                            {/* Input Email */}
                            <label className="form-control w-full max-w-lg">
                              <div className="label">
                                <span className="label-text">Email</span>
                              </div>
                              <Field
                                type="text"
                                name="email"
                                placeholder="Type email address"
                                className="input input-bordered w-full max-w-md"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500"
                              />
                            </label>
                            {/* Input Password */}
                            <label className="form-control w-full max-w-md">
                              <div className="label">
                                <span className="label-text">Password</span>
                              </div>
                              <Field
                                type="password"
                                name="password"
                                placeholder="Type password here"
                                className="input input-bordered w-full max-w-md"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500"
                              />
                            </label>
                            <button
                              type="submit"
                              className="btn btn-outline btn-accent w-fit px-9 mx-auto"
                            >
                              Continue
                            </button>
                          </Form>
                        );
                      }}
                    </Formik>

                    <h1 className="text-center mt-3">Login via</h1>
                    <div className="flex gap-4 mx-auto text-2xl">
                      {/* <a
                        href={GOOGLE_OAUTH_CONSENT_SCREEN_URL}
                        target="__blank"
                        className="border-4 shadow-xl h-fit w-20 rounded-xl flex gap-2 justify-center items-center text-center p-4"
                      >
                        <IoLogoGoogle />
                      </a> */}
                      <button className="btn btn-square" onClick={openGoogleLoginPopup}>
                        <IoLogoGoogle />
                      </button>
                      {/* <a
                        href={GOOGLE_OAUTH_CONSENT_SCREEN_URL}
                        target="__blank"
                        className="border-4 shadow-xl h-fit w-20 rounded-xl flex gap-2 justify-center items-center text-center p-4"
                      >
                        <IoLogoFacebook />
                      </a>
                      <a
                        href={GOOGLE_OAUTH_CONSENT_SCREEN_URL}
                        target="__blank"
                        className="border-4 shadow-xl h-fit w-20 rounded-xl flex gap-2 justify-center items-center text-center p-4"
                      >
                        <FaXTwitter />
                      </a> */}
                    </div>
                  </div>
                </>
              )}

              {isForgot && (
                <>
                  {/* Bottom/Main Side */}
                  <div className="basis-8/12 flex flex-col flex-wrap gap-3 h-full p-3 rounded-t-2xl bg-slate-100 relative bottom-4">
                    <h1 className="text-xl ml-2">Forget Password</h1>
                    <form
                      action=""
                      className="border-2 w-9/12 mx-auto flex flex-col gap-3"
                    >
                      {/* Input Email */}
                      <label className="form-control w-full max-w-lg">
                        <div className="label">
                          <span className="label-text">Email</span>
                        </div>
                        <input
                          type="text"
                          placeholder="Type email address"
                          className="input input-bordered w-full max-w-md"
                        />
                      </label>

                      <button className="btn btn-outline btn-accent w-fit px-9 mx-auto">
                        Continue
                      </button>
                      <button
                        onClick={openMain}
                        className="rounded text-gray-600 hover:text-gray-900 text-xl "
                        aria-label="Back"
                      >
                        Back
                      </button>
                    </form>
                    {/* <h1 className="text-center mt-3">Login via</h1>
                    <div className="flex gap-4 mx-auto text-2xl">
                      <a
                        href={GOOGLE_OAUTH_CONSENT_SCREEN_URL}
                        target="__blank"
                        className="border-4 shadow-xl h-fit w-20 rounded-xl flex gap-2 justify-center items-center text-center p-4"
                      >
                        <IoLogoGoogle />
                      </a>
                      <a
                        href={GOOGLE_OAUTH_CONSENT_SCREEN_URL}
                        target="__blank"
                        className="border-4 shadow-xl h-fit w-20 rounded-xl flex gap-2 justify-center items-center text-center p-4"
                      >
                        <IoLogoFacebook />
                      </a>
                      <a
                        href={GOOGLE_OAUTH_CONSENT_SCREEN_URL}
                        target="__blank"
                        className="border-4 shadow-xl h-fit w-20 rounded-xl flex gap-2 justify-center items-center text-center p-4"
                      >
                        <FaXTwitter />
                      </a>
                    </div> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
