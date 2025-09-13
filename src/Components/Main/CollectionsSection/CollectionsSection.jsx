import { useState } from "react";
import CollectionCard from "./CollectionCard.jsx";

export default function CollectionsSection({ collections, onWorkClick }) {
  const [showMore, setShowMore] = useState(false);

  // Handle undefined or empty collections
  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <div className="w-[95%] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-8"></div>
          <h2 className="text-4xl font-extralight text-stone-100 mb-6 tracking-[0.2em] uppercase">
            Collections
          </h2>
          <p className="text-stone-300 font-light max-w-3xl mx-auto text-lg tracking-wide leading-relaxed">
            Curated selections spanning the great artistic movements of history,
            each collection a testament to the enduring power of human creativity.
          </p>
          <div className="w-33 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mt-8"></div>
        </div>

        {/* Collections List */}
        <div className="flex flex-col">
          {collections
            .slice(0, showMore ? collections.length : 3)
            .map((collection, idx, array) => (
              <div key={`${collection.movement}-${idx}`}>
                <CollectionCard
                  collection={collection}
                  onWorkClick={onWorkClick}
                />
                {/* Add dots separator except after the last item */}
                {idx < array.length - 1 && (
                  <div className="flex justify-center py-8 lg:py-16">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-amber-500/40 rounded-full"></div>
                      <div className="w-1 h-1 bg-amber-500/30 rounded-full"></div>
                      <div className="w-1 h-1 bg-amber-500/20 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center px-11 py-4 text-sm font-light text-stone-200 border border-stone-600/50 hover:bg-stone-800/50 hover:border-amber-500/30 transition-all duration-300 tracking-wider uppercase"
          >
            {showMore ? "Minus" : "Plus"}
            <svg
              className={`ml-3 w-4 h-4 transition-transform duration-300 ${
                showMore ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
