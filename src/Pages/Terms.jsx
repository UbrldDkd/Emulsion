export default function Terms() {
  const lastUpdated = "September 13, 2025";

  return (
    <div className="min-h-screen bg-stone-900">
      <div className="w-[95%] mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent mx-auto mb-4"></div>
          <h1 className="text-[26px] font-extralight text-stone-200 mb-3 tracking-[0.2em] uppercase">
            Terms of Service
          </h1>
          <p className="text-stone-200 text-base font-light max-w-3xl mx-auto tracking-wide leading-relaxed">
            Please read these terms carefully before using our art discovery platform.
          </p>
          <div className="w-33 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mx-auto mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="text-center mb-12">
            <p className="text-stone-400 text-sm font-light">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-stone max-w-none">
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">1</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Acceptance of Terms</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  By accessing and using Emulsion ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">2</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Description of Service</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  Emulsion is an online platform that provides access to curated collections of artworks, artist information, and educational content about various art movements and periods. The service is provided free of charge and is intended for educational and cultural purposes.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">3</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">User Responsibilities</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed mb-4">
                  As a user of Emulsion, you agree to:
                </p>
                <ul className="space-y-2 text-stone-300 text-base font-light leading-relaxed">
                  <li>• Use the service for lawful purposes only</li>
                  <li>• Respect intellectual property rights of artists and content creators</li>
                  <li>• Not attempt to reverse engineer or extract content in violation of copyright</li>
                  <li>• Not use the service to distribute malware or engage in harmful activities</li>
                  <li>• Provide accurate information when contacting us or subscribing to updates</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">4</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Intellectual Property</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed mb-4">
                  The artworks displayed on Emulsion are used for educational and cultural purposes. All artworks remain the property of their respective creators, estates, or institutions. Users may not:
                </p>
                <ul className="space-y-2 text-stone-300 text-base font-light leading-relaxed">
                  <li>• Use images for commercial purposes without proper licensing</li>
                  <li>• Claim ownership of any artwork or content</li>
                  <li>• Reproduce artworks without considering copyright restrictions</li>
                  <li>• Remove or alter copyright notices or attributions</li>
                </ul>
                <p className="text-stone-300 text-base font-light leading-relaxed mt-4">
                  The Emulsion platform design, interface, and curation are protected by copyright and other intellectual property laws.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">5</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Disclaimer of Warranties</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  The information, software, products, and services published on this website may include inaccuracies or typographical errors. Emulsion makes no representations about the suitability, reliability, availability, timeliness, and accuracy of the information, software, products, services and related graphics contained on the website for any purpose.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">6</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Limitation of Liability</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  In no event shall Emulsion or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Emulsion's website, even if Emulsion or its authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">7</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Privacy</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">8</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Changes to Terms</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the service after changes are posted constitutes acceptance of the modified terms.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">9</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Termination</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  We may terminate your access to the service at any time, without cause or notice, which may result in the forfeiture and destruction of all information associated with your use of the service.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">10</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Contact Information</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-stone-300 text-base font-light leading-relaxed">
                  <p>Email: legal@emulsion.art</p>
                  <p>General inquiries: hello@emulsion.art</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}