import { Artworks } from '../../data/Artworks.js';
import { useCarouselLogic, getEraFromDate } from './CarouselLogic.jsx';
import CarouselImage from './CarouselImage.jsx';
import NavigationArrows from './NavigationArrows.jsx';
import CarouselDots from './CarouselDots.jsx';
import ArtworkDescription from './ArtworkDescription.jsx';
import ImagePreloader from './ImagePreloader.jsx';

export default function ImageCarousel() {
  const {
    currentIndex,
    isLoading,
    cachedImages,
    setCachedImages,
    loadingImages,
    setLoadingImages,
    setIsLoading,
    isTransitioning,
    goToSlide,
    goToPrevious,
    goToNext,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useCarouselLogic(Artworks);

  const currentArtwork = Artworks[currentIndex];

  return (
    <div
      className="relative w-full h-screen overflow-hidden md:h-screen"
      style={{
        height: window.innerWidth <= 768 ? '100vh' : '100vh',
        minHeight: window.innerWidth <= 768 ? '100vh' : '100vh'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image Preloader */}
      <ImagePreloader
        artworks={Artworks}
        cachedImages={cachedImages}
        setCachedImages={setCachedImages}
        loadingImages={loadingImages}
        setLoadingImages={setLoadingImages}
        setIsLoading={setIsLoading}
      />

      {/* Main Image */}
      <CarouselImage
        artwork={currentArtwork}
        isTransitioning={isTransitioning}
        cachedImages={cachedImages}
        currentIndex={currentIndex}
      />

      {/* Navigation Arrows */}
      <NavigationArrows
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />

      {/* Artwork Description Panel */}
      <div className="absolute right-0 top-0 h-full flex items-center hidden lg:flex">
        <ArtworkDescription
          artwork={currentArtwork}
          isTransitioning={isTransitioning}
          getEraFromDate={getEraFromDate}
        />
      </div>

      {/* Mobile Artwork Info - Bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 lg:hidden">
        <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white p-4 pb-16">
          <h2 className="text-xl font-serif italic mb-1">{currentArtwork.title}</h2>
          <p className="text-sm text-stone-200 mb-2">{currentArtwork.artistDisplayName}</p>
          <div className="flex gap-4 text-xs text-stone-300">
            <span>{currentArtwork.objectDate}</span>
            <span>{currentArtwork.period}</span>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <CarouselDots
        artworks={Artworks}
        currentIndex={currentIndex}
        cachedImages={cachedImages}
        loadingImages={loadingImages}
        goToSlide={goToSlide}
      />
    </div>
  );
}