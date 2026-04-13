import type { FC } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Label from "@/components/Label";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export const RadioGroup: FC<RadioGroupProps<FieldValues>> = ({
  name,
  options,
  value,
  onChange,
  label,
  className,
  disabled = false,
  error,
  register,
  rules,
}: RadioGroupProps<FieldValues>) => {
  const handleChange = (optionValue: RadioOption['value']): void => {
    if (!disabled) {
      onChange(optionValue);
    }
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <Label
          className="ml-1 text-foreground w-max p-2 text-xs font-normal bg-background rounded-full"
          value={label}
          htmlFor={name.toString()}
        />
      )}

      <div
        role="radiogroup"
        aria-labelledby={`${name}-group-label`}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const currentIndex = options.findIndex(opt => opt.value === value);
            const nextIndex = (currentIndex + 1) % options.length;
            handleChange(options[nextIndex].value);
          }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const currentIndex = options.findIndex(opt => opt.value === value);
            const prevIndex = (currentIndex - 1 + options.length) % options.length;
            handleChange(options[prevIndex].value);
          }
        }}
        tabIndex={0}
        className="grid grid-cols-2 md:flex sm:flex-nowrap flex-wrap gap-2 h-14"
      >
        {options.map((option) => (
          <label
            key={option.value}
            aria-checked={value === option.value}
            className={`
                flex items-center p-4 rounded-lg cursor-pointer
                transition-all duration-200 w-full
                ${value === option.value
                ? "bg-field border-2 border-accent"
                : "bg-surface border border-field-border hover:border-muted"
              }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
          >
            <input
              type="radio"
              {...register(name, rules)}
              value={option.value}
              checked={value === option.value}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
              className="hidden"
            />
            <div className="flex items-center justify-center w-5 h-5 mr-3">
              <div
                className={`
                    w-5 h-5 rounded-full border-2
                    transition-all duration-200 ease-in-out
                    flex items-center justify-center
                    ${value === option.value
                    ? "border-accent scale-100"
                    : "border-glass-border scale-0"
                  }
                  `}
              >
                {value === option.value && (
                  <div className="w-1 h-1 rounded-full bg-accent animate-bounce" />
                )}
              </div>
            </div>
            <span className="text-foreground">{option.label}</span>
          </label>
        ))}
      </div>

      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};
