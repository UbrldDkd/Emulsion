export default function ArtistDescription({ artist }) {
  return (
    <div>
      {/* Artist Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-light text-stone-100 tracking-wide mb-2">
            {artist.name}
          </h3>
          <p className="text-xs text-amber-400/60 tracking-wider uppercase">
            {artist.nationality} • {artist.birthYear}{artist.deathYear ? `–${artist.deathYear}` : ''}
          </p>
          <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">
            {artist.period}
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extralight text-stone-400">
            {artist.paintings?.length || 0}
          </span>
          <p className="text-xs text-stone-500 uppercase tracking-wider">Works</p>
        </div>
      </div>

      {/* Artist Biography */}
      <p className="text-sm text-stone-300 font-light leading-relaxed mb-8">
        {artist.biography}
      </p>
    </div>
  );
}