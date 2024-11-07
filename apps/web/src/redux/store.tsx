import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { accountReducer } from './slice/accountSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// configure which key we want to persist
const accountPersistConfig = {
  key: 'account',
  storage: storage,
  // whitelist: ['accountState', 'id', 'firstName', 'lastName', 'email'],
  debug: true,
};

const rootReducer = combineReducers({
  account: persistReducer(accountPersistConfig, accountReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// export const store = configureStore({
//   reducer: { account: accountReducer },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
