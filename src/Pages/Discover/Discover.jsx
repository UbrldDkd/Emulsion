export default function Discover() {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      <div className="max-w-6xl mx-auto px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative">
            <div className="text-center pt-3 pb-8 px-4">
              <h1 className="text-stone-200 text-4xl font-extralight tracking-[0.3em] uppercase mb-4">Explorationem</h1>
              <p className="text-stone-200 text-lg font-light tracking-wide max-w-3xl mx-auto">
                Explore curated collections of artworks from around the world. Discover hidden gems, masterpieces, and emerging artists across different periods and movements.
              </p>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Curated Collections */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Curated Collections</h3>
                </div>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                Thoughtfully assembled collections showcasing thematic connections and artistic dialogues across time periods.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Renaissance Masters</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Modern Abstractions</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Contemporary Voices</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Galleries */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Interactive Galleries</h3>
                </div>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                Immersive viewing experiences with detailed artwork analysis, historical context, and artistic techniques.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>High-Resolution Zoom</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>360° Virtual Tours</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Audio Commentary</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Smart Discovery</h3>
                </div>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                AI-powered recommendations tailored to your preferences, exploring new movements and hidden connections.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Style Matching</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Mood-Based Curation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Learning Pathways</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discovery Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* By Movement */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Explore by Movement</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Impressionism</div>
                  <div className="text-xs text-stone-500 mt-1">Light & Color</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Surrealism</div>
                  <div className="text-xs text-stone-500 mt-1">Dreams & Reality</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Abstract</div>
                  <div className="text-xs text-stone-500 mt-1">Form & Expression</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Pop Art</div>
                  <div className="text-xs text-stone-500 mt-1">Culture & Mass Media</div>
                </div>
              </div>
            </div>
          </div>

          {/* By Theme */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Discover by Theme</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Portraits</div>
                  <div className="text-xs text-stone-500 mt-1">Human Expression</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Landscapes</div>
                  <div className="text-xs text-stone-500 mt-1">Nature & Space</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Still Life</div>
                  <div className="text-xs text-stone-500 mt-1">Objects & Symbolism</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Mythology</div>
                  <div className="text-xs text-stone-500 mt-1">Stories & Legends</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="text-center">
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/2 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-12">
              <div className="text-center">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mx-auto mb-6"></div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <h3 className="text-stone-200 text-lg font-light tracking-wide">Discovery Platform Coming Soon</h3>
                </div>
                <p className="text-stone-300 text-sm font-light">
                  We are crafting an immersive discovery experience with interactive galleries, detailed artwork information, and personalized recommendations. A journey through the vast landscape of human artistic achievement awaits.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}