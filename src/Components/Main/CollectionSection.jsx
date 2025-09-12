export default function CollectionSection({ collection, onWorkClick }) {
  return (
    <div className="">
      <div className="flex items-start gap-12">
        {/* Left Side - Collection Title */}
        <div className="w-1/4">
          <h3 className="text-2xl font-serif text-stone-100 mb-2">{collection.title}</h3>
          <div className="text-sm text-stone-400 mb-4">{collection.period}</div>
          <p className="text-sm text-stone-300 font-light leading-relaxed">
            {collection.description}
          </p>
        </div>
        
        {/* Right Side - Artworks */}
        <div className="w-3/4">
          <div className="grid grid-cols-3 gap-6">
            {collection.works.map((work, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => onWorkClick(work)}>
                <div className="bg-stone-600 relative overflow-hidden mb-3 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src={work.image}
                    alt={work.title}
                    className="w-full h-64 object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
                </div>
                <div className="px-1">
                  <h5 className="text-stone-100 font-serif text-sm mb-1 leading-tight">{work.title}</h5>
                  <div className="text-stone-400 text-xs font-light mb-1">{work.artist}, {work.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}