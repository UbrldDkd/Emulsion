import { useState } from 'react';

export default function YearFilter({ yearRange, setYearRange }) {
  const [selectedMode, setSelectedMode] = useState('range');
  const [yearType, setYearType] = useState('specific'); // 'specific' or 'range'

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
    <div className="space-y-6">
      {/* Sleek Header */}
      <div className="relative">
        <div className="flex items-center gap-3 pb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
          <div>
            <h3 className="text-stone-200 text-sm font-medium tracking-wide">Time Period</h3>
            <p className="text-stone-500 text-xs mt-0.5">Filter artworks by creation date</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-700/40 to-transparent"></div>
      </div>

      {/* Sophisticated Mode Selector */}
      <div className="relative">
        <div className="flex bg-stone-900/60 backdrop-blur-sm rounded-2xl p-1.5 border border-stone-800/50">
          <button
            onClick={() => setSelectedMode('range')}
            className={`relative flex-1 px-4 py-3 rounded-xl transition-all duration-300 ${
              selectedMode === 'range'
                ? 'bg-gradient-to-r from-amber-600/20 to-amber-500/10 text-amber-300 shadow-lg shadow-amber-900/20'
                : 'text-stone-400 hover:text-stone-300 hover:bg-stone-800/40'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                selectedMode === 'range' ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-stone-600'
              }`}></div>
              <span className="text-xs font-medium">Custom</span>
            </div>
            {selectedMode === 'range' && (
              <div className="absolute inset-0 rounded-xl border border-amber-600/20"></div>
            )}
          </button>
          <button
            onClick={() => setSelectedMode('periods')}
            className={`relative flex-1 px-4 py-3 rounded-xl transition-all duration-300 ${
              selectedMode === 'periods'
                ? 'bg-gradient-to-r from-amber-600/20 to-amber-500/10 text-amber-300 shadow-lg shadow-amber-900/20'
                : 'text-stone-400 hover:text-stone-300 hover:bg-stone-800/40'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                selectedMode === 'periods' ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-stone-600'
              }`}></div>
              <span className="text-xs font-medium">Periods</span>
            </div>
            {selectedMode === 'periods' && (
              <div className="absolute inset-0 rounded-xl border border-amber-600/20"></div>
            )}
          </button>
        </div>
      </div>

      {selectedMode === 'range' ? (
        <div className="space-y-6">
          {/* Sleek Year Input Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 rounded-2xl border border-stone-800/60 backdrop-blur-xl">
            {/* Subtle animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            
            <div className="relative p-6">
              {/* Refined Year type selector */}
              <div className="flex bg-stone-800/40 backdrop-blur-sm rounded-xl p-1 mb-6 border border-stone-700/30">
                <button 
                  onClick={() => setYearType('specific')}
                  className={`relative flex-1 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                    yearType === 'specific' 
                      ? 'bg-gradient-to-r from-amber-600/15 to-amber-500/5 text-amber-200 shadow-sm' 
                      : 'text-stone-400 hover:text-stone-300 hover:bg-stone-700/30'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-1 h-1 rounded-full transition-all ${
                      yearType === 'specific' ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-stone-500'
                    }`}></div>
                    <span className="text-xs font-medium">Single Year</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => setYearType('range')}
                  className={`relative flex-1 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                    yearType === 'range' 
                      ? 'bg-gradient-to-r from-amber-600/15 to-amber-500/5 text-amber-200 shadow-sm' 
                      : 'text-stone-400 hover:text-stone-300 hover:bg-stone-700/30'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-1 h-1 rounded-full transition-all ${
                      yearType === 'range' ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-stone-500'
                    }`}></div>
                    <span className="text-xs font-medium">Date Range</span>
                  </div>
                </button>
              </div>

              {/* Sophisticated Input Fields */}
              {yearType === 'specific' ? (
                <div className="space-y-5">
                  <div className="text-center">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mx-auto mb-4"></div>
                    <p className="text-xs text-stone-400 font-light">Enter a specific year</p>
                  </div>
                  <div className="relative group">
                    <input
                      type="number"
                      placeholder="1850"
                      value={yearRange.from || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setYearRange({ from: value, to: value });
                      }}
                      className="w-full bg-gradient-to-r from-stone-800/50 to-stone-700/50 border border-stone-700/50 rounded-xl px-6 py-4 text-stone-200 text-center text-lg font-light focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-500/50 transition-all duration-300 placeholder:text-stone-500 group-hover:border-stone-600/70"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="text-xs text-stone-500 font-light">CE</span>
                    </div>
                    {/* Input glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600/0 via-amber-600/5 to-amber-600/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mx-auto mb-4"></div>
                    <p className="text-xs text-stone-400 font-light">Define your date range</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                    <div className="group">
                      <label className="block text-xs text-stone-400 mb-3 font-medium tracking-wider">FROM</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="1850"
                          value={yearRange.from || ''}
                          onChange={(e) => setYearRange(prev => ({ ...prev, from: e.target.value }))}
                          className="w-full bg-gradient-to-r from-stone-800/50 to-stone-700/50 border border-stone-700/50 rounded-xl px-4 py-3 text-stone-200 text-center text-base font-light focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-500/50 transition-all duration-300 placeholder:text-stone-500"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600/0 via-amber-600/3 to-amber-600/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-xs text-stone-400 mb-3 font-medium tracking-wider">TO</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="1900"
                          value={yearRange.to || ''}
                          onChange={(e) => setYearRange(prev => ({ ...prev, to: e.target.value }))}
                          className="w-full bg-gradient-to-r from-stone-800/50 to-stone-700/50 border border-stone-700/50 rounded-xl px-4 py-3 text-stone-200 text-center text-base font-light focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-500/50 transition-all duration-300 placeholder:text-stone-500"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600/0 via-amber-600/3 to-amber-600/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Connecting line for desktop */}
                    <div className="hidden sm:block absolute top-12 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 h-px bg-gradient-to-r from-amber-600/30 via-amber-600/60 to-amber-600/30"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Refined Clear Button */}
              {(yearRange.from || yearRange.to) && (
                <div className="mt-8 pt-6 border-t border-stone-700/20">
                  <button
                    onClick={() => setYearRange({ from: '', to: '' })}
                    className="group w-full px-4 py-3 text-xs text-stone-400 hover:text-red-400 rounded-xl transition-all duration-300 border border-stone-700/30 hover:border-red-600/30 hover:bg-gradient-to-r hover:from-red-900/5 hover:to-red-800/5"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="font-medium tracking-wide">Clear Selection</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Sophisticated Historical Periods */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 rounded-2xl border border-stone-800/60 backdrop-blur-xl">
            {/* Subtle animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            
            <div className="relative p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mx-auto mb-4"></div>
                <h4 className="text-sm text-stone-300 font-light tracking-wide">Historical Periods</h4>
                <p className="text-xs text-stone-500 mt-1">Select from curated time periods</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto scrollbar-hide">
                {historicalPeriods.map((period, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setYearRange({ from: period.from.toString(), to: period.to.toString() });
                      setYearType('range');
                    }}
                    className="group relative overflow-hidden p-5 rounded-xl bg-gradient-to-br from-stone-800/40 to-stone-900/40 hover:from-stone-700/50 hover:to-stone-800/50 border border-stone-700/30 hover:border-amber-600/40 transition-all duration-300 text-left"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -inset-x-10 bg-gradient-to-r from-transparent via-amber-600/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    
                    {/* Period indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-600 group-hover:bg-amber-400 group-hover:shadow-sm group-hover:shadow-amber-400/50 transition-all duration-300"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="text-sm font-medium text-stone-200 group-hover:text-amber-200 transition-colors duration-300 mb-2">
                        {period.label.split(' (')[0]}
                      </div>
                      <div className="text-xs text-stone-500 group-hover:text-stone-400 transition-colors duration-300 font-light">
                        {period.from < 0 ? `${Math.abs(period.from)} BCE` : period.from} - {period.to} CE
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Refined Clear Button */}
              {(yearRange.from || yearRange.to) && (
                <div className="mt-8 pt-6 border-t border-stone-700/20">
                  <button
                    onClick={() => setYearRange({ from: '', to: '' })}
                    className="group w-full px-4 py-3 text-xs text-stone-400 hover:text-red-400 rounded-xl transition-all duration-300 border border-stone-700/30 hover:border-red-600/30 hover:bg-gradient-to-r hover:from-red-900/5 hover:to-red-800/5"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="font-medium tracking-wide">Clear Period Selection</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}