import type { FC } from "react";
import { ReactNode } from "react";

interface Props {
  value: string;
  className?: string;
  htmlFor: string;
  children?: ReactNode;
  required?: boolean;
}

const Label: FC<Props> = ({
  value,
  className,
  htmlFor,
  children,
  required,
}: Props) => {
  return (
    <div className={className}>
      <label
        className="animation-fade-in-from-left transition-all duration-300 flex flex-row items-center justify-center"
        htmlFor={htmlFor}
      >
        <span className="text-[1rem] font-medium w-full">
          {value}
          {required && (
            <span className="text-error ml-1" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {children}
      </label>
    </div>
  );
};

export default Label;
