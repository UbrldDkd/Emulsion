export default function Discover() {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      <div className="max-w-6xl mx-auto px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative">
            <div className="text-center pt-3 pb-8 px-4">
              <h1 className="text-stone-300 text-4xl font-extralight tracking-[0.3em] uppercase mb-4">Discover</h1>
              <p className="text-stone-400 text-lg font-light tracking-wide max-w-3xl mx-auto">
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
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Handpicked artworks organized by themes, periods, and artistic movements. Each collection tells a story through carefully selected pieces.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Renaissance Masters</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Impressionist Landscapes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Modern Abstractions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Artists */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Featured Artists</h3>
                </div>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Spotlight on both renowned masters and contemporary artists making waves today. Explore their artistic journeys and signature works.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Vincent van Gogh</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Frida Kahlo</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Banksy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Art Movements */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Art Movements</h3>
                </div>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Journey through art history from ancient civilizations to modern expressions. Understand the evolution of artistic thought.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Renaissance</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Impressionism</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Surrealism</span>
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
                <h3 className="text-stone-300 text-lg font-light tracking-wide mb-4">Coming Soon</h3>
                <p className="text-stone-400 text-sm font-light">
                  We're working on bringing you an immersive discovery experience with interactive galleries, detailed artwork information, and personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}