import { useState } from 'react';
import MovementListView from './MovementListView.jsx';
import { useTheme } from '../../../../../contexts/ThemeContext.jsx';

export default function EraFilter(props) {
  const { theme } = useTheme();
  const { setShowTimeline, timelineViewerRef } = props;
  const [showTimelineTooltip, setShowTimelineTooltip] = useState(false);

  const zoomTo = (method, id) => {
    setShowTimeline(true);
    setTimeout(() => {
      timelineViewerRef.current?.[method]?.(id);
    }, 100);
  };

  const handleZoomToEra = (id) => zoomTo('zoomToFitEra', id);
  const handleZoomToMovement = (id) => zoomTo('zoomToMovement', id);

  return (
    <div className="space-y-4">
      {/* Header with Timeline Toggle */}
      <div className={`flex items-center border-b ${theme.border} pb-3`}>
        <button
          onClick={() => props.setShowTimeline(!props.showTimeline)}
          onMouseEnter={() => setShowTimelineTooltip(true)}
          onMouseLeave={() => setShowTimelineTooltip(false)}
          className={`mr-3 w-8 h-8 rounded flex items-center justify-center transition-colors ${
            props.showTimeline
              ? `${theme.accent} ${theme.selected}`
              : `${theme.textMuted} ${theme.hover} hover:${theme.accent}`
          } relative`}
          title="Timeline View"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.158.69-.158 1.006 0l4.994 2.497c.317.158.69.158 1.007 0z" />
          </svg>

          {/* Tooltip */}
          {!props.showTimeline && showTimelineTooltip && (
            <div className={`absolute right-full top-1/2 -translate-y-1/2 mr-2 ${theme.cardBackground} ${theme.text} text-xs px-3 py-2 rounded-md shadow-lg whitespace-nowrap transition-opacity ${
              showTimelineTooltip ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="font-medium">Timeline View</div>
              <div className={`${theme.textMuted} text-[10px]`}>Visual timeline with branching eras</div>
            </div>
          )}
        </button>

        <div className={`${theme.text} text-sm font-light tracking-wide`}>
          Select an Era/Movement
        </div>
      </div>

      {/* List View */}
      <MovementListView
        {...props}
        onZoomToEra={handleZoomToEra}
        onZoomToMovement={handleZoomToMovement}
      />
    </div>
  );
}