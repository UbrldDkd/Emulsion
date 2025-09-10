import { useState } from 'react';

export default function SearchInput({ onChange, isHomePage = false }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const getBackgroundClass = () => {
    if (isHomePage) {
      return 'bg-gradient-to-r from-stone-400/30 to-transparent';
    }
    return 'bg-gradient-to-r from-stone-400/30 via-stone-400/30 to-transparent';
  };

  const getPlaceholderClass = () => {
    if (isHomePage) {
      return 'placeholder-stone-300/70';
    }
    return 'placeholder-stone-400';
  };

  const getTextClass = () => {
    if (isHomePage) {
      return 'text-stone-200';
    }
    return 'text-stone-300';
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Search'
        onChange={onChange}
        onFocus={() => {
          setIsFocused(true);
          setIsExpanded(true);
          // Delayed fade-in after expansion
          setTimeout(() => {
            setShowContent(true);
          }, 1000); // 1 second delay
        }}
        onBlur={(e) => {
          setIsFocused(false);
          setShowContent(false);
          // Only shrink if user clicks completely outside search area
          setTimeout(() => {
            if (!document.activeElement || !document.activeElement.closest('.search-container')) {
              setIsExpanded(false);
            }
          }, 150);
        }}
        style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
        className={`${getBackgroundClass()} bg-transparent rounded-sm px-4 py-2 ${getTextClass()} ${getPlaceholderClass()} transition-all duration-500 ease-out focus:outline-none focus:ring-0 focus:border-transparent ${
          isExpanded ? 'w-64' : 'w-20'
        } ${
          showContent ? 'opacity-100' : 'opacity-40'
        }`}
      />
    </div>
  )
}