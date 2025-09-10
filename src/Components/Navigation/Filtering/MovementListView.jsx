import { Keys } from '../../Keys.js';

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
  const { movementsByEra } = Keys.filters;

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

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {Object.entries(movementsByEra).map(([eraKey, era]) => {
        const eraId = era.label.toLowerCase().replace(/\s+/g, '-');
        const isExpanded = expandedEras.has(eraId);
        const isEraSelected = selectedEras && selectedEras.has(eraId);

        return (
          <div key={eraKey} className="border border-stone-700/30 rounded-lg overflow-hidden">
            {/* Era Header */}
            <div
              className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                isEraSelected 
                  ? 'bg-amber-600/20 border-amber-600/30' 
                  : 'bg-stone-800/50 hover:bg-stone-700/50'
              }`}
              onClick={() => toggleEra(eraId)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-stone-200 text-sm font-medium">{era.label}</span>
                  <span className="text-stone-500 text-xs">({era.period})</span>
                </div>
                <div className="text-stone-500 text-xs mt-0.5">
                  {era.movements.length} movements
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Zoom to Timeline Button */}
                {onZoomToEra && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onZoomToEra(eraId);
                    }}
                    className="p-1 rounded text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition-colors"
                    title="Zoom to timeline"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </button>
                )}
                
                {/* Expand/Collapse Icon */}
                <svg 
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
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
              <div className="border-t border-stone-700/30 bg-stone-900/30">
                {era.movements.map((movement, index) => {
                  const movementId = `${eraId}-${movement.label}`;
                  const isSelected = selectedMovements && selectedMovements.has(movementId);
                  const isHovered = hoveredMovement === movementId;

                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 border-b border-stone-700/20 last:border-b-0 cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-amber-600/10 hover:bg-amber-600/15' 
                          : isHovered
                            ? 'bg-stone-700/50'
                            : 'hover:bg-stone-700/30'
                      }`}
                      onMouseEnter={() => setHoveredMovement(movementId)}
                      onMouseLeave={() => setHoveredMovement(null)}
                      onClick={() => toggleMovementSelection(movementId)}
                    >
                      <div className="flex-1">
                        <div className={`text-sm ${
                          isSelected 
                            ? 'text-amber-300' 
                            : isHovered
                              ? 'text-stone-200'
                              : 'text-stone-300'
                        }`}>
                          {movement.label}
                        </div>
                        <div className="text-stone-500 text-xs">
                          {movement.period}
                        </div>
                      </div>
                      
                      {/* Selection Indicator */}
                      <div className={`w-4 h-4 rounded border-2 transition-all ${
                        isSelected 
                          ? 'bg-amber-500 border-amber-500' 
                          : 'border-stone-500 hover:border-stone-400'
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