// Filter types
export const FILTER_TYPES = {
  YEAR: 'Year',
  ERA: 'Era',
  ARTFORM: 'Artform',
  MEDIUM: 'Medium',
  GENRE: 'Genre',
  ARTISTS: 'Artists'
};

// Device types for responsive components
export const DEVICE_TYPES = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile'
};

// Timeline configuration
export const TIMELINE_CONFIG = {
  ZOOM_DELAY: 100,
  HEIGHT: {
    DESKTOP: 490,
    MOBILE: 280
  }
};

// UI constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  MAX_LIST_HEIGHT: 320, // max-h-80 = 20rem = 320px
  PANEL_POSITIONS: {
    DESKTOP_TIMELINE: {
      RIGHT: '25rem',
      TOP: '65px',
      WIDTH: '96', // w-96
      HEIGHT: '550px'
    },
    MOBILE_TIMELINE: {
      TOP: '16px',
      WIDTH: '96',
      HEIGHT: '300px'
    }
  }
};

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 50,
  TIMELINE: 60,
  MODAL: 70
};