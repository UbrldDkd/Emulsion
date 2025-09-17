import { useState } from 'react';
import { useTheme } from '../../../../../contexts/ThemeContext.jsx';
import IconButton from '../../../../common/IconButton.jsx';
import { DEVICE_TYPES } from '../../../../../constants/filterConstants.js';
import { propShapes, validateDeviceType } from '../../../../../utils/propValidation.js';
import { withMemo, compareEraProps, useMemoizedCallback } from '../../../../../utils/performanceHelpers.js';

function Era({
  eraKey,
  era,
  eraId,
  isExpanded,
  isEraSelected,
  selectedCount,
  selectedMovements,
  hoveredMovement,
  setHoveredMovement,
  toggleEra,
  toggleMovementSelection,
  clearEraSelections,
  onZoomToEra,
  onZoomToMovement,
  showTimeline,
  deviceType = DEVICE_TYPES.DESKTOP
}) {
  const { theme } = useTheme();
  const [hoveredEra, setHoveredEra] = useState(null);

  // Validate and normalize props
  const normalizedDeviceType = validateDeviceType(deviceType);
  const isLightMode = theme.cardBackground.includes('stone') && theme.text.includes('950');

  // Memoized style functions
  const getMovementTextColor = useMemoizedCallback((isSelected, isHovered) => {
    if (isSelected) return 'text-amber-200/60';
    if (isHovered) return isLightMode ? 'text-stone-700' : 'text-amber-100/50';
    return isLightMode ? 'text-stone-800' : 'text-stone-200';
  }, [isLightMode]);

  const getPeriodTextColor = useMemoizedCallback((isHovered, isSelected) => {
    if (isHovered && !isSelected) return isLightMode ? 'text-stone-600' : 'text-stone-400';
    return isLightMode ? 'text-stone-500' : 'text-stone-300';
  }, [isLightMode]);

  // Memoized event handlers
  const handleEraClick = useMemoizedCallback(() => {
    toggleEra(eraId);
  }, [toggleEra, eraId]);

  const handleEraMouseEnter = useMemoizedCallback(() => {
    setHoveredEra(eraId);
  }, [eraId]);

  const handleEraMouseLeave = useMemoizedCallback(() => {
    setHoveredEra(null);
  }, []);

  const handleClearSelections = useMemoizedCallback((e) => {
    e.stopPropagation();
    clearEraSelections(eraId, era.movements);
  }, [clearEraSelections, eraId, era.movements]);

  const handleZoomToEra = useMemoizedCallback((e) => {
    e.stopPropagation();
    console.log('Era zoom button clicked! eraId:', eraId, 'onZoomToEra:', onZoomToEra);
    if (onZoomToEra) {
      onZoomToEra(eraId);
    } else {
      console.log('onZoomToEra is not available');
    }
  }, [onZoomToEra, eraId]);

  const handleMovementClick = useMemoizedCallback((movementId) => () => {
    toggleMovementSelection(movementId);
  }, [toggleMovementSelection]);

  const handleMovementMouseEnter = useMemoizedCallback((movementId) => () => {
    setHoveredMovement(movementId);
  }, [setHoveredMovement]);

  const handleMovementMouseLeave = useMemoizedCallback(() => {
    setHoveredMovement(null);
  }, [setHoveredMovement]);

  const handleZoomToMovement = useMemoizedCallback((movementId) => (e) => {
    e.stopPropagation();
    onZoomToMovement(movementId);
  }, [onZoomToMovement]);

  // Zoom icon component
  const ZoomIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );

  const EyeIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  return (
    <div className={`border ${theme.border} rounded-lg overflow-hidden`}>
      {/* Era Header */}
      <div
        className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
          isEraSelected ? theme.selected : `${theme.cardBackground} ${theme.hover}`
        }`}
        onClick={handleEraClick}
        onMouseEnter={handleEraMouseEnter}
        onMouseLeave={handleEraMouseLeave}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`${theme.text} text-sm font-medium`}>{era.label}</span>
            <span className="text-stone-300 text-xs">({era.period})</span>
            {selectedCount > 0 && (
              <button
                onClick={handleClearSelections}
                className="group bg-amber-200/30 border border-stone-500 text-amber-200/60 text-xs px-1.5 py-0.5 rounded-full font-medium hover:pr-6 hover:bg-amber-200/50 active:bg-amber-200/50 transition-all duration-200 ease-in-out relative overflow-hidden"
                title="Click to clear selections from this era"
              >
                <span className="relative z-10">{selectedCount}</span>
                <svg className="w-3 h-3 absolute right-1.5 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          {onZoomToEra && hoveredEra === eraId && (
            <IconButton
              onClick={handleZoomToEra}
              title="Zoom to timeline"
              icon={<ZoomIcon />}
            />
          )}

          <svg className={`w-4 h-4 ${theme.textMuted} transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Movements List */}
      {isExpanded && (
        <div className={`border-t ${theme.border} ${isLightMode ? 'bg-stone-100/25' : 'bg-stone-800/40'} backdrop-blur-sm`}>
          {era.movements.map((movement, index) => {
            const movementId = `${eraId}-${movement.label}`;
            const isSelected = selectedMovements?.has(movementId);
            const isHovered = hoveredMovement === movementId;

            return (
              <div
                key={index}
                data-movement-id={movementId}
                className={`flex items-center justify-between p-2 border-b ${theme.border} last:border-b-0 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? `${theme.selected} ${isLightMode ? 'hover:bg-stone-300/60' : 'hover:bg-stone-600/70'}`
                    : isHovered
                      ? isLightMode
                        ? 'bg-stone-200/70 hover:bg-stone-200/80'
                        : 'bg-stone-700/50 hover:bg-stone-700/70'
                      : isLightMode
                        ? 'hover:bg-stone-200/40'
                        : 'hover:bg-stone-700/30'
                }`}
                onMouseEnter={handleMovementMouseEnter(movementId)}
                onMouseLeave={handleMovementMouseLeave}
                onClick={handleMovementClick(movementId)}
              >
                <div className="flex-1">
                  <div className={`text-sm ${getMovementTextColor(isSelected, isHovered)}`}>
                    {movement.label}
                  </div>
                  <div className={`text-xs ${getPeriodTextColor(isHovered, isSelected)}`}>
                    {movement.period}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Eye icon for zooming to movement on timeline */}
                  {onZoomToMovement && showTimeline && isExpanded && normalizedDeviceType === DEVICE_TYPES.MOBILE && (
                    <IconButton
                      onClick={handleZoomToMovement(movementId)}
                      title="View on timeline"
                      icon={<EyeIcon />}
                    />
                  )}

                  <div className={`w-4 h-4 rounded border-2 transition-all ${
                    isSelected ? 'bg-amber-200/30 border-stone-500' : 'border-stone-800 hover:border-stone-700'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-amber-100" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Export memoized version with custom comparison
export default withMemo(Era, compareEraProps);