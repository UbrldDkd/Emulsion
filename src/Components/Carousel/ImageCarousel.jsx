import { useState, useEffect } from 'react';
import { artworks } from '../../data/artworks.js';
import ArtworkDescription from './ArtworkDescription.jsx';

// Helper function to determine era from date
const getEraFromDate = (dateString) => {
  const year = parseInt(dateString);
  if (isNaN(year)) return "Unknown";
  
  if (year < 500) return "Ancient";
  if (year < 1000) return "Early Medieval";
  if (year < 1400) return "Late Medieval";
  if (year < 1600) return "Renaissance";
  if (year < 1750) return "Baroque";
  if (year < 1850) return "Neoclassical";
  if (year < 1900) return "19th Century";
  if (year < 1945) return "Early Modern";
  if (year < 1980) return "Mid-Century";
  return "Contemporary";
};

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cachedImages, setCachedImages] = useState(new Set());
  const [loadingImages, setLoadingImages] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Cache all images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = artworks.map((artwork, index) => {
        return new Promise((resolve, reject) => {
          if (cachedImages.has(index)) {
            resolve(index);
            return;
          }

          setLoadingImages(prev => new Set(prev).add(index));
          
          const img = new Image();
          img.onload = () => {
            setCachedImages(prev => new Set(prev).add(index));
            setLoadingImages(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
            resolve(index);
          };
          img.onerror = () => {
            setLoadingImages(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
            reject(index);
          };
          img.src = artwork.primaryImage;
        });
      });

      // Load first image immediately, others in background
      try {
        await imagePromises[0];
        setIsLoading(false);
        
        // Continue loading other images in background
        Promise.allSettled(imagePromises.slice(1));
      } catch (error) {
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const currentArtwork = artworks[currentIndex];

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 200);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(currentIndex === 0 ? artworks.length - 1 : currentIndex - 1);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 200);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(currentIndex === artworks.length - 1 ? 0 : currentIndex + 1);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 200);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main Image */}
      <div className="absolute inset-0">
        {cachedImages.has(currentIndex) ? (
          <>
            <img
              src={currentArtwork.primaryImage}
              alt={currentArtwork.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
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
              <p className="text-xs text-stone-500 mt-1">{currentArtwork.title}</p>
            </div>
          </div>
        )}
      </div>

      {/* Simple Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300 z-10"
        aria-label="Previous image"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-[420px] top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300 z-10"
        aria-label="Next image"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Artwork Description Panel */}
      <div className="absolute right-0 top-0 h-full flex items-center">
        <ArtworkDescription artwork={currentArtwork} isTransitioning={isTransitioning} getEraFromDate={getEraFromDate} />
      </div>

      {/* Minimal Dots Indicator */}
      <div className="absolute bottom-8 left-8 flex space-x-2">
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
    </div>
  );
}