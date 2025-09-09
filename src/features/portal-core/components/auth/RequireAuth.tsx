import { Navigate, useLocation } from "react-router";
import { useSupabaseSession } from "./SupabaseAuthProvider";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useSupabaseSession();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen grid place-items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600" />
    </div>
  );
  
  if (!user) return <Navigate to="/portal/auth/signin" replace state={{ from: location }} />;
  
  return <>{children}</>;
}
