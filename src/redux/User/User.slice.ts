import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interface";

interface initialState {
  user: IUser | null;
}

const initialState: initialState = {
  user: null ,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser : ( state , action ) => {
        state.user = action.payload ;
    }
  },
});

export default UserSlice.reducer ;
