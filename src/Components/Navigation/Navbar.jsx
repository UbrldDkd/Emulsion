import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdvancedSearchDropdown from './Filtering/AdvancedSearchDropdown.jsx';
import SearchPreview from './SearchPreview.jsx';
import SearchInput from './SearchInput.jsx';
import { useFetchSearch } from './CustomHooks/useFetchSearch.jsx';

export default function Navbar() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
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

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <nav className={navClass}>

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
              className={`flex items-center px-6 py-5 text-sm font-light transition-all uppercase tracking-wide ${
                isHomePage 
                  ? 'hover:text-stone-600 hover:bg-stone-900/95' 
                  : 'hover:text-amber-400 hover:bg-stone-900'
              } ${
                location.pathname === '/' ? (isHomePage ? 'bg-transparent' : 'bg-stone-900') : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/discover" 
              className={`flex items-center px-6 py-5 text-sm font-light transition-all uppercase tracking-wide ${
                isHomePage 
                  ? 'hover:text-stone-600 hover:bg-stone-900/95' 
                  : 'hover:text-amber-400 hover:bg-stone-900'
              } ${
                location.pathname === '/discover' ? 'bg-stone-900' : ''
              }`}
            >
              Discover
            </Link>
            <Link 
              to="/artists" 
              className={`flex items-center px-6 py-5 text-sm font-light transition-all uppercase tracking-wide ${
                isHomePage 
                  ? 'hover:text-stone-600 hover:bg-stone-900/95' 
                  : 'hover:text-amber-400 hover:bg-stone-900'
              } ${
                location.pathname === '/artists' ? 'bg-stone-900' : ''
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
          >
            <SearchInput onChange={handleChange} isHomePage={isHomePage} />
            {showPreview && <SearchPreview data={data} isLoading={loading} isVisible={isSearchFocused} />}
          </div>

          {/* Advanced Search Button */}
          <AdvancedSearchDropdown />
        </div>
      </div>
    </nav>
  )
}