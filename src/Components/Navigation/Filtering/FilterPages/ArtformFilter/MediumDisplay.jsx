import { Keys } from '../../../../Keys.js';

export default function MediumDisplay({
  selectedMediumItems,
  setSelectedMediumItems,
  hoveredMediumItem,
  setHoveredMediumItem
}) {
  const { artForms } = Keys;

  const toggleMediumSelection = (itemId) => {
    setSelectedMediumItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {Object.entries(artForms).map(([artFormKey, artForm]) => (
        <div key={artFormKey} className="space-y-2">
          <div className="text-sm font-medium text-amber-400 border-b border-stone-700/50 pb-1">
            {artForm.label}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {artForm.mediums.slice(0, 6).map((medium, index) => {
              const itemId = `${artFormKey}-medium-${index}`;
              const isSelected = selectedMediumItems.has(itemId);
              const isHovered = hoveredMediumItem === itemId;

              return (
                <button
                  key={index}
                  className={`p-2 rounded text-xs text-left transition-all ${
                    isSelected 
                      ? 'bg-amber-600/20 text-amber-300 border border-amber-600/30' 
                      : isHovered
                        ? 'bg-stone-700 text-stone-300'
                        : 'bg-stone-800 text-stone-400 hover:text-stone-300 hover:bg-stone-700'
                  }`}
                  onMouseEnter={() => setHoveredMediumItem(itemId)}
                  onMouseLeave={() => setHoveredMediumItem(null)}
                  onClick={() => toggleMediumSelection(itemId)}
                >
                  {medium.label}
                </button>
              );
            })}
          </div>

          <div className="mt-3">
            <div className="text-xs text-stone-500 mb-2">Genres:</div>
            <div className="grid grid-cols-3 gap-1">
              {artForm.genres.slice(0, 6).map((genre, index) => {
                const itemId = `${artFormKey}-genre-${index}`;
                const isSelected = selectedMediumItems.has(itemId);
                const isHovered = hoveredMediumItem === itemId;

                return (
                  <button
                    key={index}
                    className={`p-1.5 rounded text-xs text-center transition-all flex items-center justify-center ${
                      isSelected
                        ? 'bg-stone-900/40 backdrop-blur-sm border border-stone-500'
                        : isHovered
                          ? 'bg-stone-700 border border-stone-700'
                          : 'bg-stone-800 border border-stone-800 hover:bg-stone-700 hover:border-stone-700'
                    }`}
                    onMouseEnter={() => setHoveredMediumItem(itemId)}
                    onMouseLeave={() => setHoveredMediumItem(null)}
                    onClick={() => toggleMediumSelection(itemId)}
                  >
                    <span className={`${
                      isSelected
                        ? 'text-amber-200/60'
                        : isHovered
                          ? 'text-amber-100/30'
                          : 'text-stone-200'
                    }`}>
                      {genre.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}