import { useMemo, useCallback, memo } from 'react';

/**
 * Custom hook for memoizing expensive calculations
 */
export const useMemoizedValue = (computeValue, dependencies) => {
  return useMemo(computeValue, dependencies);
};

/**
 * Custom hook for memoizing callback functions
 */
export const useMemoizedCallback = (callback, dependencies) => {
  return useCallback(callback, dependencies);
};

/**
 * Higher-order component for memoization with custom comparison
 */
export const withMemo = (Component, areEqual) => {
  return memo(Component, areEqual);
};

/**
 * Custom comparison function for props with Sets
 */
export const comparePropsWithSets = (prevProps, nextProps) => {
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);

  if (prevKeys.length !== nextKeys.length) {
    return false;
  }

  for (let key of prevKeys) {
    const prevValue = prevProps[key];
    const nextValue = nextProps[key];

    // Special handling for Sets
    if (prevValue instanceof Set && nextValue instanceof Set) {
      if (prevValue.size !== nextValue.size) {
        return false;
      }
      for (let item of prevValue) {
        if (!nextValue.has(item)) {
          return false;
        }
      }
      continue;
    }

    // Regular comparison
    if (prevValue !== nextValue) {
      return false;
    }
  }

  return true;
};

/**
 * Custom comparison for era-related props
 */
export const compareEraProps = (prevProps, nextProps) => {
  // Quick reference equality check first
  if (prevProps === nextProps) return true;

  // Check primitive props
  const primitiveProps = ['eraKey', 'eraId', 'isExpanded', 'isEraSelected', 'selectedCount', 'hoveredMovement', 'showTimeline', 'deviceType'];
  for (let prop of primitiveProps) {
    if (prevProps[prop] !== nextProps[prop]) {
      return false;
    }
  }

  // Check Sets
  const setProps = ['selectedMovements'];
  for (let prop of setProps) {
    const prevSet = prevProps[prop];
    const nextSet = nextProps[prop];

    if (prevSet?.size !== nextSet?.size) return false;
    if (prevSet && nextSet) {
      for (let item of prevSet) {
        if (!nextSet.has(item)) return false;
      }
    }
  }

  // Check era object
  if (prevProps.era?.label !== nextProps.era?.label ||
      prevProps.era?.period !== nextProps.era?.period ||
      prevProps.era?.movements?.length !== nextProps.era?.movements?.length) {
    return false;
  }

  return true;
};

/**
 * Debounce utility for expensive operations
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle utility for high-frequency events
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};