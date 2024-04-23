import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import jobsReducer from './features/jobs/jobsSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Optionally configure thunk or other middleware options here
      serializableCheck: false,
      immutableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
