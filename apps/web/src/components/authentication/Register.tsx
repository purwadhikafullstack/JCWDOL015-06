'use client';

import { registerAccount } from '@/lib/account';
import { IRegister, IRegLogin } from '@/types/account';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const RegiserSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format or contains forbidden characters',
    )
    .required('Email Is Required!'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number. Special characters like quotation marks are not allowed.',
    )
    .required('Password Is Required!'),
  firstName: yup.string().required('First Name Is Required'),
  lastName: yup.string().required('Last Name Is Required'),
  mobileNum: yup.number().required('Mobile Number Is Required'),
});

const Register: React.FC = () => {
  // Setting for modal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (
    data: IRegister,
    action: FormikHelpers<IRegister>,
  ) => {
    console.log('\n\n REGISTER HANDLE SUBMIT \n\n');
    
    try {
      const { result } = await registerAccount(data);

      if (result.status != 'ok') {
        throw result.msg;
      } else {
        Swal.fire({
          titleText: `${result.account.firstName}, Your Account Created Successfully`,
          text: 'Please Proceed To Verify Your Account By Checking Your Email Inbox For Our Verification Message',
          icon: 'success',
          confirmButtonText: 'Cool',
          timer: 7000,
        });

        action.resetForm();

        closeModal();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error While Register',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 4000,
      });

    }
  };

  return (
    <>
      <button className="btn btn-ghost btn-circle" onClick={openModal}>
        register
      </button>
      {/* isOpen &&  */}
      {isOpen && (
        <>
          <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white flex flex-col w-11/12 h-[90%] lg:w-5/12 p-0 shadow-lg relative overflow-y-auto rounded-xl">
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

              {/* Bottom/Main Side */}
              <div className="basis-8/12 flex flex-col flex-wrap gap-3 h-full p-3 rounded-t-2xl bg-slate-100 relative bottom-4">
                <h1 className="text-xl ml-2">Register Account</h1>

                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    mobileNum: 0,
                  }}
                  validationSchema={RegiserSchema}
                  onSubmit={handleSubmit}
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
                        {/* Input First Name */}
                        <label className="form-control w-full max-w-lg">
                          <div className="label">
                            <span className="label-text">First Name</span>
                          </div>
                          <Field
                            type="text"
                            name="firstName"
                            placeholder="Type First - Middle Name"
                            className="input input-bordered w-full max-w-md"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-red-500"
                          />
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
                            className="input input-bordered w-full max-w-md"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-red-500"
                          />
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
                            className="input input-bordered w-full max-w-md"
                          />
                          <ErrorMessage
                            name="mobileNum"
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
