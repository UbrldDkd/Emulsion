import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function Panel({
  children,
  className = '',
  variant = 'default',
  position = 'static',
  size = 'md',
  blur = true,
  border = true,
  shadow = true,
  ...props
}) {
  const { theme } = useTheme();

  const isLightMode = theme.cardBackground.includes('stone') && theme.text.includes('950');

  const variantClasses = {
    default: isLightMode ? 'bg-stone-100/70' : 'bg-stone-800/90',
    solid: theme.cardBackground,
    transparent: 'bg-transparent'
  };

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };

  const positionClasses = {
    static: '',
    absolute: 'absolute',
    fixed: 'fixed',
    relative: 'relative'
  };

  const baseClasses = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${positionClasses[position]}
    ${blur ? 'backdrop-blur-xl' : ''}
    ${border ? `border ${theme.border}` : ''}
    ${shadow ? 'shadow-xl' : ''}
    rounded
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
}