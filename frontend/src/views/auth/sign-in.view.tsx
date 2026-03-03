import { LoginForm } from "../../components";

export default function SignInView() {
  const handleSubmit = (data: { email: string; password: string }) => {
    console.log("Sign in:", data);
    // TODO: Call API to sign in
  };

  return <LoginForm onSubmit={handleSubmit} />;
}
