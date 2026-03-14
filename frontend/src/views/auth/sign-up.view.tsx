import { RegisterForm } from "../../components";
import type { RegisterInputDataType } from "../../lib";
import { registerThunk } from "../../store/features/auth.features";
import { useAppDispatch } from "../../store/hook";

export default function SignUpView() {
  const dispatch = useAppDispatch();
  const handleSubmit = (data: RegisterInputDataType) => {
    dispatch(registerThunk(data));
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}
