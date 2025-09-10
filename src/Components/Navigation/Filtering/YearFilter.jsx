import { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext.jsx';

export default function YearFilter({ yearRange, setYearRange }) {
  const { theme } = useTheme();
  const [yearType, setYearType] = useState('specific'); // 'specific' or 'range'
  const [eraType, setEraType] = useState('CE'); // 'CE' or 'BCE'
  const [fromEraType, setFromEraType] = useState('BCE'); // 'CE' or 'BCE' for from
  const [toEraType, setToEraType] = useState('CE'); // 'CE' or 'BCE' for to
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipType, setTooltipType] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [yearInfo, setYearInfo] = useState('');

  // Historical periods/movements data
  const historicalPeriods = [
    { name: 'Ancient World', start: -3000, end: 500, movements: ['Egyptian', 'Greek', 'Roman'] },
    { name: 'Medieval', start: 500, end: 1400, movements: ['Byzantine', 'Gothic', 'Romanesque'] },
    { name: 'Renaissance', start: 1400, end: 1600, movements: ['Early Renaissance', 'High Renaissance', 'Mannerism'] },
    { name: 'Baroque', start: 1600, end: 1750, movements: ['Baroque', 'Rococo'] },
    { name: '19th Century', start: 1800, end: 1900, movements: ['Neoclassicism', 'Romanticism', 'Impressionism'] },
    { name: 'Modern', start: 1900, end: 1945, movements: ['Cubism', 'Expressionism', 'Surrealism'] },
    { name: 'Contemporary', start: 1945, end: new Date().getFullYear(), movements: ['Abstract Expressionism', 'Pop Art', 'Minimalism'] }
  ];

  const getYearInfo = (year) => {
    if (!year || isNaN(year)) return '';
    
    const numYear = parseInt(year);
    const adjustedYear = eraType === 'BCE' ? -Math.abs(numYear) : Math.abs(numYear);
    
    const period = historicalPeriods.find(p => adjustedYear >= p.start && adjustedYear <= p.end);
    
    if (period) {
      return `${period.name} • ${period.movements.join(', ')}`;
    }
    
    return adjustedYear < -3000 ? 'Prehistoric Era' : 'Modern Era';
  };

  // Debounced year info update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (yearType === 'specific' && yearRange.from) {
        const year = Math.abs(parseInt(yearRange.from));
        setYearInfo(getYearInfo(year));
      } else {
        setYearInfo('');
      }
    }, 300); // 300ms delay
    
    return () => {
      clearTimeout(timer);
    };
  }, [yearRange.from, eraType, yearType]);

  return (
    <div className="space-y-4">
      <style jsx="true">{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* Main input section */}
      <div className={`relative ${theme.gradient} ${theme.border} backdrop-blur-xl`}>
        <div className="p-6">
          {yearType === 'specific' ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="1850"
                  value={yearRange.from ? Math.abs(parseInt(yearRange.from)) || '' : ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const adjustedValue = eraType === 'BCE' && value ? `-${value}` : value;
                    setYearRange({ from: adjustedValue, to: adjustedValue });
                  }}
                  className={`flex-1 ${theme.input} ${theme.inputFocus} px-4 py-3 text-center text-lg font-light focus:outline-none transition-all`}
                />
                <button
                  onClick={() => setEraType(eraType === 'CE' ? 'BCE' : 'CE')}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ 
                      x: rect.left + rect.width / 2, 
                      y: rect.top - 10 
                    });
                    setTooltipType(eraType);
                    setShowTooltip(true);
                  }}
                  onMouseLeave={() => setShowTooltip(false)}
                  className={`px-4 py-4 text-xs font-medium tracking-wide ${theme.border} transition-all min-w-[60px] ${
                    eraType === 'CE' ? theme.selected : `${theme.cardBackground} ${theme.text}`
                  }`}
                >
                  {eraType}
                </button>
              </div>
              
              {/* Year Info Display */}
              {yearInfo && (
                <div className={`pt-3 border-t ${theme.border}`}>
                  <div className={`text-xs ${theme.textMuted} font-medium mb-1`}>ERA</div>
                  <div className={`text-xs ${theme.accent}`}>{yearInfo}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs ${theme.textMuted} mb-3 font-medium`}>FROM</label>
                <input
                  type="number"
                  placeholder="500"
                  value={yearRange.from ? Math.abs(parseInt(yearRange.from)) || '' : ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const adjustedValue = fromEraType === 'BCE' && value ? `-${value}` : value;
                    setYearRange(prev => ({ ...prev, from: adjustedValue }));
                  }}
                  className={`w-full ${theme.input} ${theme.inputFocus} px-4 py-3 text-center text-base font-light focus:outline-none transition-all`}
                />
                <div className={`flex ${theme.cardBackground} ${theme.border} overflow-hidden mt-3`}>
                  <button
                    onClick={() => setFromEraType('BCE')}
                    className={`flex-1 px-3 py-2 text-xs font-medium tracking-wide transition-all ${
                      fromEraType === 'BCE' ? theme.selected : `${theme.textMuted} ${theme.hover}`
                    }`}
                  >
                    BCE
                  </button>
                  <button
                    onClick={() => {
                      setFromEraType('CE');
                      setToEraType('CE');
                    }}
                    className={`flex-1 px-3 py-2 text-xs font-medium tracking-wide border-l ${theme.border} transition-all ${
                      fromEraType === 'CE' ? theme.selected : `${theme.textMuted} ${theme.hover}`
                    }`}
                  >
                    CE
                  </button>
                </div>
              </div>
              
              <div>
                <label className={`block text-xs ${theme.textMuted} mb-3 font-medium`}>TO</label>
                <input
                  type="number"
                  placeholder="1900"
                  value={yearRange.to ? Math.abs(parseInt(yearRange.to)) || '' : ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const adjustedValue = toEraType === 'BCE' && value ? `-${value}` : value;
                    setYearRange(prev => ({ ...prev, to: adjustedValue }));
                  }}
                  className={`w-full ${theme.input} ${theme.inputFocus} px-4 py-3 text-center text-base font-light focus:outline-none transition-all`}
                />
                <div className={`flex ${theme.cardBackground} ${theme.border} overflow-hidden mt-3`}>
                  <button
                    onClick={() => setToEraType('BCE')}
                    disabled={fromEraType === 'CE'}
                    className={`flex-1 px-3 py-2 text-xs font-medium tracking-wide transition-all ${
                      fromEraType === 'CE'
                        ? `${theme.textMuted} cursor-not-allowed ${theme.cardBackground}`
                        : toEraType === 'BCE'
                          ? theme.selected
                          : `${theme.textMuted} ${theme.hover}`
                    }`}
                  >
                    BCE
                  </button>
                  <button
                    onClick={() => setToEraType('CE')}
                    className={`flex-1 px-3 py-2 text-xs font-medium tracking-wide border-l ${theme.border} transition-all ${
                      toEraType === 'CE' ? theme.selected : `${theme.textMuted} ${theme.hover}`
                    }`}
                  >
                    CE
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Cool text underneath */}
          <div className="relative">
            <div className={`text-center pt-4 border-t ${theme.border} mt-6`}>
              <h3 className={`${theme.textSecondary} text-sm font-extralight tracking-[0.3em] uppercase mb-2`}>From Anno Domini to the present</h3>
              <p className={`${theme.textMuted} text-xs font-light tracking-wide`}>Filter artworks by creation date</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Small selector buttons */}
      <div className="flex justify-center">
        <div className={`inline-flex ${theme.cardBackground} ${theme.border} overflow-hidden`}>
          <button 
            onClick={() => setYearType('specific')}
            className={`px-3 py-1.5 text-xs font-medium transition-all ${
              yearType === 'specific' ? theme.selected : `${theme.textMuted} ${theme.hover}`
            }`}
          >
            Single
          </button>
          <button 
            onClick={() => setYearType('range')}
            className={`px-3 py-1.5 text-xs font-medium border-l ${theme.border} transition-all ${
              yearType === 'range' ? theme.selected : `${theme.textMuted} ${theme.hover}`
            }`}
          >
            Range
          </button>
        </div>
      </div>

      {(yearRange.from || yearRange.to) && (
        <div className="text-center">
          <button
            onClick={() => setYearRange({ from: '', to: '' })}
            className="px-4 py-2 text-xs text-stone-400 hover:text-red-400 border border-stone-700/30 hover:border-red-600/30 transition-all"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Custom Tooltip */}
      {showTooltip && (
        <div 
          className="fixed z-50 px-3 py-2 bg-stone-900 text-stone-200 text-xs border border-stone-700 shadow-lg pointer-events-none transition-opacity duration-200"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <div className="font-medium mb-1">
            {tooltipType === 'CE' ? 'Common Era' : 'Before Common Era'}
          </div>
          <div className="text-stone-400 text-[10px]">
            {tooltipType === 'CE' ? 'Also known as Anno Domini (AD)' : 'Also known as Before Christ (BC)'}
          </div>
          {/* Tooltip arrow */}
          <div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-900"
          />
        </div>
      )}
    </div>
  );
}