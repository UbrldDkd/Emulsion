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
    goToNext
  } = useCarouselLogic(Artworks);

  const currentArtwork = Artworks[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden">
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
      <div className="absolute right-0 top-0 h-full flex items-center">
        <ArtworkDescription 
          artwork={currentArtwork} 
          isTransitioning={isTransitioning} 
          getEraFromDate={getEraFromDate} 
        />
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