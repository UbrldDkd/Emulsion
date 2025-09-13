export default function Discover() {
  // Generate random placeholder containers with varying heights
  const placeholderItems = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    height: Math.floor(Math.random() * 200) + 150, // Random height between 150-350px
  }));

  return (
    <div className="min-h-screen bg-stone-900">
      <div className="w-[95%] mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-4"></div>
          <h1 className="text-[26px] font-extralight text-stone-200 mb-3 tracking-[0.2em] uppercase">
            Discover
          </h1>
          <p className="text-stone-200 text-base font-light max-w-3xl mx-auto tracking-wide leading-relaxed">
            Explore curated collections of artworks from around the world.
          </p>
          <div className="w-33 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mt-4"></div>
        </div>

        {/* Coming Soon Features */}
        <div className="text-center mb-16">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-4"></div>
          <h2 className="text-[22px] font-extralight text-stone-200 mb-6 tracking-[0.15em] uppercase">Coming Soon</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">Weekly Curated Collections</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Themed recommended collections updated weekly</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">Free Explore</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Random artwork discovery that learns from your preferences</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">Image Interactions</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Favorite artworks, add to custom lists, and share with friends</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">Collection Management</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Save collections to view later and browse public rated lists</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">AI Art Assistant</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Get detailed history, analysis, and context for every artwork</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">Social Features</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Public lists with star ratings and community recommendations</p>
            </div>
          </div>
        </div>

        {/* Pinterest-style Gallery */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {placeholderItems.map((item) => (
            <div
              key={item.id}
              className="mb-4 break-inside-avoid cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div
                className="w-full bg-stone-800/50 hover:bg-stone-700/50 transition-all duration-300 ease-in-out rounded opacity-80 hover:opacity-100"
                style={{ height: `${item.height}px` }}
              >
                <div className="flex items-center justify-center h-full text-stone-300">
                  <div className="text-center">
                    <div className="text-xs font-light">Artwork #{item.id + 1}</div>
                    <div className="text-xs text-stone-400 mt-1">Coming Soon</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}