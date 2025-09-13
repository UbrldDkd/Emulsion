export default function CollectionCard({ collection, onWorkClick }) {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-stone-800/30 to-stone-900/50 border border-stone-700/30 hover:border-amber-500/30 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/5 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative p-3">
        {/* Collection Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-light text-stone-100 tracking-wide mb-2">
              {collection.movement}
            </h3>
            <p className="text-xs text-amber-400/60 tracking-wider uppercase">
              {collection.period}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extralight text-stone-400">
              {collection.paintings?.length || 0}
            </span>
            <p className="text-xs text-stone-500 uppercase tracking-wider">Works</p>
          </div>
        </div>

        {/* Collection Description */}
        <p className="text-sm text-stone-300 font-light leading-relaxed mb-6">
          {collection.description}
        </p>

{/* Works Preview */}
{collection.paintings?.length > 0 && (
  <div className="grid grid-cols-4 gap-2 mb-6 items-start">
    {collection.paintings.slice(0, 4).map((painting, idx) => (
      <div
        key={idx}
        onClick={() => onWorkClick(painting)}
        className="bg-stone-800/50 hover:bg-stone-700/50 cursor-pointer transition-colors duration-300 overflow-hidden p-1"
      >
        {painting.image && (
          <img
            src={painting.image}
            alt={painting.title}
            className="block w-auto h-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
            style={{ maxWidth: '100%' }}
          />
        )}
      </div>
    ))}
  </div>
)}



        {/* View Collection Button */}
        <button className="text-sm text-amber-400/80 hover:text-amber-300 transition-colors duration-300 tracking-wider uppercase">
          Explore Collection →
        </button>
      </div>
    </div>
  );
}