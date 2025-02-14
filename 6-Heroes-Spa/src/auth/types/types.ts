export interface AuthState {
  logged: boolean;
  user?: string | null;
}
export interface AuthContextConsumer {
  state: AuthState;
  login: (name: string) => void;
  logout: () => void;
}

export const enum AuthTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface AuthAction {
  type: AuthTypes;
  payload?: string;
}
