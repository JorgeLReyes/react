type Status = "cheking" | "authenticated" | "not-authenticated";

interface User {
  name: string;
  email: string;
  uid: string;
}

interface State {
  status: Status;
  user: User | null | undefined;
  errorMessage: string | null | undefined;
}

export const initialState: State = {
  status: "cheking",
  user: undefined,
  errorMessage: undefined,
};

export const chekingState: State = {
  status: "cheking",
  user: null,
  errorMessage: null,
};

export const authenticatedState: State = {
  status: "authenticated",
  user: {
    uid: "123456",
    email: "test@email.com",
    name: "test",
  },
  errorMessage: undefined,
};

export const notAuthenticatedState: State = {
  status: "not-authenticated",
  user: null,
  errorMessage: "",
};
