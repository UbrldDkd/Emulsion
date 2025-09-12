import { useState, useRef, useEffect } from 'react';

export default function ImageZoomModal({ selectedWork, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageClick = (e) => {
    if (zoom === 1) {
      // First click: zoom to 2x
      setZoom(2);
    } else if (zoom === 2) {
      // Second click: zoom to 3x
      setZoom(3);
    } else {
      // Third click: reset to fit
      resetZoom();
    }
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 10));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1));
    if (zoom <= 1.5) {
      // Center the scroll when zooming out to fit
      if (imageContainerRef.current) {
        const container = imageContainerRef.current;
        container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
        container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
      }
    }
  };

  const resetZoom = () => {
    setZoom(1);
    // Reset scroll position
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollLeft = 0;
      imageContainerRef.current.scrollTop = 0;
    }
  };

  // Center scroll when zooming in
  useEffect(() => {
    if (zoom > 1 && imageContainerRef.current) {
      const container = imageContainerRef.current;
      // Center the scroll position
      setTimeout(() => {
        container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
        container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
      }, 50);
    }
  }, [zoom]);

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollLeft = 0;
      imageContainerRef.current.scrollTop = 0;
    }
  }, [selectedWork.image]);

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      style={{ pointerEvents: 'auto' }}
      onWheel={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-center gap-8">
        {/* Image Container - Scrollable when zoomed */}
        <div 
          ref={imageContainerRef}
          className="relative overflow-auto scrollbar-hide"
          style={{
            height: '95vh',
            maxWidth: '70vw',
            display: 'flex',
            alignItems: zoom === 1 ? 'center' : 'flex-start',
            justifyContent: zoom === 1 ? 'center' : 'flex-start'
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          <img 
            ref={imageRef}
            src={selectedWork.image} 
            alt={selectedWork.title}
            className="object-contain cursor-pointer transition-transform duration-300 ease-out select-none"
            style={{
              height: zoom === 1 ? '95vh' : `${95 * zoom}vh`,
              maxWidth: zoom === 1 ? '70vw' : 'none',
              cursor: zoom > 1 ? 'default' : 'zoom-in'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleImageClick(e);
            }}
            draggable={false}
          />
        </div>

        {/* Description - Next to image */}
        <div 
          className="text-stone-100 py-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-serif text-stone-100 mb-2">{selectedWork.title}</h3>
              <div className="text-sm text-amber-400 uppercase tracking-wider mb-1">{selectedWork.artist}</div>
              <div className="text-sm text-stone-400">{selectedWork.year}</div>
            </div>

            <div className="w-16 h-px bg-stone-600"></div>

            <div className="space-y-2 text-sm text-stone-300">
              <div>
                <span className="text-stone-400 uppercase text-xs tracking-wider">Medium:</span>
                <div className="font-light">{selectedWork.medium}</div>
              </div>
              {selectedWork.dimensions && (
                <div>
                  <span className="text-stone-400 uppercase text-xs tracking-wider">Dimensions:</span>
                  <div className="font-light">{selectedWork.dimensions}</div>
                </div>
              )}
              {selectedWork.location && (
                <div>
                  <span className="text-stone-400 uppercase text-xs tracking-wider">Location:</span>
                  <div className="font-light">{selectedWork.location}</div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-600/20">
              <div className="text-xs text-stone-500 space-y-1">
                <div>Click image to zoom in</div>
                <div>Drag to pan when zoomed</div>
                <div>Click outside to close</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Zoom Controls - Bottom Left, Stacked Vertically */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="w-6 h-6 text-stone-100/70 hover:text-stone-100 transition-colors"
          disabled={zoom >= 10}
        >
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        
        <button
          onClick={zoomOut}
          className="w-6 h-6 text-stone-100/70 hover:text-stone-100 transition-colors"
          disabled={zoom <= 1}
        >
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 12H6" />
          </svg>
        </button>
        
        <button
          onClick={resetZoom}
          className="w-6 h-6 text-stone-100/70 hover:text-stone-100 transition-colors"
        >
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Zoom Level Indicator - Bottom Left */}
      {zoom > 1 && (
        <div className="absolute bottom-6 right-6 text-stone-100/70 text-sm">
          {Math.round(zoom * 100)}%
        </div>
      )}
    </div>
  );
}