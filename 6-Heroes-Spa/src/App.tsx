import { Outlet } from "react-router-dom";
// import { AuthProvider } from "./auth/context/AuthContext";
// import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <>
      {/* <AppRouter /> */}
      <Outlet />
    </>
  );
};

export default App;
