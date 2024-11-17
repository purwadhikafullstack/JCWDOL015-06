'use client';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import { IChangePassword } from '@/types/account';
import { changePassword } from '@/lib/account';
import { Wrapper } from '@/components/Wrapper';
import { Button } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { deleteToken } from '@/lib/cookie';
import { setLogoutState } from '@/redux/slice/accountSlice';

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

export default function UpdatePassword() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const emailState = useAppSelector((state) => state.account.email);

  const handleSubmit = async (data: IChangePassword, action: FormikHelpers<IChangePassword>) => {
    try {
      const { result } = await changePassword(data.password, 'update-password', emailState);

      if (result.status != 'ok') throw result.msg;

      Swal.fire({
        titleText: `${result.msg}`,
        text: 'Please Login With The New Password',
        icon: 'success',
        confirmButtonText: 'Cool',
        timer: 7000
      });

      await deleteToken();

      dispatch(setLogoutState());

      action.resetForm();

      return router.push('/');
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 4000
      });

      action.resetForm();

      return router.push('/');
    }
  };

  return (
    <Wrapper additional="border-0 flex-col justify-center items-center gap-6">
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
            <Form className="w-2/6 p-3 mx-auto flex flex-col flex-wrap gap-7 border-0">
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
          );
        }}
      </Formik>
    </Wrapper>
  );
}
