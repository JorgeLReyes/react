import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AuthLayout from "./auth/layout/AuthLayout";
import { LoginPage } from "./auth/pages/LoginPage";
import { RegisterPage } from "./auth/pages/RegisterPage";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "./assets/fake-data";

const ChatLayout = lazy(() => import("./chat/layout/ChatLayout"));
const ChatPage = lazy(() => import("./chat/pages/ChatPage"));
const NoChatSelectedPage = lazy(() => import("./chat/pages/NoChatSelected"));

type Props = {
  isAuth: boolean;
  conditionAuth: boolean;
  path: string;
  children: ReactNode;
};

const CheckRoute = ({
  isAuth,
  conditionAuth,
  children,
  path,
}: Props): ReactNode => {
  return isAuth === conditionAuth ? <>{children}</> : <Navigate to={path} />;
};

export const AppRouter = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      return checkAuth(token);
    },
    retry: 0,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3 text-lg">Cargando...</span>
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckRoute isAuth={!!user} conditionAuth={false} path="/chat">
              <AuthLayout />
            </CheckRoute>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route index element={<Navigate to="/auth/login" />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Route>
        <Route
          path="/chat"
          element={
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  <span className="ml-3 text-lg">Cargando...</span>
                </div>
              }
            >
              <CheckRoute
                isAuth={!!user}
                conditionAuth={true}
                path="/auth/login"
              >
                <ChatLayout />
              </CheckRoute>
            </Suspense>
          }
        >
          <Route index element={<NoChatSelectedPage />} />
          <Route path=":chatId" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
