
export default function SearchInput({ onChange }) {

  return (
    <div>
    <input
      type='text'
      placeholder='Search artworks, artists...'
      onChange={onChange}
      className='bg-stone-800 border border-stone-700 rounded px-4 py-2 text-stone-100 placeholder-stone-400 transition-colors duration-200
      hover:border-amber-400 hover:bg-stone-700
      focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400'
    />
      </div>
  )
    
}