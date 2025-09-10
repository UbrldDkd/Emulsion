import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  const getTheme = () => {
    if (isLightMode) {
      return {
        // Light theme colors
        background: 'bg-stone-50',
        cardBackground: 'bg-stone-100/60 backdrop-blur-xl',
        border: 'border-stone-300/50',
        text: 'text-stone-950',
        textSecondary: 'text-stone-800',
        textMuted: 'text-stone-700',
        accent: 'text-amber-800',
        button: 'bg-amber-600/70 hover:bg-amber-500/80 active:bg-amber-700/85 text-white backdrop-blur-sm',
        input: 'bg-stone-100/50 border-stone-300/40 text-stone-950 placeholder-stone-700 backdrop-blur-sm',
        inputFocus: 'focus:ring-amber-400/40 focus:border-amber-500/60',
        selected: 'bg-amber-300/60 border-amber-400/80 text-amber-900 backdrop-blur-sm shadow-sm',
        hover: 'hover:bg-stone-200/50 hover:text-stone-900',
        gradient: 'from-stone-100/60 via-stone-100/40 to-transparent'
      };
    } else {
      return {
        // Dark theme colors (existing)
        background: 'bg-stone-900',
        cardBackground: 'bg-stone-800/85 backdrop-blur-xl',
        border: 'border-stone-700/70',
        text: 'text-stone-200',
        textSecondary: 'text-stone-300',
        textMuted: 'text-stone-400',
        accent: 'text-amber-400',
        button: 'bg-amber-600/80 hover:bg-amber-500/90 active:bg-amber-700/90 text-white backdrop-blur-sm',
        input: 'bg-stone-800/75 border-stone-700/70 text-stone-200 placeholder-stone-500 backdrop-blur-sm',
        inputFocus: 'focus:ring-amber-400/50 focus:border-amber-500/70',
        selected: 'bg-amber-600/40 border-amber-500/70 text-amber-100 backdrop-blur-sm shadow-sm',
        hover: 'hover:bg-stone-700/70 hover:text-stone-200',
        gradient: 'from-stone-900/85 to-stone-800/60'
      };
    }
  };

  const value = {
    isLightMode,
    toggleTheme,
    theme: getTheme()
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}