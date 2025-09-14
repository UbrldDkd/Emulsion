export default function CarouselImage({ artwork, isTransitioning, cachedImages, currentIndex }) {
  return (
    <div className="absolute inset-0">
      {cachedImages.has(currentIndex) ? (
        <>
          <img
            src={artwork.primaryImage}
            alt={artwork.title}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Subtle overlay for elegant look */}
          <div className={`absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 transition-opacity duration-700 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}></div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900">
          <div className="text-center text-white">
            <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-stone-300 font-light">Loading artwork...</p>
            <p className="text-xs text-stone-500 mt-1">{artwork.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}