import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { filterOptions } from '../../hooks/useFilteredArtworks';

/**
 * Main filter controller component
 * Handles filter selection and routing logic
 */
export default function FilterController({ onClose }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Local filter state
  const [selectedFilters, setSelectedFilters] = useState({
    movements: [],
    eras: [],
    artforms: [],
    mediums: [],
    genres: [],
    artists: [],
    yearRange: null
  });

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const handleYearRangeChange = (min, max) => {
    setSelectedFilters(prev => ({
      ...prev,
      yearRange: (min || max) ? { min, max } : null
    }));
  };

  const applyFilters = () => {
    // Simple navigation - just go to discover page
    navigate('/discover');
    if (onClose) onClose();
  };

  const clearFilters = () => {
    setSelectedFilters({
      movements: [],
      eras: [],
      artforms: [],
      mediums: [],
      genres: [],
      artists: [],
      yearRange: null
    });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(filter => {
    if (Array.isArray(filter)) return filter.length > 0;
    if (typeof filter === 'object' && filter !== null) return true;
    return false;
  });


  return (
    <div className={`p-6 rounded-lg ${theme.cardBackground} space-y-6`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-semibold ${theme.text}`}>Filter Artworks</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className={`text-sm ${theme.textMuted} hover:${theme.accent} transition-colors`}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Movement Filter */}
      <FilterSection
        title="Movements"
        options={filterOptions.movements}
        selected={selectedFilters.movements}
        onChange={(values) => handleFilterChange('movements', values)}
        theme={theme}
      />

      {/* Era Filter */}
      <FilterSection
        title="Eras"
        options={filterOptions.eras}
        selected={selectedFilters.eras}
        onChange={(values) => handleFilterChange('eras', values)}
        theme={theme}
      />

      {/* Artform Filter */}
      <FilterSection
        title="Art Forms"
        options={filterOptions.artforms}
        selected={selectedFilters.artforms}
        onChange={(values) => handleFilterChange('artforms', values)}
        theme={theme}
      />

      {/* Medium Filter */}
      <FilterSection
        title="Mediums"
        options={filterOptions.mediums}
        selected={selectedFilters.mediums}
        onChange={(values) => handleFilterChange('mediums', values)}
        theme={theme}
      />

      {/* Genre Filter */}
      <FilterSection
        title="Genres"
        options={filterOptions.genres}
        selected={selectedFilters.genres}
        onChange={(values) => handleFilterChange('genres', values)}
        theme={theme}
      />

      {/* Artist Filter */}
      <FilterSection
        title="Artists"
        options={filterOptions.artists}
        selected={selectedFilters.artists}
        onChange={(values) => handleFilterChange('artists', values)}
        theme={theme}
      />

      {/* Year Range Filter */}
      <YearRangeFilter
        yearRange={selectedFilters.yearRange}
        onChange={handleYearRangeChange}
        theme={theme}
      />

      {/* Apply Button */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={applyFilters}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            hasActiveFilters
              ? `${theme.selected} hover:opacity-90`
              : `${theme.cardBackground} ${theme.border} border hover:${theme.hover}`
          }`}
        >
          {hasActiveFilters ? 'Apply Filters' : 'Browse All Artworks'}
        </button>
      </div>
    </div>
  );
}

/**
 * Individual filter section component
 */
function FilterSection({ title, options, selected, onChange, theme }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayLimit = 8;
  
  const toggleOption = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  const displayOptions = isExpanded ? options : options.slice(0, displayLimit);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className={`font-medium ${theme.text}`}>{title}</h3>
        {selected.length > 0 && (
          <span className={`text-sm ${theme.textMuted}`}>
            {selected.length} selected
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {displayOptions.map(option => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`p-2 text-left text-sm rounded transition-colors truncate ${
              selected.includes(option)
                ? `${theme.selected} border ${theme.border}`
                : `${theme.cardBackground} ${theme.border} border hover:${theme.hover}`
            }`}
            title={option}
          >
            {option}
          </button>
        ))}
      </div>
      
      {options.length > displayLimit && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-sm ${theme.textMuted} hover:${theme.accent} transition-colors`}
        >
          {isExpanded ? 'Show Less' : `Show ${options.length - displayLimit} More`}
        </button>
      )}
    </div>
  );
}

/**
 * Year range filter component
 */
function YearRangeFilter({ yearRange, onChange, theme }) {
  const [minYear, setMinYear] = useState(yearRange?.min || '');
  const [maxYear, setMaxYear] = useState(yearRange?.max || '');

  const handleApply = () => {
    const min = minYear ? parseInt(minYear) : null;
    const max = maxYear ? parseInt(maxYear) : null;
    onChange(min, max);
  };

  const handleClear = () => {
    setMinYear('');
    setMaxYear('');
    onChange(null, null);
  };

  return (
    <div className="space-y-3">
      <h3 className={`font-medium ${theme.text}`}>Year Range</h3>
      
      <div className="flex gap-2 items-center">
        <input
          type="number"
          placeholder="Min year"
          value={minYear}
          onChange={(e) => setMinYear(e.target.value)}
          className={`flex-1 p-2 text-sm rounded ${theme.cardBackground} ${theme.border} border`}
        />
        <span className={theme.textMuted}>to</span>
        <input
          type="number"
          placeholder="Max year"
          value={maxYear}
          onChange={(e) => setMaxYear(e.target.value)}
          className={`flex-1 p-2 text-sm rounded ${theme.cardBackground} ${theme.border} border`}
        />
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className={`flex-1 py-1 px-3 text-sm rounded ${theme.selected} hover:opacity-90 transition-opacity`}
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          className={`flex-1 py-1 px-3 text-sm rounded ${theme.cardBackground} ${theme.border} border hover:${theme.hover} transition-colors`}
        >
          Clear
        </button>
      </div>
    </div>
  );
}