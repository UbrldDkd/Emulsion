import { useEffect, useState, useRef } from 'react';
import ZoomableImage from './ZoomableImage';
import ArtworkDescription from './ArtworkDescription';
import FullscreenImage from './FullscreenImage';

export default function ImageZoomModal({ selectedWork, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [descriptionWidth, setDescriptionWidth] = useState(400);
  const imageRef = useRef(null);
  useEffect(() => {
    const scrollY = window.scrollY;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    // Trigger fade in animation
    setTimeout(() => setIsVisible(true), 10);

    // Calculate description width based on image size
    const updateDescriptionWidth = () => {
      if (imageRef.current) {
        const imageWidth = imageRef.current.getBoundingClientRect().width;
        const windowWidth = window.innerWidth;
        const availableWidth = (windowWidth - imageWidth) / 2;
        setDescriptionWidth(Math.max(320, Math.min(400, availableWidth - 32))); // 32px for margin
      }
    };

    // Update on resize and after image loads
    const resizeObserver = new ResizeObserver(updateDescriptionWidth);
    const timer = setTimeout(updateDescriptionWidth, 100);
    window.addEventListener('resize', updateDescriptionWidth);
    
    if (imageRef.current) {
      resizeObserver.observe(imageRef.current);
    }

    // Handle escape key to close modal and f key for fullscreen
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsFullscreen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('resize', updateDescriptionWidth);
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // Wait for fade out animation
  };

  return (
    <div
      className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className="relative w-full h-full"
      >
        {/* Desktop Layout - Image centered with description to the right */}
        <div className={`hidden lg:block absolute inset-0 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="flex items-center justify-center h-full">
            <div className="relative" onClick={(e) => e.stopPropagation()} ref={imageRef}>
              <ZoomableImage 
                selectedWork={selectedWork} 
                onClose={handleClose} 
                onFullscreen={() => setIsFullscreen(true)}
              />
              
              {/* Description - positioned right next to the centered image */}
              <div 
                className="absolute top-0 left-full ml-4 h-full"
                style={{ width: `${descriptionWidth}px` }}
              >
                <ArtworkDescription selectedWork={selectedWork} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Vertical stack */}
        <div className={`lg:hidden flex flex-col h-full transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {/* Image area - takes available space */}
          <div className="flex-1 flex items-center justify-center min-h-0" onClick={(e) => e.stopPropagation()}>
            <ZoomableImage 
              selectedWork={selectedWork} 
              onClose={handleClose} 
              onFullscreen={() => setIsFullscreen(true)}
            />
          </div>
          
          {/* Description area - scrollable if needed */}
          <div className="flex-shrink-0 max-h-[35vh] overflow-y-auto -mt-2" onClick={(e) => e.stopPropagation()}>
            <ArtworkDescription selectedWork={selectedWork} />
          </div>
        </div>
      </div>
      
      {/* Fullscreen Image */}
      {isFullscreen && (
        <FullscreenImage 
          selectedWork={selectedWork} 
          onClose={() => setIsFullscreen(false)} 
        />
      )}
    </div>
  );
}
