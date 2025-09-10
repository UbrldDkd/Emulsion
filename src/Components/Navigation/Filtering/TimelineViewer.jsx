import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Keys } from '../../Keys.js';

const TimelineViewer = forwardRef(function TimelineViewer({ expandedEras, setExpandedEras, selectedMovements, hoveredMovement, setHoveredMovement }, ref) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef(null);
  const isTimelineHoverRef = useRef(false);

  // Use Keys.filters.movementsByEra and map to timeline format
  const timelineEras = Object.entries(Keys.filters.movementsByEra).map(([, era], index) => {
    // Extract start and end years from period string
    const periodMatch = era.period.match(/(\d+)(?:-(\d+))?/);
    let startYear, endYear;
    
    if (era.period === 'Various') {
      // For eras with various periods, use approximate ranges
      if (era.label === 'Asian Art') {
        startYear = 1000;
        endYear = 1900;
      } else if (era.label === 'Regional Traditions') {
        startYear = 1200;
        endYear = 1800;
      }
    } else if (era.period.includes('BCE') && era.period.includes('CE')) {
      const bceMatch = era.period.match(/(\d+) BCE - (\d+) CE/);
      if (bceMatch) {
        startYear = -parseInt(bceMatch[1]);
        endYear = parseInt(bceMatch[2]);
      }
    } else if (era.period.includes('present')) {
      const presentMatch = era.period.match(/(\d+)-present/);
      if (presentMatch) {
        startYear = parseInt(presentMatch[1]);
        endYear = new Date().getFullYear();
      }
    } else if (periodMatch) {
      startYear = parseInt(periodMatch[1]);
      endYear = periodMatch[2] ? parseInt(periodMatch[2]) : new Date().getFullYear();
    }

    // Color scheme based on era type
    const colors = [
      '#fde68a', // Contemporary - light yellow
      '#fcd34d', // Early 20th - yellow  
      '#f59e0b', // 19th Century - amber
      '#d97706', // Neoclassical - dark amber
      '#b45309', // Baroque - brown amber
      '#92400e', // Renaissance - dark brown
      '#78716c', // Medieval - stone
      '#57534e', // Ancient - dark stone
      '#a855f7', // Asian - purple
      '#7c3aed'  // Regional - dark purple
    ];

    return {
      id: era.label.toLowerCase().replace(/\s+/g, '-'),
      name: era.label,
      startYear,
      endYear,
      period: era.period,
      color: colors[index % colors.length],
      subMovements: era.movements.map(movement => {
        // Extract years from movement periods
        let movStartYear, movEndYear;
        const movPeriodMatch = movement.period.match(/(\d+)(?:-(\d+))?/);
        
        if (movement.period.includes('BCE') && movement.period.includes('CE')) {
          const bceMatch = movement.period.match(/(\d+) BCE-(\d+) CE/);
          if (bceMatch) {
            movStartYear = -parseInt(bceMatch[1]);
            movEndYear = parseInt(bceMatch[2]);
          }
        } else if (movement.period.includes('BCE') && !movement.period.includes('CE')) {
          const bcePeriod = movement.period.match(/(\d+)-(\d+) BCE/);
          if (bcePeriod) {
            movStartYear = -parseInt(bcePeriod[2]); // Start is the larger (older) number
            movEndYear = -parseInt(bcePeriod[1]); // End is the smaller (newer) number
          }
        } else if (movement.period.includes('present')) {
          const presentMatch = movement.period.match(/(\d+)-present/);
          if (presentMatch) {
            movStartYear = parseInt(presentMatch[1]);
            movEndYear = new Date().getFullYear();
          }
        } else if (movement.period === 'Traditional' || movement.period === 'Various') {
          movStartYear = startYear || 1000;
          movEndYear = endYear || 1800;
        } else if (movPeriodMatch) {
          movStartYear = parseInt(movPeriodMatch[1]);
          movEndYear = movPeriodMatch[2] ? parseInt(movPeriodMatch[2]) : new Date().getFullYear();
        } else {
          // Fallback to era dates
          movStartYear = startYear;
          movEndYear = endYear;
        }

        return {
          name: movement.label,
          startYear: movStartYear,
          endYear: movEndYear,
          period: movement.period,
          description: movement.searchTerms.join(', ')
        };
      })
    };
  });

  // Timeline calculation
  const baseHeight = 400;
  const minYear = Math.min(...timelineEras.map(era => era.startYear));
  const maxYear = Math.max(...timelineEras.map(era => era.endYear));
  const totalYears = maxYear - minYear;
  const pixelsPerYear = (baseHeight * zoom) / totalYears;
  const yearToPixel = (year) => (maxYear - year) * pixelsPerYear;

  // Auto-scroll function to center an element in the timeline
  const scrollToElement = (elementY) => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const targetScrollY = elementY - (containerHeight / 2);
      
      containerRef.current.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth'
      });
    }
  };

  // Helper function to toggle era expansion
  const toggleEra = (eraId) => {
    setExpandedEras(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eraId)) {
        newSet.delete(eraId);
      } else {
        newSet.add(eraId);
      }
      return newSet;
    });
  };

  // Helper function to zoom to fit a specific era
  const zoomToFitEra = (eraId) => {
    // First expand the era if it's not already expanded
    setExpandedEras(prev => {
      const newSet = new Set(prev);
      newSet.add(eraId);
      return newSet;
    });

    // Find the era and zoom to fit it
    const era = timelineEras.find(e => e.id === eraId);
    if (era && containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const eraYears = Math.abs(era.endYear - era.startYear);
      
      // Calculate the zoom needed to make the era fill at least 70% of the container
      // This ensures individual movements will be shown (since threshold is 50%)
      const targetEraHeight = containerHeight * 0.7;
      const baseEraHeight = (eraYears / totalYears) * baseHeight;
      const requiredZoom = targetEraHeight / baseEraHeight;
      
      // For very short eras (like Baroque), we need extra zoom
      // Set higher minimum and maximum zoom levels
      const optimalZoom = Math.min(100, Math.max(10, requiredZoom));
      setZoom(optimalZoom);
      
      // Smooth scroll to center era with new zoom
      setTimeout(() => {
        if (containerRef.current) {
          const newPixelsPerYear = (baseHeight * optimalZoom) / totalYears;
          const newEraStartY = (maxYear - era.endYear) * newPixelsPerYear + 50;
          const newEraEndY = (maxYear - era.startYear) * newPixelsPerYear + 50;
          const newEraCenterY = (newEraStartY + newEraEndY) / 2;
          const targetScrollY = newEraCenterY - (containerHeight / 2);
          
          containerRef.current.scrollTo({
            top: Math.max(0, targetScrollY),
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  };

  // Expose zoomToFitEra function to parent components
  useImperativeHandle(ref, () => ({
    zoomToFitEra
  }));


  // Generate SVG path for curly brace
  const generateCurlyBrace = (startY, endY, side = 'right', depth = 20) => {
    const height = endY - startY;
    if (height < 10) return `M 0,${startY} L 0,${endY}`;
    
    const midY = startY + height / 2;
    const direction = side === 'right' ? 1 : -1;
    
    return [
      `M 0,${startY}`,
      `Q ${depth * 0.5 * direction},${startY + height * 0.2} ${depth * 0.8 * direction},${midY}`,
      `Q ${depth * 0.5 * direction},${endY - height * 0.2} 0,${endY}`
    ].join(' ');
  };

  const svgHeight = baseHeight * zoom;
  const timelineX = 280; // Fixed timeline position
  // Calculate width: timeline position + reasonable space for era labels on right + buffer
  const rightSpaceNeeded = timelineX * 0.8; // Half the left space for right side
  const svgWidth = timelineX + rightSpaceNeeded + 50; // Timeline + right content + small buffer

  // Hide all scrollbars (both vertical and horizontal)
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const style = document.createElement('style');
      style.textContent = `
        .hide-all-scrollbars::-webkit-scrollbar {
          display: none;
        }
        .hide-all-scrollbars::-webkit-scrollbar-track {
          display: none;
        }
        .hide-all-scrollbars::-webkit-scrollbar-thumb {
          display: none;
        }
        .hide-all-scrollbars {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `;
      document.head.appendChild(style);
      container.classList.add('hide-all-scrollbars');

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  // Auto-scroll to movement when hoveredMovement changes (triggered from list only)
  // Only scroll if the hover did NOT originate from the timeline itself
  useEffect(() => {
    if (hoveredMovement && containerRef.current && !isTimelineHoverRef.current) {
      // Parse the movement ID to get era and movement info
      const parts = hoveredMovement.split('-');
      if (parts.length >= 2) {
        const eraId = parts.slice(0, -1).join('-'); // Everything except the last part
        const movementName = parts[parts.length - 1]; // Last part
        
        // Check if this era is expanded
        if (expandedEras.has(eraId)) {
          // Find the era to check if movements are visible
          const era = timelineEras.find(e => e.id === eraId);
          if (era) {
            // Calculate if individual movements are visible for this era
            const pixelsPerYear = (baseHeight * zoom) / totalYears;
            const eraStartY = (maxYear - era.endYear) * pixelsPerYear + 50;
            const eraEndY = (maxYear - era.startYear) * pixelsPerYear + 50;
            const eraHeightPixels = Math.abs(eraEndY - eraStartY);
            const containerHeight = containerRef.current.clientHeight;
            const shouldShowIndividualMovements = eraHeightPixels > containerHeight / 2;
            
            // Only scroll if individual movements are visible
            if (shouldShowIndividualMovements) {
              const movement = era.subMovements.find(m => m.name === movementName);
              if (movement) {
                // Calculate the movement's position in the timeline
                const movStartY = (maxYear - movement.endYear) * pixelsPerYear + 50;
                const movEndY = (maxYear - movement.startYear) * pixelsPerYear + 50;
                const movementCenterY = (movStartY + movEndY) / 2;
                
                // Scroll to center the movement in the view
                scrollToElement(movementCenterY);
              }
            }
          }
        }
      }
    }
    // Reset the flag after processing (only if it was set by timeline hover)
    if (isTimelineHoverRef.current) {
      isTimelineHoverRef.current = false;
    }
  }, [hoveredMovement, expandedEras, timelineEras, zoom, baseHeight, totalYears, maxYear]);


  return (
    <div className="relative h-80">
      {/* Timeline Container */}
      <div 
        ref={containerRef}
        className="relative h-80 overflow-auto bg-stone-900/20 rounded-lg border border-stone-700/30"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
      >
        <div 
          style={{ 
            width: `${svgWidth}px`,
            height: `${svgHeight + 100}px`,
            minHeight: '100%'
          }}
        >
          <svg 
            width={svgWidth} 
            height={svgHeight + 100}
            className="absolute"
          >
            {/* Central Timeline */}
            <line 
              x1={timelineX} 
              y1="50" 
              x2={timelineX} 
              y2={svgHeight + 50} 
              stroke="#d97706" 
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Eras and Movements */}
            {timelineEras.map((era) => {
              const startY = yearToPixel(era.endYear) + 50;  // Visual start (newer date)
              const endY = yearToPixel(era.startYear) + 50;   // Visual end (older date)
              const isExpanded = expandedEras.has(era.id);
              const braceDepth = Math.max(15, Math.min(25, Math.abs(endY - startY) / 8));

              return (
                <g key={era.id}>
                  {/* Era Brace - RIGHT SIDE */}
                  <path
                    d={generateCurlyBrace(startY, endY, 'right', braceDepth)}
                    fill="none"
                    stroke={era.color}
                    strokeWidth="2"
                    className={`transition-all duration-300 cursor-pointer ${
                      isExpanded ? 'opacity-100 stroke-[3]' : 'opacity-70 hover:opacity-100'
                    }`}
                    transform={`translate(${timelineX}, 0)`}
                    onClick={() => toggleEra(era.id)}
                  />

                  {/* Era Label - RIGHT SIDE */}
                  <text
                    x={timelineX + braceDepth + 10}
                    y={startY + (endY - startY) / 2}
                    className="fill-stone-200 text-sm font-light cursor-pointer hover:fill-amber-300 transition-colors"
                    dominantBaseline="central"
                    textAnchor="start"
                    onClick={() => toggleEra(era.id)}
                  >
                    {era.name}
                  </text>

                  {/* Era Date Range - RIGHT SIDE */}
                  <text
                    x={timelineX + braceDepth + 10}
                    y={startY + (endY - startY) / 2 + 14}
                    className="fill-stone-500 text-xs font-light"
                    dominantBaseline="central"
                    textAnchor="start"
                  >
                    {era.startYear < 0 ? `${Math.abs(era.startYear)} BCE` : era.startYear} - {era.endYear} CE
                  </text>

                  {(() => {
                    // Calculate era height in pixels and container height
                    const eraHeightPixels = Math.abs(endY - startY);
                    const containerHeight = containerRef.current?.clientHeight || 320; // Default height
                    
                    // Dynamic threshold: show movements when era takes more than half the container height (zoomed in enough)
                    const shouldShowIndividualMovements = eraHeightPixels > containerHeight / 2;
                    
                    return (
                      <>
                        {/* Movement Count Display - Different behaviors based on zoom and expansion */}
                        {(() => {
                          // Count selected movements in this era
                          const selectedMovementsInEra = selectedMovements 
                            ? Array.from(selectedMovements).filter(movementId => {
                                const parts = movementId.split('-');
                                const eraId = parts.slice(0, -1).join('-');
                                return eraId === era.id;
                              }).length 
                            : 0;

                          // Case 1: Zoomed out + Era not expanded + Has selected movements = Show selected count button
                          if (!isExpanded && !shouldShowIndividualMovements && selectedMovementsInEra > 0) {
                            return (
                              <g>
                                <circle
                                  cx={timelineX - 25}
                                  cy={startY + (endY - startY) / 2}
                                  r={Math.min(8, 3 + selectedMovementsInEra)}
                                  fill="#f59e0b"
                                  className="cursor-pointer opacity-80 hover:opacity-100 transition-all"
                                  onClick={() => {
                                    zoomToFitEra(era.id);
                                  }}
                                />
                                <text
                                  x={timelineX - 25}
                                  y={startY + (endY - startY) / 2}
                                  className="fill-white text-xs font-medium cursor-pointer"
                                  dominantBaseline="central"
                                  textAnchor="middle"
                                  onClick={() => {
                                    zoomToFitEra(era.id);
                                  }}
                                >
                                  {selectedMovementsInEra}
                                </text>
                                <text
                                  x={timelineX - 40}
                                  y={startY + (endY - startY) / 2}
                                  className="text-xs font-light cursor-pointer fill-amber-400 hover:fill-amber-300 transition-colors"
                                  dominantBaseline="central"
                                  textAnchor="end"
                                  onClick={() => {
                                    zoomToFitEra(era.id);
                                  }}
                                >
                                  selected
                                </text>
                              </g>
                            );
                          }

                          // Case 2: Era expanded but too large for individual movements = Show total count button
                          if (isExpanded && !shouldShowIndividualMovements && era.subMovements.length > 0) {
                            const displayNumber = selectedMovementsInEra > 0 ? selectedMovementsInEra : era.subMovements.length;
                            const isShowingSelected = selectedMovementsInEra > 0;
                            
                            return (
                              <g>
                                <circle
                                  cx={timelineX - 25}
                                  cy={startY + (endY - startY) / 2}
                                  r={Math.min(8, 3 + era.subMovements.length)}
                                  fill={isShowingSelected ? '#f59e0b' : era.color}
                                  className="cursor-pointer opacity-70 hover:opacity-100 transition-all"
                                  onClick={() => {
                                    zoomToFitEra(era.id);
                                  }}
                                />
                                <text
                                  x={timelineX - 25}
                                  y={startY + (endY - startY) / 2}
                                  className="fill-white text-xs font-medium cursor-pointer"
                                  dominantBaseline="central"
                                  textAnchor="middle"
                                  onClick={() => {
                                    zoomToFitEra(era.id);
                                  }}
                                >
                                  {displayNumber}
                                </text>
                                <text
                                  x={timelineX - 40}
                                  y={startY + (endY - startY) / 2}
                                  className={`text-xs font-light cursor-pointer transition-colors ${
                                    isShowingSelected 
                                      ? 'fill-amber-400 hover:fill-amber-300' 
                                      : 'fill-stone-400 hover:fill-amber-300'
                                  }`}
                                  dominantBaseline="central"
                                  textAnchor="end"
                                  onClick={() => {
                                    zoomToFitEra(era.id);
                                  }}
                                >
                                  {isShowingSelected ? 'selected' : 'movements'}
                                </text>
                              </g>
                            );
                          }

                          return null; // No button needed
                        })()}

                        {/* Selected Movements - LEFT SIDE (only when era is NOT expanded AND zoomed in) */}
                        {!isExpanded && shouldShowIndividualMovements && selectedMovements && (() => {
                          const selectedMovementsInEra = era.subMovements.filter(movement => {
                            const movementId = `${era.id}-${movement.name}`;
                            return selectedMovements.has(movementId);
                          });
                          
                          return selectedMovementsInEra.length > 0 ? selectedMovementsInEra.map((movement, movementIndex) => {
                            const movStartY = yearToPixel(movement.endYear) + 50;
                            const movEndY = yearToPixel(movement.startYear) + 50;
                            const baseMovementY = (movStartY + movEndY) / 2;
                            const movementId = `${era.id}-${movement.name}`;
                            const isHovered = hoveredMovement === movementId;
                            
                            return (
                              <g 
                                key={movementIndex}
                                onMouseEnter={() => {
                                  isTimelineHoverRef.current = true;
                                  setHoveredMovement(movementId);
                                }}
                                onMouseLeave={() => setHoveredMovement(null)}
                              >
                                {/* Selected Movement Indicator - FARTHER FROM TIMELINE */}
                                <circle
                                  cx={timelineX - 20}
                                  cy={baseMovementY}
                                  r={zoom >= 5 ? 4 : 3}
                                  fill="#f59e0b"
                                  className={`cursor-pointer transition-opacity ${
                                    isHovered ? 'opacity-100' : 'opacity-80 hover:opacity-90'
                                  }`}
                                />

                                {/* Selected Movement Name - Persistent amber styling */}
                                <text
                                  x={timelineX - 60}
                                  y={(movStartY + movEndY) / 2}
                                  className={`cursor-pointer transition-all duration-300 ease-out text-xs font-medium ${
                                    isHovered 
                                      ? 'fill-amber-300' 
                                      : 'fill-amber-500 hover:fill-amber-400'
                                  }`}
                                  dominantBaseline="central"
                                  textAnchor="end"
                                >
                                  {movement.name}
                                </text>

                                {/* Selected Movement Traces (always visible but subtle) */}
                                <g style={{ opacity: isHovered ? 1 : 0.3 }}>
                                  <path
                                    d={generateCurlyBrace(movStartY, movEndY, 'left', 15)}
                                    fill="none"
                                    stroke="#f59e0b"
                                    strokeWidth="1.5"
                                    transform={`translate(${timelineX - 50}, 0)`}
                                  />
                                  
                                  <line
                                    x1={timelineX - 50}
                                    y1={movStartY}
                                    x2={timelineX}
                                    y2={movStartY}
                                    stroke="#f59e0b"
                                    strokeWidth="1"
                                    strokeDasharray="2,3"
                                  />
                                  
                                  <line
                                    x1={timelineX - 50}
                                    y1={movEndY}
                                    x2={timelineX}
                                    y2={movEndY}
                                    stroke="#f59e0b"
                                    strokeWidth="1"
                                    strokeDasharray="2,3"
                                  />
                                </g>
                              </g>
                            );
                          }) : null;
                        })()}

                        {/* Individual Movements - LEFT SIDE (when era is small enough in the viewport) */}
                        {isExpanded && shouldShowIndividualMovements && era.subMovements
                    .sort((a, b) => {
                      const aId = `${era.id}-${a.name}`;
                      const bId = `${era.id}-${b.name}`;
                      const aHovered = hoveredMovement === aId;
                      const bHovered = hoveredMovement === bId;
                      // Render hovered movement last (on top)
                      if (aHovered && !bHovered) return 1;
                      if (!aHovered && bHovered) return -1;
                      return 0;
                    })
                    .map((movement, index) => {
                    const movStartY = yearToPixel(movement.endYear) + 50;
                    const movEndY = yearToPixel(movement.startYear) + 50;
                    const baseMovementY = (movStartY + movEndY) / 2;
                    
                    // Prevent overlapping by adding vertical offset when movements are close
                    const minSpacing = 20; // Minimum spacing between movement labels
                    let adjustedY = baseMovementY;
                    
                    // Check for overlaps with previous movements in this era
                    era.subMovements.slice(0, index).forEach((prevMovement) => {
                      const prevStartY = yearToPixel(prevMovement.endYear) + 50;
                      const prevEndY = yearToPixel(prevMovement.startYear) + 50;
                      const prevY = (prevStartY + prevEndY) / 2;
                      
                      // If movements would overlap, offset the current one
                      if (Math.abs(adjustedY - prevY) < minSpacing) {
                        adjustedY = prevY + minSpacing * ((index % 2 === 0) ? 1 : -1);
                      }
                    });
                    
                    const movementId = `${era.id}-${movement.name}`;
                    const isHovered = hoveredMovement === movementId;
                    const isSelected = selectedMovements && selectedMovements.has(movementId);

                    // Dynamic text sizing based on zoom level - smaller text
                    const fontSize = zoom >= 5 ? 'text-xs' : 'text-[10px]';

                    return (
                      <g 
                        key={movement.name}
                        onMouseEnter={() => {
                          isTimelineHoverRef.current = true;
                          setHoveredMovement(movementId);
                        }}
                        onMouseLeave={() => setHoveredMovement(null)}
                      >
                        {/* Movement Indicator - FARTHER FROM TIMELINE */}
                        <circle
                          cx={timelineX - 20}
                          cy={baseMovementY}
                          r={zoom >= 5 ? 4 : 3}
                          fill={isSelected ? '#fbbf24' : era.color}
                          className={`cursor-pointer transition-all duration-300 ${
                            isHovered ? 'opacity-100' : isSelected ? 'opacity-90' : 'opacity-80 hover:opacity-90'
                          }`}
                        />

                        {/* Movement Name and Duration - FARTHER FROM TIMELINE with smooth slide animation */}
                        <text
                          x={isHovered ? timelineX - 70 : timelineX - 60}
                          y={(movStartY + movEndY) / 2} // Center vertically within the curly brace
                          className={`cursor-pointer transition-all duration-300 ease-out ${fontSize} font-medium ${
                            isHovered 
                              ? 'fill-amber-300' 
                              : isSelected
                                ? 'fill-amber-400 hover:fill-amber-300' // Lighter amber for selected movements
                                : isExpanded 
                                  ? 'fill-stone-600 hover:fill-stone-400' // Darker when era is expanded and not hovered
                                  : 'fill-stone-500 hover:fill-stone-400' // Default when era is collapsed
                          }`}
                          dominantBaseline="central"
                          textAnchor="end"
                          style={{
                            transform: `translateX(${isHovered ? -10 : 0}px)`,
                            transition: 'transform 0.3s ease-out, fill 0.3s ease-out',
                            zIndex: isHovered ? 100 : 1
                          }}
                        >
                          {/* Show full name and duration without truncation */}
                          {movement.name} ({movement.startYear < 0 ? `${Math.abs(movement.startYear)} BCE` : movement.startYear} - {movement.endYear} CE)
                        </text>


                        {/* Movement Duration Curly Brace with Traces (smooth fade in/out) */}
                        <g
                          style={{
                            opacity: isHovered || isSelected ? 1 : 0,
                            transform: `scale(${isHovered || isSelected ? 1 : 0.8})`,
                            transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
                            transformOrigin: `${timelineX - 45}px ${(movStartY + movEndY) / 2}px`,
                            zIndex: isHovered ? 100 : (isSelected ? 50 : 1)
                          }}
                        >
                          {/* Curly Brace with smooth scaling animation */}
                          <path
                            d={generateCurlyBrace(movStartY, movEndY, 'left', 15)}
                            fill="none"
                            stroke={isSelected ? '#fbbf24' : era.color}
                            strokeWidth="2"
                            className="transition-all duration-400 ease-in-out"
                            style={{ opacity: isHovered ? 0.8 : (isSelected ? 0.6 : 0) }}
                            transform={`translate(${timelineX - 50}, 0)`}
                          />
                          
                          {/* Trace from start of brace to main timeline */}
                          <line
                            x1={timelineX - 50}
                            y1={movStartY}
                            x2={timelineX}
                            y2={movStartY}
                            stroke={isSelected ? '#fbbf24' : era.color}
                            strokeWidth="1"
                            className="transition-all duration-400 ease-in-out"
                            style={{ opacity: isHovered ? 0.6 : (isSelected ? 0.4 : 0) }}
                            strokeDasharray="3,2"
                          />
                          
                          {/* Trace from end of brace to main timeline */}
                          <line
                            x1={timelineX - 50}
                            y1={movEndY}
                            x2={timelineX}
                            y2={movEndY}
                            stroke={isSelected ? '#fbbf24' : era.color}
                            strokeWidth="1"
                            className="transition-all duration-400 ease-in-out"
                            style={{ opacity: isHovered ? 0.6 : (isSelected ? 0.4 : 0) }}
                            strokeDasharray="3,2"
                          />
                        </g>

                        {/* Selected Movement Duration Curly Brace with Traces (persistent light stone) */}
                        {isSelected && !isHovered && (
                          <g
                            style={{
                              opacity: 0.4,
                              transformOrigin: `${timelineX - 45}px ${(movStartY + movEndY) / 2}px`
                            }}
                          >
                            {/* Curly Brace - lighter stone tone */}
                            <path
                              d={generateCurlyBrace(movStartY, movEndY, 'left', 15)}
                              fill="none"
                              stroke="#a8a29e"
                              strokeWidth="1.5"
                              transform={`translate(${timelineX - 50}, 0)`}
                            />
                            
                            {/* Trace from start of brace to main timeline */}
                            <line
                              x1={timelineX - 50}
                              y1={movStartY}
                              x2={timelineX}
                              y2={movStartY}
                              stroke="#a8a29e"
                              strokeWidth="1"
                              strokeDasharray="2,3"
                            />
                            
                            {/* Trace from end of brace to main timeline */}
                            <line
                              x1={timelineX - 50}
                              y1={movEndY}
                              x2={timelineX}
                              y2={movEndY}
                              stroke="#a8a29e"
                              strokeWidth="1"
                              strokeDasharray="2,3"
                            />
                          </g>
                        )}
                      </g>
                    );
                  })}
                      </>
                    );
                  })()}
                </g>
              );
            })}

            {/* Year Markers */}
            {zoom > 1 && [new Date().getFullYear(), 2000, 1900, 1800, 1700, 1600, 1500, 1400, 1000, 500, 0, -1000, -2000, -3000].map((year, yearIndex) => {
              const y = yearToPixel(year) + 50;
              if (y < 0 || y > svgHeight + 100) return null; // Only show visible markers
              
              return (
                <g key={yearIndex}>
                  <circle
                    cx={timelineX}
                    cy={y}
                    r={2}
                    fill="#78716c"
                    className="opacity-60"
                  />
                  <text
                    x={timelineX - 15}
                    y={y}
                    className="fill-stone-500 text-[10px] font-light"
                    dominantBaseline="central"
                    textAnchor="end"
                  >
                    {year < 0 ? `${Math.abs(year)} BCE` : year === 0 ? '0' : `${year}`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

      </div>

      {/* Zoom Controls - Positioned in bottom right corner */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-stone-900/80 backdrop-blur-sm rounded-md p-1 z-10">
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 1, 100))}
          className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded transition-colors"
          title="Zoom In"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 1, 0.2))}
          className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded transition-colors"
          title="Zoom Out"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button 
          onClick={() => { 
            setZoom(1); 
            setExpandedEras(new Set());
            if (containerRef.current) {
              containerRef.current.scrollTop = 0;
            }
          }}
          className="px-2 py-1 text-[10px] text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded transition-colors"
          title="Reset View"
        >
          ↻
        </button>
      </div>
    </div>
  );
});

export default TimelineViewer;