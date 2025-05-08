import type { FC, PropsWithChildren } from "react";
import "../assets/css/auth.css";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">{children}</div>
      </div>
    </div>
  );
};
