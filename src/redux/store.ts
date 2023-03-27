import { configureStore } from "@reduxjs/toolkit"
import UserSlice from "./User/User.slice";

export const store = configureStore({
    reducer : {
       UserSlice ,
    }
});

export type RootState  = ReturnType<typeof store.getState>