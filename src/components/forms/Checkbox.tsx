import type { FC } from "react";
import {
  FieldValues,
  UseFormRegister,
  RegisterOptions,
  Path,
} from "react-hook-form";
import Label from "@/components/forms/Label";

interface Props {
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions<FieldValues, Path<FieldValues>>;
  labelClassName?: string;
  inputClassName?: string;
}

export const Checkbox: FC<Props> = ({
  name,
  label,
  labelClassName,
  inputClassName,
  className,
  disabled = false,
  error,
  register,
  rules,
}: Props) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div>
        <input
          {...register(name, rules)}
          type="checkbox"
          id={name}
          disabled={disabled}
          className={`hidden ${inputClassName}`}
        />
        <Label
          htmlFor={name}
          className={`flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-400/20
            ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${labelClassName}`}
        >
          <span className="checkbox-inner flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full 
            peer-checked:bg-emerald-500 peer-checked:border-emerald-500">
          </span>
          {label && <span className="mx-4 text-sm">{label}</span>}
        </Label>
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};
