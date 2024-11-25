'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Input, Button, Spacer, Card, user } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Role, User } from '@/types/types';
import { toastFailed } from '@/utils/toastHelper';
// import { fetchAllUsers } from '@/api/storeAdmin.api';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { registerAccount } from '@/api/account';
import Swal from 'sweetalert2';
import { IRegister } from '@/types/account';

const RegiserSchema = yup.object().shape({
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
    .required('Password Is Required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password Must Match!')
    .required('Re-Confirm Password Is Required!'),
  firstName: yup.string().required('First Name Is Required'),
  lastName: yup.string().required('Last Name Is Required'),
  mobileNum: yup.number().required('Mobile Number Is Required')
});

export default function RegisterPage() {
  const router = useRouter();

  //// Setting popup message
  const swalSuccess = (message: string) =>
    Swal.fire({
      titleText: message,
      icon: 'success',
      confirmButtonText: 'Cool',
      timer: 5000
    });

  const swalError = (message: string) =>
    Swal.fire({
      titleText: message,
      icon: 'error',
      confirmButtonText: 'Cool',
      timer: 5000
    });

  const toastRegisterFailed = (message: string) => toastFailed(message);

  //// setting form handling
  const handleRegisterSubmit = async (data: IRegister, action: FormikHelpers<IRegister>) => {
    try {
      // Sending Form Data To Action
      const { result } = await registerAccount(data);

      // Checking Result From Action
      if (result.status != 'ok') {
        throw result.msg;
      } else {
        swalSuccess(result.msg);

        action.resetForm();

        router.push('/login');
      }
    } catch (error: any | string) {
      toastRegisterFailed(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-w-[100vw] min-h-[100vh] py-8">
      <Card className="min-w-[400px] p-4">
        <div className="text-xl font-bold self-center py-4 ">REGISTER</div>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            mobileNum: 0
          }}
          validationSchema={RegiserSchema}
          onSubmit={handleRegisterSubmit}
        >
          {() => {
            return (
              <Form className="w-9/12 mx-auto flex flex-col flex-wrap gap-7">
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
                {/* Input Confirm Password */}
                <label className="form-control w-full max-w-md">
                  <div className="label">
                    <span className="label-text">Confirm Password</span>
                  </div>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Type password here"
                    className="input input-bordered w-full max-w-md p-3 rounded-lg"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                </label>
                {/* Input First Name */}
                <label className="form-control w-full max-w-lg">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Type First - Middle Name"
                    className="input input-bordered w-full max-w-md p-3 rounded-lg"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500" />
                </label>
                {/* Input Last Name */}
                <label className="form-control w-full max-w-lg">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Type Last Name"
                    className="input input-bordered w-full max-w-md p-3 rounded-lg"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500" />
                </label>
                {/* Input Mobile Number */}
                <label className="form-control w-full max-w-lg">
                  <div className="label">
                    <span className="label-text">Mobile Number</span>
                  </div>
                  <Field
                    type="number"
                    name="mobileNum"
                    placeholder="Type Mobile Phone Number"
                    className="input input-bordered w-full max-w-md p-3 rounded-lg"
                  />
                  <ErrorMessage name="mobileNum" component="div" className="text-red-500" />
                </label>
                <Button color="success" variant="ghost" type="submit" className="w-3/6 mx-auto ">
                  Continue
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
}
