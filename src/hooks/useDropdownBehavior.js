import { useState, useRef, useEffect } from 'react';

export function useDropdownBehavior({ onClose, clearAllFilters } = {}) {
  const [state, setState] = useState({
    isOpen: false,
    filterByOpen: false,
    showTooltip: false
  });

  const refs = {
    dropdown: useRef(null),
    panel: useRef(null),
    timeline: useRef(null),
    button: useRef(null),
    viewer: useRef(null)
  };

  const toggle = (key) => setState(prev => ({ ...prev, [key]: !prev[key] }));
  const set = (key, value) => setState(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!state.isOpen) return;

    const handleClickOutside = (e) => {
      const clickedOutside = (ref) => ref.current && !ref.current.contains(e.target);

      if (clickedOutside(refs.dropdown)) {
        set('filterByOpen', false);
      }

      if (clickedOutside(refs.panel) && clickedOutside(refs.timeline) && clickedOutside(refs.button)) {
        set('isOpen', false);
        onClose?.();
        clearAllFilters?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isOpen, onClose, clearAllFilters]);

  return {
    ...state,
    ...refs,
    toggle,
    set,
    setIsOpen: (v) => set('isOpen', v),
    setFilterByOpen: (v) => set('filterByOpen', v),
    setShowTooltip: (v) => set('showTooltip', v)
  };
}