import { FC } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Label from "@/components/Label";

interface Option {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label?: string;
  options: Option[];
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions<FieldValues, Path<FieldValues>>;
  onChange?: (value: string | number) => void;
}

const DropdownSelect: FC<Props> = ({
  name,
  label,
  options,
  className,
  defaultValue,
  disabled = false,
  error,
  register,
  rules,
  onChange,
}) => {
  const { onChange: registerOnChange, ...rest } = register(name, rules);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    registerOnChange(e);

    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <Label
          className="ml-1 -mb-2 text-white w-max p-2 text-xs font-normal bg-gradient-to-r from-white/10 via-transparent rounded-full"
          value={label}
          htmlFor={name}
        />
      )}

      <select
        {...rest}
        id={name}
        onChange={handleChange}
        disabled={disabled}
        defaultValue={defaultValue}
        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition disabled:bg-gray-600 disabled:border-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default DropdownSelect;
