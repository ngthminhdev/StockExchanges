import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interface";

interface initialState {
  user: IUser;
}

const initialState: initialState = {
  user: { 
    account_name: "", 
    username : "" ,
    email: "", 
    password: "" , 
    phone : "" ,
  },
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
