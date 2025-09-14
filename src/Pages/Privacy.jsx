export default function Privacy() {
  const lastUpdated = "September 13, 2025";

  return (
    <div className="min-h-screen bg-stone-900">
      <div className="w-[95%] mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent mx-auto mb-4"></div>
          <h1 className="text-[26px] font-extralight text-stone-200 mb-3 tracking-[0.2em] uppercase">
            Privacy Policy
          </h1>
          <p className="text-stone-200 text-base font-light max-w-3xl mx-auto tracking-wide leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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

          {/* Important Notice */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mb-12">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-amber-400/60 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <h3 className="text-amber-400/60 font-light tracking-wide">Current Status</h3>
            </div>
            <p className="text-stone-300 text-sm font-light leading-relaxed">
              <strong>Emulsion is currently in development phase.</strong> We do not collect, store, or use any personal information at this time. The contact form and newsletter subscription are not functional. All policies below describe how we will handle data once the platform becomes fully operational.
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="prose prose-stone max-w-none">
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">1</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Information We Collect</h2>
              </div>
              <div className="ml-11 space-y-4">
                <div>
                  <h3 className="text-amber-200/45 font-light mb-2 tracking-wide">Information You Provide</h3>
                  <p className="text-stone-300 text-base font-light leading-relaxed">
                    We collect information you voluntarily provide when you contact us, subscribe to our newsletter, or create an account. This may include your name, email address, and any messages or feedback you send us.
                  </p>
                </div>
                <div>
                  <h3 className="text-amber-200/45 font-light mb-2 tracking-wide">Automatically Collected Information</h3>
                  <p className="text-stone-300 text-base font-light leading-relaxed">
                    We automatically collect certain information about your device and how you interact with our website, including your IP address, browser type, device information, and usage patterns. This helps us improve our services and user experience.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">2</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">How We Use Your Information</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="space-y-2 text-stone-300 text-base font-light leading-relaxed">
                  <li>• Provide and improve our art discovery platform</li>
                  <li>• Respond to your inquiries and provide customer support</li>
                  <li>• Send you updates about new collections and features (with your consent)</li>
                  <li>• Analyze usage patterns to enhance user experience</li>
                  <li>• Protect against fraud and ensure platform security</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">3</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Information Sharing</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="space-y-2 text-stone-300 text-base font-light leading-relaxed">
                  <li>• With your explicit consent</li>
                  <li>• To comply with legal obligations or court orders</li>
                  <li>• To protect our rights and prevent fraud or illegal activities</li>
                  <li>• With service providers who help us operate our platform (under strict confidentiality agreements)</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">4</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Data Security</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">5</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Cookies and Tracking</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and remember your preferences. You can control cookie settings through your browser, though disabling cookies may affect some functionality.
                </p>
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  We may also use analytics services to understand how visitors interact with our website, helping us improve our services.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">6</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Your Rights</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="space-y-2 text-stone-300 text-base font-light leading-relaxed">
                  <li>• Access to the personal information we hold about you</li>
                  <li>• Correction of inaccurate or incomplete information</li>
                  <li>• Deletion of your personal information (subject to legal obligations)</li>
                  <li>• Portability of your data</li>
                  <li>• Withdrawal of consent for marketing communications</li>
                </ul>
                <p className="text-stone-300 text-base font-light leading-relaxed mt-4">
                  To exercise these rights, please contact us at privacy@emulsion.art.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">7</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Children's Privacy</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">8</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Changes to This Policy</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500/8 border border-amber-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-amber-400/45 text-sm font-light">9</span>
                </div>
                <h2 className="text-xl font-extralight text-stone-200 tracking-wide">Contact Us</h2>
              </div>
              <div className="ml-11">
                <p className="text-stone-300 text-base font-light leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="space-y-2 text-stone-300 text-base font-light leading-relaxed">
                  <p>Email: privacy@emulsion.art</p>
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