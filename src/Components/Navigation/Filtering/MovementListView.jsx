import { useState } from 'react';
import { Keys } from '../../Keys.js';
import { useTheme } from '../../../contexts/ThemeContext.jsx';

export default function MovementListView({
  expandedEras,
  setExpandedEras,
  selectedEras,
  selectedMovements,
  setSelectedMovements,
  hoveredMovement,
  setHoveredMovement,
  onZoomToEra
}) {
  const { theme } = useTheme();
  const { movementsByEra } = Keys.filters;
  const [hoveredEra, setHoveredEra] = useState(null);

  const toggleEra = (eraKey) => {
    setExpandedEras(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eraKey)) {
        newSet.delete(eraKey);
      } else {
        newSet.add(eraKey);
      }
      return newSet;
    });
  };

  const toggleMovementSelection = (movementId) => {
    setSelectedMovements(prev => {
      const newSet = new Set(prev);
      if (newSet.has(movementId)) {
        newSet.delete(movementId);
      } else {
        newSet.add(movementId);
      }
      return newSet;
    });
  };

  const clearEraSelections = (eraId, eraMovements) => {
    setSelectedMovements(prev => {
      const newSet = new Set(prev);
      eraMovements.forEach(movement => {
        const movementId = `${eraId}-${movement.label}`;
        newSet.delete(movementId);
      });
      return newSet;
    });
  };

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
      {Object.entries(movementsByEra).map(([eraKey, era]) => {
        const eraId = era.label.toLowerCase().replace(/\s+/g, '-');
        const isExpanded = expandedEras.has(eraId);
        const isEraSelected = selectedEras && selectedEras.has(eraId);
        
        // Count selected movements in this era
        const selectedCount = era.movements.filter(movement => {
          const movementId = `${eraId}-${movement.label}`;
          return selectedMovements && selectedMovements.has(movementId);
        }).length;

        return (
          <div key={eraKey} className={`border ${theme.border} rounded-lg overflow-hidden`}>
            {/* Era Header */}
            <div
              className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                isEraSelected 
                  ? theme.selected 
                  : `${theme.cardBackground} ${theme.hover}`
              }`}
              onClick={() => toggleEra(eraId)}
              onMouseEnter={() => setHoveredEra(eraId)}
              onMouseLeave={() => setHoveredEra(null)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`${theme.text} text-sm font-medium`}>{era.label}</span>
                  <span className={`${theme.textMuted} text-xs`}>({era.period})</span>
                  {selectedCount > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearEraSelections(eraId, era.movements);
                      }}
                      className="group bg-amber-500 text-amber-950 text-xs px-1.5 py-0.5 rounded-full font-medium hover:pr-6 transition-all duration-200 ease-in-out relative overflow-hidden"
                      title="Click to clear selections from this era"
                    >
                      <span className="relative z-10">{selectedCount}</span>
                      <svg 
                        className="w-3 h-3 absolute right-1.5 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className={`${theme.textMuted} text-xs mt-0.5`}>
                  {era.movements.length} movements
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Zoom to Timeline Button */}
                {onZoomToEra && hoveredEra === eraId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onZoomToEra(eraId);
                    }}
                    className={`p-1 rounded ${theme.textMuted} hover:${theme.accent} ${theme.hover} transition-colors`}
                    title="Zoom to timeline"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </button>
                )}
                
                {/* Expand/Collapse Icon */}
                <svg 
                  className={`w-4 h-4 ${theme.textMuted} transition-transform duration-200 ${
                    isExpanded ? 'rotate-90' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Movements List */}
            {isExpanded && (
              <div className={`border-t ${theme.border} ${
                theme.cardBackground.includes('stone') && theme.text.includes('950')
                  ? 'bg-stone-200/25 backdrop-blur-sm' 
                  : 'bg-stone-900/40 backdrop-blur-sm'
              }`}>
                {era.movements.map((movement, index) => {
                  const movementId = `${eraId}-${movement.label}`;
                  const isSelected = selectedMovements && selectedMovements.has(movementId);
                  const isHovered = hoveredMovement === movementId;

                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 border-b ${theme.border} last:border-b-0 cursor-pointer transition-colors ${
                        isSelected 
                          ? `${theme.selected} ${theme.hover}` 
                          : isHovered
                            ? theme.hover.replace('hover:', '')
                            : theme.hover
                      }`}
                      onMouseEnter={() => setHoveredMovement(movementId)}
                      onMouseLeave={() => setHoveredMovement(null)}
                      onClick={() => toggleMovementSelection(movementId)}
                    >
                      <div className="flex-1">
                        <div className={`text-sm ${
                          isSelected 
                            ? theme.accent 
                            : isHovered
                              ? theme.text
                              : theme.textSecondary
                        }`}>
                          {movement.label}
                        </div>
                        <div className={`${theme.textMuted} text-xs`}>
                          {movement.period}
                        </div>
                      </div>
                      
                      {/* Selection Indicator */}
                      <div className={`w-4 h-4 rounded border-2 transition-all ${
                        isSelected 
                          ? 'bg-amber-600 border-amber-600' 
                          : `${theme.border.replace('border-', 'border-')} hover:${theme.textMuted.replace('text-', 'border-')}`
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}