'use client';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { IUpdateBasic } from '@/types/account';
import { updateAccountBasic } from '@/api/account';
import { Wrapper } from '@/components/Wrapper';
import { Button } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/store';
import { login } from '@/store/slices/authSlice';
import { toastFailed } from '@/utils/toastHelper';

const schema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  mobileNum: yup.number()
});

export default function UpdateBasic() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const swalSuccess = (message: string) =>
    Swal.fire({
      titleText: message,
      icon: 'success',
      confirmButtonText: 'Cool',
      timer: 5000
    });
  const toastSeeFailed = (message: string) => toastFailed(message);

  const idState = useAppSelector((state) => state.auth.id);

  const handleSubmit = async (data: IUpdateBasic, action: FormikHelpers<IUpdateBasic>) => {
    try {
      const { result } = await updateAccountBasic(idState, data);

      if (result.status != 'ok') throw result.msg;

      const setState: any = {
        userRole: 'USER',
        id: result.user.id,
        email: result.user.email
      };

      swalSuccess(result.msg);

      dispatch(login(setState));

      action.resetForm();

      // return router.push('/user/profile');
      return router.refresh();
    } catch (error: any) {
      toastSeeFailed(error);

      action.resetForm();

      return router.push('/user/profile');
    }
  };

  return (
    <Wrapper additional="border-0 flex-col justify-center items-center gap-6">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          mobileNum: 0
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form className="md:w-2/6 p-3 mx-auto flex flex-col flex-wrap gap-7 border-0">
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
