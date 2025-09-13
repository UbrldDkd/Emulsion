export default function CarouselDots({ 
  artworks, 
  currentIndex, 
  cachedImages, 
  loadingImages, 
  goToSlide 
}) {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:bottom-8 lg:left-8 lg:transform-none flex space-x-2">
      {artworks.map((_, index) => {
        const isCurrentSlide = index === currentIndex;
        const isCached = cachedImages.has(index);
        const isLoading = loadingImages.has(index);
        
        return (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 relative ${
              isCurrentSlide
                ? 'bg-amber-400'
                : isCached
                  ? 'bg-white/60 hover:bg-white/80'
                  : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {isLoading && (
              <div className="absolute inset-0 rounded-full border border-amber-400/50 animate-pulse"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}