import { useState } from 'react';
import { FILTER_TYPES } from '../constants/filterConstants.js';

export function useFilterState() {
  const [filterBy, setFilterBy] = useState(FILTER_TYPES.YEAR);
  const [yearRange, setYearRange] = useState({ from: '', to: '' });
  const [showTimeline, setShowTimeline] = useState(false);

  // Consolidate all Set-based states into one object
  const [selections, setSelections] = useState({
    eras: new Set(),
    expandedEras: new Set(),
    movements: new Set(),
    mediums: new Set(),
    genres: new Set()
  });

  // Consolidate hover states
  const [hovered, setHovered] = useState({
    movement: null,
    medium: null
  });

  const [artformState, setArtformState] = useState({
    selected: null,
    type: null,
    showMediums: false
  });

  // Helper to update selections
  const updateSelection = (key, value) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  // Helper to update hover
  const updateHover = (key, value) => {
    setHovered(prev => ({ ...prev, [key]: value }));
  };

  // Simplified clear functions
  const clearByType = {
    [FILTER_TYPES.ERA]: () => {
      updateSelection('eras', new Set());
      updateSelection('movements', new Set());
      updateSelection('expandedEras', new Set());
    },
    [FILTER_TYPES.YEAR]: () => setYearRange({ from: '', to: '' }),
    [FILTER_TYPES.ARTFORM]: () => updateSelection('mediums', new Set()),
    [FILTER_TYPES.MEDIUM]: () => updateSelection('mediums', new Set()),
    [FILTER_TYPES.GENRE]: () => updateSelection('genres', new Set())
  };

  const clearCurrentFilters = () => clearByType[filterBy]?.();

  const clearAllFilters = () => {
    setSelections({
      eras: new Set(),
      expandedEras: new Set(),
      movements: new Set(),
      mediums: new Set(),
      genres: new Set()
    });
    setYearRange({ from: '', to: '' });
    setShowTimeline(false);
    setArtformState({ selected: null, type: null, showMediums: false });
    setHovered({ movement: null, medium: null });
  };

  return {
    filterBy, setFilterBy,
    yearRange, setYearRange,
    showTimeline, setShowTimeline,

    // Selections
    selectedEras: selections.eras,
    selectedMovements: selections.movements,
    expandedEras: selections.expandedEras,
    selectedMediumItems: selections.mediums,
    selectedGenres: selections.genres,

    // Hover states
    hoveredMovement: hovered.movement,
    hoveredMediumItem: hovered.medium,

    // Artform
    artformFilterState: { ...artformState, selectedGenres: selections.genres },

    // Setters
    setSelectedEras: (v) => updateSelection('eras', v),
    setSelectedMovements: (v) => updateSelection('movements', v),
    setExpandedEras: (v) => updateSelection('expandedEras', v),
    setSelectedMediumItems: (v) => updateSelection('mediums', v),
    setHoveredMovement: (v) => updateHover('movement', v),
    setHoveredMediumItem: (v) => updateHover('medium', v),
    setArtformFilterState: (v) => {
      if (v.selectedGenres) updateSelection('genres', v.selectedGenres);
      setArtformState({ selected: v.selectedArtform, type: v.filterType, showMediums: v.showMediums });
    },

    clearCurrentFilters,
    clearAllFilters
  };
}