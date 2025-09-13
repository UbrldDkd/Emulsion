import ArtistDescription from "./ArtistDescription.jsx";
import ArtistGallery from "./ArtistGallery.jsx";

export default function ArtistsCard({ artist, onWorkClick }) {
  return (
    <div className="group relative">
      {/* Decorative top line separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-600/40 to-transparent mb-8"></div>
      
      {/* Mobile Layout - Description above Gallery */}
      <div className="block md:hidden py-8">
        <div className="mb-8">
          <ArtistDescription artist={artist} />
          
          {/* View Artist Button */}
          <button className="text-sm text-amber-400/80 hover:text-amber-300 transition-colors duration-300 tracking-wider uppercase mt-4">
            Explore Artist →
          </button>
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