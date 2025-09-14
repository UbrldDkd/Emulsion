import { useState, useEffect } from 'react';
import { useTheme } from '../../../../../contexts/ThemeContext.jsx';

const HISTORICAL_PERIODS = [
  { name: 'Ancient World', start: -3000, end: 500, movements: ['Egyptian', 'Greek', 'Roman'] },
  { name: 'Medieval', start: 500, end: 1400, movements: ['Byzantine', 'Gothic', 'Romanesque'] },
  { name: 'Renaissance', start: 1400, end: 1600, movements: ['Early Renaissance', 'High Renaissance', 'Mannerism'] },
  { name: 'Baroque', start: 1600, end: 1750, movements: ['Baroque', 'Rococo'] },
  { name: '19th Century', start: 1800, end: 1900, movements: ['Neoclassicism', 'Romanticism', 'Impressionism'] },
  { name: 'Modern', start: 1900, end: 1945, movements: ['Cubism', 'Expressionism', 'Surrealism'] },
  { name: 'Contemporary', start: 1945, end: new Date().getFullYear(), movements: ['Abstract Expressionism', 'Pop Art', 'Minimalism'] }
];

export default function YearFilter({ yearRange, setYearRange }) {
  const { theme } = useTheme();
  const [yearType, setYearType] = useState('specific');
  const [eraType, setEraType] = useState('CE');
  const [fromEraType, setFromEraType] = useState('BCE');
  const [toEraType, setToEraType] = useState('CE');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipType, setTooltipType] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [yearInfo, setYearInfo] = useState('');

  const getYearInfo = (year) => {
    if (!year || isNaN(year)) return '';

    const numYear = parseInt(year);
    const adjustedYear = eraType === 'BCE' ? -Math.abs(numYear) : Math.abs(numYear);
    const period = HISTORICAL_PERIODS.find(p => adjustedYear >= p.start && adjustedYear <= p.end);

    if (period) {
      return `${period.name} • ${period.movements.join(', ')}`;
    }
    return adjustedYear < -3000 ? 'Prehistoric Era' : 'Modern Era';
  };

  const handleYearChange = (value, isRange = false, isTo = false) => {
    const eraTypeToUse = isRange ? (isTo ? toEraType : fromEraType) : eraType;
    const adjustedValue = eraTypeToUse === 'BCE' && value ? `-${value}` : value;

    if (isRange) {
      setYearRange(prev => ({
        ...prev,
        [isTo ? 'to' : 'from']: adjustedValue
      }));
    } else {
      setYearRange({ from: adjustedValue, to: adjustedValue });
    }
  };

  const handleTooltip = (e, type) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setTooltipType(type);
    setShowTooltip(true);
  };

  const clearSelection = () => setYearRange({ from: '', to: '' });

  const EraButton = ({ type, onClick, className = '', disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 px-3 py-2 text-xs font-medium tracking-wide transition-all ${className} ${
        disabled ? `${theme.textMuted} cursor-not-allowed ${theme.cardBackground}` : ''
      }`}
    >
      {type}
    </button>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (yearType === 'specific' && yearRange.from) {
        const year = Math.abs(parseInt(yearRange.from));
        setYearInfo(getYearInfo(year));
      } else {
        setYearInfo('');
      }
    }, 300);

    return () => clearTimeout(timer);
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

      <div className={`relative ${theme.gradient} ${theme.border} backdrop-blur-xl`}>
        <div className="p-6">
          {yearType === 'specific' ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="1850"
                  value={yearRange.from ? Math.abs(parseInt(yearRange.from)) || '' : ''}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className={`flex-1 ${theme.input} ${theme.inputFocus} px-4 py-3 text-center text-lg font-light focus:outline-none transition-all`}
                />
                <button
                  onClick={() => setEraType(eraType === 'CE' ? 'BCE' : 'CE')}
                  onMouseEnter={(e) => handleTooltip(e, eraType)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className={`px-4 py-4 text-xs font-medium tracking-wide ${theme.border} transition-all min-w-[60px] ${
                    eraType === 'CE' ? theme.selected : `${theme.cardBackground} ${theme.text}`
                  }`}
                >
                  {eraType}
                </button>
              </div>

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
                  onChange={(e) => handleYearChange(e.target.value, true, false)}
                  className={`w-full ${theme.input} ${theme.inputFocus} px-4 py-3 text-center text-base font-light focus:outline-none transition-all`}
                />
                <div className={`flex ${theme.cardBackground} ${theme.border} overflow-hidden mt-3`}>
                  <EraButton
                    type="BCE"
                    onClick={() => setFromEraType('BCE')}
                    className={fromEraType === 'BCE' ? theme.selected : `${theme.textMuted} ${theme.hover}`}
                  />
                  <EraButton
                    type="CE"
                    onClick={() => {
                      setFromEraType('CE');
                      setToEraType('CE');
                    }}
                    className={`border-l ${theme.border} ${fromEraType === 'CE' ? theme.selected : `${theme.textMuted} ${theme.hover}`}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs ${theme.textMuted} mb-3 font-medium`}>TO</label>
                <input
                  type="number"
                  placeholder="1900"
                  value={yearRange.to ? Math.abs(parseInt(yearRange.to)) || '' : ''}
                  onChange={(e) => handleYearChange(e.target.value, true, true)}
                  className={`w-full ${theme.input} ${theme.inputFocus} px-4 py-3 text-center text-base font-light focus:outline-none transition-all`}
                />
                <div className={`flex ${theme.cardBackground} ${theme.border} overflow-hidden mt-3`}>
                  <EraButton
                    type="BCE"
                    onClick={() => setToEraType('BCE')}
                    disabled={fromEraType === 'CE'}
                    className={toEraType === 'BCE' ? theme.selected : `${theme.textMuted} ${theme.hover}`}
                  />
                  <EraButton
                    type="CE"
                    onClick={() => setToEraType('CE')}
                    className={`border-l ${theme.border} ${toEraType === 'CE' ? theme.selected : `${theme.textMuted} ${theme.hover}`}`}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            <div className={`text-center pt-4 border-t ${theme.border} mt-6`}>
              <h3 className={`${theme.textSecondary} text-sm font-extralight tracking-[0.3em] uppercase mb-2`}>
                From Anno Domini to the present
              </h3>
              <p className={`${theme.textMuted} text-xs font-light tracking-wide`}>
                Filter artworks by creation date
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />
          </div>
        </div>
      </div>

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
            onClick={clearSelection}
            className="px-4 py-2 text-xs text-stone-400 hover:text-red-400 border border-stone-700/30 hover:border-red-600/30 transition-all"
          >
            Clear Selection
          </button>
        </div>
      )}

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
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-900" />
        </div>
      )}
    </div>
  );
}