import { useState } from 'react';

export default function ArtistDescription({ artist }) {
  const [bioOpen, setBioOpen] = useState(false);

  return (
    <div className="sticky top-0 z-20 bg-stone-900/95 backdrop-blur-sm py-4 -mx-4 px-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-xl font-light text-stone-100 tracking-wide mb-2">{artist.name}</h3>
          <p className="text-xs text-amber-400/60 tracking-wider uppercase">
            {artist.birthplace} • {artist.birthYear}
            {artist.deathYear ? `–${artist.deathYear}` : ''}
          </p>
          <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">{artist.period}</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extralight text-stone-400">{artist.paintings?.length || 0}</span>
          <p className="text-xs text-stone-500 uppercase tracking-wider">Works</p>
        </div>
      </div>

      {/* Mobile: Expand/collapse biography */}
      <div className="block lg:hidden">
        <button
          className="text-xs text-amber-400/80 underline mb-2"
          onClick={() => setBioOpen(v => !v)}
          aria-expanded={bioOpen}
        >
          {bioOpen ? 'Hide Biography' : 'Show Biography'}
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            bioOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-sm text-stone-300 font-light leading-relaxed mb-2">{artist.biography}</p>
        </div>
      </div>

      {/* Desktop: Always show biography */}
      <div className="hidden lg:block">
        <p className="text-sm text-stone-300 font-light leading-relaxed mb-8">{artist.biography}</p>
      </div>
    </div>
  );
}