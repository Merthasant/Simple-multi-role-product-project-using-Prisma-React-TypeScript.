import { useState } from "react";
import { FormField } from "../../molecules";
import { Button } from "../../atoms";

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
}

export default function LoginForm({
  onSubmit,
  isLoading = false,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="default"
        />

        <FormField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="default"
        />

        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
      </form>

      <p className="text-center mt-4 text-sm">
        Don't have an account?{" "}
        <a href="/auth/register" className="text-primary hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
