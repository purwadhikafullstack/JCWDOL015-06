'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import { IChangePassword } from '@/types/account';
import { changePassword } from '@/api/account';
import { Wrapper } from '@/components/Wrapper';
import { Button } from '@nextui-org/react';

const schema = yup.object().shape({
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
    .required('Re-Confirm Password Is Required!')
});

export default function ChangePassword() {
  const params = useParams<{ token: string }>();
  const router = useRouter();

  const handleSubmit = async (data: IChangePassword, action: FormikHelpers<IChangePassword>) => {
    try {
      console.log('\n\n\n CHANGING PASSWORD \n');

      console.log(params);

      const { result } = await changePassword(data.password, params.token, null);

      if (result.status != 'ok') throw result.msg;

      Swal.fire({
        titleText: `${result.msg}`,
        text: 'Please Login With The New Password',
        icon: 'success',
        confirmButtonText: 'Cool',
        timer: 7000
      });

      action.resetForm();

      return router.push('/login');
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 4000
      });

      action.resetForm();

      return router.push('/login');
    }
  };

  return (
    <Wrapper additional="">
      <Formik
        initialValues={{
          password: '',
          confirmPassword: ''
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Wrapper additional="p-5">
              <Form className="w-2/6 p-3 mx-auto flex flex-col flex-wrap gap-7 border-4">
                {/* Input Password */}
                <label className="form-control w-full max-w-md">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Type password here"
                    className="border-2 rounded-lg w-full max-w-md p-3"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </label>
                {/* Confirm Password */}
                <label className="form-control w-full max-w-md">
                  <div className="label">
                    <span className="label-text">Confirm Password</span>
                  </div>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Type password here again"
                    className="border-2 rounded-lg w-full max-w-md p-3"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                </label>
                <Button color="success" variant="ghost" type="submit" className="w-3/6 mx-auto my-5">
                  Continue
                </Button>
              </Form>
            </Wrapper>
          );
        }}
      </Formik>
    </Wrapper>
  );
}
