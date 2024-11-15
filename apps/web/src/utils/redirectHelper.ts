import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useRoleBasedRedirect = () => {
  const router = useRouter();
  const { isAuthenticated, userRole } = useSelector((state: RootState) => state.auth);

  console.log(isAuthenticated);
  console.log(userRole);

  if (!isAuthenticated) {
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

export default useRoleBasedRedirect;
