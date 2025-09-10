export default function Discover() {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-light text-amber-400 mb-8 tracking-wide">
            DISCOVER
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-stone-300 mb-6 leading-relaxed">
              Explore curated collections of artworks from around the world. 
              Discover hidden gems, masterpieces, and emerging artists across different periods and movements.
            </p>
            <p className="text-stone-400 text-base">
              This page is coming soon. We're working on bringing you an immersive discovery experience.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
              <h3 className="text-xl font-medium text-amber-400 mb-3">Curated Collections</h3>
              <p className="text-stone-300 text-sm">
                Handpicked artworks organized by themes, periods, and artistic movements.
              </p>
            </div>
            
            <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
              <h3 className="text-xl font-medium text-amber-400 mb-3">Featured Artists</h3>
              <p className="text-stone-300 text-sm">
                Spotlight on both renowned masters and contemporary artists making waves today.
              </p>
            </div>
            
            <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
              <h3 className="text-xl font-medium text-amber-400 mb-3">Art Movements</h3>
              <p className="text-stone-300 text-sm">
                Journey through art history from ancient civilizations to modern expressions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}