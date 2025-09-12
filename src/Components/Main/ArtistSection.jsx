export default function ArtistSection({ artist, onWorkClick }) {
  return (
    <div className="p-3 transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Artist Info */}
        <div className="lg:w-1/4">
          <div className="sticky top-8">

            <h3 className="text-xl font-serif text-stone-100 mb-2">{artist.name}</h3>

            <div className="text-xs text-stone-400 mb-4">
              Born in {artist.nationality === 'Italian' ? 'Italy' : 
                       artist.nationality === 'Dutch' ? 'the Netherlands' :
                       artist.nationality === 'Spanish' ? 'Spain' :
                       artist.nationality === 'French' ? 'France' :
                       artist.nationality === 'Canadian' ? 'Canada' :
                       artist.nationality === 'German' ? 'Germany' :
                       artist.nationality === 'British' ? 'Britain' :
                       artist.nationality}, {artist.years}
            </div>

          <div className="text-xs text-amber-400 uppercase tracking-wider mb-1">{artist.period}</div>

            <div className="w-16 h-px bg-stone-600 mb-4"></div>

            <p className="text-sm text-stone-300 font-light leading-relaxed">
              {artist.description}
              
            </p>
          </div>
        </div>

        {/* Right Column - Artist Works */}
        <div className="lg:w-3/4">
          <h4 className="text-sm font-medium text-stone-100 mb-6 uppercase tracking-wider">Notable Works</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {artist.works.map((work, workIndex) => (
              <div key={workIndex} className="group cursor-pointer" onClick={() => onWorkClick({ ...work, artist: artist.name })}>
                <div className="relative overflow-hidden mb-3 transition-all duration-300 hover:scale-105">
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300"></div>
                </div>
                <div className="px-1">
                  <h5 className="text-stone-100 font-serif text-sm mb-1 leading-tight">{work.title}</h5>
                  <div className="text-stone-400 text-xs font-light mb-1">{work.year}</div>
                  <div className="text-stone-500 text-xs tracking-wide font-light">{work.medium}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
