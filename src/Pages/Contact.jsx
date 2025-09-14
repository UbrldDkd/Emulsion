import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botField: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', or ''
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('');

    // Check honeypot field - if filled, likely a bot
    if (formData.botField) {
      setSubmitStatus('error');
      return;
    }

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', botField: '' });
        setErrors({});
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900">
      <div className="w-[95%] mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent mx-auto mb-4"></div>
          <h1 className="text-[26px] font-extralight text-stone-200 mb-3 tracking-[0.2em] uppercase">
            Contact Us
          </h1>
          <p className="text-stone-200 text-base font-light max-w-3xl mx-auto tracking-wide leading-relaxed">
            We'd love to hear from you. Get in touch with us for any questions, suggestions, or collaborations.
          </p>
          <div className="w-33 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mx-auto mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-extralight text-stone-200 mb-6 tracking-wide">Get in Touch</h2>
                <p className="text-stone-300 text-base font-light leading-relaxed mb-8">
                  Whether you have questions about our collections, want to suggest new features, or are interested in partnerships, we're here to help.
                </p>
              </div>

              <div className="space-y-6">
              </div>

              {/* Response Time */}
              <div className="mt-8 p-4 bg-stone-800/30 backdrop-blur-sm border border-stone-700/30 rounded-lg">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-amber-400/45 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-amber-200/45 font-light tracking-wide">Response Time</h3>
                </div>
                <p className="text-stone-300 text-sm font-light">
                  We typically respond to all inquiries within 24-48 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-recaptcha="true"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                {/* Honeypot field - hidden from users but visible to bots */}
                <div className="hidden">
                  <label>
                    Don't fill this out if you're human:
                    <input
                      name="bot-field"
                      value={formData.botField || ''}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-stone-300 text-sm font-light mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className={`w-full px-4 py-3 bg-stone-800/50 border text-stone-300 placeholder-stone-500 focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-500/50 focus:border-red-500/70'
                        : 'border-stone-700/50 focus:border-amber-500/30'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 font-light">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-stone-300 text-sm font-light mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className={`w-full px-4 py-3 bg-stone-800/50 border text-stone-300 placeholder-stone-500 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500/50 focus:border-red-500/70'
                        : 'border-stone-700/50 focus:border-amber-500/30'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 font-light">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-stone-300 text-sm font-light mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em'
                    }}
                    className={`w-full px-4 py-3 bg-stone-800/50 border text-stone-300 focus:outline-none transition-colors pr-10 ${
                      errors.subject
                        ? 'border-red-500/50 focus:border-red-500/70'
                        : 'border-stone-700/50 focus:border-amber-500/30'
                    }`}
                  >
                    <option value="" className="bg-stone-800 text-stone-300">Select a subject</option>
                    <option value="general" className="bg-stone-800 text-stone-300">General Inquiry</option>
                    <option value="support" className="bg-stone-800 text-stone-300">Technical Support</option>
                    <option value="partnership" className="bg-stone-800 text-stone-300">Partnership Opportunity</option>
                    <option value="feedback" className="bg-stone-800 text-stone-300">Feedback & Suggestions</option>
                    <option value="api" className="bg-stone-800 text-stone-300">API Partnership</option>
                    <option value="other" className="bg-stone-800 text-stone-300">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1 font-light">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-stone-300 text-sm font-light mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                    required
                    className={`w-full px-4 py-3 bg-stone-800/50 border text-stone-300 placeholder-stone-500 focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? 'border-red-500/50 focus:border-red-500/70'
                        : 'border-stone-700/50 focus:border-amber-500/30'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1 font-light">{errors.message}</p>
                  )}
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-300 text-sm font-light">
                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-red-300 text-sm font-light">
                        Sorry, there was an error sending your message. Please try again or contact us directly via email.
                      </p>
                    </div>
                  </div>
                )}

                {/* reCAPTCHA */}
                <div data-netlify-recaptcha="true" className="flex justify-center"></div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-3 tracking-wider uppercase font-light transition-all duration-200 ${
                      isSubmitting
                        ? 'bg-stone-700/50 text-stone-500 border border-stone-600/50 cursor-not-allowed'
                        : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-200/60 hover:text-amber-200/80 border border-amber-500/30 hover:border-amber-500/50'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}