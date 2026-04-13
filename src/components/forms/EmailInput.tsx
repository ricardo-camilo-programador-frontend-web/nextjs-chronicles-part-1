import type { FC } from "react";
import {
  FieldValues,
  UseFormRegister,
  RegisterOptions,
  Path,
} from "react-hook-form";
import Label from "@/components/Label";

interface Props {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions<FieldValues, Path<FieldValues>>;
}

export const EmailInput: FC<Props> = ({
  name,
  label,
  className,
  placeholder,
  disabled = false,
  error,
  register,
  rules,
}: Props) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <Label
          className="ml-1 -mb-2 text-foreground w-max p-2 text-xs font-normal bg-background rounded-full"
          value={label}
          htmlFor={name}
        />
      )}
      <input
        {...register(name, rules)}
        type="email"
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        className="z-[2] w-full px-4 py-3 rounded-lg bg-field border border-field-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};
