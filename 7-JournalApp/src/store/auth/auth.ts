import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
  status: "cheking" | "not-authenticated" | "authenticated";
  uuid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}

const initialState: state = {
  status: "cheking",
  uuid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      { payload }: PayloadAction<Omit<state, "status" | "errorMessage">>
    ) => {
      state.status = "authenticated";
      state.uuid = payload.uuid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },

    logout: (state, { payload }: PayloadAction<{ message: string }>) => {
      state.status = "not-authenticated";
      state.uuid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload.message;
    },

    checkingCredentials: (state) => {
      state.status = "cheking";
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
