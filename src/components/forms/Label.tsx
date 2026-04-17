import type { FC } from "react";
import { ReactNode } from "react";

interface Props {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

const Label: FC<Props> = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={`${className}`}>
      {children}
    </label>
  );
};

export default Label;
