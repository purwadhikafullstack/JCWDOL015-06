'use client';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import { IUpdateBasic } from '@/types/account';
import { updateAccountBasic } from '@/lib/account';
import { Wrapper } from '@/components/Wrapper';
import { Button } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setLoginState } from '@/redux/slice/accountSlice';

// const schema = yup.object().shape({
//   firstName: yup.string().required('First Name Is Required'),
//   lastName: yup.string().required('Last Name Is Required'),
//   mobileNum: yup.number().required('Mobile Number Is Required')
// });

const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    mobileNum: yup.number()
  });

export default function UpdateBasic() {
  const router = useRouter();
  const dispatch = useAppDispatch();

//   const emailState = useAppSelector((state) => state.account.email);
  const idState = useAppSelector((state) => state.account.id);
//   const isVerifiedState = useAppSelector((state) => state.account.isVerify);

  const handleSubmit = async (data: IUpdateBasic, action: FormikHelpers<IUpdateBasic>) => {
    try {
      const { result } = await updateAccountBasic(idState, data);

      if (result.status != 'ok') throw result.msg;

      const setState = {
        accountState: true,
        id: result.user.id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        isVerify: result.user.isVerify
      };

      Swal.fire({
        titleText: `${result.msg}`,
        icon: 'success',
        confirmButtonText: 'Cool',
        timer: 7000
      });

      dispatch(setLoginState(setState));

      action.resetForm();

      return router.push('/customer/profile');
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 4000
      });

      action.resetForm();

      return router.push('/customer/profile');
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
            <Form className="w-2/6 p-3 mx-auto flex flex-col flex-wrap gap-7 border-0">
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
