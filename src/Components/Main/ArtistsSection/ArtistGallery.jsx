export default function ArtistGallery({ paintings, onWorkClick }) {
  if (!paintings || paintings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* First image - full size */}
        <div
          onClick={() => onWorkClick(paintings[0])}
          className="mb-6 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <img
            src={paintings[0].image}
            alt={paintings[0].title}
            className="w-full h-auto object-contain rounded opacity-80 hover:opacity-100 transition-opacity duration-300 ease-in-out"
          />
          <div className="text-xs text-stone-300 space-y-1 mt-1">
            <div className="font-light">{paintings[0].title}</div>
            <div className="text-stone-400">{paintings[0].objectDate}</div>
            <div className="text-stone-400">{paintings[0].medium}</div>
          </div>
        </div>

        {/* Rest of images - 2 columns grid */}
        {paintings.length > 1 && (
          <div className="grid grid-cols-2 gap-2">
            {paintings.slice(1).map((painting, idx) => (
              <div
                key={idx + 1}
                onClick={() => onWorkClick(painting)}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <img
                  src={painting.image}
                  alt={painting.title}
                  className="w-full h-auto object-contain rounded opacity-80 hover:opacity-100 transition-opacity duration-300 ease-in-out"
                />
                <div className="text-[10px] text-stone-300 space-y-0.5 mt-1">
                  <div className="font-light truncate">{painting.title}</div>
                  <div className="text-stone-400 truncate">{painting.objectDate}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Layout - original columns */}
      <div className="hidden md:block">
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
      </div>
    </>

  );
}
