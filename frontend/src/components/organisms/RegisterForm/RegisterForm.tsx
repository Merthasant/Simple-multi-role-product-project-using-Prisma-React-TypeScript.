import { useState } from "react";
import { FormField } from "../../molecules";
import { Button } from "../../atoms";
import { Link } from "react-router-dom";
import type { RegisterInputDataType } from "../../../lib";

interface RegisterFormProps {
  onSubmit?: (data: RegisterInputDataType) => void;
  isLoading?: boolean;
}

export default function RegisterForm({
  onSubmit,
  isLoading = false,
}: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ name, email, password, confPassword, role: "user" });
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
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          required
          variant="default"
        />

        <Button type="submit" variant="success" fullWidth disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
