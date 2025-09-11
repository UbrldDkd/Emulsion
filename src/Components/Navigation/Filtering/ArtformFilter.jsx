import { useState } from 'react';
import { Keys } from '../../Keys.js';
import { useTheme } from '../../../contexts/ThemeContext.jsx';

export default function ArtformFilter({
  selectedMediaItems,
  setSelectedMediaItems,
  hoveredMediaItem,
  setHoveredMediaItem
}) {
  const { theme } = useTheme();
  const { artForms } = Keys;
  
  const [selectedArtform, setSelectedArtform] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const [showMediums, setShowMediums] = useState(false);
  const [selectedArtforms, setSelectedArtforms] = useState(new Set());
  const [filterType, setFilterType] = useState(null); // 'genres' or 'mediums'
  const [hoveredGenreBadge, setHoveredGenreBadge] = useState(null); // Track which genre badge is hovered
  const [hoveredMediumBadge, setHoveredMediumBadge] = useState(null); // Track which medium badge is hovered

  const toggleSelection = (itemId, type) => {
    setSelectedMediaItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
        // When selecting a specific genre or medium, deselect the parent artform
        if (type === 'genre' || type === 'medium') {
          const artformId = `artform-${selectedArtform}`;
          newSet.delete(artformId);
          setSelectedArtforms(prev => {
            const newArtforms = new Set(prev);
            newArtforms.delete(selectedArtform);
            return newArtforms;
          });
        }
      }
      return newSet;
    });
  };

  const handleGenreFilterClick = (artFormKey) => {
    setSelectedArtform(artFormKey);
    setSelectedGenres(new Set());
    setFilterType('genres');
    setShowMediums(false);
  };

  const handleMediumFilterClick = (artFormKey) => {
    setSelectedArtform(artFormKey);
    setFilterType('mediums');
    setShowMediums(true);
  };

  const toggleArtformSelection = (artFormKey) => {
    const artformId = `artform-${artFormKey}`;
    setSelectedMediaItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artformId)) {
        newSet.delete(artformId);
        // Also remove all related genres and mediums
        Array.from(newSet).forEach(item => {
          if (item.startsWith(`${artFormKey}-`)) {
            newSet.delete(item);
          }
        });
      } else {
        newSet.add(artformId);
        // Remove any specific genres/mediums for this artform since we're selecting all
        Array.from(newSet).forEach(item => {
          if (item.startsWith(`${artFormKey}-`)) {
            newSet.delete(item);
          }
        });
      }
      return newSet;
    });
    
    setSelectedArtforms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artFormKey)) {
        newSet.delete(artFormKey);
      } else {
        newSet.add(artFormKey);
      }
      return newSet;
    });
  };

  const handleGenreClick = (artFormKey, genreId) => {
    setSelectedGenres(prev => {
      const newSet = new Set(prev);
      if (newSet.has(genreId)) {
        newSet.delete(genreId);
      } else {
        newSet.add(genreId);
      }
      return newSet;
    });
    // Store the selected genre
    toggleSelection(genreId, 'genre');
  };

  const handleBackClick = () => {
    setSelectedArtform(null);
    setFilterType(null);
    setShowMediums(false);
    setSelectedGenres(new Set());
  };

  return (
    <div className="space-y-4">
      {/* Header with navigation */}
      <div className={`flex items-center justify-between border-b ${theme.border} pb-3`}>
        <div className="flex items-center gap-3">
          {selectedArtform && (
            <button
              onClick={handleBackClick}
              className={`flex items-center gap-1 ${theme.textMuted} hover:${theme.text} transition-colors text-xs focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1`}
              aria-label="Go back to artform list"
              type="button"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          <h3 className={`${theme.text} text-sm font-light tracking-wide`} id="artform-filter-heading">
            {selectedArtform && filterType === 'mediums' ? `${artForms[selectedArtform].label} - Mediums` : 
             selectedArtform && filterType === 'genres' ? `${artForms[selectedArtform].label} - Genres` : 
             'Filter by Art Form'}
          </h3>
        </div>
      </div>

      {/* Content based on selection state */}
      {!selectedArtform ? (
        // Show Art Forms with Filter Buttons
        <div className="space-y-2">
          {Object.entries(artForms).map(([artFormKey, artForm]) => {
            const artformId = `artform-${artFormKey}`;
            const isSelected = selectedMediaItems.has(artformId);
            
            // Count selected items for this artform
            const selectedCount = Array.from(selectedMediaItems).filter(item => 
              item.startsWith(`${artFormKey}-`) && !item.includes('artform')
            ).length;

            return (
              <div key={artFormKey} className="relative">
                {/* Main artform selection button */}
                <button
                  onClick={() => toggleArtformSelection(artFormKey)}
                  className={`w-full p-3 rounded text-left transition-all duration-200 ${
                    isSelected 
                      ? `${theme.selected} border-2 ${theme.border}` 
                      : `${theme.cardBackground} ${theme.border} border hover:${theme.hover} hover:border-amber-400/50`
                  }`}
                  title="Select all content from this artform"
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Artform Info */}
                    <div className="flex-1 pr-20">
                      <div className={`font-medium text-sm ${isSelected ? theme.accent : theme.text}`}>
                        {artForm.label}
                      </div>
                      <div className={`text-xs mt-0.5 ${theme.textMuted}`}>
                        {artForm.mediums.length} mediums • {artForm.genres.length} genres
                      </div>
                    </div>
                  </div>
                </button>
                
                {/* Filter Buttons - Positioned absolutely */}
                <div className="absolute top-3 right-3 flex gap-2">
                    {(() => {
                      // Count selected genres for this artform
                      const genreCount = Array.from(selectedMediaItems).filter(item => 
                        item.startsWith(`${artFormKey}-genre-`)
                      ).length;
                      
                      return (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGenreFilterClick(artFormKey);
                            }}
                            className={`px-2 py-1 text-xs rounded transition-all duration-200 ${theme.cardBackground} ${theme.border} border hover:${theme.hover} hover:border-amber-400/50 flex items-center gap-1`}
                            title="Filter by genres"
                          >
                            <span className={theme.text}>Genres</span>
                            {genreCount > 0 && (
                              <span 
                                className={`bg-amber-500 text-amber-950 text-xs font-medium ml-1 flex items-center justify-center transition-all duration-200 ${
                                  hoveredGenreBadge === artFormKey 
                                    ? 'px-2 py-0.5 rounded-full gap-1' 
                                    : 'w-5 h-5 rounded-full'
                                }`}
                                onMouseEnter={() => setHoveredGenreBadge(artFormKey)}
                                onMouseLeave={() => setHoveredGenreBadge(null)}
                              >
                                {genreCount}
                                {hoveredGenreBadge === artFormKey && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Clear all genre selections for this artform
                                      setSelectedMediaItems(prev => {
                                        const newSet = new Set(prev);
                                        Array.from(newSet).forEach(item => {
                                          if (item.startsWith(`${artFormKey}-genre-`)) {
                                            newSet.delete(item);
                                          }
                                        });
                                        return newSet;
                                      });
                                      setSelectedGenres(new Set());
                                    }}
                                    className="text-red-800 hover:text-red-900 font-bold leading-none text-sm transition-all duration-300 transform animate-in slide-in-from-right-2 fade-in"
                                    title="Clear genre filters"
                                  >
                                    ×
                                  </button>
                                )}
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    })()}
                    
                    {(() => {
                      // Count selected mediums for this artform
                      const mediumCount = Array.from(selectedMediaItems).filter(item => 
                        item.startsWith(`${artFormKey}-medium-`)
                      ).length;
                      
                      return (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMediumFilterClick(artFormKey);
                            }}
                            className={`px-2 py-1 text-xs rounded transition-all duration-200 ${theme.cardBackground} ${theme.border} border hover:${theme.hover} hover:border-amber-400/50 flex items-center gap-1`}
                            title="Filter by mediums"
                          >
                            <span className={theme.text}>Mediums</span>
                            {mediumCount > 0 && (
                              <span 
                                className={`bg-amber-500 text-amber-950 text-xs font-medium ml-1 flex items-center justify-center transition-all duration-200 ${
                                  hoveredMediumBadge === artFormKey 
                                    ? 'px-2 py-0.5 rounded-full gap-1' 
                                    : 'w-5 h-5 rounded-full'
                                }`}
                                onMouseEnter={() => setHoveredMediumBadge(artFormKey)}
                                onMouseLeave={() => setHoveredMediumBadge(null)}
                              >
                                {mediumCount}
                                {hoveredMediumBadge === artFormKey && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Clear all medium selections for this artform
                                      setSelectedMediaItems(prev => {
                                        const newSet = new Set(prev);
                                        Array.from(newSet).forEach(item => {
                                          if (item.startsWith(`${artFormKey}-medium-`)) {
                                            newSet.delete(item);
                                          }
                                        });
                                        return newSet;
                                      });
                                    }}
                                    className="text-red-800 hover:text-red-900 font-bold leading-none text-sm transition-all duration-300 transform animate-in slide-in-from-right-2 fade-in"
                                    title="Clear medium filters"
                                  >
                                    ×
                                  </button>
                                )}
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    })()}
                </div>
              </div>
            );
          })}
        </div>
      ) : selectedArtform && filterType === 'genres' ? (
        // Show Genres for selected Art Form
        <div className="space-y-4">
          <div className={`text-xs ${theme.textMuted} flex items-center gap-2`}>
            <span className={theme.accent}>{artForms[selectedArtform].label}</span>
            <span>→ Choose genres of interest</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {artForms[selectedArtform].genres.map((genre, index) => {
              const genreId = `${selectedArtform}-genre-${index}`;
              const isSelected = selectedGenres.has(genreId);
              const isHovered = hoveredMediaItem === genreId;

              return (
                <button
                  key={index}
                  className={`p-3 rounded text-xs text-center transition-all duration-200 ${
                    isSelected 
                      ? `${theme.selected} border ${theme.border}` 
                      : isHovered
                        ? `${theme.hover} border ${theme.border}`
                        : `${theme.cardBackground} ${theme.border} border hover:${theme.hover}`
                  }`}
                  onMouseEnter={() => setHoveredMediaItem(genreId)}
                  onMouseLeave={() => setHoveredMediaItem(null)}
                  onClick={() => handleGenreClick(selectedArtform, genreId)}
                >
                  <span className={isSelected ? '' : theme.text}>
                    {genre.label}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      ) : selectedArtform && filterType === 'mediums' ? (
        // Show Mediums for selected Art Form
        <div className="space-y-4">
          <div className={`text-xs ${theme.textMuted} flex items-center gap-2`}>
            <span className={theme.accent}>{artForms[selectedArtform].label}</span>
            <span>→ Choose mediums</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {artForms[selectedArtform].mediums.map((medium, index) => {
              const mediumId = `${selectedArtform}-medium-${index}`;
              const isSelected = selectedMediaItems.has(mediumId);
              const isHovered = hoveredMediaItem === mediumId;

              return (
                <button
                  key={index}
                  className={`p-3 rounded text-xs text-left transition-all duration-200 ${
                    isSelected 
                      ? `${theme.selected} border ${theme.border}` 
                      : isHovered
                        ? `${theme.hover} border ${theme.border}`
                        : `${theme.cardBackground} ${theme.border} border hover:${theme.hover}`
                  }`}
                  onMouseEnter={() => setHoveredMediaItem(mediumId)}
                  onMouseLeave={() => setHoveredMediaItem(null)}
                  onClick={() => toggleSelection(mediumId, 'medium')}
                >
                  <span className={isSelected ? '' : theme.text}>
                    {medium.label}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      ) : null}


    </div>
  );
}