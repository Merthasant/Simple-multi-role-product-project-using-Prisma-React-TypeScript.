import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hook";

export default function GuestRoute() {
  const { isSuccess, data } = useAppSelector((state) => state.auth);

  if (isSuccess || data) return <Navigate to="/dashboard" />;

  return <Outlet />;
}
