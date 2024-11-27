import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import reduxLogger from "redux-logger"
import homePageReducer from './screens/homePage/slice';

export const store = configureStore({
  //@ts-ignore
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: homePageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
