import CollectionsGallery from "./CollectionsGallery.jsx";

export default function CollectionCard({ collection, onWorkClick }) {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-stone-800/30 to-stone-900/50 border border-stone-700/10 hover:border-amber-500/10 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/5 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative p-3">
        {/* Collection Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-light text-stone-100 tracking-wide mb-2">
              {collection.movement}
            </h3>
            <p className="text-xs text-amber-300/30 tracking-wider uppercase">
              {collection.period}
            </p>
          </div>
          <div className="text-right">
            <span className="text-base font-extralight text-stone-400">
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
  <CollectionsGallery 
    paintings={collection.paintings}
    onWorkClick={onWorkClick}
  />
)}



        {/* View Collection Button */}
        <button className="text-sm text-amber-300/60 hover:text-amber-300/90 transition-colors duration-300 tracking-wider uppercase">
          Explore Collection →
        </button>
      </div>
    </div>
  );
}