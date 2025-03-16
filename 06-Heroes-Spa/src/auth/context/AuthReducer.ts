import { AuthAction, AuthState, AuthTypes } from "../types/types";

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthTypes.LOGIN: {
      return { ...state, logged: true, user: action.payload };
    }
    case AuthTypes.LOGOUT: {
      return { ...state, logged: false, user: null };
    }
    default:
      return state;
  }
};
