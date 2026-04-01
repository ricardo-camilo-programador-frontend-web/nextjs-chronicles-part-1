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
  disabled?: boolean;
  error?: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions<FieldValues, Path<FieldValues>>;
}

export const Checkbox: FC<Props> = ({
  name,
  label,
  className,
  disabled = false,
  error,
  register,
  rules,
}: Props) => {
  return (
    <div className={`flex flex-col items-center justify-center cursor-pointer ${className}  ${disabled ? "cursor-not-allowed" : ""}`}>
      {label && (
        <Label
          className={`ml-1 -mb-2 text-foreground p-2 text-xs font-normal bg-gradient-to-r from-glass via-transparent  rounded-full min-w-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50/10`}
          value={label}
          htmlFor={name}
        >
          <input
            {...register(name, rules)}
            type="checkbox"
            id={name}
            disabled={disabled}
            className="z-[2] min-w-6 min-h-6 w-full px-4 py-3 rounded-lg bg-field border border-field-border text-foreground placeholder-muted transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </Label>
      )}

      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};
