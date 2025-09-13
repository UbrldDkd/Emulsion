import { useState } from "react";
import ArtistCard from "../Components/Main/ArtistsSection/ArtistsCard.jsx";
import ImageZoomModal from "../Components/Main/ImageZoomModal/ImageZoomModal.jsx";
import { ArtistsData } from "../data/Artists.js";

export default function Artists() {
  const [selectedWork, setSelectedWork] = useState(null);

  return (
    <div className="min-h-screen bg-stone-900">
      <div className="w-[95%] mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-4"></div>
          <h1 className="text-[26px] font-extralight text-stone-200 mb-3 tracking-[0.2em] uppercase">
            Artists
          </h1>
          <p className="text-stone-200 text-base font-light max-w-3xl mx-auto tracking-wide leading-relaxed">
            Explore the masters whose works shaped artistic movements and discover emerging talents.
          </p>
          <div className="w-33 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mt-4"></div>
        </div>

        {/* Coming Soon Features */}
        <div className="text-center mb-16">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-4"></div>
          <h2 className="text-[22px] font-extralight text-stone-200 mb-6 tracking-[0.15em] uppercase">Coming Soon</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">Artist Favorites</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Add artists to your favorites and track their latest works</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">Share Artists</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Share artist profiles and their works with friends</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">User Profiles</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Customize your profile and showcase your favorite artworks</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">Public Collections</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Display your curated lists publicly for others to discover</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">Personal Gallery</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">A dedicated section showcasing all your favorited works</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/40 transition-colors">
                <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-amber-200/60 font-light mb-2 tracking-wide">Profile Customization</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed">Personalize your profile with themes and display preferences</p>
            </div>
          </div>
        </div>

        {/* Artists Gallery - Full List */}
        <div className="space-y-6">
          {ArtistsData.map((artist) => (
            <div key={artist.id}>
              <ArtistCard
                artist={artist}
                onWorkClick={setSelectedWork}
              />
              {/* Add separator between artists except last one */}
              {artist.id !== ArtistsData[ArtistsData.length - 1].id && (
                <div className="flex justify-center py-6">
                  <svg className="w-4 h-4 text-amber-500/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedWork && (
        <ImageZoomModal
          selectedWork={selectedWork}
          onClose={() => setSelectedWork(null)}
        />
      )}
    </div>
  );
}