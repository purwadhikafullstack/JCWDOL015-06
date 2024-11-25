'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { createToken } from '@/api/cookie';
import { googleLogin } from '@/api/account';
import { useSearchParams } from 'next/navigation';

const AuthCallback = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      // Ensure the router is ready before accessing `router.query`
      const token = searchParams.get('token');

      if (token) {
        // Set the token in cookies
        createToken(token.toString());

        // Send the token to the main window
        window.opener.postMessage({ token }, window.origin);

        // Close the popup window
        window.close();
      } else {
        // Handle failure with a message and close
        Swal.fire({
          title: 'Error',
          text: 'Authentication failed. Please try again.',
          icon: 'error',
          timer: 5000
        });
        window.close();
      }
    };

    handleCallback();
  }, [searchParams]);
  // }, [router.isReady]); // Add `router.isReady` as a dependency to ensure it runs when ready

  return null;
};

export default AuthCallback;
