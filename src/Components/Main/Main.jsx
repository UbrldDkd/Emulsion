import { useState } from 'react';
import CollectionSection from './CollectionSection.jsx';
import ArtistSection from './ArtistSection.jsx';
import ImageZoomModal from './ImageZoomModal.jsx';
import { collections } from '../../data/collections.js';




export default function Main() {
  const [showMoreCollections, setShowMoreCollections] = useState(false);
  const [showMoreArtists, setShowMoreArtists] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  return (
    <div className="min-h-screen bg-stone-900">
      {/* Collections Section */}
      <section className="py-24 px-4 bg-stone-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-8"></div>
            <h2 className="text-4xl font-extralight text-stone-100 mb-6 tracking-[0.2em] uppercase">
              Collectiones Artium
            </h2>
            <p className="text-stone-300 font-light max-w-3xl mx-auto text-lg tracking-wide leading-relaxed">
              Curated selections spanning the great artistic movements of history, 
              each collection a testament to the enduring power of human creativity
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mt-8"></div>
          </div>

          <div className="space-y-16">
            {collections.slice(0, showMoreCollections ? collections.length : 3).map((collection) => (
              <CollectionSection 
                key={collection.id} 
                collection={collection} 
                onWorkClick={setSelectedWork}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={() => setShowMoreCollections(!showMoreCollections)}
              className="inline-flex items-center px-12 py-4 text-sm font-light text-stone-200 border border-stone-600/50 hover:bg-stone-800/50 hover:border-amber-500/30 transition-all duration-300 tracking-wider uppercase"
            >
              {showMoreCollections ? 'Minus' : 'Plus'}
              <svg className={`ml-3 w-4 h-4 transition-transform duration-300 ${showMoreCollections ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-24 px-4 bg-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-8"></div>
            <h2 className="text-4xl font-extralight text-stone-100 mb-6 tracking-[0.2em] uppercase">
              Magistri Artium
            </h2>
            <p className="text-stone-300 font-light max-w-3xl mx-auto text-lg tracking-wide leading-relaxed">
              Masters whose innovations shaped the trajectory of artistic expression, 
              their legacies woven into the fabric of human cultural heritage
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mt-8"></div>
          </div>

          {/* Top 3 Artists - Last 3 from array (Always Visible) */}
          <div className="space-y-12">
            {artistsData.slice(-3).map((artist, artistIndex) => (
              <ArtistSection 
                key={artistIndex} 
                artist={artist} 
                onWorkClick={setSelectedWork}
              />
            ))}
          </div>

          {/* Additional Artists - First artists (Shown when See More is clicked) */}
          {showMoreArtists && (
            <div className="space-y-12">
              {artistsData.slice(0, -3).map((artist, artistIndex) => (
                <ArtistSection 
                  key={artistIndex + 3} 
                  artist={artist} 
                  onWorkClick={setSelectedWork}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <button 
              onClick={() => setShowMoreArtists(!showMoreArtists)}
              className="inline-flex items-center px-12 py-4 text-sm font-light text-stone-200 border border-stone-600/50 hover:bg-stone-700/50 hover:border-amber-500/30 transition-all duration-300 tracking-wider uppercase"
            >
              {showMoreArtists ? 'Minus' : 'Plus'}
              <svg className={`ml-3 w-4 h-4 transition-transform duration-300 ${showMoreArtists ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Image Zoom Modal */}
      {selectedWork && (
        <ImageZoomModal 
          selectedWork={selectedWork} 
          onClose={() => setSelectedWork(null)} 
        />
      )}
    </div>
  );
}