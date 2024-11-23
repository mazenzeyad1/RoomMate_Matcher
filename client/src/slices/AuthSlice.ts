import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    email: "",
    name: "",
    id: "",
  },
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    signOut: (_state, _action) => {
      return {
        id: "",
        token: "",
        email: "",
        name: "",
      };
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
