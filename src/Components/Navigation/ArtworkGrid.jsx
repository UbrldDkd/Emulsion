// import { useState } from 'react';
// import { useTheme } from '../../contexts/ThemeContext';

// /**
//  * Grid component for displaying artworks with lazy loading and error handling
//  */
// export default function ArtworkGrid({ artworks }) {
//   const { theme } = useTheme();
//   const [loadedImages, setLoadedImages] = useState(new Set());
//   const [failedImages, setFailedImages] = useState(new Set());

//   const addToSet = (setter, item) => setter(prev => new Set([...prev, item]));

//   const handleImageLoad = (artworkId) => addToSet(setLoadedImages, artworkId);
//   const handleImageError = (artworkId) => addToSet(setFailedImages, artworkId);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {artworks.map((artwork) => (
//         <ArtworkCard
//           key={artwork.id}
//           artwork={artwork}
//           theme={theme}
//           isLoaded={loadedImages.has(artwork.id)}
//           hasFailed={failedImages.has(artwork.id)}
//           onLoad={() => handleImageLoad(artwork.id)}
//           onError={() => handleImageError(artwork.id)}
//         />
//       ))}
//     </div>
//   );
// }

// /**
//  * Individual artwork card component
//  */
// function ArtworkCard({ artwork, theme, isLoaded, hasFailed, onLoad, onError }) {
//   const [showDetails, setShowDetails] = useState(false);

//   return (
//     <div 
//       className={`group cursor-pointer transition-transform hover:scale-105 ${theme.cardBackground} rounded-lg overflow-hidden shadow-sm hover:shadow-lg`}
//       onMouseEnter={() => setShowDetails(true)}
//       onMouseLeave={() => setShowDetails(false)}
//     >
//       {/* Image Container */}
//       <div className="relative aspect-square overflow-hidden">
//         {!hasFailed ? (
//           <>
//             {/* Loading Placeholder */}
//             {!isLoaded && (
//               <div className={`absolute inset-0 animate-pulse ${
//                 theme.cardBackground.includes('stone') && theme.text.includes('950') 
//                   ? 'bg-stone-200' 
//                   : 'bg-stone-800'
//               }`}>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
//                 </div>
//               </div>
//             )}
            
//             {/* Actual Image */}
//             <img
//               src={artwork.imageUrl}
//               alt={artwork.title}
//               className={`w-full h-full object-cover transition-opacity duration-300 ${
//                 isLoaded ? 'opacity-100' : 'opacity-0'
//               }`}
//               onLoad={onLoad}
//               onError={onError}
//               loading="lazy"
//             />
//           </>
//         ) : (
//           /* Fallback for failed images */
//           <div className={`w-full h-full flex items-center justify-center ${
//             theme.cardBackground.includes('stone') && theme.text.includes('950')
//               ? 'bg-stone-200 text-stone-600'
//               : 'bg-stone-800 text-stone-400'
//           }`}>
//             <div className="text-center p-4">
//               <div className="text-2xl mb-2">🖼️</div>
//               <div className="text-xs">Image unavailable</div>
//             </div>
//           </div>
//         )}

//         {/* Overlay with details */}
//         {showDetails && (
//           <div className="absolute inset-0 bg-black bg-opacity-70 flex items-end transition-opacity duration-200">
//             <div className="p-4 text-white w-full">
//               <h3 className="font-medium text-sm line-clamp-2 mb-1">
//                 {artwork.title}
//               </h3>
//               <p className="text-xs opacity-90 line-clamp-1">
//                 {artwork.artist || 'Unknown Artist'}
//               </p>
//               {artwork.year && (
//                 <p className="text-xs opacity-75 mt-1">
//                   {artwork.year}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Card Info */}
//       <div className="p-4">
//         <h3 className={`font-medium text-sm line-clamp-2 mb-2 ${theme.text}`}>
//           {artwork.title}
//         </h3>
        
//         <div className="space-y-1">
//           <p className={`text-xs line-clamp-1 ${theme.textMuted}`}>
//             {artwork.artist || 'Unknown Artist'}
//           </p>
          
//           {artwork.year && (
//             <p className={`text-xs ${theme.textMuted}`}>
//               {artwork.year}
//             </p>
//           )}
//         </div>

//         {/* Metadata Pills */}
//         <div className="flex flex-wrap gap-1 mt-3">
//           {artwork.medium && (
//             <span className={`text-xs px-2 py-1 rounded-full ${theme.selected} opacity-70`}>
//               {artwork.medium.split(',')[0].trim()}
//             </span>
//           )}
//           {artwork.artform && artwork.artform !== artwork.medium && (
//             <span className={`text-xs px-2 py-1 rounded-full ${
//               theme.cardBackground.includes('stone') && theme.text.includes('950')
//                 ? 'bg-stone-300 text-stone-700'
//                 : 'bg-stone-700 text-stone-300'
//             }`}>
//               {artwork.artform}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }