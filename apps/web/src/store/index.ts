import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

const accountPersistConfig = {
  key: 'account',
  storage: storage,
  debug: true
};

const rootReducer = combineReducers({
  auth: persistReducer(accountPersistConfig, authReducer)
});

// const store = configureStore({
//   reducer: {
//     auth: authReducer
//   }
// });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
