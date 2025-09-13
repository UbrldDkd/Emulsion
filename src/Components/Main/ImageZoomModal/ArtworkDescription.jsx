  export default function ArtworkDescription({ selectedWork }) {
  return (
    <div 
      className="w-full text-stone-100 py-4 lg:py-8 px-4 lg:px-6 bg-stone-950/20 backdrop-blur-sm h-full overflow-y-auto break-words overflow-wrap-anywhere"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="space-y-2 lg:space-y-4">
        <div>
          <h3 className="text-base lg:text-xl font-serif text-stone-100 mb-1 lg:mb-2 leading-tight">
            {selectedWork.title}
          </h3>
          <div className="text-xs lg:text-sm text-stone-200 uppercase tracking-wider mb-1">
            {/* Handle both string and object artist formats */}
            {typeof selectedWork.artist === 'string' 
              ? selectedWork.artist 
              : selectedWork.artist?.name || 'Unknown Artist'}
          </div>
          <div className="text-xs lg:text-sm text-amber-400/70">
            {/* Handle different date field names */}
            {selectedWork.year || selectedWork.date || selectedWork.objectDate || ''}
          </div>
        </div>

        <div className="w-12 h-px bg-stone-600 hidden lg:block"></div>

        <div className="space-y-2 lg:space-y-3 text-xs lg:text-sm text-stone-300">
          {selectedWork.dimensions && (
            <div>
              <span className="text-stone-400 uppercase text-xs tracking-wider block mb-1">Dimensions:</span>
              <div className="font-light">{selectedWork.dimensions}</div>
            </div>
          )}
          {selectedWork.medium && (
            <div>
              <span className="text-stone-400 uppercase text-xs tracking-wider block mb-1">Medium:</span>
              <div className="font-light">{selectedWork.medium}</div>
            </div>
          )}
          {(selectedWork.location || selectedWork.repository) && (
            <div>
              <span className="text-stone-400 uppercase text-xs tracking-wider block mb-1">Location:</span>
              <div className="font-light">{selectedWork.location || selectedWork.repository}</div>
            </div>
          )}
          {/* Add artist details if artist is an object */}
          {typeof selectedWork.artist === 'object' && selectedWork.artist && (
            <div>
              <span className="text-stone-400 uppercase text-xs tracking-wider block mb-1">Artist Details:</span>
              <div className="font-light">
                {selectedWork.artist.birthplace && `${selectedWork.artist.birthplace}`}
                {selectedWork.artist.birthYear && ` (${selectedWork.artist.birthYear}${selectedWork.artist.deathYear ? `-${selectedWork.artist.deathYear}` : ''})`}
              </div>
              {selectedWork.artist.period && (
                <div className="font-light text-stone-400 mt-1">Period: {selectedWork.artist.period}</div>
              )}
            </div>
          )}
        </div>
        
        {/* Add description if available */}
        {selectedWork.description && (
          <div className="border-t border-stone-600/30 pt-2 lg:pt-4">
            <span className="text-stone-400 uppercase text-xs tracking-wider block mb-1 lg:mb-2">Description:</span>
            <div className="max-h-[30vh] overflow-y-auto">
              <p className="text-xs lg:text-sm text-stone-300 font-light leading-relaxed break-words whitespace-pre-wrap overflow-wrap-anywhere max-w-80">{selectedWork.description}</p>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-stone-600/20">
          <div className="text-xs text-stone-500 space-y-1 hidden lg:block">
            <div>• Click image to zoom (1× → 2.5× → 4× → 6× → 10×)</div>
            <div>• Mouse wheel to zoom in/out smoothly</div>
            <div>• Use zoom controls on the left or keyboard shortcuts</div>
            <div>• Keyboard: E (zoom in) • Q (zoom out) • R (reset)</div>
            <div>• Drag to pan when zoomed</div>
            <div>• Click outside image to close or press Escape</div>
          </div>
        </div>
      </div>
    </div>
  );
}