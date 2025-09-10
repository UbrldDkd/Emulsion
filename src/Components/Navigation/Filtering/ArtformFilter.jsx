import MediaDisplay from './MediaDisplay.jsx';

export default function ArtformFilter({
  selectedMediaItems,
  setSelectedMediaItems,
  hoveredMediaItem,
  setHoveredMediaItem
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-stone-700/30 pb-3">
        <div className="text-stone-200 text-sm font-light tracking-wide">
          Art Forms, Mediums & Genres
        </div>
      </div>

      <MediaDisplay
        selectedMediaItems={selectedMediaItems}
        setSelectedMediaItems={setSelectedMediaItems}
        hoveredMediaItem={hoveredMediaItem}
        setHoveredMediaItem={setHoveredMediaItem}
      />
    </div>
  );
}