'use client';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Wrapper } from '@/components/Wrapper';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import {
  createAddress,
  deleteAddress,
  getAccountAddress,
  getCitiesByProvince,
  getProvinces,
  updateAddress
} from '@/lib/address';
import { toastFailed } from '@/utils/toastHelper';

interface IAddressCreate {
  provinceId: String;
  cityId: String;
  desc: String;
}

const schema = yup.object().shape({
  provinceId: yup.string().required('Please Choose Province'),
  cityId: yup.string().required('Please Choose City'),
  desc: yup.string().required('Please Fill In Address Detail')
});

export default function UpdateAddress() {
  const router = useRouter();

  const swalSuccess = (message: string) =>
    Swal.fire({
      titleText: message,
      icon: 'success',
      confirmButtonText: 'Cool',
      timer: 5000
    });
  const toastSeeFailed = (message: string) => toastFailed(message);

  // setting for cities input select

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const toggleForm = () => {
    setIsCreateOpen((prevState) => !prevState);
  };

  // fetching user's addresses

  const [accountAddress, setAccountAddress] = useState<any[] | null>(null);

  useEffect(() => {
    const getAddress = async () => {
      try {
        const { result } = await getAccountAddress();

        if (result.status !== 'ok') throw result.msg;

        setAccountAddress(result.account);
      } catch (error: any) {
        toastSeeFailed(error);
      }
    };

    getAddress();
  }, []);

  // fetching provinces and cities, also handle if province selected new value

  const [listProvince, setListProvince] = useState<any[] | null>(null);
  const [listCity, setListCity] = useState<any[] | null>(null);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {
    const gettingCitiesAndProvinces = async () => {
      try {
        const { result } = await getProvinces();
        if (result.status !== 'ok') throw result.msg;
        setListProvince(result.provinces);
      } catch (error: any) {
        toastSeeFailed(error);
      }
    };

    gettingCitiesAndProvinces();
  }, []);

  const handleChange = async (idP: number) => {
    try {
      setShowCities(false);

      const { result } = await getCitiesByProvince(idP);
      if (result.status !== 'ok') throw result.msg;

      setListCity(result.cities);

      setShowCities(true);
    } catch (error: any) {
      toastSeeFailed(error);
    }
  };

  // address create handling

  const handleSubmit = async (
    data: { provinceId: String; cityId: String; desc: String },
    action: FormikHelpers<{ provinceId: String; cityId: String; desc: String }>
  ) => {
    try {

      const { result } = await createAddress(data);

      if (result.status != 'ok') throw `${result.msg}`;

      swalSuccess(result.msg)

      action.resetForm();

      return router.push('/user/profile');
    } catch (error: any) {

      toastSeeFailed(error)

      action.resetForm();

      return router.push('/user/profile');
    }
  };

  // change address main

  const handleMainChange = async (id: number) => {
    try {
      const { result } = await updateAddress(id);

      if (result.status !== 'ok') throw result.msg;

      swalSuccess(result.msg)

      return router.push('/user/profile');
    } catch (error: any) {
      toastSeeFailed(error)

      return router.push('/user/profile');
    }
  };

  //

  const handleDelete = async (id: number) => {
    try {
      const { result } = await deleteAddress(id);

      if (result.status !== 'ok') throw result.msg;

      swalSuccess(result.msg)

      router.push('/');
    } catch (error: any) {
      toastSeeFailed(error)

      router.push(`/`);
    }
  };

  return (
    <Wrapper additional="border-0 flex-col justify-center items-center gap-8">
      {accountAddress ? (
        accountAddress.map((a) => (
          <div
            key={a.city_name}
            className="flex flex-col w-full h-fit p-4 gap-4 border-x-4 border-green-500 text-center"
          >
            <div className="justify-self-end">
              <Button color="danger" variant="light" className="w-fit h-fit" onPress={() => handleDelete(a.id)}>
                X
              </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0">
              <div className="basis-1/2 flex gap-3 items-center border-0 border-yellow-300">
                <h1 className="p-[7px] rounded-xl bg-green-300 drop-shadow-xl font-medium md:text-medium">
                  {a.city_name}
                </h1>
                <h2 className="p-0 w-fit h-fit rounded-full bg-green-300 drop-shadow-xl font-bold text-xl"> ~ </h2>
                <h1 className="p-[7px] rounded-xl bg-green-300 drop-shadow-xl font-medium md:text-medium">
                  {a.province}
                </h1>
              </div>
              {a.isMain ? (
                <div className="basis-1/2 items-center">
                  <h1 className="border-0 w-fit h-full pr-2 text-2xl font-semibold justify-self-center md:justify-self-end">
                    Main
                  </h1>
                </div>
              ) : (
                <div className="basis-1/2 flex items-center justify-end">
                  <h1 className="border-0 w-fit h-full pr-2 text-2xl font-semibold justify-self-center md:justify-self-end">
                    Other
                  </h1>
                  <Button
                    color="primary"
                    variant="ghost"
                    onPress={() => handleMainChange(a.id)}
                    className="text-tiny p-1 h-fit"
                  >
                    Change to Main
                  </Button>
                </div>
              )}
            </div>
            <div className="flex p-4 rounded-2xl border-t-4 border-b-4 border-green-400">
              <p>{a.desc}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col w-full h-fit p-5 border-4 border-red-400">
          <div className="flex">
            <h1>City</h1>
            <h1>Province</h1>
          </div>
          <div className="flex">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima reprehenderit esse itaque repudiandae
            veritatis.
          </div>
        </div>
      )}
      {isCreateOpen ? (
        <Formik
          initialValues={{
            provinceId: '0',
            cityId: '0',
            desc: ''
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => {
            return (
              <Form className="w-2/6 p-3 mx-auto flex flex-col flex-wrap gap-7 border-0">
                {/* Provinces */}
                <label className="form-control w-full max-w-md">
                  <div className="label">
                    <span className="label-text">Choose Province</span>
                  </div>
                  <select
                    className="select w-full max-w-xs border-2"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue('provinceId', Number(e.target.value));
                      handleChange(Number(e.target.value));
                    }}
                    value={values.provinceId}
                  >
                    <option value="">Select Here</option>
                    {listProvince!.map((l: any) => (
                      <option key={l.province} value={l.province_id}>
                        {l.province}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage name="provinceId" component="div" className="text-red-500" />
                </label>
                {/* Cities */}
                {showCities && (
                  <label className="form-control w-full max-w-md">
                    <div className="label">
                      <span className="label-text">Choose City</span>
                    </div>
                    <select
                      className="select w-full max-w-xs border-2"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue('cityId', Number(e.target.value));
                      }}
                      value={values.cityId}
                    >
                      <option value="">Select Category</option>
                      {listCity!.map((l: any) => (
                        <option key={l.city_name} value={l.city_id}>
                          {l.city_name}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage name="cityId" component="div" className="text-red-500" />
                  </label>
                )}
                {/* Address Detail */}
                <label className="form-control w-full max-w-md">
                  <div className="label">
                    <span className="label-text">Address Detail</span>
                  </div>
                  <Field
                    type="text"
                    name="desc"
                    placeholder="Type address here"
                    className="border-2 rounded-lg w-full max-w-md h-fit p-3"
                  />
                  <ErrorMessage name="desc" component="div" className="text-red-500" />
                </label>
                <Button color="success" variant="ghost" type="submit" className="w-3/6 mx-auto my-5">
                  Continue
                </Button>
                <Button color="danger" variant="light" size="lg" onPress={toggleForm} className="w-3/6 mx-auto my-5">
                  Cancel
                </Button>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div className="">
          <Button color="primary" variant="light" size="lg" onPress={toggleForm}>
            + Add Address
          </Button>
        </div>
      )}
    </Wrapper>
  );
}
