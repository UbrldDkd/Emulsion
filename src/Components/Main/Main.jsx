import { useState } from "react";
import CollectionsSection from "./CollectionsSection/CollectionsSection.jsx";
import ArtistsSection from "./ArtistsSection/ArtistsSection.jsx";
import ImageZoomModal from "./ImageZoomModal/ImageZoomModal.jsx";

// Import your collections and artists data from a data file if preferred
import { Collections } from "../../data/Collections.js";
import { ArtistsData } from "../../data/Artists.js";

export default function Main() {
  const [selectedWork, setSelectedWork] = useState(null);

  return (
    <div className="min-h-screen bg-stone-900">
      <CollectionsSection collections={Collections} onWorkClick={setSelectedWork} />
      <ArtistsSection artists={ArtistsData} onWorkClick={setSelectedWork} />
      {selectedWork && (
        <ImageZoomModal
          selectedWork={selectedWork}
          onClose={() => setSelectedWork(null)}
        />
      )}
    </div>
  );
}
