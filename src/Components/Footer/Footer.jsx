import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Footer Separator - Thin Gradient Line */}
      <div className="w-full h-px bg-gradient-to-r from-stone-900 via-stone-400/30 to-stone-900"></div>

      <footer className="bg-stone-900 border-t border-stone-800/30">
        <div className="w-[95%] mx-auto py-12">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex-1 max-w-md">
            <h3 className="text-lg font-extralight text-stone-100 tracking-[0.2em] uppercase mb-3">
              Emulsion
            </h3>
            <p className="text-stone-400 text-sm font-light leading-relaxed mb-4">
              Discover curated collections of artworks from around the world.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-stone-500 hover:text-amber-400/50 transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-stone-500 hover:text-amber-400/50 transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-stone-500 hover:text-amber-400/50 transition-colors">
                <FaPinterest className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Navigation */}
            <div>
              <h4 className="text-stone-200 font-light text-sm mb-3 tracking-wide">Navigate</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-stone-400 hover:text-amber-400/50 text-sm transition-colors">Home</Link></li>
                <li><Link to="/discover" className="text-stone-400 hover:text-amber-400/50 text-sm transition-colors">Discover</Link></li>
                <li><Link to="/artists" className="text-stone-400 hover:text-amber-400/50 text-sm transition-colors">Artists</Link></li>
                <li><Link to="/about" className="text-stone-400 hover:text-amber-400/50 text-sm transition-colors">About</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-stone-200 font-light text-sm mb-3 tracking-wide">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-stone-400 hover:text-amber-400/50 text-sm transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-stone-400 hover:text-amber-400/50 text-sm transition-colors">Terms</Link></li>
                <li><Link to="/contact" className="text-stone-400 hover:text-amber-400/50 text-sm transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex-1 max-w-sm">
            <h4 className="text-stone-200 font-light text-sm mb-3 tracking-wide">Stay Updated</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-stone-800/30 border border-stone-700/30 text-stone-200 text-sm placeholder-stone-500 focus:outline-none focus:ring-0 focus:border-amber-200/20 transition-colors"
              />
              <button className="px-3 py-2 bg-amber-200/10 text-amber-200/60 hover:bg-amber-200/20 hover:text-amber-200/80 text-sm transition-colors border border-amber-200/15">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-stone-800/30 pt-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-stone-500 text-xs font-light">
            © {currentYear} Emulsion. All rights reserved.
          </p>
          <span className="text-stone-600 text-xs font-light mt-2 sm:mt-0 flex items-center gap-1">
            Made with
            <AiOutlineHeart className="w-3 h-3 text-amber-500/40" />
            for art lovers
          </span>
        </div>
      </div>
    </footer>
    </>
  );
}