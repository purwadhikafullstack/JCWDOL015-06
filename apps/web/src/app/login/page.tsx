'use client';

import { useState } from 'react';
import { Input, Button, Spacer, Card } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { dummyStores, Role } from '@/data/dummyData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const toastLoginSuccess = (message: string) => toast(message, { type: 'success' });
  const toastLoginFailed = (message: string) => toast(message, { type: 'error' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email == 'superadmin') {
      const user = {
        id: 1,
        firstName: 'SUPER',
        lastName: 'ADMIN',
        email: 'superadmin@example.com',
        role: Role.STORE_ADMIN
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', String(Role.SUPER_ADMIN));
      toastLoginSuccess(`Successfully logged in as ${user.firstName} ${user.lastName}`);
      router.push('/admin');
    } else if (email == 'store1admin') {
      const user = {
        id: 1,
        firstName: 'Eren',
        lastName: 'Yeager',
        email: 'store1admin@example.com',
        role: Role.STORE_ADMIN,
        storeId: dummyStores[0].id,
        store: dummyStores[0]
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', String(Role.STORE_ADMIN));
      toastLoginSuccess(`Successfully logged in as ${user.firstName} ${user.lastName}`);
      router.push('/admin');
    } else if (email == 'user1') {
      const user = {
        id: 7,
        firstName: 'Mikasa',
        lastName: 'Ackerman',
        email: 'user1@example.com',
        role: Role.USER
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', String(Role.USER));
      toastLoginSuccess(`Successfully logged in as ${user.firstName} ${user.lastName}`);
      router.push('/user');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      toastLoginFailed('Invalid email or password');
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-w-[100vw] min-h-[100vh]">
      <Card className="min-w-[400px] p-4">
        <div className="text-xl font-bold self-center py-4">LOGIN</div>
        <form onSubmit={handleLogin}>
          <Input isClearable fullWidth placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Spacer y={1.5} />
          <Input
            isClearable
            type="password"
            fullWidth
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacer y={1.5} />
          <div className="flex flex-row items-center justify-center py-4">
            <Button type="submit" color="primary">
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
