import type { FC } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  onToggle: () => void;
  label?: string;
  className?: string;
  isOpen?: boolean;
}

const ChevronButton: FC<Props> = ({ label, className, isOpen, onToggle }) => {
  const chevronStyle = isOpen ? "" : "transform rotate-180";
  const buttonStyle = isOpen ? "bg-transparent" : "";

  function handleToggle(event: React.MouseEvent) {
    event.stopPropagation();
    onToggle();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={`text-white flex justify-center items-center gap-4 p-2 w-full transition-colors duration-200 hover:bg-white/10 ${buttonStyle} ${className}`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`${chevronStyle} transition-transform duration-200`}
      >
        <ChevronDown className="text-white/80" />
      </div>
      {label && (
        <span className="text-white/90">
          {label}
        </span>
      )}
    </div>
  );
};

export default ChevronButton;
