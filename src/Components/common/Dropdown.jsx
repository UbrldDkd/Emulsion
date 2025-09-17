import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import Panel from './Panel.jsx';

export default function Dropdown({
  trigger,
  children,
  isOpen,
  onToggle,
  onClose,
  position = 'bottom-left',
  className = '',
  panelClassName = '',
  closeOnClickOutside = true,
  closeOnItemClick = true
}) {
  const { theme } = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!closeOnClickOutside) return;

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (onClose) onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, closeOnClickOutside]);

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-1',
    'bottom-right': 'top-full right-0 mt-1',
    'top-left': 'bottom-full left-0 mb-1',
    'top-right': 'bottom-full right-0 mb-1'
  };

  const handleItemClick = () => {
    if (closeOnItemClick && onClose) {
      onClose();
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div onClick={onToggle}>
        {trigger}
      </div>

      {isOpen && (
        <div className={`absolute z-50 ${positionClasses[position]}`}>
          <Panel
            variant="default"
            size="sm"
            className={`min-w-max ${panelClassName}`}
          >
            <div onClick={handleItemClick}>
              {children}
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}