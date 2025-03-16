import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const HomePage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <h2>Home</h2>
      <p>Welcome, {user?.name}!</p>
    </>
  );
};

export default HomePage;
