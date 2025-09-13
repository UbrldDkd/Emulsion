import { useState } from "react";
import CollectionCard from "./CollectionCard.jsx";

export default function CollectionsSection({ collections, onWorkClick }) {
  const [showMore, setShowMore] = useState(false);

  // Handle undefined or empty collections
  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="w-[95%] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-4"></div>
          <h2 className="text-[26px] font-extralight text-stone-100 mb-3 tracking-[0.2em] uppercase">
            Collections
          </h2>
          <p className="text-stone-300 text-base font-light max-w-3xl mx-auto tracking-wide leading-relaxed">
            Explore new collections of curated artworks from various art movements.
          </p>
          <div className="w-33 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mt-4"></div>
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
                  <div className="flex justify-center py-4 lg:py-6">
                    <svg className="w-4 h-4 text-amber-500/50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center px-8 py-3 text-sm font-light text-stone-200 border border-stone-600/50 hover:bg-stone-800/50 hover:border-amber-500/30 transition-all duration-300 tracking-wider uppercase"
          >
            {showMore ? "Show less" : "Show more"}
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
