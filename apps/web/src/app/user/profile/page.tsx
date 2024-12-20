'use client';

import { Wrapper } from '@/components/Wrapper';
import { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { Listbox, ListboxItem, Button, Avatar } from '@nextui-org/react';
import { IoSettingsOutline } from 'react-icons/io5';
import { getAccountDetail } from '@/api/account';
import { useRouter } from 'next/navigation';
import { IAccount } from '@/types/account';
import { getToken } from '@/api/cookie';
import Detail from '@/components/Profile/Detail';
import ChangeEmail from '@/components/Profile/ChangeEmail';
import UpdatePassword from '@/components/Profile/UpdatePassword';
import UpdateBasic from '@/components/Profile/UpdateBasic';
import UpdateAddress from '@/components/Profile/UpdateAddress';
import { toastFailed } from '@/utils/toastHelper';

const Profile: React.FC = () => {
  const toastSeeFailed = (message: string) => toastFailed(message);

  //

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  //

  const [selectedKeys, setSelectedKeys] = useState<string>('A');

  const [breakpoint, setBreakpoint] = useState<number>();
  const [visible1, setVisible1] = useState<boolean>();
  const [visible2, setVisible2] = useState<boolean>();

  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setBreakpoint(400);
        setVisible1(true);
        setVisible2(false);
      } else {
        setBreakpoint(200);
        setVisible1(false);
        setVisible2(true);
      }
    };

    updateBreakpoint(); // Check on initial render

    window.addEventListener('resize', updateBreakpoint); // Listen for window resize
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  //

  const [account, setAccount] = useState<IAccount | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchingAccount = async () => {
      try {
        const token = await getToken();

        if (!token) throw 'Please Login Before Accessing Profile!';

        const { result } = await getAccountDetail(token);

        if (result.status !== 'ok') throw result.msg;

        setAccount(result.user);
      } catch (error: any) {
        toastSeeFailed(error);

        router.push('/');
      }
    };

    fetchingAccount();
  }, [router]);

  //

  const renderVisible = () => {
    switch (selectedKeys) {
      case 'A':
        return <Detail data={account} visible1={visible1} visible2={visible2} />;
      case 'B':
        return <UpdateBasic />;
      case 'C':
        return <div className="border-4 flex flex-col justify-center items-center gap-6">Ipsum</div>;
      case 'D':
        return <ChangeEmail />;
      case 'E':
        return <UpdatePassword />;
      case 'F':
        return <UpdateAddress />;
      default:
        return <h1>Not Detected</h1>;
    }
  };

  //

  const renderTitle = () => {
    switch (selectedKeys) {
      case 'A':
        return <h1 className="border-0 w-full text-center text-xl md:text-4xl font-bold">Profile Detail</h1>;
      case 'B':
        return <h1 className="border-0 w-full text-center text-xl md:text-4xl font-bold">Update Profile</h1>;
      case 'C':
        return <h1 className="border-0 w-full text-center text-xl md:text-4xl font-bold">Update Avatar</h1>;
      case 'D':
        return <h1 className="border-0 w-full text-center text-xl md:text-4xl font-bold">Update Email</h1>;
      case 'E':
        return <h1 className="border-0 w-full text-center text-xl md:text-4xl font-bold">Update Password</h1>;
      case 'F':
        return <h1 className="border-0 w-full text-center text-xl md:text-4xl font-bold">Address</h1>;
      default:
        return <h1>Not Detected</h1>;
    }
  };

  return (
    <Wrapper additional="min-h-screen">
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        size={`${breakpoint}px`}
        className="w-full p-5 border-4 border-yellow-300"
      >
        {/* <Listbox
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys(key)}
        >
          <ListboxItem key="A">Detail</ListboxItem>
          <ListboxItem key="B">Change Basic Detail</ListboxItem>
          <ListboxItem key="C">Change Avatar</ListboxItem>
          <ListboxItem key="D">Change Email</ListboxItem>
          <ListboxItem key="E">Address</ListboxItem>
        </Listbox> */}
        <Listbox aria-label="Actions" onAction={(key) => setSelectedKeys(`${key}`)}>
          <ListboxItem key="A">Detail</ListboxItem>
          <ListboxItem key="B">Change Basic Detail</ListboxItem>
          {/* <ListboxItem key="C">Change Avatar</ListboxItem> */}
          <ListboxItem key="D">Change Email</ListboxItem>
          <ListboxItem key="E">Change Password</ListboxItem>
          <ListboxItem key="F">Address</ListboxItem>
          {/* <ListboxItem key="delete" className="text-danger" color="danger">
            Delete file
          </ListboxItem> */}
        </Listbox>
      </Drawer>
      <div className="container lg:w-4/6 h-fit mx-auto flex flex-col border-4 shadow-2xl rounded-lg my-8 p-7 gap-4">
        <div className="flex border-b-4 border-green-600 rounded-xl pb-5 px-3">
          <Button
            isIconOnly
            color="default"
            variant="faded"
            aria-label="Take a photo"
            onPress={toggleDrawer}
            className="w-fit "
          >
            <IoSettingsOutline size={25} />
          </Button>
          {renderTitle()}
        </div>
        {renderVisible()}
      </div>
    </Wrapper>
  );
};

export default Profile;
