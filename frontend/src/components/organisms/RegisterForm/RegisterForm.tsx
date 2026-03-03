import { useState } from "react";
import { FormField } from "../../molecules";
import { Button } from "../../atoms";

interface RegisterFormProps {
  onSubmit?: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  isLoading?: boolean;
}

export default function RegisterForm({
  onSubmit,
  isLoading = false,
}: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ name, email, password, confirmPassword });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          variant="default"
        />

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

        <FormField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          variant="default"
        />

        <Button type="submit" variant="success" fullWidth disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <a href="/auth/sign-in" className="text-primary hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
}
