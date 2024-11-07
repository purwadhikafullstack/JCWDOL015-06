// // ReduxProvider.tsx
// 'use client';

// import { Provider } from 'react-redux';
// import { store } from './store';
// import { persistStore } from 'redux-persist';
// import { ReactNode, useEffect, useState } from 'react';
// import { PersistGate } from 'redux-persist/integration/react';

// const persistor = persistStore(store);

// export default function ReduxProvider({ children }: { children: ReactNode }) {
//   const [isHydrated, setIsHydrated] = useState(false);

//   useEffect(() => {
//     const handlePersistorState = () => {
//       if (persistor.getState().bootstrapped) {
//         setIsHydrated(true);
//       }
//     };

//     handlePersistorState(); // Initial check in case it's already bootstrapped
//     persistor.subscribe(handlePersistorState); // Subscribe to future changes

//     return () => {
//       persistor.pause();
//     };
//   }, []);

//   if (!isHydrated) return null; // Prevent rendering until rehydration completes

//   return (
//     <Provider store={store}>
//       <PersistGate loading={
//         <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
//             <div className="bg-white flex flex-col w-4/12 h-5/12 p-0 rounded-xl shadow-lg relative overflow-y-auto items-center text-center text-5xl">
//               <span className="loading loading-ring loading-lg"></span>
//             </div>
//         </div>
//       } persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { persistStore } from 'redux-persist';
import { ReactNode, useEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './provider-loading';

const persistor = persistStore(store);

export default function ReduxProvider({ children }: { children: ReactNode }) {
  // const [isHydrated, setIsHydrated] = useState(false);

  // useEffect(() => {
  //   persistor.persist();
  //   persistor.subscribe(() => {
  //     if (persistor.getState().bootstrapped) {
  //       setIsHydrated(true);
  //     }
  //   });
  // }, []);

  // if (!isHydrated) return null; // Prevent rendering until rehydration completes

  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
