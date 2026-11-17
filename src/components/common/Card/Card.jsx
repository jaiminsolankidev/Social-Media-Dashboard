import styles from './Card.module.css';

/**
 * Reusable Card component for dashboard widgets, posts, profiles, and statistics.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Card body content
 * @param {React.ReactNode} [props.title] - Optional card title
 * @param {React.ReactNode} [props.subtitle] - Optional card subtitle
 * @param {React.ReactNode} [props.headerAction] - Optional action element in header (e.g., button, menu)
 * @param {React.ReactNode} [props.footer] - Optional card footer
 * @param {'default'|'elevated'|'outlined'|'flat'} [props.variant='default'] - Card styling variant
 * @param {boolean} [props.hoverable=false] - Whether to apply hover lift and border effect
 * @param {'none'|'sm'|'md'|'lg'} [props.padding='md'] - Internal padding level
 * @param {Function} [props.onClick] - Optional click handler
 * @param {string} [props.className=''] - Additional custom CSS class
 */
export default function Card({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  variant = 'default',
  hoverable = false,
  padding = 'md',
  onClick,
  className = '',
  ...props
}) {
  const cardClasses = [
    styles.card,
    styles[variant] || styles.default,
    styles[`pad-${padding}`] || styles['pad-md'],
    hoverable ? styles.hoverable : '',
    onClick ? styles.clickable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasHeader = Boolean(title || subtitle || headerAction);

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
      {...props}
    >
      {hasHeader && (
        <div className={styles.header}>
          <div className={styles.headerText}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {headerAction && <div className={styles.headerAction}>{headerAction}</div>}
        </div>
      )}

      {children && <div className={styles.body}>{children}</div>}

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
