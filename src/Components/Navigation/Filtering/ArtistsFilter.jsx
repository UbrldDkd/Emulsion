import { useState } from 'react';

export default function ArtistsFilter() {
  const [searchTerm, setSearchTerm] = useState('');

  const suggestedArtists = [
    'Van Gogh',
    'Monet', 
    'Picasso',
    'Da Vinci',
    'Rembrandt',
    'Cézanne',
    'Renoir',
    'Degas',
    'Matisse',
    'Kandinsky'
  ];

  const filteredArtists = suggestedArtists.filter(artist =>
    artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-stone-700/30 pb-3">
        <div className="text-stone-200 text-sm font-light tracking-wide">
          Search by Artist
        </div>
      </div>

      <div>
        <label className="block text-xs text-stone-400 mb-2">Artist name</label>
        <input
          type="text"
          placeholder="e.g., Leonardo da Vinci"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-stone-700 border border-stone-600 rounded px-3 py-2 text-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
        />
      </div>

      {searchTerm.length > 0 && (
        <div className="space-y-1 max-h-48 overflow-y-auto">
          <div className="text-xs text-stone-400 mb-2">Suggestions:</div>
          {filteredArtists.map((artist, index) => (
            <button
              key={index}
              onClick={() => setSearchTerm(artist)}
              className="w-full text-left px-2 py-1 rounded text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              {artist}
            </button>
          ))}
        </div>
      )}

      {!searchTerm && (
        <div className="space-y-1 max-h-48 overflow-y-auto">
          <div className="text-xs text-stone-400 mb-2">Popular artists:</div>
          {suggestedArtists.map((artist, index) => (
            <button
              key={index}
              onClick={() => setSearchTerm(artist)}
              className="w-full text-left px-2 py-1 rounded text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              {artist}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}