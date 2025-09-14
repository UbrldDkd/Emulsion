import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

export default function ThemeToggle() {
  const { isLightMode, toggleTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      toggleTheme();
      setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  return (
    <div className="relative" aria-label="Theme toggle">
      <div className="relative w-10 h-5">
        <svg
          viewBox="0 0 50 25"
          className="w-full h-full cursor-pointer"
          onClick={handleToggle}
        >
          
          {/* Track */}
          <rect
            x="4" y="8" width="42" height="9" rx="4.5"
            fill={isLightMode ? "#f1f5f9" : "#57534e"}
            className="transition-all duration-500"
          />

          {/* Handle */}
          <circle
            cx={isLightMode ? "12" : "38"}
            cy="12.5"
            r="6.5"
            fill={isLightMode ? "#ffffff" : "#1c1917"}
            stroke="#d1d5db"
            strokeWidth="1"
            className="transition-all duration-500 shadow-sm"
          />
          
        </svg>
      </div>
    </div>
  );
}