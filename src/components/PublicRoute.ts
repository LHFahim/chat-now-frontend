import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }: any) {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/inbox");
  }, [isLoggedIn, navigate]);

  return children;
}
