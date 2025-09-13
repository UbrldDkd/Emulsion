export default function Artists() {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      <div className="max-w-6xl mx-auto px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">

          <div className="relative">

            <div className="text-center pt-3 pb-8 px-4">
              
              <h1 className="text-stone-300 text-4xl font-extralight tracking-[0.3em] uppercase mb-4">Magistri Artium</h1>
              <p className="text-stone-400 text-lg font-light tracking-wide max-w-3xl mx-auto">
                Explore the lives, works, and stories of artists who have shaped the world of art. From classical masters to contemporary innovators, discover their unique contributions to human creativity.
              </p>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Master Artists */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Master Artists</h3>
                </div>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Explore the lives and works of history's most influential artists and their lasting impact on the world of art and culture.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Leonardo da Vinci</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Michelangelo</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Rembrandt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emerging Talents */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Emerging Talents</h3>
                </div>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Discover contemporary artists who are pushing boundaries and redefining artistic expression in the modern world.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Kaws</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Yayoi Kusama</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Banksy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Artist Biographies */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Artist Biographies</h3>
                </div>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Deep dive into detailed biographies, artistic journeys, and the stories behind the masterpieces that changed art forever.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Life Stories</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Artistic Evolution</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span>Cultural Impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Artist Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* By Period */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Artists by Period</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Renaissance</div>
                  <div className="text-xs text-stone-500 mt-1">1400-1600</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Baroque</div>
                  <div className="text-xs text-stone-500 mt-1">1600-1750</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Impressionism</div>
                  <div className="text-xs text-stone-500 mt-1">1860-1886</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Modern</div>
                  <div className="text-xs text-stone-500 mt-1">1900-1945</div>
                </div>
              </div>
            </div>
          </div>

          {/* By Medium */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-900/50 to-stone-800/30 border border-stone-800/60 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/1 to-amber-600/0 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                <div>
                  <h3 className="text-stone-200 text-xl font-light tracking-wide">Artists by Medium</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Painters</div>
                  <div className="text-xs text-stone-500 mt-1">Oil, Watercolor</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Sculptors</div>
                  <div className="text-xs text-stone-500 mt-1">Marble, Bronze</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Printmakers</div>
                  <div className="text-xs text-stone-500 mt-1">Etching, Lithograph</div>
                </div>
                <div className="p-3 bg-stone-800/30 border border-stone-700/30 rounded text-center">
                  <div className="text-xs text-amber-300/80 font-medium">Photographers</div>
                  <div className="text-xs text-stone-500 mt-1">Digital, Film</div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}