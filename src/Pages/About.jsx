export default function About() {
  return (
    <div className="min-h-screen bg-stone-900">
      <div className="w-[95%] mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent mx-auto mb-4"></div>
          <h1 className="text-[26px] font-extralight text-stone-200 mb-3 tracking-[0.2em] uppercase">
            About Emulsion
          </h1>
          <p className="text-stone-200 text-base font-light max-w-3xl mx-auto tracking-wide leading-relaxed">
            A simple platform for browsing art collections.
          </p>
          <div className="w-33 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mx-auto mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* What is this */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-xl font-extralight text-stone-200 mb-4 tracking-wide">What is this?</h2>
            </div>
            <p className="text-stone-300 text-base font-light leading-relaxed text-center">
              This website is intended for artists and art enthusiasts to browse collections, discover new artists, learn about art and art history, and share with friends.
            </p>
          </section>

          {/* Current Features */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-xl font-extralight text-stone-200 mb-4 tracking-wide">Current Features</h2>
              <p className="text-stone-400 text-sm font-light">
                The website is currently static with sample data to demonstrate functionality.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="bg-stone-800/20 border border-stone-700/30 rounded-lg p-6">
                <h3 className="text-amber-200/45 font-light mb-2 tracking-wide">Static Art Collections Display</h3>
                <p className="text-stone-300 text-sm font-light leading-relaxed">
                  Sample collections showing art movements like Impressionism, Romanticism, and Ukiyo-e with static artwork data.
                </p>
              </div>

              <div className="bg-stone-800/20 border border-stone-700/30 rounded-lg p-6">
                <h3 className="text-amber-200/45 font-light mb-2 tracking-wide">Artist Gallery Display</h3>
                <p className="text-stone-300 text-sm font-light leading-relaxed">
                  Artists page showing sample artist information and artwork galleries in both grid and detailed views.
                </p>
              </div>

              <div className="bg-stone-800/20 border border-stone-700/30 rounded-lg p-6">
                <h3 className="text-amber-200/45 font-light mb-4 tracking-wide">Advanced Filter System</h3>
                <div className="space-y-3">
                  <p className="text-stone-300 text-sm font-light leading-relaxed">
                    A comprehensive filtering interface accessible through the search dropdown, offering multiple ways to explore art:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-amber-300/60 text-sm font-light mb-2">Filter Categories</h4>
                      <ul className="text-stone-400 text-xs space-y-1">
                        <li>• Year (single or interval)</li>
                        <li>• Artform (with genres & mediums)</li>
                        <li>• Era or specific movements</li>
                        <li>• Specific artists</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-amber-300/60 text-sm font-light mb-2">Timeline View</h4>
                      <ul className="text-stone-400 text-xs space-y-1">
                        <li>• Visual chronological layout</li>
                        <li>• Interactive era exploration</li>
                        <li>• Movement relationships</li>
                        <li>• Expandable time periods</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-stone-400 text-xs italic mt-4">
                    Interface is fully functional but doesn't filter any content yet - currently displays static sample data.
                  </p>
                </div>
              </div>

              <div className="bg-stone-800/20 border border-stone-700/30 rounded-lg p-6">
                <h3 className="text-amber-200/45 font-light mb-2 tracking-wide">Image Zoom Modal</h3>
                <p className="text-stone-300 text-sm font-light leading-relaxed">
                  Working zoom functionality and detail modals for viewing artwork information, using sample images.
                </p>
              </div>

              <div className="bg-stone-800/20 border border-stone-700/30 rounded-lg p-6">
                <h3 className="text-amber-200/45 font-light mb-2 tracking-wide">Responsive Design</h3>
                <p className="text-stone-300 text-sm font-light leading-relaxed">
                  Mobile-optimized layouts and touch controls that work across all devices.
                </p>
              </div>

              <div className="bg-stone-800/20 border border-stone-700/30 rounded-lg p-6">
                <h3 className="text-amber-200/45 font-light mb-2 tracking-wide">Filter Theme System</h3>
                <p className="text-stone-300 text-sm font-light leading-relaxed">
                  Dark and light mode toggle functionality within the advanced filter dropdown interface.
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent mx-auto mb-6"></div>
            <h2 className="text-xl font-extralight text-stone-200 mb-4 tracking-wide">Get In Touch</h2>
            <p className="text-stone-300 text-base font-light leading-relaxed mb-6">
              Have questions or suggestions? Feel free to contact us.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 text-sm font-light text-stone-200 border border-stone-600/50 hover:bg-stone-800/50 hover:border-amber-500/30 transition-all duration-300 tracking-wider uppercase"
            >
              Contact Us
              <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}