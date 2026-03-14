import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hook";

export default function ProtectedRoute() {
  const { isError, isLoading, isSuccess } = useAppSelector(
    (state) => state.auth,
  );

  if (isLoading)
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <h1 className="text-foreground text-2xl font-bold">loading...</h1>
      </section>
    );
  if (isError || !isSuccess) return <Navigate to={"/sign-in"} />;

  return <Outlet />;
}
