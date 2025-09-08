import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Keys } from '../Keys.js';

export default function Movements() {
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [movementArtworks, setMovementArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { filters, Urls, wikidata } = Keys;

  const eras = [
    { id: 'all', label: 'All Movements' },
    { id: 'Ancient', label: 'Ancient & Classical' },
    { id: 'Medieval', label: 'Medieval' },
    { id: 'Renaissance', label: 'Renaissance' },
    { id: 'Baroque', label: 'Baroque' },
    { id: '18-19th Century', label: '18th-19th Century' },
    { id: '20th Century', label: '20th Century' },
    { id: 'Contemporary', label: 'Contemporary' },
    { id: 'Asian', label: 'Asian Art' },
    { id: 'African', label: 'African Art' },
    { id: 'Oceanic', label: 'Oceanic Art' },
    { id: 'Latin American', label: 'Latin American' },
    { id: 'Islamic', label: 'Islamic & Middle Eastern' }
  ];

  const filteredMovements = selectedEra === 'all' 
    ? filters.movements 
    : filters.movements.filter(m => m.era === selectedEra);

  const fetchMovementArtworks = async (movementId) => {
    setIsLoading(true);
    try {
      const query = `
        SELECT DISTINCT ?item ?title ?image ?creator ?creatorLabel ?inception
        WHERE {
          ?item wdt:${wikidata.properties.instanceOf} ?type .
          VALUES ?type { wd:Q3305213 wd:Q860861 wd:Q93184 } .
          ?item wdt:${wikidata.properties.movement} wd:${movementId} .
          ?item wdt:${wikidata.properties.image} ?image .
          ?item rdfs:label ?title .
          FILTER(LANG(?title) = "en") .
          
          OPTIONAL { ?item wdt:${wikidata.properties.creator} ?creator . }
          OPTIONAL { ?item wdt:${wikidata.properties.inception} ?inception . }
          
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }
        }
        LIMIT 6
      `;

      const encodedQuery = encodeURIComponent(query);
      const url = `${Urls.wikidata}?query=${encodedQuery}&format=json`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/sparql-results+json',
          'User-Agent': 'Emulsion Art Browser/1.0'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const results = data.results?.bindings || [];
        
        const artworks = results.map(result => ({
          id: result.item?.value.split('/').pop(),
          title: result.title?.value,
          imageUrl: result.image?.value ? `${Urls.wikimedia}/${result.image.value.split('/').pop()}?width=400` : null,
          creatorLabel: result.creatorLabel?.value,
          year: result.inception?.value ? new Date(result.inception.value).getFullYear() : null
        }));

        setMovementArtworks(artworks);
      }
    } catch (err) {
      console.error('Error fetching movement artworks:', err);
      setMovementArtworks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMovement) {
      fetchMovementArtworks(selectedMovement.value);
    }
  }, [selectedMovement]);

  const getMovementDescription = (movement) => {
    const descriptions = {
      'Q4692': 'A cultural movement that began in Italy, marking the transition from the Middle Ages to modernity. Characterized by renewed interest in classical antiquity, humanism, and naturalistic representation.',
      'Q37853': 'An artistic style that emerged in early 17th century Rome, characterized by dramatic lighting, rich colors, intense emotions, and dynamic movement.',
      'Q40415': 'A 19th-century art movement that originated in France, characterized by visible brush strokes, open composition, emphasis on light and its changing qualities.',
      'Q39427': 'A 20th-century avant-garde movement that sought to release the creative potential of the unconscious mind through dreamlike imagery.',
      'Q42934': 'A revolutionary art movement that analyzed and broke down objects into geometric shapes, pioneered by Pablo Picasso and Georges Braque.',
      'Q134147': 'An art movement that emerged in the 1950s, drawing inspiration from popular culture, advertising, and mass media.',
      'Q169385': 'A genre of Japanese art that flourished from the 17th through 19th centuries, featuring woodblock prints and paintings of landscapes, tales, and courtesans.',
      'Q432386': 'Art forms and architectural traditions from Muslim cultures, characterized by geometric patterns, calligraphy, and arabesque designs.',
      'Q191083': 'The oldest continuous art tradition in the world, featuring sacred designs, Dreamtime stories, and connection to the land.',
      'Q219803': 'A Mexican art movement of the 1920s-1950s that brought art to the public through large-scale murals depicting social and political messages.'
    };
    return descriptions[movement.value] || 'A significant movement in art history that has influenced countless artists and continues to inspire contemporary creators.';
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-stone-100 mb-4 tracking-wide">
            Art Movements Throughout History
          </h1>
          <p className="text-stone-400 text-lg max-w-3xl mx-auto">
            Explore the diverse artistic movements that have shaped human culture across time and geography
          </p>
        </div>

        {/* Era Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {eras.map(era => (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  selectedEra === era.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>
        </div>

        {/* Movements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMovements.map(movement => (
            <div
              key={movement.value}
              className={`bg-stone-800 rounded p-6 cursor-pointer transition-all ${
                selectedMovement?.value === movement.value
                  ? 'ring-2 ring-amber-400 bg-stone-750'
                  : 'hover:bg-stone-750'
              }`}
              onClick={() => setSelectedMovement(movement)}
            >
              <div className="mb-3">
                <h3 className="text-lg font-medium text-stone-200 mb-1">
                  {movement.label}
                </h3>
                {movement.region && (
                  <p className="text-xs text-amber-400">{movement.region}</p>
                )}
                <p className="text-xs text-stone-500">{movement.era}</p>
              </div>
              <p className="text-stone-400 text-sm line-clamp-3">
                {getMovementDescription(movement)}
              </p>
              <button className="text-amber-400 hover:text-amber-300 text-sm mt-3">
                View Artworks →
              </button>
            </div>
          ))}
        </div>

        {/* Selected Movement Details */}
        {selectedMovement && (
          <div className="bg-stone-800 rounded p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-stone-200 mb-3">
                {selectedMovement.label}
              </h2>
              <p className="text-stone-400 leading-relaxed">
                {getMovementDescription(selectedMovement)}
              </p>
              <Link
                to={`/search?movement=${selectedMovement.value}`}
                className="inline-block mt-4 text-amber-400 hover:text-amber-300"
              >
                Browse all {selectedMovement.label} artworks →
              </Link>
            </div>

            {/* Sample Artworks */}
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mx-auto mb-2"></div>
                <p className="text-stone-400 text-sm">Loading artworks...</p>
              </div>
            ) : movementArtworks.length > 0 ? (
              <div>
                <h3 className="text-lg font-medium text-stone-300 mb-4">Featured Works</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {movementArtworks.map(artwork => (
                    <Link
                      key={artwork.id}
                      to={`/artwork/${artwork.id}`}
                      className="group"
                    >
                      <div className="aspect-square bg-stone-700 rounded overflow-hidden mb-2">
                        <img
                          src={artwork.imageUrl || 'https://via.placeholder.com/200x200/1c1917/a3a3a3?text=No+Image'}
                          alt={artwork.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-xs text-stone-300 line-clamp-2">
                        {artwork.title}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {artwork.creatorLabel || 'Unknown Artist'}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-stone-500 text-center py-8">
                No artworks found for this movement
              </p>
            )}
          </div>
        )}

        {/* Educational Timeline */}
        <div className="mt-12">
          <h2 className="text-2xl font-light text-stone-200 mb-8 text-center">
            Historical Timeline of Art Movements
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-stone-700"></div>
            {[
              { year: '3000 BCE', movement: 'Ancient Egyptian', side: 'left' },
              { year: '500 BCE', movement: 'Ancient Greek', side: 'right' },
              { year: '500 CE', movement: 'Byzantine', side: 'left' },
              { year: '1000', movement: 'Romanesque', side: 'right' },
              { year: '1400', movement: 'Renaissance', side: 'left' },
              { year: '1600', movement: 'Baroque', side: 'right' },
              { year: '1850', movement: 'Impressionism', side: 'left' },
              { year: '1900', movement: 'Modernism', side: 'right' },
              { year: '1950', movement: 'Pop Art', side: 'left' },
              { year: '2000', movement: 'Digital Art', side: 'right' }
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center mb-8 ${
                  item.side === 'left' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${item.side === 'left' ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <p className="text-amber-400 font-medium">{item.year}</p>
                  <p className="text-stone-300">{item.movement}</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}