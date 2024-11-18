'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Input, Button, Spacer, Card, user } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Role, User } from '@/types/types';
import { toastFailed } from '@/utils/toastHelper';
// import { fetchAllUsers } from '@/api/storeAdmin.api';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { forgotPassword, regulerLogin } from '@/lib/account';
import Swal from 'sweetalert2';
import { createToken } from '@/lib/cookie';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from '@/store';
import { DecodedToken, IForgot, IRegLogin } from '@/types/account';
import { login } from '@/store/slices/authSlice';
import { IoLogoGoogle } from 'react-icons/io5';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format or contains forbidden characters'
    )
    .required('Email Is Required!'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number. Special characters like quotation marks are not allowed.'
    )
    .required('Password Is Required!')
});

const ForgotSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format or contains forbidden characters'
    )
    .required('Email Is Required!')
});

export default function LoginPage() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const userOptions = useRef<User[]>([]);

  // const loadCategories = useCallback(async () => {
  //   try {
  //     const response = await fetchAllUsers();
  //     userOptions.current = response.storeAdmins;
  //   } catch (err) {
  //     toastFailed('Failed to fetch users');
  //   }
  // }, []);

  // useEffect(() => {
  //   loadCategories();
  // }, [loadCategories]);

  // const router = useRouter();

  // const toastLoginSuccess = (message: string) => toastSuccess(message);
  // const toastLoginFailed = (message: string) => toastFailed(message);

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const user = userOptions.current?.find((user) => user.username == username);

  //   if (user) {
  //     const userRole = user.role;
  //     localStorage.setItem('user', JSON.stringify(user));
  //     localStorage.setItem('userRole', userRole as unknown as string);
  //     toastLoginSuccess(`Successfully logged in as ${user.firstName} ${user.lastName}`);
  //     router.push(user.role == Role.USER ? '/user' : '/admin');
  //   } else {
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('userRole');
  //     toastLoginFailed('Invalid username');
  //     return;
  //   }
  // };

  const router = useRouter();
  const dispatch = useAppDispatch();

  //// Setting popup message
  const swalSuccess = (message: string) =>
    Swal.fire({
      titleText: message,
      icon: 'success',
      confirmButtonText: 'Cool',
      timer: 5000
    });
  const toastLoginFailed = (message: string) => toastFailed(message);

  //// Setting for modal pages
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const openLogin = () => {
    setIsLogin(true);
    setIsForgot(false);
  };

  const openForgot = () => {
    setIsForgot(true);
    setIsLogin(false);
  };

  //// setting form handling
  const handleLoginSubmit = async (data: IRegLogin, action: FormikHelpers<IRegLogin>) => {
    try {
      // Sending Form Data To Action
      const { result } = await regulerLogin(data);

      // Checking Result From Action
      if (result.status != 'ok') {
        throw result.msg;
      } else {
        // Setting token in cookie
        createToken(result.token);

        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(result.token);

        const setState: any = {
          userRole: decodedToken.userRole,
          id: decodedToken.id,
          email: decodedToken.email,
          isVerify: decodedToken.isVerify
        };

        // setting persist state
        dispatch(login(setState));

        action.resetForm();

        swalSuccess('Login Successfull');

        router.push(decodedToken.userRole == 'USER' ? '/user' : '/admin');
      }
    } catch (error: any | string) {
      toastLoginFailed(error);
    }
  };

  const handleSubmitPassword = async (data: IForgot, action: FormikHelpers<IForgot>) => {
    try {
      // Sending Form Data To Action
      const { result } = await forgotPassword(data);

      // Checking Result From Action
      if (result.status != 'ok') throw result.msg;
      swalSuccess(result.msg);

      action.resetForm();
    } catch (error: any | string) {
      toastLoginFailed(error);
    }
  };

  const openGoogleLoginPopup = async () => {
    const consentUrl = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}account/oauth-creds`, { method: 'GET' });

    const resConsentUrl = await consentUrl.json();

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

        const setState: any = {
          userRole: decodedToken.userRole,
          id: decodedToken.id,
          email: decodedToken.email,
          isVerify: decodedToken.isVerify
        };

        // Handle the token as needed (e.g., save it in Redux state)
        dispatch(login(setState));

        popup?.close(); // Close the popup

        router.push(decodedToken.userRole == 'USER' ? '/user' : '/admin');
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-w-[100vw] min-h-[100vh]">
      {isLogin && (
        <Card className="min-w-[400px] p-4">
          <div className="text-xl font-bold self-center py-4">LOGIN</div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLoginSubmit}
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
                      className="input input-bordered w-full max-w-md p-3 rounded-lg"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
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
                      className="input input-bordered w-full max-w-md p-3 rounded-lg"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                  </label>
                  <Button color="success" variant="ghost" type="submit" className="w-3/6 mx-auto ">
                    Continue
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <button className="p-0 my-4" onClick={openForgot}>
            Forgot Password?
          </button>

          <h1 className="text-center mt-3 mb-2 text-lg">Login via</h1>
          <div className="flex gap-4 mx-auto text-2xl w-full mb-3">
            <Button color="primary" onPress={openGoogleLoginPopup} className="w-fit mx-auto">
              <IoLogoGoogle color="white" size={27} className="hover:text-white" />
            </Button>
          </div>

          <div className="mx-auto my-4">
            <a href="/register">
              <Button color="primary" variant="shadow">
                Register
              </Button>
            </a>
          </div>
        </Card>
      )}

      {isForgot && (
        <Card className="min-w-[400px] p-4">
          <div className="text-xl font-bold self-center py-4">LOGIN</div>
          <Formik initialValues={{ email: '' }} validationSchema={ForgotSchema} onSubmit={handleSubmitPassword}>
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
                      className="input input-bordered w-full max-w-md p-3 rounded-lg"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                  </label>
                  <Button color="success" variant="ghost" type="submit" className="w-3/6 mx-auto my-5">
                    Continue
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <Button color="warning" variant="ghost" className="w-2/6 mx-auto " onPress={openLogin}>
            Back
          </Button>
        </Card>
      )}
    </div>
  );
}
