import { useState, useEffect } from 'react';

// Helper function to determine era from date
export const getEraFromDate = (dateString) => {
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

export const useCarouselLogic = (artworks) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cachedImages, setCachedImages] = useState(new Set());
  const [loadingImages, setLoadingImages] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [artworks.length]);

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

  // Touch handlers for mobile swiping
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return {
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
  };
};