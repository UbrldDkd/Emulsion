import { Keys } from '../../../../Keys.js';
import Era from './Era.jsx';
import { toggleSetItem, removeMultipleFromSet } from '../../../../../utils/setHelpers.js';

export default function MovementListView(props) {
  const { movementsByEra } = Keys.filters;
  const { setExpandedEras, setSelectedMovements, selectedMovements, expandedEras } = props;

  const actions = {
    toggleEra: (id) => setExpandedEras(prev => toggleSetItem(prev, id)),
    toggleMovement: (id) => setSelectedMovements(prev => toggleSetItem(prev, id)),
    clearEraSelections: (eraId, movements) => {
      const ids = movements.map(m => `${eraId}-${m.label}`);
      setSelectedMovements(prev => removeMultipleFromSet(prev, ids));
    }
  };

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
      {Object.entries(movementsByEra).map(([key, era]) => {
        const eraId = era.label.toLowerCase().replace(/\s+/g, '-');
        const selectedCount = era.movements.filter(m =>
          selectedMovements?.has(`${eraId}-${m.label}`)
        ).length;

        return (
          <Era
            key={key}
            {...props}
            era={era}
            eraId={eraId}
            eraKey={key}
            isExpanded={expandedEras.has(eraId)}
            selectedCount={selectedCount}
            toggleEra={actions.toggleEra}
            toggleMovementSelection={actions.toggleMovement}
            clearEraSelections={actions.clearEraSelections}
          />
        );
      })}
    </div>
  );
}