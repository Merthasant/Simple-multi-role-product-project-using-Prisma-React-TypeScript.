import { useEffect, type ReactNode } from "react";
import { useAppDispatch } from "../store/hook";
import { meThunk } from "../store/features/auth.features";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(meThunk());
  }, [dispatch]);

  return <>{children}</>;
}
