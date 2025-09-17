/**
 * Simple utility to join class names conditionally
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Build class names from conditions
 */
export const conditionalClass = (conditions) => {
  return Object.entries(conditions)
    .filter(([_, condition]) => condition)
    .map(([className]) => className)
    .join(' ');
};

/**
 * Common animation classes
 */
export const animations = {
  fadeIn: 'transition-opacity duration-300 ease-out',
  slideIn: 'transition-transform duration-300 ease-out',
  fadeSlide: 'transition-all duration-300 ease-out'
};

/**
 * Common layout utilities
 */
export const layout = {
  centerFlex: 'flex items-center justify-center',
  betweenFlex: 'flex items-center justify-between',
  columnFlex: 'flex flex-col',
  hidden: {
    mobile: 'hidden lg:block',
    desktop: 'lg:hidden'
  }
};