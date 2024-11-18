import { IAccount } from '@/types/account';
import { Avatar, Skeleton } from '@nextui-org/react';
import { Wrapper } from '../Wrapper';

interface IDetail {
  data?: IAccount | null;
  visible1: boolean | undefined;
  visible2: boolean | undefined;
}

const Detail: React.FC<IDetail> = ({ data, visible1, visible2 }) => {
  // <Skeleton className="flex rounded-lg w-full max-w-24" />
  return (
    <Wrapper additional="border-0 flex-col justify-center items-center gap-6">
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 text-large "
      />
      {visible1 &&
        (data ? (
          <div className="grid grid-cols-2 w-fit h-60 border-0">
            <div className="border-0 border-green-500 grid grid-rows-4 text-end items-center content-center pr-4">
              <h1 className="border-0">Full Name</h1>
              <h1 className="border-0">Email</h1>
              <h1 className="border-0">Mobile Number</h1>
              <h1 className="border-0">User Role</h1>
            </div>
            <div className="border-0 border-green-500 grid grid-rows-4 items-center content-center pl-3">
              <h1 className="border-2 border-slate-500 p-2 rounded-xl shadow-2xl font-medium">
                {data.firstName} {data.lastName}
              </h1>
              <h1 className="border-2 border-slate-500 p-2 rounded-xl shadow-2xl font-medium">{data.email}</h1>
              <h1 className="border-2 border-slate-500 p-2 rounded-xl shadow-2xl font-medium">{data.mobileNum}</h1>
              <h1 className="border-2 border-slate-500 p-2 rounded-xl shadow-2xl font-medium">{data.role}</h1>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 w-fit h-60 border-0">
            <div className="border-0 border-green-500 grid grid-rows-4 text-end items-center content-center pr-4">
              <Skeleton className="flex rounded-lg w-full max-w-24" />
              <Skeleton className="flex rounded-lg w-full max-w-24" />
              <Skeleton className="flex rounded-lg w-full max-w-24" />
              <Skeleton className="flex rounded-lg w-full max-w-24" />
            </div>
          </div>
        ))}
      {visible2 &&
        (data ? (
          <div className="flex flex-col w-full h-fit gap-5 items-center text-center border-4 border-green-500 py-3 rounded-2xl">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-medium">Full Name</h1>
              <h1>
                {data.firstName} {data.lastName}
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-medium">Email</h1>
              <h1>{data.email}</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-medium">Mobile Number</h1>
              <h1>{data.mobileNum}</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-medium">User Role</h1>
              <h1>{data.role}</h1>
            </div>
          </div>
        ) : (
          <div>
            <Skeleton className="flex rounded-lg w-full max-w-24" />
            <Skeleton className="flex rounded-lg w-full max-w-24" />
            <Skeleton className="flex rounded-lg w-full max-w-24" />
            <Skeleton className="flex rounded-lg w-full max-w-24" />
          </div>
        ))}
    </Wrapper>
  );
};

export default Detail;
