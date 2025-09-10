export default function Artists() {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-light text-amber-400 mb-8 tracking-wide">
            ARTISTS
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-stone-300 mb-6 leading-relaxed">
              Explore the lives, works, and stories of artists who have shaped the world of art. 
              From classical masters to contemporary innovators, discover their unique contributions to human creativity.
            </p>
            <p className="text-stone-400 text-base">
              This page is coming soon. We're building a comprehensive artist directory and biography collection.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
              <h3 className="text-xl font-medium text-amber-400 mb-3">Master Artists</h3>
              <p className="text-stone-300 text-sm">
                Explore the lives and works of history's most influential artists and their lasting impact.
              </p>
            </div>
            
            <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
              <h3 className="text-xl font-medium text-amber-400 mb-3">Emerging Talents</h3>
              <p className="text-stone-300 text-sm">
                Discover contemporary artists who are pushing boundaries and redefining artistic expression.
              </p>
            </div>
            
            <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
              <h3 className="text-xl font-medium text-amber-400 mb-3">Artist Biographies</h3>
              <p className="text-stone-300 text-sm">
                Deep dive into detailed biographies, artistic journeys, and the stories behind the masterpieces.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-stone-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Artist profiles and collections coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}