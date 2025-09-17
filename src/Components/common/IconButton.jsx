import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function IconButton({
  onClick,
  icon,
  title,
  className = '',
  size = 'md',
  variant = 'default',
  disabled = false,
  ...props
}) {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1',
    lg: 'w-10 h-10 p-2'
  };

  const variantClasses = {
    default: `${theme.textMuted} hover:${theme.accent} ${theme.hover}`,
    primary: `${theme.accent} ${theme.selected}`,
    secondary: `${theme.text} ${theme.cardBackground} border ${theme.border}`
  };

  const baseClasses = `
    rounded transition-colors duration-200
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={baseClasses}
      title={title}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
}