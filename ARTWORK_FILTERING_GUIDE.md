# Artwork Filtering System

A comprehensive frontend-only data fetching and filtering system for the Metropolitan Museum's artwork collection.

## Overview

This system provides:
- **PapaParse CSV Loading**: Efficient loading and parsing of the MetObjects.txt file
- **Multi-criteria Filtering**: Filter by movement, era, artform, medium, genre, year range, and artist
- **Smart Routing**: Automatically routes to `/artists` or `/discover` based on filter criteria
- **Query Parameter Sync**: Maintains filter state in URL for bookmarking and sharing
- **Efficient UI**: Non-blocking loading, lazy image loading, and performance optimization

## Key Components

### 1. Data Service (`src/services/dataService.js`)

Handles loading and processing the CSV data:

```javascript
import { loadArtworksData, filterArtworks } from '../services/dataService';

// Load all artworks
const artworks = await loadArtworksData();

// Filter artworks
const filtered = filterArtworks(artworks, {
  movements: ['Impressionism', 'Post-Impressionism'],
  yearRange: { min: 1850, max: 1900 }
});
```

**Features:**
- Web worker parsing for performance
- In-memory caching
- Field mapping and data cleaning
- Error handling

### 2. Filter Utilities (`src/utils/filterUtils.js`)

URL and filter management utilities:

```javascript
import { 
  filtersToQueryParams, 
  queryParamsToFilters, 
  getTargetRoute 
} from '../utils/filterUtils';

// Convert filters to URL
const queryString = filtersToQueryParams(filters);

// Parse URL to filters
const filters = queryParamsToFilters(searchParams);

// Get correct route
const route = getTargetRoute(filters); // '/artists' or '/discover'
```

### 3. Custom Hooks (`src/hooks/useFilteredArtworks.js`)

React hooks for data management:

```javascript
import { useFilteredArtworks, useFilterOptions } from '../hooks/useFilteredArtworks';

function MyComponent() {
  const { artworks, loading, error, stats } = useFilteredArtworks();
  const { options } = useFilterOptions(); // For filter dropdowns
  
  return (
    <div>
      <p>{stats.filtered} of {stats.total} artworks</p>
      {artworks.map(artwork => <ArtworkCard key={artwork.id} artwork={artwork} />)}
    </div>
  );
}
```

### 4. Filter Controller (`src/Components/Navigation/FilterController.jsx`)

Complete filtering interface:

```javascript
import FilterController from '../Navigation/FilterController';

function MyPage() {
  return (
    <FilterController onClose={() => setShowFilters(false)} />
  );
}
```

**Features:**
- Multi-select filters for all criteria
- Year range selection
- Auto-routing based on selections
- Clear all functionality

### 5. UI Components

#### ArtworkGrid (`src/Components/Navigation/ArtworkGrid.jsx`)
```javascript
import ArtworkGrid from '../Navigation/ArtworkGrid';

<ArtworkGrid artworks={filteredArtworks} />
```

#### QuickFilters (`src/Components/Navigation/QuickFilters.jsx`)
```javascript
import QuickFilters from '../Navigation/QuickFilters';

<QuickFilters /> // Full version for homepages
<CompactQuickFilters /> // Navbar version
```

## Data Structure

Each artwork object contains:

```javascript
{
  id: "123456",           // Unique identifier
  title: "Mona Lisa",     // Artwork title
  artist: "Leonardo da Vinci", // Artist name
  year: 1503,             // Creation year (numeric)
  era: "Renaissance",     // Historical era
  movement: "High Renaissance", // Art movement
  artform: "Paintings",   // Art form/department
  medium: "Oil on wood",  // Medium/materials
  genre: "Portrait",      // Genre/tags
  imageUrl: "https://..."  // MET Museum image URL
}
```

## Routing Logic

The system automatically routes based on filter selection:

- **Artist filters selected** → Navigate to `/artists?artists=Monet,Renoir`
- **Other filters only** → Navigate to `/discover?movements=Impressionism&yearMin=1850`
- **No filters** → Stay on current page or navigate to `/discover`

## Filter Types

### Array Filters (Multiple Selection)
- `movements: ["Impressionism", "Post-Impressionism"]`
- `eras: ["19th century", "20th century"]`
- `artforms: ["Paintings", "Sculpture"]`
- `mediums: ["Oil on canvas", "Bronze"]`
- `genres: ["Landscape", "Portrait"]`
- `artists: ["Claude Monet", "Pierre-Auguste Renoir"]`

