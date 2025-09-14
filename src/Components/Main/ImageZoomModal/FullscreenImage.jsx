import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function FullscreenImage({ selectedWork, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade in animation
    setTimeout(() => setIsVisible(true), 10);

    // Handle escape key to close fullscreen
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
        return;
      }

      // Handle zoom shortcuts
      if (!['e', 'q', 'r'].includes(e.key.toLowerCase())) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
    };

    // Use capture phase to intercept escape before other handlers
    document.addEventListener('keydown', handleKeyPress, true);
    window.addEventListener('keydown', handleKeyPress, true);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, true);
      window.removeEventListener('keydown', handleKeyPress, true);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div
      className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full h-full transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={10}
          centerOnInit
          wheel={{ step: 0.1 }}
          pinch={{ step: 0.05 }}
          doubleClick={{ step: 0.5 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => {
            // Keyboard shortcuts
            useEffect(() => {
              const handleKeyPress = (e) => {
                if (!['e', 'q', 'r'].includes(e.key.toLowerCase())) {
                  return;
                }

                e.preventDefault();
                e.stopPropagation();

                switch (e.key.toLowerCase()) {
                  case 'e':
                    zoomIn();
                    break;
                  case 'q':
                    zoomOut();
                    break;
                  case 'r':
                    resetTransform();
                    break;
                }
              };

              document.addEventListener('keydown', handleKeyPress);
              window.addEventListener('keydown', handleKeyPress);
              
              return () => {
                document.removeEventListener('keydown', handleKeyPress);
                window.removeEventListener('keydown', handleKeyPress);
              };
            }, [zoomIn, zoomOut, resetTransform]);

            return (
              <>
                {/* Image Container - Centers the image */}
                <TransformComponent
                  wrapperStyle={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  contentStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className="max-w-full max-h-screen object-contain cursor-pointer select-none"
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '95vw',
                      maxHeight: '95vh'
                    }}
                  />
                </TransformComponent>

                {/* Zoom Controls - Positioned at bottom left */}
                <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                  <button
                    onClick={() => zoomIn()}
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                    title="Zoom In"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => zoomOut()}
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                    title="Zoom Out"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                    title="Reset Zoom (100%)"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>

                {/* Close Button - Top right */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-10 h-10 lg:w-12 lg:h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg z-10"
                  title="Exit Fullscreen (ESC)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            );
          }}
        </TransformWrapper>
      </div>
    </div>
  );
}