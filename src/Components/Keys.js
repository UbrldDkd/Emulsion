export const Keys = {
  Urls: {
      baseUrl: 'https://collectionapi.metmuseum.org/public/collection/v1',
      search: '/search',
      objects: '/objects'
  },
  metadata: {
    // Universal field mappings
    id: 'id',
    title: 'title', 
    artist: 'creator',
    artistLabel: 'creatorLabel',
    date: 'inception',
    image: 'image',
    imageUrl: 'imageUrl',
    collection: 'collection',
    collectionLabel: 'collectionLabel',
    material: 'material',
    materialLabel: 'materialLabel',
    movement: 'movement',
    movementLabel: 'movementLabel',
    genre: 'genre',
    genreLabel: 'genreLabel',
    height: 'height',
    width: 'width',
    location: 'location',
    locationLabel: 'locationLabel',
    description: 'description'
  },
  // MET API specific field mappings
  Fields: {
    id: 'objectID',
    title: 'title',
    artist: 'artistDisplayName',
    artistBio: 'artistDisplayBio',
    date: 'objectDate',
    beginDate: 'objectBeginDate',
    endDate: 'objectEndDate',
    medium: 'medium',
    dimensions: 'dimensions',
    classification: 'classification',
    department: 'department',
    culture: 'culture',
    period: 'period',
    dynasty: 'dynasty',
    region: 'region',
    primaryImage: 'primaryImage',
    primaryImageSmall: 'primaryImageSmall',
    additionalImages: 'additionalImages',
    repository: 'repository',
    objectURL: 'objectURL',
    tags: 'tags',
    isHighlight: 'isHighlight',
    isPublicDomain: 'isPublicDomain',
    rightsAndReproduction: 'rightsAndReproduction'
  },
  // MET Museum departments for filtering
  Departments: {
    'American Decorative Arts': 1,
    'Ancient Near Eastern Art': 3,
    'Arms and Armor': 4,
    'Arts of Africa, Oceania, and the Americas': 5,
    'Asian Art': 6,
    'The Cloisters': 7,
    'The Costume Institute': 8,
    'Drawings and Prints': 9,
    'Egyptian Art': 10,
    'European Paintings': 11,
    'European Sculpture and Decorative Arts': 12,
    'Greek and Roman Art': 13,
    'The Robert Lehman Collection': 15,
    'The Libraries': 16,
    'Medieval Art': 17,
    'Musical Instruments': 18,
    'Photographs': 19,
    'Modern Art': 21
  },
  // Comprehensive art forms with associated mediums
  artForms: {
    painting: {
      label: 'Painting',
      departmentId: 11,
      mediums: [
        { label: 'Oil on canvas', searchTerms: ['oil', 'canvas'] },
        { label: 'Oil on panel', searchTerms: ['oil', 'panel', 'wood'] },
        { label: 'Tempera', searchTerms: ['tempera'] },
        { label: 'Fresco', searchTerms: ['fresco'] },
        { label: 'Watercolor', searchTerms: ['watercolor', 'watercolour'] },
        { label: 'Acrylic', searchTerms: ['acrylic'] },
        { label: 'Gouache', searchTerms: ['gouache'] },
        { label: 'Casein', searchTerms: ['casein'] },
        { label: 'Encaustic', searchTerms: ['encaustic', 'wax'] },
        { label: 'Mixed media', searchTerms: ['mixed media'] }
      ],
      genres: [
        { label: 'Portrait', searchTerms: ['portrait'] },
        { label: 'Landscape', searchTerms: ['landscape'] },
        { label: 'Still Life', searchTerms: ['still life'] },
        { label: 'Religious', searchTerms: ['religious', 'biblical'] },
        { label: 'Mythological', searchTerms: ['mythology', 'mythological'] },
        { label: 'Historical', searchTerms: ['history', 'historical'] },
        { label: 'Genre Scene', searchTerms: ['genre', 'daily life'] },
        { label: 'Abstract', searchTerms: ['abstract'] },
        { label: 'Marine', searchTerms: ['marine', 'seascape'] }
      ]
    },
    sculpture: {
      label: 'Sculpture',
      departmentId: 12,
      mediums: [
        { label: 'Marble', searchTerms: ['marble'] },
        { label: 'Bronze', searchTerms: ['bronze'] },
        { label: 'Stone', searchTerms: ['stone', 'limestone', 'sandstone'] },
        { label: 'Wood', searchTerms: ['wood', 'wooden'] },
        { label: 'Clay/Terracotta', searchTerms: ['clay', 'terracotta', 'ceramic'] },
        { label: 'Plaster', searchTerms: ['plaster'] },
        { label: 'Metal', searchTerms: ['metal', 'iron', 'steel'] },
        { label: 'Glass', searchTerms: ['glass'] },
        { label: 'Ivory', searchTerms: ['ivory'] },
        { label: 'Mixed materials', searchTerms: ['mixed', 'composite'] }
      ],
      genres: [
        { label: 'Figurative', searchTerms: ['figure', 'figurative'] },
        { label: 'Portrait Bust', searchTerms: ['bust', 'portrait'] },
        { label: 'Religious', searchTerms: ['religious', 'devotional'] },
        { label: 'Mythological', searchTerms: ['mythology', 'mythological'] },
        { label: 'Abstract', searchTerms: ['abstract'] },
        { label: 'Architectural', searchTerms: ['architectural', 'decorative'] },
        { label: 'Animal', searchTerms: ['animal', 'zoomorphic'] },
        { label: 'Relief', searchTerms: ['relief', 'bas-relief'] }
      ]
    },
    drawing: {
      label: 'Drawing',
      departmentId: 9,
      mediums: [
        { label: 'Graphite', searchTerms: ['graphite', 'pencil'] },
        { label: 'Charcoal', searchTerms: ['charcoal'] },
        { label: 'Ink', searchTerms: ['ink'] },
        { label: 'Chalk', searchTerms: ['chalk'] },
        { label: 'Pastel', searchTerms: ['pastel'] },
        { label: 'Silverpoint', searchTerms: ['silverpoint'] },
        { label: 'Red chalk', searchTerms: ['red chalk', 'sanguine'] },
        { label: 'Conte crayon', searchTerms: ['conte', 'crayon'] },
        { label: 'Pen and wash', searchTerms: ['pen', 'wash'] },
        { label: 'Mixed media', searchTerms: ['mixed media'] }
      ],
      genres: [
        { label: 'Study', searchTerms: ['study', 'sketch'] },
        { label: 'Portrait', searchTerms: ['portrait'] },
        { label: 'Landscape', searchTerms: ['landscape'] },
        { label: 'Figure Study', searchTerms: ['figure', 'anatomy'] },
        { label: 'Architectural', searchTerms: ['architectural', 'building'] },
        { label: 'Still Life', searchTerms: ['still life'] },
        { label: 'Illustration', searchTerms: ['illustration', 'design'] },
        { label: 'Abstract', searchTerms: ['abstract'] }
      ]
    },
    print: {
      label: 'Print',
      departmentId: 9,
      mediums: [
        { label: 'Engraving', searchTerms: ['engraving'] },
        { label: 'Etching', searchTerms: ['etching'] },
        { label: 'Aquatint', searchTerms: ['aquatint'] },
        { label: 'Mezzotint', searchTerms: ['mezzotint'] },
        { label: 'Drypoint', searchTerms: ['drypoint'] },
        { label: 'Lithograph', searchTerms: ['lithograph'] },
        { label: 'Woodcut', searchTerms: ['woodcut'] },
        { label: 'Wood engraving', searchTerms: ['wood engraving'] },
        { label: 'Linocut', searchTerms: ['linocut'] },
        { label: 'Silkscreen', searchTerms: ['silkscreen', 'serigraphy'] },
        { label: 'Monotype', searchTerms: ['monotype'] }
      ],
      genres: [
        { label: 'Portrait', searchTerms: ['portrait'] },
        { label: 'Landscape', searchTerms: ['landscape'] },
        { label: 'Religious', searchTerms: ['religious'] },
        { label: 'Satirical', searchTerms: ['satirical', 'caricature'] },
        { label: 'Historical', searchTerms: ['historical'] },
        { label: 'Genre Scene', searchTerms: ['genre', 'daily life'] },
        { label: 'Still Life', searchTerms: ['still life'] },
        { label: 'Abstract', searchTerms: ['abstract'] }
      ]
    },
    photography: {
      label: 'Photography',
      departmentId: 19,
      mediums: [
        { label: 'Gelatin silver print', searchTerms: ['gelatin silver'] },
        { label: 'Albumen print', searchTerms: ['albumen'] },
        { label: 'Platinum print', searchTerms: ['platinum'] },
        { label: 'Cyanotype', searchTerms: ['cyanotype'] },
        { label: 'Daguerreotype', searchTerms: ['daguerreotype'] },
        { label: 'Tintype', searchTerms: ['tintype'] },
        { label: 'Color photograph', searchTerms: ['color photograph', 'chromogenic'] },
        { label: 'Digital print', searchTerms: ['digital', 'inkjet'] }
      ],
      genres: [
        { label: 'Portrait', searchTerms: ['portrait'] },
        { label: 'Landscape', searchTerms: ['landscape'] },
        { label: 'Street Photography', searchTerms: ['street', 'documentary'] },
        { label: 'Architecture', searchTerms: ['architectural', 'building'] },
        { label: 'Still Life', searchTerms: ['still life'] },
        { label: 'Fashion', searchTerms: ['fashion'] },
        { label: 'Abstract', searchTerms: ['abstract', 'experimental'] },
        { label: 'Photojournalism', searchTerms: ['photojournalism', 'news'] }
      ]
    },
    decorativeArts: {
      label: 'Decorative Arts',
      departmentId: 12,
      mediums: [
        { label: 'Porcelain', searchTerms: ['porcelain'] },
        { label: 'Ceramic', searchTerms: ['ceramic'] },
        { label: 'Silver', searchTerms: ['silver'] },
        { label: 'Gold', searchTerms: ['gold'] },
        { label: 'Enamel', searchTerms: ['enamel'] },
        { label: 'Tapestry', searchTerms: ['tapestry'] },
        { label: 'Textile', searchTerms: ['textile', 'fabric'] },
        { label: 'Furniture', searchTerms: ['furniture'] },
        { label: 'Jewelry', searchTerms: ['jewelry', 'jewellery'] }
      ],
      genres: [
        { label: 'Religious', searchTerms: ['religious', 'devotional'] },
        { label: 'Ceremonial', searchTerms: ['ceremonial', 'ritual'] },
        { label: 'Domestic', searchTerms: ['domestic', 'household'] },
        { label: 'Royal/Court', searchTerms: ['royal', 'court', 'imperial'] },
        { label: 'Functional', searchTerms: ['functional', 'utilitarian'] },
        { label: 'Ornamental', searchTerms: ['ornamental', 'decorative'] }
      ]
    }
  },

  filters: {
    // Simplified form selection
    artworkTypes: [
      { label: 'Paintings', value: 'painting' },
      { label: 'Sculptures', value: 'sculpture' },
      { label: 'Drawings', value: 'drawing' },
      { label: 'Prints', value: 'print' },
      { label: 'Photographs', value: 'photography' },
      { label: 'Decorative Arts', value: 'decorativeArts' }
    ],
    // Detailed movements with comprehensive subcategories (ordered from newest to oldest)
    movementsByEra: {
      'Contemporary': {
        label: 'Contemporary',
        period: '1945-present',
        movements: [
          { label: 'New Media Art', searchTerms: ['new media', 'digital art'], period: '2000-present' },
          { label: 'Young British Artists', searchTerms: ['yba', 'young british artists'], period: '1990-2010' },
          { label: 'Neo-Pop', searchTerms: ['neo-pop'], period: '1980-present' },
          { label: 'Street Art', searchTerms: ['street art', 'graffiti'], period: '1980-present' },
          { label: 'Postmodernism', searchTerms: ['postmodern'], period: '1970-2000' },
          { label: 'Neo-Expressionism', searchTerms: ['neo-expressionism'], period: '1970-1990' },
          { label: 'Performance Art', searchTerms: ['performance art'], period: '1960-present' },
          { label: 'Land Art', searchTerms: ['land art', 'earth art'], period: '1960-1980' },
          { label: 'Conceptual Art', searchTerms: ['conceptual art'], period: '1960-1980' },
          { label: 'Minimalism', searchTerms: ['minimalism'], period: '1960-1980' },
          { label: 'Photorealism', searchTerms: ['photorealism'], period: '1960-1980' },
          { label: 'Pop Art', searchTerms: ['pop art'], period: '1950-1970' },
          { label: 'Color Field Painting', searchTerms: ['color field'], period: '1950-1970' },
          { label: 'Abstract Expressionism', searchTerms: ['abstract expressionism'], period: '1940-1960' }
        ]
      },
      'Modern': {
        label: 'Early 20th Century',
        period: '1900-1945',
        movements: [
          { label: 'Mexican Muralism', searchTerms: ['mexican muralism'], period: '1920-1970' },
          { label: 'Social Realism', searchTerms: ['social realism'], period: '1930-1960' },
          { label: 'Art Deco', searchTerms: ['art deco'], period: '1920-1940' },
          { label: 'Surrealism', searchTerms: ['surrealism'], period: '1920-1950' },
          { label: 'Bauhaus', searchTerms: ['bauhaus'], period: '1919-1933' },
          { label: 'De Stijl', searchTerms: ['de stijl'], period: '1917-1931' },
          { label: 'Dadaism', searchTerms: ['dadaism', 'dada'], period: '1916-1924' },
          { label: 'Suprematism', searchTerms: ['suprematism'], period: '1915-1925' },
          { label: 'Constructivism', searchTerms: ['constructivism'], period: '1915-1930' },
          { label: 'Cubism Synthetic', searchTerms: ['synthetic cubism'], period: '1912-1920' },
          { label: 'Der Blaue Reiter', searchTerms: ['der blaue reiter'], period: '1911-1914' },
          { label: 'Futurism', searchTerms: ['futurism'], period: '1909-1940' },
          { label: 'Cubism Analytic', searchTerms: ['analytical cubism'], period: '1907-1912' },
          { label: 'Die Brücke', searchTerms: ['die brucke'], period: '1905-1913' },
          { label: 'Expressionism', searchTerms: ['expressionism'], period: '1905-1925' },
          { label: 'Fauvism', searchTerms: ['fauvism', 'fauves'], period: '1905-1910' }
        ]
      },
      '19th Century': {
        label: '19th Century',
        period: '1800-1900',
        movements: [
          { label: 'Art Nouveau', searchTerms: ['art nouveau'], period: '1890-1910' },
          { label: 'Symbolism', searchTerms: ['symbolism'], period: '1880-1910' },
          { label: 'Pointillism', searchTerms: ['pointillism', 'neo-impressionism'], period: '1880-1900' },
          { label: 'Post-Impressionism', searchTerms: ['post-impressionism'], period: '1880-1905' },
          { label: 'Impressionism', searchTerms: ['impressionism', 'impressionist'], period: '1860-1886' },
          { label: 'Realism', searchTerms: ['realism'], period: '1850-1880' },
          { label: 'Pre-Raphaelite', searchTerms: ['pre-raphaelite'], period: '1848-1880' },
          { label: 'Barbizon School', searchTerms: ['barbizon'], period: '1830-1870' },
          { label: 'Academic Art', searchTerms: ['academic art'], period: '1800-1900' }
        ]
      },
      'Neoclassical': {
        label: 'Neoclassicism & Romanticism',
        period: '1750-1850',
        movements: [
          { label: 'Orientalism', searchTerms: ['orientalism'], period: '1800-1900' },
          { label: 'Empire Style', searchTerms: ['empire style'], period: '1800-1815' },
          { label: 'Romanticism', searchTerms: ['romanticism', 'romantic'], period: '1800-1850' },
          { label: 'Sublime', searchTerms: ['sublime'], period: '1750-1850' },
          { label: 'Neoclassicism', searchTerms: ['neoclassicism', 'neoclassical'], period: '1750-1850' }
        ]
      },
      'Baroque': {
        label: 'Baroque & Rococo',
        period: '1600-1800',
        movements: [
          { label: 'Rococo', searchTerms: ['rococo'], period: '1720-1780' },
          { label: 'Fête Galante', searchTerms: ['fete galante'], period: '1710-1730' },
          { label: 'Late Baroque', searchTerms: ['late baroque'], period: '1700-1750' },
          { label: 'High Baroque', searchTerms: ['high baroque'], period: '1650-1700' },
          { label: 'Early Baroque', searchTerms: ['early baroque'], period: '1600-1650' },
          { label: 'Caravaggism', searchTerms: ['caravaggism', 'caravaggio'], period: '1600-1650' },
          { label: 'Dutch Golden Age', searchTerms: ['dutch golden age'], period: '1588-1672' }
        ]
      },
      'Renaissance': {
        label: 'Renaissance',
        period: '1400-1600',
        movements: [
          { label: 'Mannerism', searchTerms: ['mannerism'], period: '1520-1600' },
          { label: 'German Renaissance', searchTerms: ['german renaissance'], period: '1450-1550' },
          { label: 'Venetian Renaissance', searchTerms: ['venetian renaissance'], period: '1450-1600' },
          { label: 'Cinquecento (High Renaissance)', searchTerms: ['cinquecento', 'high renaissance'], period: '1490-1520' },
          { label: 'Flemish Primitives', searchTerms: ['flemish primitives'], period: '1400-1500' },
          { label: 'Northern Renaissance', searchTerms: ['northern renaissance'], period: '1400-1600' },
          { label: 'Quattrocento (Early Renaissance)', searchTerms: ['quattrocento', 'early renaissance'], period: '1400-1490' },
          { label: 'Proto-Renaissance', searchTerms: ['proto-renaissance'], period: '1280-1400' }
        ]
      },
      'Medieval': {
        label: 'Medieval Period',
        period: '500-1400 CE',
        movements: [
          { label: 'Gothic International', searchTerms: ['international gothic'], period: '1375-1425 CE' },
          { label: 'Islamic Golden Age', searchTerms: ['islamic', 'golden age'], period: '750-1258 CE' },
          { label: 'Gothic High', searchTerms: ['gothic', 'high gothic'], period: '1250-1300 CE' },
          { label: 'Gothic Early', searchTerms: ['gothic', 'early gothic'], period: '1140-1250 CE' },
          { label: 'Romanesque', searchTerms: ['romanesque'], period: '1000-1200 CE' },
          { label: 'Ottonian', searchTerms: ['ottonian'], period: '950-1050 CE' },
          { label: 'Carolingian', searchTerms: ['carolingian'], period: '750-900 CE' },
          { label: 'Early Christian', searchTerms: ['early christian'], period: '300-600 CE' }
        ]
      },
      'Ancient World': {
        label: 'Ancient World',
        period: '3500 BCE - 500 CE',
        movements: [
          { label: 'Byzantine Early', searchTerms: ['byzantine', 'early'], period: '330-726 CE' },
          { label: 'Roman Empire', searchTerms: ['roman', 'empire'], period: '27 BCE-476 CE' },
          { label: 'Roman Republic', searchTerms: ['roman', 'republic'], period: '509-27 BCE' },
          { label: 'Greek Hellenistic', searchTerms: ['greek', 'hellenistic'], period: '323-31 BCE' },
          { label: 'Greek Classical', searchTerms: ['greek', 'classical'], period: '480-323 BCE' },
          { label: 'Greek Archaic', searchTerms: ['greek', 'archaic'], period: '800-480 BCE' },
          { label: 'Egyptian New Kingdom', searchTerms: ['egyptian', 'new kingdom'], period: '1550-1077 BCE' },
          { label: 'Egyptian Middle Kingdom', searchTerms: ['egyptian', 'middle kingdom'], period: '2055-1650 BCE' },
          { label: 'Egyptian Old Kingdom', searchTerms: ['egyptian', 'old kingdom'], period: '2686-2181 BCE' }
        ]
      },
      'Asian': {
        label: 'Asian Art',
        period: 'Various',
        movements: [
          { label: 'Chinese Literati', searchTerms: ['literati painting'], period: '1000-1900' },
          { label: 'Japanese Ukiyo-e', searchTerms: ['ukiyo-e'], period: '1600-1868' },
          { label: 'Mughal Miniature', searchTerms: ['mughal'], period: '1526-1857' }
        ]
      },
      'Regional': {
        label: 'Regional Traditions',
        period: 'Various',
        movements: [
          { label: 'Persian Miniature', searchTerms: ['persian miniature'], period: '1200-1600' },
          { label: 'Aboriginal Dreamtime', searchTerms: ['aboriginal', 'dreamtime'], period: 'Traditional' }
        ]
      }
    },
    // Keep the flat array for backward compatibility
    movements: [
      { label: 'Egyptian Old Kingdom', searchTerms: ['egyptian', 'old kingdom'], era: 'Ancient', period: '2686-2181 BCE' },
      { label: 'Egyptian Middle Kingdom', searchTerms: ['egyptian', 'middle kingdom'], era: 'Ancient', period: '2055-1650 BCE' },
      { label: 'Egyptian New Kingdom', searchTerms: ['egyptian', 'new kingdom'], era: 'Ancient', period: '1550-1077 BCE' },
      { label: 'Greek Archaic', searchTerms: ['greek', 'archaic'], era: 'Ancient', period: '800-480 BCE' },
      { label: 'Greek Classical', searchTerms: ['greek', 'classical'], era: 'Ancient', period: '480-323 BCE' },
      { label: 'Greek Hellenistic', searchTerms: ['greek', 'hellenistic'], era: 'Ancient', period: '323-31 BCE' },
      { label: 'Roman Republic', searchTerms: ['roman', 'republic'], era: 'Ancient', period: '509-27 BCE' },
      { label: 'Roman Empire', searchTerms: ['roman', 'empire'], era: 'Ancient', period: '27 BCE-476 CE' },
      { label: 'Byzantine Early', searchTerms: ['byzantine', 'early'], era: 'Ancient', period: '330-726 CE' },
      { label: 'Early Christian', searchTerms: ['early christian'], era: 'Medieval', period: '300-600 CE' },
      { label: 'Carolingian', searchTerms: ['carolingian'], era: 'Medieval', period: '750-900 CE' },
      { label: 'Ottonian', searchTerms: ['ottonian'], era: 'Medieval', period: '950-1050 CE' },
      { label: 'Romanesque', searchTerms: ['romanesque'], era: 'Medieval', period: '1000-1200 CE' },
      { label: 'Gothic Early', searchTerms: ['gothic', 'early gothic'], era: 'Medieval', period: '1140-1250 CE' },
      { label: 'Gothic High', searchTerms: ['gothic', 'high gothic'], era: 'Medieval', period: '1250-1300 CE' },
      { label: 'Gothic International', searchTerms: ['international gothic'], era: 'Medieval', period: '1375-1425 CE' },
      { label: 'Islamic Golden Age', searchTerms: ['islamic', 'golden age'], era: 'Medieval', period: '750-1258 CE' },
      { label: 'Proto-Renaissance', searchTerms: ['proto-renaissance'], era: 'Renaissance', period: '1280-1400' },
      { label: 'Quattrocento (Early Renaissance)', searchTerms: ['quattrocento', 'early renaissance'], era: 'Renaissance', period: '1400-1490' },
      { label: 'Cinquecento (High Renaissance)', searchTerms: ['cinquecento', 'high renaissance'], era: 'Renaissance', period: '1490-1520' },
      { label: 'Northern Renaissance', searchTerms: ['northern renaissance'], era: 'Renaissance', period: '1400-1600' },
      { label: 'Venetian Renaissance', searchTerms: ['venetian renaissance'], era: 'Renaissance', period: '1450-1600' },
      { label: 'Flemish Primitives', searchTerms: ['flemish primitives'], era: 'Renaissance', period: '1400-1500' },
      { label: 'German Renaissance', searchTerms: ['german renaissance'], era: 'Renaissance', period: '1450-1550' },
      { label: 'Mannerism', searchTerms: ['mannerism'], era: 'Renaissance', period: '1520-1600' },
      { label: 'Early Baroque', searchTerms: ['early baroque'], era: 'Baroque', period: '1600-1650' },
      { label: 'High Baroque', searchTerms: ['high baroque'], era: 'Baroque', period: '1650-1700' },
      { label: 'Late Baroque', searchTerms: ['late baroque'], era: 'Baroque', period: '1700-1750' },
      { label: 'Caravaggism', searchTerms: ['caravaggism', 'caravaggio'], era: 'Baroque', period: '1600-1650' },
      { label: 'Dutch Golden Age', searchTerms: ['dutch golden age'], era: 'Baroque', period: '1588-1672' },
      { label: 'Rococo', searchTerms: ['rococo'], era: 'Baroque', period: '1720-1780' },
      { label: 'Fête Galante', searchTerms: ['fete galante'], era: 'Baroque', period: '1710-1730' },
      { label: 'Neoclassicism', searchTerms: ['neoclassicism', 'neoclassical'], era: 'Neoclassical', period: '1750-1850' },
      { label: 'Empire Style', searchTerms: ['empire style'], era: 'Neoclassical', period: '1800-1815' },
      { label: 'Romanticism', searchTerms: ['romanticism', 'romantic'], era: 'Romantic', period: '1800-1850' },
      { label: 'Sublime', searchTerms: ['sublime'], era: 'Romantic', period: '1750-1850' },
      { label: 'Orientalism', searchTerms: ['orientalism'], era: 'Romantic', period: '1800-1900' },
      { label: 'Academic Art', searchTerms: ['academic art'], era: '19th Century', period: '1800-1900' },
      { label: 'Realism', searchTerms: ['realism'], era: '19th Century', period: '1850-1880' },
      { label: 'Barbizon School', searchTerms: ['barbizon'], era: '19th Century', period: '1830-1870' },
      { label: 'Pre-Raphaelite', searchTerms: ['pre-raphaelite'], era: '19th Century', period: '1848-1880' },
      { label: 'Impressionism', searchTerms: ['impressionism', 'impressionist'], era: '19th Century', period: '1860-1886' },
      { label: 'Post-Impressionism', searchTerms: ['post-impressionism'], era: '19th Century', period: '1880-1905' },
      { label: 'Pointillism', searchTerms: ['pointillism', 'neo-impressionism'], era: '19th Century', period: '1880-1900' },
      { label: 'Symbolism', searchTerms: ['symbolism'], era: '19th Century', period: '1880-1910' },
      { label: 'Art Nouveau', searchTerms: ['art nouveau'], era: '19th Century', period: '1890-1910' },
      { label: 'Fauvism', searchTerms: ['fauvism', 'fauves'], era: 'Modern', period: '1905-1910' },
      { label: 'Expressionism', searchTerms: ['expressionism'], era: 'Modern', period: '1905-1925' },
      { label: 'Die Brücke', searchTerms: ['die brucke'], era: 'Modern', period: '1905-1913' },
      { label: 'Der Blaue Reiter', searchTerms: ['der blaue reiter'], era: 'Modern', period: '1911-1914' },
      { label: 'Cubism Analytic', searchTerms: ['analytical cubism'], era: 'Modern', period: '1907-1912' },
      { label: 'Cubism Synthetic', searchTerms: ['synthetic cubism'], era: 'Modern', period: '1912-1920' },
      { label: 'Futurism', searchTerms: ['futurism'], era: 'Modern', period: '1909-1940' },
      { label: 'Constructivism', searchTerms: ['constructivism'], era: 'Modern', period: '1915-1930' },
      { label: 'Suprematism', searchTerms: ['suprematism'], era: 'Modern', period: '1915-1925' },
      { label: 'Dadaism', searchTerms: ['dadaism', 'dada'], era: 'Modern', period: '1916-1924' },
      { label: 'De Stijl', searchTerms: ['de stijl'], era: 'Modern', period: '1917-1931' },
      { label: 'Bauhaus', searchTerms: ['bauhaus'], era: 'Modern', period: '1919-1933' },
      { label: 'Surrealism', searchTerms: ['surrealism'], era: 'Modern', period: '1920-1950' },
      { label: 'Art Deco', searchTerms: ['art deco'], era: 'Modern', period: '1920-1940' },
      { label: 'Social Realism', searchTerms: ['social realism'], era: 'Modern', period: '1930-1960' },
      { label: 'Abstract Expressionism', searchTerms: ['abstract expressionism'], era: 'Contemporary', period: '1940-1960' },
      { label: 'Color Field Painting', searchTerms: ['color field'], era: 'Contemporary', period: '1950-1970' },
      { label: 'Pop Art', searchTerms: ['pop art'], era: 'Contemporary', period: '1950-1970' },
      { label: 'Minimalism', searchTerms: ['minimalism'], era: 'Contemporary', period: '1960-1980' },
      { label: 'Conceptual Art', searchTerms: ['conceptual art'], era: 'Contemporary', period: '1960-1980' },
      { label: 'Land Art', searchTerms: ['land art', 'earth art'], era: 'Contemporary', period: '1960-1980' },
      { label: 'Performance Art', searchTerms: ['performance art'], era: 'Contemporary', period: '1960-present' },
      { label: 'Photorealism', searchTerms: ['photorealism'], era: 'Contemporary', period: '1960-1980' },
      { label: 'Neo-Expressionism', searchTerms: ['neo-expressionism'], era: 'Contemporary', period: '1970-1990' },
      { label: 'Postmodernism', searchTerms: ['postmodern'], era: 'Contemporary', period: '1970-2000' },
      { label: 'New Media Art', searchTerms: ['new media', 'digital art'], era: 'Contemporary', period: '2000-present' },
      { label: 'Street Art', searchTerms: ['street art', 'graffiti'], era: 'Contemporary', period: '1980-present' },
      { label: 'Neo-Pop', searchTerms: ['neo-pop'], era: 'Contemporary', period: '1980-present' },
      { label: 'Young British Artists', searchTerms: ['yba', 'young british artists'], era: 'Contemporary', period: '1990-2010' },
      { label: 'Japanese Ukiyo-e', searchTerms: ['ukiyo-e'], era: 'Asian', period: '1600-1868' },
      { label: 'Chinese Literati', searchTerms: ['literati painting'], era: 'Asian', period: '1000-1900' },
      { label: 'Mughal Miniature', searchTerms: ['mughal'], era: 'Asian', period: '1526-1857' },
      { label: 'Persian Miniature', searchTerms: ['persian miniature'], era: 'Islamic', period: '1200-1600' },
      { label: 'Aboriginal Dreamtime', searchTerms: ['aboriginal', 'dreamtime'], era: 'Indigenous', period: 'Traditional' },
      { label: 'Mexican Muralism', searchTerms: ['mexican muralism'], era: 'Modern', period: '1920-1970' }
    ],
    // Enhanced time periods
    timePeriods: [
      { label: 'Ancient (before 500 CE)', start: -3000, end: 500, era: 'Ancient' },
      { label: 'Medieval (500-1400)', start: 500, end: 1400, era: 'Medieval' },
      { label: 'Renaissance (1400-1600)', start: 1400, end: 1600, era: 'Renaissance' },
      { label: 'Baroque (1600-1750)', start: 1600, end: 1750, era: 'Baroque' },
      { label: 'Neoclassical (1750-1850)', start: 1750, end: 1850, era: 'Neoclassical' },
      { label: '19th Century (1800-1900)', start: 1800, end: 1900, era: '19th Century' },
      { label: 'Early Modern (1900-1945)', start: 1900, end: 1945, era: 'Modern' },
      { label: 'Contemporary (1945-present)', start: 1945, end: 2024, era: 'Contemporary' }
    ]
  }
}
