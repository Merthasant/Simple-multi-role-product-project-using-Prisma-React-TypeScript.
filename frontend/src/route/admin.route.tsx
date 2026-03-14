import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hook";

export default function AdminRoute() {
  const role = useAppSelector((state) => state.auth.data?.role);

  if (role !== "admin") return <Navigate to={"/dashboard"} />;
  return <Outlet />;
}
