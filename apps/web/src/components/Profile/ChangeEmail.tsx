'use client';

import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { IForgot, IUpdateEmail } from '@/types/account';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updateAccountEmail } from '@/lib/account';
import Swal from 'sweetalert2';
import { Wrapper } from '../Wrapper';
import { Button } from '@nextui-org/react';
import { setLoginState, setLogoutState } from '@/redux/slice/accountSlice';
import { deleteToken } from '@/lib/cookie';
import { useRouter } from 'next/navigation';

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

  const emailState = useAppSelector((state) => state.account.email);
  const idState = useAppSelector((state) => state.account.id);

  const handleSubmit = async (data: IUpdateEmail, action: FormikHelpers<IUpdateEmail>) => {
    try {
      // Sending Form Data To Action
      const { result } = await updateAccountEmail(data);

      // Checking Result From Action
      if (result.status != 'ok') throw result.msg;

      Swal.fire({
        titleText: `${result.msg}`,
        icon: 'success',
        confirmButtonText: 'Cool',
        timer: 7000
      });

      await deleteToken();

      dispatch(setLogoutState());

      action.resetForm();

      router.push('/');
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 4000
      });
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
