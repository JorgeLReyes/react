import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Status = "cheking" | "authenticated" | "not-authenticated";

export interface User {
  name: string;
  email: string;
  uid: string;
}

interface State {
  status: Status;
  user: User | null | undefined;
  errorMessage: string | null | undefined;
}

const initialState: State = {
  status: "cheking",
  user: undefined,
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    checking: (state) => {
      state.status = "cheking";
      state.user = null;
      state.errorMessage = null;
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload = "" }: PayloadAction<string | undefined>) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = payload;
    },
    customErrorMessage: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  checking,
  onLogin,
  onLogout,
  clearErrorMessage,
  customErrorMessage,
} = authSlice.actions;
