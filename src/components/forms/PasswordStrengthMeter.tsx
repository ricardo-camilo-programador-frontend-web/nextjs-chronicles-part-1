import { FC } from 'react';

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export const PasswordStrengthMeter: FC<PasswordStrengthMeterProps> = ({ password, className }) => {
  const calculatePasswordStrength = (password: string): number => {
    let score = 0;
    if (!password) return 0;

    if (password.length >= 8) score += 20;

    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    return score;
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength <= 20) return "bg-red-600";
    if (strength <= 40) return "bg-orange-600";
    if (strength <= 60) return "bg-yellow-600";
    if (strength <= 80) return "bg-blue-600";
    return "bg-green-600";
  };

  const getPasswordStrengthLabelColor = (strength: number): string => {
    if (strength <= 20) return "text-red-600";
    if (strength <= 40) return "text-orange-600";
    if (strength <= 60) return "text-yellow-600";
    if (strength <= 80) return "text-blue-600";
    return "text-green-600";
  };

  const getPasswordStrengthLabel = (strength: number): string => {
    if (strength <= 20) return "Very Weak";
    if (strength <= 40) return "Weak";
    if (strength <= 60) return "Medium";
    if (strength <= 80) return "Strong";
    return "Very Strong";
  };

  const strength = calculatePasswordStrength(password);

  return (
    <div className={`mt-2 space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-divider rounded-full overflow-hidden transition-all duration-300 ease-in-out">
          <div
            className={`h-full transition-all duration-300 ${getPasswordStrengthColor(strength)}`}
            style={{ width: `${strength}%` }}
          />
        </div>
        <span
          className={`text-sm ${getPasswordStrengthLabelColor(strength)}`}
        >
          {getPasswordStrengthLabel(strength)}
        </span>
      </div>
      <ul className="text-sm text-foreground space-y-1">
        <li className={`${password.length >= 8 ? "text-accent" : ""}`}>
          • At least 8 characters
        </li>
        <li className={`${/[A-Z]/.test(password) ? "text-accent" : ""}`}>
          • At least one uppercase letter
        </li>
        <li className={`${/[a-z]/.test(password) ? "text-accent" : ""}`}>
          • At least one lowercase letter
        </li>
        <li className={`${/[0-9]/.test(password) ? "text-accent" : ""}`}>
          • At least one number
        </li>
        <li className={`${/[^A-Za-z0-9]/.test(password) ? "text-accent" : ""}`}>
          • At least one special character
        </li>
      </ul>
    </div>
  );
};
