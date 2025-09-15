import { useState } from "react";
import ArtistDescription from "./ArtistDescription.jsx";
import ArtistGallery from "./ArtistGallery.jsx";

export default function ArtistsCard({ artist, onWorkClick }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative">
      {/* Decorative top line separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-600/40 to-transparent mb-8"></div>

      {/* Mobile Layout - Description above Gallery */}
      <div className="block md:hidden py-8">
        <div className="sticky top-0 bg-stone-900/95 backdrop-blur-sm z-20 mb-8 pb-4 -mx-4 px-4">
          {/* Collapsed Header */}
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex-1">
              <h3 className="text-lg font-light text-stone-100 tracking-wide">
                {artist.name}
              </h3>
              <p className="text-xs text-amber-400/60 tracking-wider uppercase">
                {artist.birthplace} • {artist.birthYear}{artist.deathYear ? `–${artist.deathYear}` : ''}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-lg font-extralight text-stone-400">
                  {artist.paintings?.length || 0}
                </span>
                <p className="text-xs text-stone-500 uppercase tracking-wider">Works</p>
              </div>
              <svg
                className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Expandable Content */}
          <div className={`transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">
              {artist.period}
            </p>
            <p className="text-sm text-stone-300 font-light leading-relaxed">
              {artist.biography}
            </p>
          </div>
        </div>
        
        <div>
          <ArtistGallery 
            paintings={artist.paintings} 
            onWorkClick={onWorkClick}
          />
        </div>
      </div>

      {/* Desktop Layout - Side by side */}
      <div className="hidden md:flex gap-8 py-8">
        {/* Left Column - Description (20% width) */}
        <div className="w-1/5 flex flex-col">
          <div className="sticky top-8">
            <ArtistDescription artist={artist} />
            
            {/* View Artist Button */}
            <button className="text-sm text-amber-400/80 hover:text-amber-300 transition-colors duration-300 tracking-wider uppercase">
              Explore Artist →
            </button>
          </div>
        </div>
        
        {/* Right Column - Gallery (80% width) */}
        <div className="w-4/5">
          <ArtistGallery 
            paintings={artist.paintings} 
            onWorkClick={onWorkClick}
          />
        </div>
      </div>
      
      {/* Decorative bottom line separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-600/40 to-transparent mt-8"></div>
    </div>
  );
}