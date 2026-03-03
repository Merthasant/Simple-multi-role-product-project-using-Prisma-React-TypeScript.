import { RegisterForm } from "../../components";

export default function SignUpView() {
  const handleSubmit = (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Register:", data);
    // TODO: Call API to register
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}
