interface state {
  status: "cheking" | "not-authenticated" | "authenticated";
  uuid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}

export const initialState: state = {
  status: "cheking",
  uuid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState: state = {
  status: "authenticated",
  uuid: "123456",
  email: "jorge@gmail.com",
  displayName: "Jorge",
  photoURL: "https://demo.jpg",
  errorMessage: null,
};

export const notAuthenticatedState: state = {
  status: "not-authenticated",
  uuid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser: Omit<state, "status" | "errorMessage"> = {
  uuid: "ABC",
  email: "demo@gmail.com",
  displayName: "demo@gmail.com",
  photoURL: "https://demo.jpg",
};
