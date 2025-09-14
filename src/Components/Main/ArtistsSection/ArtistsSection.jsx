import { useState } from "react";
import ArtistCard from "./ArtistsCard.jsx";

export default function ArtistsSection({ artists, onWorkClick }) {
  const [showMore, setShowMore] = useState(false);
  
  // Handle undefined or empty artists
  if (!artists || artists.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <div className="w-[95%] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-4"></div>
          <h2 className="text-[26px] font-extralight text-stone-100 mb-3 tracking-[0.2em] uppercase">
            Artists
          </h2>
          <p className="text-stone-300 text-base font-light max-w-3xl mx-auto tracking-wide leading-relaxed">
            Discover your new favorite artists from various art movements and periods.
          </p>
          <div className="w-33 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mt-4"></div>
        </div>

        {/* Artists List */}
        <div className="space-y-4">
          {artists
            .slice(0, showMore ? artists.length : 3)
            .map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onWorkClick={onWorkClick}
              />
            ))}</div>

        {/* Toggle Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center px-12 py-4 text-sm font-light text-stone-200 border border-stone-600/50 hover:bg-stone-700/50 hover:border-amber-500/30 transition-all duration-300 tracking-wider uppercase"
          >
            {showMore ? "Show less" : "Show more"}
            <svg
              className={`ml-3 w-4 h-4 transition-transform duration-300 ${
                showMore ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
