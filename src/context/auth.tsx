import { createContext } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useState } from "react";

type AuthContextType = {
  token: string | null;
  userId: string | null;
  user_name: string | null;
  user_email: string | null
  updateToken: (token: string | null, userId: number | null, user_name: string | null,user_email: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({ token: null, userId: null, user_name: null,user_email: null, updateToken: () => {} });

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState(typeof window !== "undefined" ? localStorage.getItem("token") : null);
  const [userId, setUserId] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("userId") : null);
  const [user_name, setUserName] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("user_name") : null)
  const [user_email, setUserEmail] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("user_email") : null)

  const updateToken = useCallback((token: string | null, userId: number | null, user_name: string | null,user_email: string | null) => {
    const userIdString = userId ? userId.toString() : ""

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userIdString);
      localStorage.setItem("user_name", user_name ?? "")
      localStorage.setItem("user_email", user_email ?? "")
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user_name")
      localStorage.removeItem("user_email")
    }
    setToken(token);
    setUserId(userIdString);
    setUserName(user_name);
    setUserEmail(user_email)
  }, []);

  return <AuthContext.Provider value={{ token, userId, user_name,user_email, updateToken }}>{children}</AuthContext.Provider>;
};
