import { Link } from 'react-router-dom';
import { Keys } from '../Keys.js';

export default function SearchPreview({ data, isLoading, isVisible }) {
  const { Fields } = Keys;
  
  console.log('SearchPreview - data:', data, 'isLoading:', isLoading);

  const animationClasses = isVisible 
    ? "animate-in fade-in slide-in-from-top-2 duration-200" 
    : "animate-out fade-out slide-out-to-top-2 duration-200";
  
  if (isLoading) {
    return (
      <div className={`absolute top-full left-0 right-0 bg-stone-800 border border-stone-700 rounded mt-1 p-4 shadow-lg z-50 ${animationClasses}`}>
        <div className="text-center text-stone-400">Searching artworks...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className={`absolute top-full left-0 right-0 bg-stone-800 border border-stone-700 rounded mt-1 shadow-lg z-50 ${animationClasses}`}>
      {data.map((artwork) => (
        <Link 
          to={`/artwork/${artwork[Fields.id]}`}
          key={artwork[Fields.id]} 
          className="p-3 border-b border-stone-700 hover:bg-stone-700 flex gap-3 cursor-pointer"
        >
          {artwork[Fields.primaryImageSmall] && (
            <img 
              src={artwork[Fields.primaryImageSmall]} 
              alt={artwork[Fields.title]}
              className="w-16 h-16 object-cover rounded"
              onError={(e) => {e.target.style.display = 'none'}}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate text-stone-100">
              {artwork[Fields.title] || 'Untitled'}
            </h3>
            <p className="text-xs text-stone-300 truncate">
              {artwork[Fields.artist] || 'Unknown Artist'}
            </p>
            <p className="text-xs text-stone-400 truncate">
              {artwork[Fields.date] || 'Date unknown'}
            </p>
            {artwork[Fields.medium] && (
              <p className="text-xs text-amber-400 truncate">
                {artwork[Fields.medium]}
              </p>
            )}
            {artwork[Fields.department] && (
              <p className="text-xs text-stone-500 mt-1">
                {artwork[Fields.department]}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}