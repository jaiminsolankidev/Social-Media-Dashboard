import { forwardRef } from 'react';
import styles from './Input.module.css';

/**
 * Reusable Input component with labels, icons, and error handling
 */
const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    id,
    type = 'text',
    prefixIcon,
    suffixIcon,
    onSuffixClick,
    className = '',
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        {prefixIcon && <span className={styles.prefixIcon}>{prefixIcon}</span>}

        <input
          ref={ref}
          id={inputId}
          type={type}
          className={[
            styles.input,
            error ? styles.hasError : '',
            prefixIcon ? styles.inputWithPrefix : '',
            suffixIcon ? styles.inputWithSuffix : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />

        {suffixIcon && (
          <button
            type="button"
            className={styles.suffixIcon}
            onClick={onSuffixClick}
            tabIndex={-1}
            aria-label="Toggle input action"
          >
            {suffixIcon}
          </button>
        )}
      </div>

      {error && (
        <span id={`${inputId}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}

      {!error && helperText && (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
});

export default Input;
