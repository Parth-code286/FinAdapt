// context/UserContext.js
import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Update user (e.g. after login or fetch user info)
  const updateUser = (userData) => {
    setUser(userData);
  };

  // ✅ Clear user (e.g. on logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;