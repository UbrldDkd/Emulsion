import { useEffect } from 'react';

export default function ImagePreloader({ 
  artworks, 
  cachedImages, 
  setCachedImages, 
  loadingImages, 
  setLoadingImages, 
  setIsLoading 
}) {
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
  }, [artworks, cachedImages, setCachedImages, setLoadingImages, setIsLoading]);

  // This component doesn't render anything
  return null;
}