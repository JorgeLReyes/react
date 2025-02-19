import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/router/Router";
import { JournalRoutes } from "../journal/router/Router";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};
