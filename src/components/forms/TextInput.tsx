import type { FC, FocusEvent } from "react";
import { ReactNode } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Label from "@/components/Label";

interface TextInputProps<T extends FieldValues> {
  name: Path<T>;
  type?: "text" | "email" | "password" | "date" | "checkbox";
  label?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  children?: ReactNode;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const TextInput: FC<TextInputProps<FieldValues>> = ({
  name,
  type = "text",
  label,
  className,
  placeholder,
  disabled = false,
  error,
  children,
  register,
  rules,
  onBlur,
}: TextInputProps<FieldValues>) => {
  return (
    <div className={`flex flex-col relative ${className}`}>
      {label && (
        <Label
          className="ml-1 -mb-2 text-foreground w-max p-2 text-xs font-normal bg-gradient-to-r from-glass via-transparent  rounded-full"
          value={label}
          htmlFor={name.toString()}
        />
      )}

      <input
        {...register(name, rules)}
        type={type}
        id={name.toString()}
        placeholder={placeholder}
        disabled={disabled}
        className="z-[2] w-full px-4 py-3 rounded-lg bg-field border border-field-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition disabled:bg-surface disabled:border-divider disabled:text-muted disabled:placeholder-subtle disabled:cursor-not-allowed"
        onBlur={onBlur}
      />

      {children && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-[3] justify-center h-12 mt-6">
          {children}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};
