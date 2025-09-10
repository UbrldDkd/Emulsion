import { useState } from 'react';

export default function YearFilter({ yearRange, setYearRange }) {
  const [selectedMode, setSelectedMode] = useState('specific');

  const historicalPeriods = [
    { label: 'Ancient (3000 BCE - 500 CE)', from: -3000, to: 500 },
    { label: 'Medieval (500 - 1400)', from: 500, to: 1400 },
    { label: 'Renaissance (1400 - 1600)', from: 1400, to: 1600 },
    { label: 'Baroque (1600 - 1750)', from: 1600, to: 1750 },
    { label: '19th Century (1800 - 1900)', from: 1800, to: 1900 },
    { label: 'Modern (1900 - 1945)', from: 1900, to: 1945 },
    { label: 'Contemporary (1945 - Present)', from: 1945, to: new Date().getFullYear() }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-stone-700/30 pb-3">
        <div className="text-stone-200 text-sm font-light tracking-wide">
          Time Period
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedMode('specific')}
          className={selectedMode === 'specific' 
            ? 'px-3 py-1.5 rounded text-xs bg-amber-600/20 text-amber-400 border border-amber-600/30' 
            : 'px-3 py-1.5 rounded text-xs bg-stone-800 text-stone-400 hover:text-stone-300'
          }
        >
          Specific/Range
        </button>
        <button
          onClick={() => setSelectedMode('periods')}
          className={selectedMode === 'periods' 
            ? 'px-3 py-1.5 rounded text-xs bg-amber-600/20 text-amber-400 border border-amber-600/30' 
            : 'px-3 py-1.5 rounded text-xs bg-stone-800 text-stone-400 hover:text-stone-300'
          }
        >
          Historical Periods
        </button>
      </div>

      {selectedMode === 'specific' ? (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-stone-400 mb-1">From Year</label>
            <input
              type="number"
              placeholder="e.g., 1850"
              value={yearRange.from}
              onChange={(e) => setYearRange(prev => ({ ...prev, from: e.target.value }))}
              className="w-full bg-stone-700 border border-stone-600 rounded px-3 py-2 text-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-400 mb-1">To Year</label>
            <input
              type="number"
              placeholder="e.g., 1900"
              value={yearRange.to}
              onChange={(e) => setYearRange(prev => ({ ...prev, to: e.target.value }))}
              className="w-full bg-stone-700 border border-stone-600 rounded px-3 py-2 text-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {historicalPeriods.map((period, index) => (
            <button
              key={index}
              onClick={() => setYearRange({ from: period.from.toString(), to: period.to.toString() })}
              className="w-full text-left p-2 rounded text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              {period.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}