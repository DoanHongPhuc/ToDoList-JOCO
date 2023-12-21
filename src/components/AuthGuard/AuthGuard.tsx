import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: number
  mail: string
  user_name: string
  iat: number
  exp: number
}

type Props = {
  children: React.ReactNode;
};

const isTokenValid = (token: string | null, userId: string | null): boolean => {
  if (!token || !userId) {
    return false;
  }
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    // Check if the current time is past the expiration time
    const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
    if (decodedToken.exp > currentTime && decodedToken.sub.toString() === userId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // Error decoding token or invalid token structure, consider it as expired
    console.error('Error decoding token:', error);
    return false;
  }
};

export const AuthGuard = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, userId } = useAuth();
  const [initialized, setInitialized] = useState(false);


  const redirect = useCallback(async () => {
    const isInGuestPage = ["/login", "/register"].includes(location.pathname);
    const isValid = isTokenValid(token, userId)
    //console.log(isValid);

    if (isInGuestPage && isValid) navigate('/');
    if (!isInGuestPage && !isValid) navigate("/login");

    setInitialized(true);
  }, [token, location]);

  useEffect(() => void redirect(), [redirect]);

  return initialized ? <>{children}</> : null;
};
