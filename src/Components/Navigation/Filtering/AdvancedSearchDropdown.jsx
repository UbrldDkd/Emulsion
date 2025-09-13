import { useState, useEffect, useRef } from 'react';
import TimelineViewer from './TimelineViewer.jsx';
import MovementListView from './MovementListView.jsx';
import YearFilter from './YearFilter.jsx';
import ArtistsFilter from './ArtistsFilter.jsx';
import EraFilter from './EraFilter.jsx';
import ArtformFilter from './ArtformFilter.jsx';
import ThemeToggle from '../../ThemeToggle.jsx';
import { useTheme } from '../../../contexts/ThemeContext.jsx';

export default function AdvancedSearchDropdown() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [filterByOpen, setFilterByOpen] = useState(false);
  const [filterBy, setFilterBy] = useState('Year');
  const [showTooltip, setShowTooltip] = useState(false);
  const [yearRange, setYearRange] = useState({ from: '', to: '' });
  const [showTimeline, setShowTimeline] = useState(false); // Timeline is collapsible
  const [expandedEras, setExpandedEras] = useState(new Set()); // Shared between list and timeline
  const [selectedEras, setSelectedEras] = useState(new Set()); // Selected eras
  const [selectedMovements, setSelectedMovements] = useState(new Set()); // Selected movements
  const [hoveredMovement, setHoveredMovement] = useState(null); // Shared hover state
  const timelineViewerRef = useRef(null); // Reference to TimelineViewer for zoom functionality


  // State for MediaDisplay
  const [selectedMediaItems, setSelectedMediaItems] = useState(new Set());
  const [hoveredMediaItem, setHoveredMediaItem] = useState(null);
  
  // Artform filter states
  const [artformFilterState, setArtformFilterState] = useState({
    selectedArtform: null,
    filterType: null,
    showMediums: false,
    selectedGenres: new Set()
  });

  // Clear filters based on current filterBy
  const clearCurrentFilters = () => {
    switch (filterBy) {
      case 'Era':
        setSelectedEras(new Set());
        setSelectedMovements(new Set());
        setExpandedEras(new Set());
        break;
      case 'Artform':
      case 'Medium':
      case 'Genre':
        setSelectedMediaItems(new Set());
        break;
      case 'Year':
        setYearRange({ from: '', to: '' });
        break;
      case 'Artists':
        // Clear artist selections if you have them
        break;
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedEras(new Set());
    setSelectedMovements(new Set());
    setExpandedEras(new Set());
    setSelectedMediaItems(new Set());
    setYearRange({ from: '', to: '' });
    setShowTimeline(false);
    // Clear any other filter states
  };

  const dropdownRef = useRef(null);
  const advancedPanelRef = useRef(null);
  const timelineRef = useRef(null);


  function handleSelectFilterBy(type) {
    setFilterBy(type);
    setFilterByOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      // Close filter by dropdown if clicking outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterByOpen(false);
      }
      
      // Close advanced panel if clicking outside of it (but not timeline)
      if (advancedPanelRef.current && !advancedPanelRef.current.contains(event.target) &&
          (!timelineRef.current || !timelineRef.current.contains(event.target))) {
        setIsOpen(false);
        setShowTimeline(false); // Close timeline when closing main panel
        clearAllFilters(); // Clear all filters when dropdown closes
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filterOptions = ['Year', 'Artists', 'Era', 'Artform'];
  const availableOptions = filterOptions.filter(option => option !== filterBy);

  return (
    <>
      <div className="relative">
        {/* Search Button - Icon Only */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => !isOpen && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="flex items-center justify-center bg-transparent border-none rounded-r px-3 h-[44px] text-stone-100 hover:text-amber-400 hover:border hover:border-amber-400 hover:border-l-0 active:text-stone-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </button>
        
        {/* Custom Tooltip */}
        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-200 ${
          showTooltip && !isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}>
              <div className="bg-stone-900 text-stone-100 text-xs px-3 py-2 rounded-md shadow-lg border border-stone-700 w-max">
                <div className="font-medium text-stone-100 mb-1.5 text-center">Advanced Search Filters</div>
                <div className="text-stone-100 text-[10px] mb-1">Filter by:</div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px]">
                  <span className="text-amber-400">• year</span>
                  <span className="text-amber-400">• artist</span>
                  <span className="text-amber-400">• era</span>
                  <span className="text-amber-400">• artform</span>
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-stone-900"></div>
              </div>
            </div>
      </div>

      {/* Timeline Panel - Conditionally rendered at main level */}
      {showTimeline && filterBy === 'Era' && isOpen && (
        <div 
          ref={timelineRef}
          className={`absolute right-96 mt-4 w-96 h-[550px] ${
            theme.cardBackground.includes('stone') && theme.text.includes('950')
              ? 'bg-stone-100/70 backdrop-blur-xl'
              : 'bg-stone-800/90 backdrop-blur-xl'
          } rounded-l shadow-xl p-4 z-[60] transition-all duration-300 ease-out transform ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
              : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          <div className={`${theme.textMuted} text-xs uppercase tracking-wider mb-3`}>
            Timeline View
          </div>
          <TimelineViewer 
            ref={timelineViewerRef}
            viewMode="timeline"
            expandedEras={expandedEras}
            setExpandedEras={setExpandedEras}
            selectedMovements={selectedMovements}
            hoveredMovement={hoveredMovement}
            setHoveredMovement={setHoveredMovement}
          />
        </div>
      )}

      {/* Main Advanced Search Panel */}
          <div 
            ref={advancedPanelRef}
        className={`absolute right-0.5 mt-4 ${theme.cardBackground} ${theme.border} rounded shadow-xl z-50 transition-all duration-300 ease-out transform ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}
          >
            <div className="relative flex">
          {/* Main Center Panel - Years */}
              <div className="w-96 p-4">

                <div className="relative">
                  <div className={`flex items-center justify-between text-sm font-medium ${theme.text}`}>
                    <div className="flex items-center gap-x-1">
                      <span>Search by</span>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setFilterByOpen(!filterByOpen)}
                        className={`flex items-center gap-x-1 px-2 py-1 ${theme.text} ${theme.hover} rounded transition-all duration-200`}
                      >
                        <span>{filterBy}</span>
                        <svg 
                      className={`w-4 h-4 transition-transform duration-300 ease-in-out ${filterByOpen ? 'rotate-90' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                  <div 
                    className={`absolute top-0 transition-all duration-300 ease-in-out overflow-hidden ${
                      filterByOpen 
                        ? 'left-full ml-1 opacity-100' 
                        : 'left-full ml-1 w-0 opacity-0'
                    }`}
                    style={{
                      width: filterByOpen ? 'auto' : '0px'
                    }}
                  >
                          <div className="flex items-center whitespace-nowrap">
                            <span className={`${theme.textMuted} text-sm px-1`}>or</span>
                            {availableOptions.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleSelectFilterBy(option)}
                                className={`px-2 py-1 ${theme.textSecondary} ${theme.hover} rounded transition-all duration-200 whitespace-nowrap`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                    </div>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
                
                <div className="mt-4">
                  {filterBy === 'Year' && (
                    <YearFilter 
                      yearRange={yearRange}
                      setYearRange={setYearRange}
                    />
                  )}

              {filterBy === 'Era' && (
                <EraFilter 
                  expandedEras={expandedEras}
                  setExpandedEras={setExpandedEras}
                  selectedEras={selectedEras}
                  setSelectedEras={setSelectedEras}
                  selectedMovements={selectedMovements}
                  setSelectedMovements={setSelectedMovements}
                  hoveredMovement={hoveredMovement}
                  setHoveredMovement={setHoveredMovement}
                  showTimeline={showTimeline}
                  setShowTimeline={setShowTimeline}
                  timelineViewerRef={timelineViewerRef}
                />
              )}

              {filterBy === 'Artists' && (
                <ArtistsFilter />
              )}

              {filterBy === 'Artform' && (
                <ArtformFilter 
                  selectedMediaItems={selectedMediaItems}
                  setSelectedMediaItems={setSelectedMediaItems}
                  hoveredMediaItem={hoveredMediaItem}
                  setHoveredMediaItem={setHoveredMediaItem}
                />
              )}
                </div>
              </div>
            </div>

        {/* Action Buttons */}
            <div className={`border-t ${theme.border} p-3 flex items-center justify-between`}>
          <button 
            onClick={clearCurrentFilters}
            className={`${theme.textMuted} hover:${theme.textSecondary} text-xs font-medium transition-colors`}
          >
                Clear All
              </button>
              <button 
                onClick={() => {
                  // If we're in a filter screen (genres/mediums), go back to artforms
                  if (filterBy === 'Artform' && (artformFilterState.selectedArtform || artformFilterState.selectedGenres.size > 0 || artformFilterState.showMediums)) {
                    // Reset artform filter state to return to main artform list
                    setArtformFilterState({
                      selectedArtform: null,
                      filterType: null,
                      showMediums: false,
                      selectedGenres: new Set()
                    });
                  } else {
                    // Apply search functionality for other filters or main artform page
                    console.log('Applying search with current filters');
                    // Add your search application logic here
                  }
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm backdrop-blur-sm ${
                theme.cardBackground.includes('stone') && theme.text.includes('950')
                  ? 'bg-stone-700 hover:bg-stone-600 active:bg-stone-800 text-stone-100 hover:text-white' // Light mode
                  : 'bg-stone-800 hover:bg-stone-700 active:bg-stone-900 text-stone-100 hover:text-white' // Dark mode - darker
              }`}>
                {(filterBy === 'Artform' && (artformFilterState.selectedArtform || artformFilterState.selectedGenres.size > 0 || artformFilterState.showMediums)) ? 'Done' : 'Apply Search'}
              </button>
            </div>
          </div>
      </div>
    </>
  );
}