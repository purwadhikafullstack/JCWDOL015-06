import { useRouter } from 'next/navigation';
import { useAppSelector } from '../store';
import { getToken } from '@/api/cookie';

const useRoleBasedRedirect = () => {
  console.log('REDIRECT MIAN');
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userRole = useAppSelector((state) => state.auth.userRole);

  const redirection = async () => {
    const token = await getToken();
    if (!isAuthenticated && !token) {
      router.push('/login');
      return;
    }
    switch (userRole) {
      case 'SUPER_ADMIN':
      case 'STORE_ADMIN':
        router.push('/admin');
        break;
      case 'USER':
        router.push('/user');
        break;
      default:
        router.push('/login');
    }
  };

  redirection();
};

export default useRoleBasedRedirect;
