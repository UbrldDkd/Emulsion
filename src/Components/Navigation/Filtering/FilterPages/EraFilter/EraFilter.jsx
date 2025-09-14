import { useState } from 'react';
import MovementListView from './MovementListView.jsx';
import TimelineViewer from './TimelineViewer.jsx';
import { useTheme } from '../../../../../contexts/ThemeContext.jsx';

export default function EraFilter({
  expandedEras,
  setExpandedEras,
  selectedEras,
  setSelectedEras,
  selectedMovements,
  setSelectedMovements,
  hoveredMovement,
  setHoveredMovement,
  showTimeline,
  setShowTimeline,
  timelineViewerRef
}) {
  const { theme } = useTheme();
  const [showTimelineTooltip, setShowTimelineTooltip] = useState(false);

  // Function to handle zoom to era from MovementListView
  const handleZoomToEra = (eraId) => {
    setShowTimeline(true);
    // Use a timeout to allow the timeline to render before zooming
    setTimeout(() => {
      if (timelineViewerRef.current && timelineViewerRef.current.zoomToFitEra) {
        timelineViewerRef.current.zoomToFitEra(eraId);
      }
    }, 100);
  };

  return (
    <div className="space-y-4">
      {/* Header with Timeline Toggle */}
      <div className={`flex items-center border-b ${theme.border} pb-3`}>
        <div className="relative mr-3">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            onMouseEnter={() => setShowTimelineTooltip(true)}
            onMouseLeave={() => setShowTimelineTooltip(false)}
            className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${
              showTimeline 
                ? `${theme.accent} ${theme.selected}` 
                : `${theme.textMuted} ${theme.hover} hover:${theme.accent}`
            }`}
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.158.69-.158 1.006 0l4.994 2.497c.317.158.69.158 1.007 0z" />
            </svg>
          </button>

          {/* Custom Tooltip - Only when timeline is closed */}
          {!showTimeline && (
            <div className={`absolute right-full top-1/2 transform -translate-y-1/2 mr-2 transition-all duration-300 ease-out pointer-events-none z-10 ${
              showTimelineTooltip
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-4'
            }`}>
              <div className={`${theme.cardBackground} ${theme.text} text-xs px-3 py-2 rounded-md shadow-lg ${theme.border} whitespace-nowrap`}>
                <div className="font-medium mb-1">Timeline View</div>
                <div className={`${theme.textMuted} text-[10px]`}>
                  Show visual timeline with branching eras
                </div>
                <div className={`absolute left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent ${theme.cardBackground.includes('amber') ? 'border-l-amber-100' : 'border-l-stone-900'}`}></div>
              </div>
            </div>
          )}
        </div>
        <div className={`${theme.text} text-sm font-light tracking-wide`}>
          Select an Era/Movement
        </div>
      </div>

      {/* Primary List View - FULL WIDTH */}
      <MovementListView
        viewMode="list"
        expandedEras={expandedEras}
        setExpandedEras={setExpandedEras}
        selectedEras={selectedEras}
        setSelectedEras={setSelectedEras}
        selectedMovements={selectedMovements}
        setSelectedMovements={setSelectedMovements}
        hoveredMovement={hoveredMovement}
        setHoveredMovement={setHoveredMovement}
        onZoomToEra={handleZoomToEra}
        showTimeline={showTimeline}
      />
    </div>
  );
}