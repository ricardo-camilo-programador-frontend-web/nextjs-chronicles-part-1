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
  autocomplete?: string;
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
  autocomplete,
}: TextInputProps<FieldValues>) => {
  return (
    <div className={`flex flex-col relative ${className}`}>
      {label && (
        <Label
          className="ml-1 -mb-2 text-white w-max p-2 text-xs font-normal bg-gradient-to-r from-white/10 via-transparent  rounded-full"
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
        className="z-[2] w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition disabled:bg-gray-600 disabled:border-gray-400 disabled:text-gray-300 disabled:placeholder-gray-200 disabled:cursor-not-allowed"
        onBlur={onBlur}
        autoComplete={autocomplete}
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