### Range Filter
- `yearRange: { min: 1850, max: 1900 }`
- `yearRange: { min: 1900 }` (from year)
- `yearRange: { max: 1850 }` (until year)

## Usage Examples

### Basic Page Implementation

```javascript
import { useFilteredArtworks } from '../hooks/useFilteredArtworks';
import ArtworkGrid from '../Navigation/ArtworkGrid';
import FilterController from '../Navigation/FilterController';

export default function DiscoverPage() {
  const [showFilters, setShowFilters] = useState(false);
  const { artworks, loading, error, stats } = useFilteredArtworks();

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Discover ({stats.filtered} artworks)</h1>
      
      <button onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Hide' : 'Show'} Filters
      </button>

      {showFilters && (
        <FilterController onClose={() => setShowFilters(false)} />
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ArtworkGrid artworks={artworks} />
      )}
    </div>
  );
}
```

### Programmatic Navigation

```javascript
import { useNavigate } from 'react-router-dom';
import { filtersToQueryParams, getTargetRoute } from '../utils/filterUtils';

function NavigateToImpressionists() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    const filters = {
      movements: ['Impressionism'],
      yearRange: { min: 1860, max: 1890 }
    };
    
    const route = getTargetRoute(filters); // '/discover'
    const query = filtersToQueryParams(filters);
    navigate(`${route}?${query}`);
  };

  return <button onClick={handleClick}>View Impressionist Works</button>;
}
```

### Custom Filter Hook

```javascript
import { useFilterNavigation } from '../hooks/useFilteredArtworks';

function MyCustomFilters() {
  const { updateFilters, clearFilters, addFilter, currentFilters } = useFilterNavigation();

  const handleAddMovement = (movement) => {
    addFilter('movements', movement);
  };

  const handleYearRange = (min, max) => {
    updateFilters({
      ...currentFilters,
      yearRange: { min, max }
    });
  };

  return (
    <div>
      <button onClick={() => handleAddMovement('Impressionism')}>
        Add Impressionism
      </button>
      <button onClick={() => handleYearRange(1850, 1900)}>
        1850-1900
      </button>
      <button onClick={clearFilters}>Clear All</button>
    </div>
  );
}
```

## Performance Considerations

- **Data Loading**: Uses web workers for CSV parsing
- **Caching**: In-memory cache prevents repeated file loads
- **Image Loading**: Lazy loading with error handling
- **Result Limiting**: Displays manageable chunks (1000 items without filters)
- **Filter Options**: Limited artist list (100) for performance

## File Structure

```
src/
├── services/
│   └── dataService.js          # CSV loading and filtering
├── utils/
│   └── filterUtils.js          # URL and filter utilities
├── hooks/
│   └── useFilteredArtworks.js  # React hooks
├── Components/
│   ├── Navigation/
│   │   ├── FilterController.jsx # Main filter interface
│   │   ├── ArtworkGrid.jsx     # Artwork display grid
│   │   └── QuickFilters.jsx    # Pre-built filter buttons
│   └── Pages/
│       ├── Discover.jsx        # Main discovery page
│       └── Artists.jsx         # Artist-focused page
└── public/
    └── MetObjects.txt          # MET Museum CSV data
```

## Integration with Existing Components

The system is designed to work alongside your existing components. You can:

1. **Replace existing pages**: Update Discover.jsx and Artists.jsx
2. **Add to navigation**: Integrate FilterController or QuickFilters
3. **Enhance search**: Use the hooks in existing search components
4. **Create custom views**: Build new pages using the provided hooks

## Error Handling

The system includes comprehensive error handling:

- **CSV loading errors**: Network and parsing failures
- **Image loading errors**: Fallback placeholders
- **Filter validation**: Invalid parameter handling
- **Performance limits**: Automatic result limiting

## Browser Compatibility

- **Modern browsers**: Full ES6+ support required
- **PapaParse**: Handles CSV parsing across browsers
- **Web Workers**: Used when available, fallback to main thread
- **URL API**: For query parameter handling

This system provides a complete, efficient, and user-friendly way to explore large artwork collections with frontend-only technology.