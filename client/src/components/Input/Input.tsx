import { type InputHTMLAttributes, forwardRef, useState, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', icon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const containerClasses = ['input-container', fullWidth && 'input-full-width']
      .filter(Boolean)
      .join(' ');

    const inputClasses = ['input', error && 'input-error', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label className="input-label">
            {icon && <span className="input-label-icon">{icon}</span>}
            {label}
          </label>
        )}
        <div className="input-wrapper">
          <input ref={ref} type={inputType} className={inputClasses} {...props} />
          {isPassword && (
            <button
              type="button"
              className="input-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <span className="input-error-message">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;