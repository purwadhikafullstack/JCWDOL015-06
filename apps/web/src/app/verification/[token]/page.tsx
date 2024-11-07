// 'use client';

// import { useSearchParams } from 'next/navigation';
// import React, { useEffect } from 'react';
// import Swal from 'sweetalert2';

// const VerifyAccount: React.FC = () => {
//   //   const navigate = useNavigate();
//   //   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const navigateAfterVerify = async () => {
//       console.log('\n\n NAVIGATE VERIFICATION');

//       const token = searchParams.get('token');

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_API_URL}account-verify`,
//         {
//           method: 'PATCH',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await res.json();

//       if (result.status == 'ok') {
//         Swal.fire({
//           titleText: 'Account Successfully Verifed',
//           text: `Please Proceed To Login With Your Acccount To Access All Of Our Features`,
//           icon: 'success',
//           confirmButtonText: 'Cool',
//           timer: 7000,
//         }).then(() => {
//           window.close();
//           // router.push('/')
//           // navigate('/');
//         });
//       } else {
//         Swal.fire({
//           titleText: 'Verification Process Failed',
//           text: `${result.msg}`,
//           icon: 'success',
//           confirmButtonText: 'Okay',
//           timer: 7000,
//         }).then(() => {
//           window.close();
//           // router.push('/')
//           // navigate('/');
//         });
//       }
//     };

//     navigateAfterVerify();
//   }, []);

//   return (
//     <div className="text-white fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-white">
//       verification
//     </div>
//   );
// };

// export default VerifyAccount;

// pages/verify.tsx

'use client';

import { verifyAccount } from '@/lib/account';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { redirect } from "react-router-dom";

export default function VerifyAccount() {
  // const [isVerified, setIsVerified] = useState(false);

  const params = useParams<{ token: string }>();
  const router = useRouter();

  async function navigateAfterVerify() {
    try {
      // const token = searchParams.get('token');

      // Ensure token is available before proceeding
      if (!params) return;

      console.log('\n\n\n Navigating for Verification');

      const { result } = await verifyAccount(params.token);

      if (result.status != 'ok') throw result.msg;

      Swal.fire({
        titleText: 'Account Successfully Verified',
        text: `Please proceed to login to access all features`,
        icon: 'success',
        confirmButtonText: 'Cool',
        timer: 7000,
      })
      // .then(() => {
      //   window.close();
      // });

      return router.push('/')

    } catch (error: any) {
      Swal.fire({
        titleText: 'Verification Failed',
        text: `${error.message}`,
        icon: 'error',
        confirmButtonText: 'Okay',
        timer: 7000,
      })
      // .then(() => {
      //   window.close();
      // });

      return router.push('/')
      
    }
  }

  useEffect(() => {
    navigateAfterVerify();
  }, []); // Re-run if searchParams changes

  return (
    <div className=" fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-white">
      s
    </div>
  );
}
