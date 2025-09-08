import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Keys } from '../../Keys.js';
import MovementDisplay from './MovementDisplay.jsx';

export default function AdvancedSearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    artForm: null,
    medium: null,
    genre: null,
    movement: null,
    year: null,
    artist: null,
  });

  const { artForms, filters } = Keys;
  const { movementsByEra } = filters;
    
  return (
    <div className="relative">
      {/* Search Button - Icon Only */}
      <button
        className="flex items-center justify-center bg-stone-800 hover:bg-stone-700 text-stone-200 p-2 rounded transition-colors"
        title="Advanced Search"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      </button>

      {/* Advanced Search Panel */}
      <div className="absolute right-10 mt-2 bg-stone-800 border border-stone-700 rounded-lg shadow-xl z-50 transition-all duration-200 ease-out">
        <div className="relative flex">
          {/* Left Side Button */}
          <div className="relative">
            <button
              className="absolute top-2/3 -translate-y-1/2 -left-9 w-9 h-20 rounded-l-lg text-xs font-medium transition-all duration-300 ease-out bg-stone-700 text-stone-300 hover:bg-stone-600 flex items-center justify-center"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              Movements
            </button>
            
            {/* Left Side Panel - Movements */}
            <div className="absolute right-full top-0 w-56 bg-stone-800 border-r border-stone-700 rounded-l-lg max-h-96 overflow-hidden transition-all duration-300 ease-out">
              <div className="p-3 max-h-96 overflow-y-auto scrollbar-hide">
                {/* Movements content */}
                <div className="space-y-2">
                  {Object.entries(movementsByEra).map(([key, era]) => (
                    <div key={key} className="mb-3">
                      <button className="w-full text-left p-2 hover:bg-stone-700 rounded text-xs">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-amber-400 font-semibold">{era.label}</span>
                            <span className="text-stone-500 text-xs ml-2">{era.period}</span>
                          </div>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                      <div className="ml-2 space-y-1">
                        {era.movements.map((movement, index) => (
                          <div key={index} >
                          <MovementDisplay content={movement} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Center Panel - Years */}
          <div className="w-80 p-4">
            <h3 className="text-sm font-medium text-stone-200 mb-3">Search by Year</h3>
            <div>
              <label className="block text-xs text-stone-400 mb-1">Enter a specific year</label>
              <input
                type="number"
                placeholder="e.g., 1889"
                min="-3000"
                max="2024"
                className="w-full bg-stone-700 border border-stone-600 rounded px-3 py-2 text-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
              />
              <div className="mt-2 flex flex-wrap gap-1">
               
              </div>
            </div>
          </div>

          {/* Right Side Button */}
          <div className="relative">
            <button
              className="absolute top-2/3 -translate-y-1/2 -right-9 w-9 h-20 rounded-r-lg text-xs font-medium transition-all duration-300 ease-out bg-stone-700 text-stone-300 hover:bg-stone-600 flex items-center justify-center"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              Artists
            </button>
            
            {/* Right Side Panel - Artists */}
            <div className="absolute left-full top-0 w-48 bg-stone-800 border-l border-stone-700 rounded-r-lg max-h-80 overflow-hidden transition-all duration-300 ease-out">
              <div className="p-3 max-h-80 overflow-y-auto scrollbar-hide">
                <input
                  type="text"
                  placeholder="e.g., Leonardo da Vinci"
                  className="w-full bg-stone-700 border border-stone-600 rounded px-3 py-2 text-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 mb-3"
                />
                <div className="space-y-1">
                  <button className="w-full text-left px-2 py-1 bg-stone-700 hover:bg-stone-600 text-stone-400 text-xs rounded">
                    Van Gogh
                  </button>
                  <button className="w-full text-left px-2 py-1 bg-stone-700 hover:bg-stone-600 text-stone-400 text-xs rounded">
                    Monet
                  </button>
                  <button className="w-full text-left px-2 py-1 bg-stone-700 hover:bg-stone-600 text-stone-400 text-xs rounded">
                    Picasso
                  </button>
                  <button className="w-full text-left px-2 py-1 bg-stone-700 hover:bg-stone-600 text-stone-400 text-xs rounded">
                    Da Vinci
                  </button>
                  <button className="w-full text-left px-2 py-1 bg-stone-700 hover:bg-stone-600 text-stone-400 text-xs rounded">
                    Rembrandt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel Button */}
        <div className="relative">
          <button
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 px-4 py-2 rounded-b-lg text-xs font-medium transition-all duration-300 ease-out bg-stone-700 text-stone-300 hover:bg-stone-600"
          >
            Media Form & Medium
          </button>
          
          {/* Bottom Panel - Media Form and Medium */}
          <div className="absolute top-full left-0 right-0 bg-stone-800 border border-stone-700 border-t-0 rounded-b-lg transition-all duration-300 ease-out">
            <div className="p-4 grid grid-cols-3 gap-4">
              {/* Art Form Selection */}
              <div>
                <label className="block text-xs text-stone-400 mb-1">Art Form</label>
                <button className="w-full bg-stone-700 border border-stone-600 rounded px-3 py-2 text-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 flex items-center justify-between hover:bg-stone-600 transition-colors">
                  <span>Choose form...</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Medium Selection */}
              <div>
                <label className="block text-xs text-stone-400 mb-1">Medium</label>
                <button className="w-full bg-stone-700 border border-stone-600 rounded px-3 py-2 text-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 flex items-center justify-between hover:bg-stone-600 transition-colors">
                  <span>Any medium</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Genre Selection */}
              <div>
                <label className="block text-xs text-stone-400 mb-1">Genre</label>
                <button className="w-full bg-stone-700 border border-stone-600 rounded px-3 py-2 text-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 flex items-center justify-between hover:bg-stone-600 transition-colors">
                  <span>Any genre</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-stone-700 p-4 flex items-center justify-between">
          <button className="text-stone-400 hover:text-stone-200 text-sm transition-colors">
            Clear
          </button>
          <div className="space-x-2">
            <button className="px-4 py-2 text-stone-400 hover:text-stone-200 text-sm transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm font-medium transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}