import { useState } from "react";

export default function CollectionsGallery({ paintings, onWorkClick }) {
  const [hoveredImage, setHoveredImage] = useState(null);

  if (!paintings || paintings.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-6 items-start">
      {paintings.slice(0, 4).map((painting, idx) => (
        <div
          key={idx}
          onClick={() => onWorkClick(painting)}
          className="cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
          onMouseEnter={() => setHoveredImage(idx)}
          onMouseLeave={() => setHoveredImage(null)}
        >
          {painting.image && (
            <img
              src={painting.image}
              alt={painting.title}
              className="block w-auto h-auto opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out"
              style={{ maxWidth: '100%' }}
            />
          )}
          <div className={`text-xs text-stone-300 space-y-1 mt-1 transition-opacity duration-300 ease-in-out ${
            hoveredImage === idx ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="font-light">{painting.title}</div>
            <div className="text-stone-400">{painting.artist}</div>
            <div className="text-stone-400">{painting.date}</div>
            <div className="text-stone-400">{painting.medium}</div>
          </div>
        </div>
      ))}
    </div>
  );
}