import { useState } from "react";
import { UserContext, User } from "./UserContext";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
