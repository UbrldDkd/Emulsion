import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import AdvancedSearchDropdown from './Filtering/AdvancedSearchDropdown.jsx';
import SearchPreview from './Search/SearchPreview.jsx';
import SearchInput from './Search/SearchInput.jsx';
import { useFetchSearch } from './CustomHooks/useFetchSearch.jsx';

export default function Navbar() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  
  const isHomePage = location.pathname === '/';

  const navClass = isHomePage 
    ? "bg-transparent text-stone-100 px-8 py-5" 
    : "bg-stone-900 text-stone-100 px-8 py-5 border-b border-stone-800";

  const { data, loading } = useFetchSearch({ searchTerm });

  if (data) {
    console.log('Search Data:', data);
  }

  // Handle preview animation timing
  useEffect(() => {
    if (isSearchFocused) {
      setShowPreview(true);
    } else {
      const timer = setTimeout(() => setShowPreview(false), 200); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isSearchFocused]);

  // Handle scroll-based navbar visibility for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show

          if (Math.abs(currentScrollY - lastScrollY.current) < scrollThreshold) {
            ticking.current = false;
            return;
          }

          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            // Scrolling down and past 100px - hide navbar
            setIsNavbarVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up - show navbar
            setIsNavbarVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Only add scroll listener on mobile screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const updateScrollListener = () => {
      if (mediaQuery.matches) {
        window.addEventListener('scroll', handleScroll, { passive: true });
      } else {
        window.removeEventListener('scroll', handleScroll);
        setIsNavbarVisible(true); // Always show on desktop
      }
    };

    updateScrollListener();
    mediaQuery.addEventListener('change', updateScrollListener);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', updateScrollListener);
    };
  }, []);

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <nav
      className={`${navClass} relative transition-transform duration-300 ease-in-out ${
        isNavbarVisible ? 'translate-y-0' : 'md:translate-y-0 -translate-y-full'
      } fixed top-0 left-0 right-0 z-50`}
      onClick={(e) => {
        // Close mobile menu when clicking outside of menu items
        if (isMobileMenuOpen && !e.target.closest('.mobile-menu-content') && !e.target.closest('.search-container') && !e.target.closest('[aria-label="Toggle mobile menu"]')) {
          setIsMobileMenuOpen(false);
        }
      }}
    >

      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">

        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-light text-stone-100 tracking-wider">
            EMULSION
          </Link>
        </div>
        
        <div className="flex items-center h-full -my-5">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center h-full">
            <Link
              to="/"
              className={`flex items-center px-6 py-5 text-sm font-light transition-all uppercase tracking-wide text-stone-200 hover:text-amber-400/70 hover:bg-stone-800/30 ${
                location.pathname === '/' ? 'text-amber-400/80' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className={`flex items-center px-6 py-5 text-sm font-light transition-all uppercase tracking-wide text-stone-200 hover:text-amber-400/70 hover:bg-stone-800/30 ${
                location.pathname === '/discover' ? 'text-amber-400/80' : ''
              }`}
            >
              Discover
            </Link>
            <Link
              to="/artists"
              className={`flex items-center px-6 py-5 text-sm font-light transition-all uppercase tracking-wide text-stone-200 hover:text-amber-400/70 hover:bg-stone-800/30 ${
                location.pathname === '/artists' ? 'text-amber-400/80' : ''
              }`}
            >
              Artists
            </Link>
          </div>

          {/* Search Bar */}
          <div
            className="relative ml-6 search-container"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={(e) => {
              // Check if the blur is happening because user clicked inside the search preview
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setIsSearchFocused(false);
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <SearchInput onChange={handleChange} isHomePage={isHomePage} />
            {showPreview && <SearchPreview data={data} isLoading={loading} isVisible={isSearchFocused} />}
          </div>

          {/* Advanced Search Button */}
          <AdvancedSearchDropdown />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden ml-4 p-2 text-stone-400 hover:text-stone-200 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`absolute top-full left-0 right-0 bg-stone-900/95 backdrop-blur-sm border-b border-stone-800 md:hidden z-40 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0'
        }`}>
            <div className="mobile-menu-content w-[95%] mx-auto py-4 space-y-[2.5%]">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full py-3 px-4 text-sm font-light transition-all uppercase tracking-wide rounded text-center ${
                  location.pathname === '/'
                    ? 'text-stone-800 bg-amber-200/30 border border-amber-600/30'
                    : 'text-stone-200 bg-stone-700/60 hover:bg-stone-600/70 hover:text-amber-200/90'
                }`}
              >
                Home
              </Link>
              <Link
                to="/discover"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full py-3 px-4 text-sm font-light transition-all uppercase tracking-wide rounded text-center ${
                  location.pathname === '/discover'
                    ? 'text-stone-800 bg-amber-200/30 border border-amber-600/30'
                    : 'text-stone-200 bg-stone-700/60 hover:bg-stone-600/70 hover:text-amber-200/90'
                }`}
              >
                Discover
              </Link>
              <Link
                to="/artists"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full py-3 px-4 text-sm font-light transition-all uppercase tracking-wide rounded text-center ${
                  location.pathname === '/artists'
                    ? 'text-stone-800 bg-amber-200/30 border border-amber-600/30'
                    : 'text-stone-200 bg-stone-700/60 hover:bg-stone-600/70 hover:text-amber-200/90'
                }`}
              >
                Artists
              </Link>
            </div>
        </div>
      </div>
    </nav>
  )
}