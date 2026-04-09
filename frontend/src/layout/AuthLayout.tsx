import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  // 1. loading state ne pan context mathi lavo
  const { user, loading } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

 
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        <span className="ml-3">Verifying session...</span>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
};

export default AuthLayout;