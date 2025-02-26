import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/router/Router";
import { JournalRoutes } from "../journal/router/Router";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hook/";

export const AppRouter = () => {
  const { status } = useCheckAuth();
  if (status === "cheking") return <CheckingAuth />;
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
