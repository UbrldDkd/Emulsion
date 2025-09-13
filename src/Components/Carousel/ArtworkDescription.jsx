export default function ArtworkDescription({ artwork, isTransitioning, getEraFromDate }) {
  return (
    <div className={`bg-gradient-to-l from-stone-950/60 via-stone-950/40 to-transparent text-stone-100 p-12 transition-all duration-700 ease-in-out w-[400px] h-full flex flex-col justify-center overflow-y-auto ${
      isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
    }`}>
      <div className="space-y-6 text-right">
        <div className="space-y-4">
          <h2 className="text-3xl font-serif italic tracking-wide leading-tight">{artwork.title}</h2>
          <div className="space-y-2">
            <p className="text-xl font-light text-stone-200">{artwork.artistDisplayName}</p>
            <p className="text-sm text-stone-300 tracking-wide">
              {artwork.artistNationality}, {artwork.artistBeginDate}–{artwork.artistEndDate}
            </p>
          </div>
        </div>

        <div className="w-16 h-px bg-amber-400/60 ml-auto"></div>

        <div className="space-y-3 text-sm text-stone-300">
          <div>
            <span className="text-stone-400 tracking-wide text-xs block">Date:</span>
            <p className="text-stone-200">{artwork.objectDate}</p>
          </div>

          <div>
            <span className="text-stone-400 tracking-wide text-xs block">Era:</span>
            <p className="text-stone-200">{getEraFromDate(artwork.objectDate)}</p>
          </div>

          <div>
            <span className="text-stone-400 tracking-wide text-xs block">Medium:</span>
            <p className="text-stone-200">{artwork.medium}</p>
          </div>

          <div>
            <span className="text-stone-400 tracking-wide text-xs block">Dimensions:</span>
            <p className="text-stone-200">{artwork.dimensions}</p>
          </div>

          <div>
            <span className="text-stone-400 tracking-wide text-xs block">Collection:</span>
            <p className="text-stone-200">{artwork.repository}</p>
          </div>
        </div>

        <div className="pt-6 mt-4 border-t border-stone-400/20 flex justify-end gap-6">
          <div className="flex items-center gap-2">
            <span className="text-stone-400 tracking-wide text-xs">Era:</span>
            <span className="text-stone-200 text-sm">{getEraFromDate(artwork.objectDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-stone-400 tracking-wide text-xs">Movement:</span>
            <span className="text-stone-200 text-sm">{artwork.period}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
