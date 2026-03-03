import React from "react";
import { Label, Input } from "../../atoms";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  variant?: "default" | "success" | "danger";
  error?: string;
}

export default function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  variant = "default",
  error,
}: FormFieldProps) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant={variant}
        required={required}
      />
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  );
}
