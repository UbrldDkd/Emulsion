export default function NavigationArrows({ goToPrevious, goToNext }) {
  return (
    <>
      {/* Previous Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300 z-10 p-2 lg:p-0"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-4 lg:right-[420px] top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300 z-10 p-2 lg:p-0"
        aria-label="Next image"
      >
        <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  );
}