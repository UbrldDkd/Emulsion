import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext.jsx';

export default function ArtistsFilter() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtists, setSelectedArtists] = useState(new Set());
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchContainerRef = useRef(null);

  // Mock data - replace with your actual data
  const allArtists = [
    { name: 'Leonardo da Vinci', period: '1452-1519', movement: 'Renaissance' },
    { name: 'Vincent van Gogh', period: '1853-1890', movement: 'Post-Impressionism' },
    { name: 'Pablo Picasso', period: '1881-1973', movement: 'Cubism' },
    { name: 'Claude Monet', period: '1840-1926', movement: 'Impressionism' },
    { name: 'Michelangelo', period: '1475-1564', movement: 'Renaissance' },
    { name: 'Rembrandt van Rijn', period: '1606-1669', movement: 'Baroque' },
    { name: 'Andy Warhol', period: '1928-1987', movement: 'Pop Art' },
    { name: 'Georgia O\'Keeffe', period: '1887-1986', movement: 'Modernism' },
    { name: 'Salvador Dalí', period: '1904-1989', movement: 'Surrealism' },
    { name: 'Auguste Renoir', period: '1841-1919', movement: 'Impressionism' },
    { name: 'Edgar Degas', period: '1834-1917', movement: 'Impressionism' },
    { name: 'Henri Matisse', period: '1869-1954', movement: 'Fauvism' }
  ];

  const displayArtists = (() => {
    if (showOnlySelected) {
      return allArtists.filter(artist => selectedArtists.has(artist.name));
    }
    
    return searchTerm 
      ? allArtists.filter(artist => artist.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : allArtists.slice(0, 8); // Show first 8 as recommendations
  })();

  const toggleArtist = (artistName) => {
    setSelectedArtists(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artistName)) {
        newSet.delete(artistName);
        // If this was the last selected artist and we're showing only selected, go back to search
        if (newSet.size === 0 && showOnlySelected) {
          setShowOnlySelected(false);
        }
      } else {
        newSet.add(artistName);
      }
      return newSet;
    });
  };

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-4 pb-4">
      {/* Header */}
      <div className="relative">
        <div className="text-center pt-3 pb-6 px-4">
          <h3 className={`${theme.textSecondary} text-lg font-extralight tracking-[0.3em] uppercase mb-2`}>Magistri Artium</h3>
          <p className={`${theme.textMuted} text-xs font-light tracking-wide`}>Search visual artists</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent"></div>
      </div>

      {/* Search Input */}
      <div className="relative" ref={searchContainerRef}>
        <input
          type="text"
          placeholder="Search artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSearchResults(true)}
          className={`w-full ${theme.input} ${theme.inputFocus} px-4 py-3 pl-10 transition-all`}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className={`h-4 w-4 ${theme.textMuted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Results / Recommendations */}
      <div className="max-h-48 overflow-y-auto space-y-1 scrollbar-hide">
          <div className={`text-xs ${theme.textMuted} mb-3 font-medium`}>
            {showOnlySelected 
              ? `SELECTED (${displayArtists.length})`
              : searchTerm 
                ? `RESULTS (${displayArtists.length})` 
                : 'RECOMMENDED'
            }
          </div>
          {displayArtists.map((artist, index) => {
            const isSelected = selectedArtists.has(artist.name);
            return (
              <button
                key={index}
                onClick={() => toggleArtist(artist.name)}
                className={`w-full text-left p-2 ${theme.border} transition-all duration-200 ${
                  isSelected 
                    ? theme.selected 
                    : `${theme.cardBackground} ${theme.hover} ${theme.textSecondary}`
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{artist.name}</div>
                    <div className={`text-xs ${theme.textMuted} mt-0.5`}>
                      {artist.period} • {artist.movement}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                      <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

      {/* Selected Count */}
      {selectedArtists.size > 0 && (
        <div className={`flex items-center justify-between ${theme.cardBackground} ${theme.border} px-3 py-2`}>
          <button
            onClick={() => setShowOnlySelected(!showOnlySelected)}
            className="flex items-center gap-2 text-xs hover:text-amber-300 transition-colors"
          >
            <span className={`${theme.accent} font-medium`}>{selectedArtists.size}</span>
            <span className={`${theme.textMuted}`}>selected</span>
            <svg 
              className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${
                showOnlySelected ? 'rotate-180' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => {
              setSelectedArtists(new Set());
              setShowOnlySelected(false);
            }}
            className={`text-xs ${theme.textMuted} hover:text-red-400 ${theme.border} hover:border-red-600/30 px-2 py-1 transition-all`}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}