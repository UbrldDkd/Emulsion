import { Keys } from '../../../../Keys.js';
import Era from './Era.jsx';
import { useEffect, useRef, useState } from 'react';

export default function MovementListView({
  expandedEras, setExpandedEras, selectedEras, selectedMovements,
  setSelectedMovements, hoveredMovement, setHoveredMovement, onZoomToEra
}) {
  const { movementsByEra } = Keys.filters;

  const toggleSet = (setState, key) => setState(prev => {
    const newSet = new Set(prev);
    newSet.has(key) ? newSet.delete(key) : newSet.add(key);
    return newSet;
  });

  const toggleEra = (eraKey) => toggleSet(setExpandedEras, eraKey);
  const toggleMovementSelection = (movementId) => toggleSet(setSelectedMovements, movementId);

  const clearEraSelections = (eraId, eraMovements) => {
    setSelectedMovements(prev => {
      const newSet = new Set(prev);
      eraMovements.forEach(movement => newSet.delete(`${eraId}-${movement.label}`));
      return newSet;
    });
  };

  return (
    <div className="relative">

      <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
      {Object.entries(movementsByEra).map(([eraKey, era]) => {
        const eraId = era.label.toLowerCase().replace(/\s+/g, '-');
        const selectedCount = era.movements.filter(movement =>
          selectedMovements?.has(`${eraId}-${movement.label}`)
        ).length;

        return (
          <Era
            key={eraKey}
            eraKey={eraKey}
            era={era}
            eraId={eraId}
            isExpanded={expandedEras.has(eraId)}
            isEraSelected={selectedEras?.has(eraId)}
            selectedCount={selectedCount}
            selectedMovements={selectedMovements}
            hoveredMovement={hoveredMovement}
            setHoveredMovement={setHoveredMovement}
            toggleEra={toggleEra}
            toggleMovementSelection={toggleMovementSelection}
            clearEraSelections={clearEraSelections}
            onZoomToEra={onZoomToEra}
          />
        );
      })}
      </div>
    </div>
  );
}