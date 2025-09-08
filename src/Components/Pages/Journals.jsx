import { useState, useEffect } from 'react';

function Journals() {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading journal articles (in a real app, this would fetch from your CMS/API)
    const mockArticles = [
      {
        id: 1,
        title: "The Evolution of Impressionism: From Rejection to Revolution",
        author: "Dr. Sarah Mitchell",
        excerpt: "Exploring how the Impressionist movement transformed from outcasts to icons of modern art, reshaping our understanding of light, color, and artistic expression.",
        publishDate: "2024-01-15",
        readTime: "8 min read",
        category: "Art History",
        featured: true,
        coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
      },
      {
        id: 2,
        title: "Digital Art in Museums: Bridging Traditional and Contemporary",
        author: "Marcus Chen",
        excerpt: "How modern museums are integrating digital art installations while preserving classical collections.",
        publishDate: "2024-01-12",
        readTime: "6 min read",
        category: "Contemporary Art",
        coverImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600"
      },
      {
        id: 3,
        title: "Renaissance Techniques in Modern Practice",
        author: "Prof. Elena Rodriguez",
        excerpt: "Contemporary artists rediscovering and adapting classical Renaissance painting methods.",
        publishDate: "2024-01-10",
        readTime: "12 min read",
        category: "Techniques",
        coverImage: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600"
      },
      {
        id: 4,
        title: "The Psychology of Color in Abstract Art",
        author: "Dr. James Peterson",
        excerpt: "Understanding how abstract artists use color theory to evoke emotion and meaning.",
        publishDate: "2024-01-08",
        readTime: "10 min read",
        category: "Art Theory",
        coverImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600"
      },
      {
        id: 5,
        title: "Women Artists of the 20th Century: Hidden Masters",
        author: "Dr. Maria Gonzalez",
        excerpt: "Rediscovering influential women artists whose contributions were overlooked by history.",
        publishDate: "2024-01-05",
        readTime: "15 min read",
        category: "Art History",
        coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600"
      }
    ];

    setTimeout(() => {
      setArticles(mockArticles);
      setFeaturedArticle(mockArticles.find(article => article.featured));
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-2xl text-amber-800">Loading articles...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Journals</h1>
          <p className="text-xl text-amber-700">
            In-depth articles, analysis, and insights from art historians, critics, and scholars
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Featured Article</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredArticle.category}
                    </span>
                    <span className="ml-3 text-gray-500 text-sm">Featured</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{featuredArticle.author}</p>
                      <p className="text-sm text-gray-500">{featuredArticle.publishDate} · {featuredArticle.readTime}</p>
                    </div>
                    <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                      Read Article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.filter(article => !article.featured).map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="aspect-video">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{article.author}</p>
                      <p className="text-xs text-gray-500">{article.publishDate} · {article.readTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse by Topic */}
        <div>
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Browse by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Art History', count: 24 },
              { name: 'Contemporary Art', count: 18 },
              { name: 'Techniques', count: 12 },
              { name: 'Art Theory', count: 15 },
              { name: 'Biographies', count: 21 },
              { name: 'Exhibitions', count: 9 },
              { name: 'Criticism', count: 7 },
              { name: 'Movements', count: 16 }
            ].map((topic) => (
              <div key={topic.name} className="bg-white rounded-lg p-4 text-center hover:bg-amber-50 transition-colors cursor-pointer">
                <h3 className="font-medium text-amber-900 mb-1">{topic.name}</h3>
                <p className="text-sm text-gray-500">{topic.count} articles</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journals;