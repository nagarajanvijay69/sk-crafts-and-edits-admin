import { configureStore } from '@reduxjs/toolkit';
import reducer from './Slice';

const store = configureStore({
     reducer: {
          products : reducer
     }
})


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;