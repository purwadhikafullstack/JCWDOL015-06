'use client';

import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { IForgot, IUpdateEmail } from '@/types/account';
import { updateAccountEmail } from '@/lib/account';
import Swal from 'sweetalert2';
import { Wrapper } from '../Wrapper';
import { Button } from '@nextui-org/react';
import { deleteToken } from '@/lib/cookie';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { toastFailed } from '@/utils/toastHelper';

const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format or contains forbidden characters'
    )
    .required('Email Is Required!')
});

const ChangeEmail: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const emailState = useAppSelector((state) => state.auth.email);
  const idState = useAppSelector((state) => state.auth.id);

  const swalSuccess = (message: string) =>
    Swal.fire({
      titleText: message,
      icon: 'success',
      confirmButtonText: 'Cool',
      timer: 5000
    });
  const toastSeeFailed = (message: string) => toastFailed(message);

  const handleSubmit = async (data: IUpdateEmail, action: FormikHelpers<IUpdateEmail>) => {
    try {
      // Sending Form Data To Action
      const { result } = await updateAccountEmail(data);

      // Checking Result From Action
      if (result.status != 'ok') throw result.msg;

      swalSuccess(result.msg);

      await deleteToken();

      dispatch(logout());

      action.resetForm();

      router.push('/');
    } catch (error: any) {
      toastSeeFailed(error);
    }
  };
  return (
    <Wrapper>
      <Formik initialValues={{ email: '', id: idState }} validationSchema={EmailSchema} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form className="w-3/6 p-3 mx-auto flex flex-col flex-wrap gap-7 border-0">
              {/* Input Email */}
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <Field
                  type="text"
                  name="email"
                  placeholder={`Type new email address - ${emailState}`}
                  className="border-2 rounded-lg w-full max-w-md p-3"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </label>
              <Button color="success" variant="ghost" type="submit" className="w-3/6 mx-auto ">
                Continue
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default ChangeEmail;
