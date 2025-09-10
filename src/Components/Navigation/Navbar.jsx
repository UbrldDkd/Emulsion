import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AdvancedSearchDropdown from './Filtering/AdvancedSearchDropdown.jsx';
import SearchPreview from './SearchPreview.jsx';
import SearchInput from './SearchInput.jsx';
import { useFetchSearch } from './CustomHooks/useFetchSearch.jsx';

export default function Navbar() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  
  const isHomePage = location.pathname === '/';

  const navClass = isHomePage 
    ? "bg-transparent text-stone-100 px-8 py-6" 
    : "bg-stone-900 text-stone-100 px-8 py-6 border-b border-stone-800";

  const { data, loading } = useFetchSearch({ searchTerm });

  if (data) {
    console.log('Search Data:', data);
  }


  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <nav className={navClass}>

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-light text-stone-100 tracking-wider">
            EMULSION
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-light hover:text-amber-400 transition-colors uppercase tracking-wide">
              Home
            </Link>
            <Link to="/discover" className="text-sm font-light hover:text-amber-400 transition-colors uppercase tracking-wide">
              Discover
            </Link>
            <Link to="/artists" className="text-sm font-light hover:text-amber-400 transition-colors uppercase tracking-wide">
              Artists
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <SearchInput onChange={handleChange} />
            <SearchPreview data={data} isLoading={loading} />
          </div>

          {/* Advanced Search Button */}
          <AdvancedSearchDropdown />
        </div>
      </div>
    </nav>
  )
}