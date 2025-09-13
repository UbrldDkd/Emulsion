export default function ArtistGallery({ paintings, onWorkClick }) {
  if (!paintings || paintings.length === 0) {
    return null;
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-6 mb-6">
  {paintings.map((painting, idx) => (
    <div
      key={idx}
      onClick={() => onWorkClick(painting)}
      className="mb-4 break-inside-avoid cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out hover:z-10"
    >
      <img
        src={painting.image}
        alt={painting.title}
        className="w-full h-auto min-w-[300px] object-contain rounded opacity-80 hover:opacity-100 transition-opacity duration-300 ease-in-out"
      />
      <div className="text-xs text-stone-300 space-y-1 mt-1 justify-right">
        <div className="font-light">{painting.title}</div>
        <div className="text-stone-400">{painting.objectDate}</div>
        <div className="text-stone-400">{painting.medium}</div>
      </div>
    </div>
  ))}
</div>

  );
}
