import { LoginForm } from "../../components";
import { loginThunk } from "../../store/features/auth.features";
import { useAppDispatch } from "../../store/hook";

export default function SignInView() {
  const dispatch = useAppDispatch();
  const handleSubmit = (data: { email: string; password: string }) => {
    dispatch(loginThunk(data));
  };

  return <LoginForm onSubmit={handleSubmit} />;
}
