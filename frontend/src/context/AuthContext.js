// Shares the logged-in user with the whole app:  const { user } = useAuth();
import { createContext, useContext } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // TODO (Member A): keep the user + token in state (and localStorage so a page refresh keeps the login).
  //   Provide: user, login(data), register(data), logout()
  const value = { user: null };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
