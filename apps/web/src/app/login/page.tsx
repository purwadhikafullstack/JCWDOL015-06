'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Input, Button, Spacer, Card, user } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Role, User } from '@/types/types';
import { toastFailed, toastSuccess } from '@/utils/toastHelper';
import { fetchAllUsers } from '@/api/storeAdmin.api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userOptions = useRef<User[]>([]);

  const loadCategories = useCallback(async () => {
    try {
      const response = await fetchAllUsers();
      userOptions.current = response.storeAdmins;
    } catch (err) {
      toastFailed('Failed to fetch users');
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const router = useRouter();

  const toastLoginSuccess = (message: string) => toastSuccess(message);
  const toastLoginFailed = (message: string) => toastFailed(message);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = userOptions.current?.find((user) => user.username == username);

    if (user) {
      const userRole = user.role;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', userRole as unknown as string);
      toastLoginSuccess(`Successfully logged in as ${user.firstName} ${user.lastName}`);
      router.push(user.role == Role.USER ? '/user' : '/admin');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      toastLoginFailed('Invalid username');
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-w-[100vw] min-h-[100vh]">
      <Card className="min-w-[400px] p-4">
        <div className="text-xl font-bold self-center py-4">LOGIN</div>
        <form onSubmit={handleLogin}>
          <Input
            isClearable
            fullWidth
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
