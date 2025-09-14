import { useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ZoomableImage({ selectedWork, onFullscreen }) {
  return (
    <div className="relative max-w-full lg:max-w-[calc(100vw-28rem)]">
      <div className="relative">
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={10}
          centerOnInit
          wheel={{ step: 0.1 }}       // Mouse wheel sensitivity
          pinch={{ step: 0.05 }}      // Pinch sensitivity (smaller = more sensitive)
          doubleClick={{ step: 0.5 }} // Zoom on double click
        >
          {({ zoomIn, zoomOut, resetTransform }) => {
            // Simple keyboard shortcuts - same as buttons
            useEffect(() => {
              const handleKeyPress = (e) => {
                // Only handle our zoom keys, let escape pass through
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
              {/* Image */}
              <TransformComponent>
                <img
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  className="object-contain w-full max-w-full h-auto max-h-[50vh] lg:min-h-[90vh] lg:max-h-[90vh] cursor-pointer select-none"
                />
              </TransformComponent>

              {/* Zoom Controls - Mobile: below image, Desktop: left side */}
              <div className="lg:absolute relative justify-center mt-2 lg:mt-0 lg:bottom-0 lg:-left-16 lg:right-auto flex flex-row lg:flex-col gap-2 z-10">
                <button
                  onClick={() => zoomIn()}
                  className="w-10 h-10 lg:w-8 lg:h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                  title="Zoom In"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="w-10 h-10 lg:w-8 lg:h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                  title="Zoom Out"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                  </svg>
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="w-10 h-10 lg:w-8 lg:h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                  title="Reset Zoom (100%)"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                {onFullscreen && (
                  <button
                    onClick={onFullscreen}
                    className="w-10 h-10 lg:w-8 lg:h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                    title="Fullscreen"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                )}
              </div>
            </>
            );
          }}
        </TransformWrapper>
      </div>
    </div>
  );
}
