import { useState } from 'react';
import { Keys } from '../../../../Keys.js';
import { useTheme } from '../../../../../contexts/ThemeContext.jsx';

export default function ArtformFilter({
  selectedMediumItems,
  setSelectedMediumItems,
  hoveredMediumItem,
  setHoveredMediumItem
}) {
  const { theme, isLightMode } = useTheme();
  const { artForms } = Keys;

  const [selectedArtform, setSelectedArtform] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const [hoveredArtform, setHoveredArtform] = useState(null);
  const [hoveredBadge, setHoveredBadge] = useState({ type: null, artform: null });

  // Helper functions
  const createItemId = (artform, type, index = null) => {
    if (type === 'artform') return `artform-${artform}`;
    return `${artform}-${type}-${index}`;
  };

  const getSelectedCount = (artform, type) => {
    const prefix = `${artform}-${type}-`;
    return Array.from(selectedMediumItems).filter(item =>
      item.startsWith(prefix)
    ).length;
  };

  const clearSelections = (artform, type) => {
    const prefix = `${artform}-${type}-`;
    setSelectedMediumItems(prev => {
      const newSet = new Set(prev);
      Array.from(newSet).forEach(item => {
        if (item.startsWith(prefix)) {
          newSet.delete(item);
        }
      });
      return newSet;
    });
    if (type === 'genre') setSelectedGenres(new Set());
  };

  const toggleItemSelection = (itemId, type = null) => {
    setSelectedMediumItems(prev => {
      const newSet = new Set(prev);
      const isSelected = newSet.has(itemId);

      if (isSelected) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
        // When selecting specific items, deselect parent artform
        if (type === 'genre' || type === 'medium') {
          const artformId = createItemId(selectedArtform, 'artform');
          newSet.delete(artformId);
        }
      }
      return newSet;
    });
  };

  const toggleArtformSelection = (artFormKey) => {
    const artformId = createItemId(artFormKey, 'artform');
    const isSelected = selectedMediumItems.has(artformId);

    setSelectedMediumItems(prev => {
      const newSet = new Set(prev);

      if (isSelected) {
        newSet.delete(artformId);
        // Remove all related items
        Array.from(newSet).forEach(item => {
          if (item.startsWith(`${artFormKey}-`)) {
            newSet.delete(item);
          }
        });
      } else {
        newSet.add(artformId);
        // Remove specific items when selecting all
        Array.from(newSet).forEach(item => {
          if (item.startsWith(`${artFormKey}-`)) {
            newSet.delete(item);
          }
        });
      }
      return newSet;
    });
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenres(prev => {
      const newSet = new Set(prev);
      if (newSet.has(genreId)) {
        newSet.delete(genreId);
      } else {
        newSet.add(genreId);
      }
      return newSet;
    });
    toggleItemSelection(genreId, 'genre');
  };

  const handleFilterClick = (artFormKey, type) => {
    setSelectedArtform(artFormKey);
    setFilterType(type);
    if (type === 'genres') setSelectedGenres(new Set());
  };

  const handleBackClick = () => {
    setSelectedArtform(null);
    setFilterType(null);
    setSelectedGenres(new Set());
  };

  const getHeaderTitle = () => {
    if (!selectedArtform) return 'Filter by Art Form';
    const artformLabel = artForms[selectedArtform].label;
    return `${artformLabel} - ${filterType === 'genres' ? 'Genres' : 'Mediums'}`;
  };

  const renderFilterBadge = (artform, type) => {
    const count = getSelectedCount(artform, type);
    const isHovered = hoveredBadge.type === type && hoveredBadge.artform === artform;

    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFilterClick(artform, `${type}s`);
          }}
          className={`px-2 py-1.5 text-xs rounded transition-all duration-200 ${theme.cardBackground} ${theme.border} border hover:bg-stone-200/40 hover:text-amber-800/60 flex items-center justify-center gap-1`}
          title={`Filter by ${type}s`}
        >
          <span className={theme.text}>{type === 'genre' ? 'Genres' : 'Mediums'}</span>
          {count > 0 && (
            <span
              className={`text-xs font-medium ml-1 flex items-center justify-center transition-all duration-200 ${
                isHovered
                  ? 'px-2 py-0.5 rounded-full gap-1 hover:bg-amber-200/50 active:bg-amber-200/50'
                  : 'w-5 h-5 rounded-full hover:bg-amber-200/50 active:bg-amber-200/50'
              } bg-amber-200/30 text-amber-950`}
              onMouseEnter={() => setHoveredBadge({ type, artform })}
              onMouseLeave={() => setHoveredBadge({ type: null, artform: null })}
            >
              {count}
              {isHovered && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelections(artform, type);
                  }}
                  className="text-red-800 hover:text-red-900 font-bold leading-none text-sm transition-all duration-300"
                  title={`Clear ${type} filters`}
                >
                  ×
                </button>
              )}
            </span>
          )}
        </button>
      </div>
    );
  };

  const renderArtformCard = (artFormKey, artForm) => {
    const artformId = createItemId(artFormKey, 'artform');
    const isSelected = selectedMediumItems.has(artformId);
    const selectedCount = ['genre', 'medium'].reduce((acc, type) =>
      acc + getSelectedCount(artFormKey, type), 0
    );

    return (
      <div
        key={artFormKey}
        className="relative"
        onMouseEnter={() => setHoveredArtform(artFormKey)}
        onMouseLeave={() => setHoveredArtform(null)}
      >
        <button
          onClick={() => toggleArtformSelection(artFormKey)}
          className={`w-full p-3 rounded text-left transition-all duration-200 ${
            isSelected
              ? `${theme.selected} border ${theme.border}`
              : hoveredArtform === artFormKey
                ? `${theme.hover} border ${theme.border}`
                : `${theme.cardBackground} ${theme.border} border hover:${theme.hover}`
          }`}
          title="Select all content from this artform"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className={`font-medium text-sm flex items-center gap-2 ${
                isSelected
                  ? (isLightMode ? 'text-amber-100' : 'text-amber-300/50')
                  : hoveredArtform === artFormKey
                    ? 'text-stone-300'
                    : theme.text
              }`}>
                {artForm.label}
                {selectedCount > 0 && (
                  <div className={`w-5 h-5 bg-amber-200/30 text-amber-950 text-xs font-medium rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredArtform !== artFormKey ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {selectedCount}
                  </div>
                )}
              </div>
              <div className={`text-xs mt-0.5 ${theme.textSecondary}`}>
                {artForm.mediums.length} mediums • {artForm.genres.length} genres
              </div>
            </div>
          </div>
        </button>

        <div className={`absolute top-1/2 right-1 transform -translate-y-1/2 flex flex-col gap-0.5 transition-all duration-300 ${
          hoveredArtform === artFormKey
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}>
          {renderFilterBadge(artFormKey, 'genre')}
          {renderFilterBadge(artFormKey, 'medium')}
        </div>
      </div>
    );
  };

  const renderItemGrid = (items, type) => {
    const gridCols = type === 'genres' ? 'grid-cols-3' : 'grid-cols-2';
    const textAlign = type === 'genres' ? 'text-center' : 'text-left';

    return (
      <div className={`grid ${gridCols} gap-1`}>
        {items.map((item, index) => {
          const itemId = createItemId(selectedArtform, type.slice(0, -1), index);
          const isSelected = type === 'genres'
            ? selectedGenres.has(itemId)
            : selectedMediumItems.has(itemId);
          const isHovered = hoveredMediumItem === itemId;

          return (
            <button
              key={index}
              className={`p-3 rounded text-xs ${textAlign} transition-all duration-200 flex items-center ${
                type === 'genres' ? 'justify-center' : 'justify-between'
              } ${
                isSelected
                  ? `${theme.selected} border ${theme.border}`
                  : isHovered
                    ? `${theme.hover} border ${theme.border}`
                    : `${theme.cardBackground} ${theme.border} border hover:${theme.hover}`
              }`}
              onMouseEnter={() => setHoveredMediumItem(itemId)}
              onMouseLeave={() => setHoveredMediumItem(null)}
              onClick={() => type === 'genres'
                ? handleGenreClick(itemId)
                : toggleItemSelection(itemId, 'medium')
              }
            >
              <span className={`${
                isSelected
                  ? (isLightMode ? 'text-amber-100' : 'text-amber-300/50')
                  : isHovered
                    ? (isLightMode ? 'text-stone-800' : 'text-stone-300')
                    : theme.text
              }`}>
                {item.label}
              </span>

              {type === 'mediums' && (
                <div className={`w-4 h-4 rounded border-2 transition-all ${
                  isSelected
                    ? 'bg-amber-200/30 border-stone-500 hover:bg-amber-200/40'
                    : 'border-stone-800 hover:border-stone-700'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-stone-500 hover:text-stone-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const renderContent = () => {
    if (!selectedArtform) {
      return (
        <div className="space-y-2">
          {Object.entries(artForms).map(([artFormKey, artForm]) =>
            renderArtformCard(artFormKey, artForm)
          )}
        </div>
      );
    }

    const artformLabel = artForms[selectedArtform].label;
    const items = filterType === 'genres'
      ? artForms[selectedArtform].genres
      : artForms[selectedArtform].mediums;

    return (
      <div className="space-y-4">
        <div className={`text-xs ${theme.textMuted} flex items-center gap-2`}>
          <span className={theme.accent}>{artformLabel}</span>
          <span>→ Choose {filterType}</span>
        </div>
        {renderItemGrid(items, filterType)}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className={`flex items-center justify-between border-b ${theme.border} pb-3`}>
        <div className="flex items-center gap-3">
          {selectedArtform && (
            <button
              onClick={handleBackClick}
              className={`flex items-center gap-1 ${theme.textMuted} hover:${theme.text} transition-colors text-xs focus:outline-none rounded px-2 py-1`}
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
            {getHeaderTitle()}
          </h3>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}