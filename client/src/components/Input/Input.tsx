import { type InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const containerClasses = ['input-container', fullWidth && 'input-full-width']
      .filter(Boolean)
      .join(' ');

    const inputClasses = ['input', error && 'input-error', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && <label className="input-label">{label}</label>}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <span className="input-error-message">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;