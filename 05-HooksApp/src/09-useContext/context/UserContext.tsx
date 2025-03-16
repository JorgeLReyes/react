import { createContext, SetStateAction } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Context {
  user: User;
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
}

export const UserContext = createContext<Partial<Context>>({});
