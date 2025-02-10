import { Loader } from "lucide-react";
import type { FC } from "react";
import { CSSProperties } from "react";
import { ReactNode, ButtonHTMLAttributes, JSX } from "react";


interface Props {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children?: ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  title?: string;
  label?: string,
  ariaLabel?: string,
  icon?: JSX.Element,
  style?: CSSProperties,
  onClick?: () => void;
}

const Button: FC<Props> = ({
  type = 'button',
  className,
  children,
  onClick,
  loading,
  disabled,
  title,
  label,
  icon,
  style,
}: Props) => {
  const isLoading = loading ? "opacity-20" : "";

  return (
    <button
      className={`w-full md:w-auto place-self-start flex items-center justify-center px-6 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 text-center disabled:cursor-not-allowed ease-in-out ${isLoading} ${className}`}
      type={type}
      title={title}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {loading && <Loader />}
      {label}
      {icon}
      {children}
    </button>
  );
};

export default Button;
