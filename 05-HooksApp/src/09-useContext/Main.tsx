import { Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./AboutPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import "./context.css";
import Links from "./Links";
import UserProvider from "./context/UserProvider";

const Main = () => {
  return (
    <UserProvider>
      <h2>Main</h2>
      <Links />
      <hr />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </UserProvider>
  );
};

export default Main;
