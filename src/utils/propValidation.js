/**
 * Utility functions for prop validation and default values
 */

// Device type validation
export const validateDeviceType = (deviceType, defaultValue = 'desktop') => {
  const validTypes = ['desktop', 'mobile'];
  return validTypes.includes(deviceType) ? deviceType : defaultValue;
};

// Filter type validation
export const validateFilterType = (filterType, defaultValue = 'Year') => {
  const validTypes = ['Year', 'Era', 'Artform', 'Medium', 'Genre', 'Artists'];
  return validTypes.includes(filterType) ? filterType : defaultValue;
};

// Size validation for components
export const validateSize = (size, defaultValue = 'md') => {
  const validSizes = ['sm', 'md', 'lg'];
  return validSizes.includes(size) ? size : defaultValue;
};

// Variant validation for components
export const validateVariant = (variant, validVariants, defaultValue = 'default') => {
  return validVariants.includes(variant) ? variant : defaultValue;
};

// Prop shape validators
export const propShapes = {
  yearRange: (yearRange) => ({
    from: yearRange?.from || '',
    to: yearRange?.to || ''
  }),

  artformFilterState: (state) => ({
    selectedArtform: state?.selectedArtform || null,
    filterType: state?.filterType || null,
    showMediums: state?.showMediums || false,
    selectedGenres: state?.selectedGenres || new Set()
  }),

  eraProps: (props) => ({
    eraKey: props.eraKey || '',
    era: props.era || { label: '', period: '', movements: [] },
    eraId: props.eraId || '',
    isExpanded: props.isExpanded || false,
    isEraSelected: props.isEraSelected || false,
    selectedCount: props.selectedCount || 0,
    selectedMovements: props.selectedMovements || new Set(),
    hoveredMovement: props.hoveredMovement || null,
    showTimeline: props.showTimeline || false,
    deviceType: validateDeviceType(props.deviceType)
  })
};

// Function composition helper for prop transformation
export const withDefaults = (defaultProps) => (props) => ({
  ...defaultProps,
  ...props
});

// Higher-order component for prop validation
export const withPropValidation = (Component, validator) => {
  return function ValidatedComponent(props) {
    const validatedProps = validator ? validator(props) : props;
    return <Component {...validatedProps} />;
  };
};