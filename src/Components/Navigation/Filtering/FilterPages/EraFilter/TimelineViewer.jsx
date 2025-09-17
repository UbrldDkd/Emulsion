import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Keys } from '../../../../Keys.js';
import { useTheme } from '../../../../../contexts/ThemeContext.jsx';

const TimelineViewer = forwardRef(function TimelineViewer({ expandedEras, setExpandedEras, selectedMovements, hoveredMovement, setHoveredMovement, deviceType = 'desktop' }, ref) {
  const { theme } = useTheme();
  const [zoom, setZoom] = useState(1);
  const [localHoveredMovement, setLocalHoveredMovement] = useState(null); // For timeline-only hovers
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
      // Handle formats like "3500 BCE - 500 CE"
      const bceMatch = era.period.match(/(\d+)\s*BCE\s*-\s*(\d+)\s*CE/);
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

    // Color scheme based on era type - optimized for light/dark modes
    const colors = theme.cardBackground.includes('stone-100') 
      ? [ // Light mode - darker yellows/ambers, lighter others
        '#b45309', // Contemporary - brown amber (was light yellow)
        '#d97706', // Early 20th - dark amber (was yellow)
        '#92400e', // 19th Century - dark brown (was amber)
        '#78350f', // Neoclassical - very dark brown
        '#451a03', // Baroque - darkest brown
        '#292524', // Renaissance - dark stone
        '#a3a3a3', // Medieval - light stone
        '#d6d3d1', // Ancient - lighter stone
        '#6b21a8', // Asian - dark purple
        '#581c87'  // Regional - darker purple
      ]
      : [ // Dark mode - original bright colors
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
        
        if (movement.period.includes('BCE') && movement.period.includes(' CE')) {
          // Handle formats like "27 BCE-476 CE" (note: space before CE to distinguish from BCE)
          const mixedMatch = movement.period.match(/(\d+)\s*BCE-(\d+)\s*CE/);
          if (mixedMatch) {
            movStartYear = -parseInt(mixedMatch[1]);  // BCE year becomes negative
            movEndYear = parseInt(mixedMatch[2]);     // CE year stays positive
          }
        } else if (movement.period.includes('BCE')) {
          // Handle formats like "509-27 BCE" or "1550-1077 BCE"  
          const bcePeriod = movement.period.match(/(\d+)-(\d+)\s*BCE/);
          if (bcePeriod) {
            const firstNum = parseInt(bcePeriod[1]);
            const secondNum = parseInt(bcePeriod[2]);
            
            // Timeline positioning uses: movStartY = yearToPixel(movement.endYear), movEndY = yearToPixel(movement.startYear)
            // So startYear should be NEWER (lower on timeline), endYear should be OLDER (higher on timeline)
            if (firstNum > secondNum) {
              // Format like "1550-1077 BCE" where 1550 BCE is older
              movStartYear = -secondNum;  // Newer date (1077 BCE = -1077)  
              movEndYear = -firstNum;     // Older date (1550 BCE = -1550)
            } else {
              // Format like "27-509 BCE" where 509 BCE is older  
              movStartYear = -firstNum;   // Newer date (27 BCE = -27)
              movEndYear = -secondNum;    // Older date (509 BCE = -509)
            }
          } else {
            // Handle single BCE dates like "500 BCE"
            const singleBce = movement.period.match(/(\d+)\s*BCE/);
            if (singleBce) {
              movStartYear = -parseInt(singleBce[1]);
              movEndYear = movStartYear + 50; // Give it a 50 year span
            }
          }
        } else if (movement.period.includes('CE')) {
          // Handle formats like "330-726 CE"
          const cePeriod = movement.period.match(/(\d+)-(\d+)\s*CE/);
          if (cePeriod) {
            movStartYear = parseInt(cePeriod[1]);
            movEndYear = parseInt(cePeriod[2]);
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

        // Debug BEFORE fallback
        if (era.label === 'Ancient World') {
          console.log(`BEFORE fallback - Movement: ${movement.label}, Period: "${movement.period}", Start: ${movStartYear}, End: ${movEndYear}`);
          console.log(`  - Contains BCE: ${movement.period.includes('BCE')}, Contains CE: ${movement.period.includes('CE')}`);
          if (movement.period.includes('BCE') && movement.period.includes('CE')) {
            console.log(`  - Mixed BCE-CE regex test: ${movement.period.match(/(\d+)\s*BCE[\s\-–—]+(\d+)\s*CE/)}`);
          } else if (movement.period.includes('BCE')) {
            console.log(`  - BCE only regex test: ${movement.period.match(/(\d+)[\-–—](\d+)\s*BCE/)}`);
          } else if (movement.period.includes('CE')) {
            console.log(`  - CE only regex test: ${movement.period.match(/(\d+)[\-–—](\d+)\s*CE/)}`);
          }
        }
        
        // Final fallback - ensure we always have valid years
        if (movStartYear === undefined || isNaN(movStartYear) || movEndYear === undefined || isNaN(movEndYear)) {
          console.warn(`Failed to parse period for ${movement.label}: "${movement.period}" - using era dates`);
          // Use era's dates as fallback
          movStartYear = startYear || 0;
          movEndYear = endYear || 100;
        }
        
        // Debug AFTER fallback
        if (era.label === 'Ancient World') {
          console.log(`AFTER fallback - Movement: ${movement.label}, Start: ${movStartYear}, End: ${movEndYear}`);
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
  // Filter out undefined/NaN values and get all years
  const allYears = timelineEras.flatMap(era => {
    const years = [era.startYear, era.endYear];
    era.subMovements.forEach(mov => {
      if (mov.startYear !== undefined && !isNaN(mov.startYear)) years.push(mov.startYear);
      if (mov.endYear !== undefined && !isNaN(mov.endYear)) years.push(mov.endYear);
    });
    return years.filter(y => y !== undefined && !isNaN(y));
  });
  
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  const totalYears = maxYear - minYear;
  const pixelsPerYear = (baseHeight * zoom) / totalYears;
  
  // Debug timeline calculations
  console.log(`Timeline: minYear=${minYear}, maxYear=${maxYear}, totalYears=${totalYears}`);
  
  // Debug Ancient World movements positioning
  const ancientEra = timelineEras.find(era => era.id === 'ancient-world');
  if (ancientEra) {
    console.log('Ancient World movements positioning:');
    ancientEra.subMovements.forEach(mov => {
      const startPixel = (maxYear - mov.endYear) * pixelsPerYear;
      const endPixel = (maxYear - mov.startYear) * pixelsPerYear;
      console.log(`  ${mov.name}: ${mov.startYear} to ${mov.endYear} → pixels ${startPixel} to ${endPixel}`);
    });
  }
  const yearToPixel = (year) => {
    if (year === undefined || isNaN(year)) {
      console.warn(`Invalid year value: ${year}`);
      return 0;
    }
    return (maxYear - year) * pixelsPerYear;
  };

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

  // Helper function to scroll to specific movement (without changing zoom)
  const zoomToMovement = (movementId) => {
    // Parse the movement ID to get era and movement info
    const parts = movementId.split('-');
    if (parts.length >= 2) {
      const eraId = parts.slice(0, -1).join('-'); // Everything except the last part
      const movementName = parts[parts.length - 1]; // Last part

      // First expand the era if it's not already expanded
      setExpandedEras(prev => {
        const newSet = new Set(prev);
        newSet.add(eraId);
        return newSet;
      });

      // Find the era and movement
      const era = timelineEras.find(e => e.id === eraId);
      const movement = era?.subMovements.find(m => m.name === movementName);

      if (era && movement && containerRef.current) {
        // Calculate the movement's position with current zoom level
        const pixelsPerYear = (baseHeight * zoom) / totalYears;
        const movStartY = (maxYear - movement.endYear) * pixelsPerYear + 50;
        const movEndY = (maxYear - movement.startYear) * pixelsPerYear + 50;
        const movementCenterY = (movStartY + movEndY) / 2;

        // Scroll to center the movement in the view
        scrollToElement(movementCenterY);
      }
    }
  };

  // Expose both functions to parent components
  useImperativeHandle(ref, () => ({
    zoomToFitEra,
    zoomToMovement
  }));


  // Generate SVG path for curly brace
  const generateCurlyBrace = (startY, endY, side = 'right', depth = 20) => {
    const height = Math.abs(endY - startY);
    const actualStartY = Math.min(startY, endY);
    const actualEndY = Math.max(startY, endY);

    // Always generate a proper curly brace, even for small heights
    const minHeight = Math.max(height, 6); // Ensure minimum visual height
    const midY = actualStartY + minHeight / 2;
    const direction = side === 'right' ? 1 : -1;

    // Scale depth based on height to avoid overly pronounced curves on small movements
    const scaledDepth = Math.min(depth, height * 0.8);

    return [
      `M 0,${actualStartY}`,
      `Q ${scaledDepth * 0.5 * direction},${actualStartY + minHeight * 0.2} ${scaledDepth * 0.8 * direction},${midY}`,
      `Q ${scaledDepth * 0.5 * direction},${actualEndY - minHeight * 0.2} 0,${actualEndY}`
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
    // Only scroll if hoveredMovement is set AND it's not also a local timeline hover
    if (hoveredMovement && containerRef.current && localHoveredMovement !== hoveredMovement) {
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
  }, [hoveredMovement, localHoveredMovement, expandedEras, timelineEras, zoom, baseHeight, totalYears, maxYear]);


  return (
    <div className={`relative ${deviceType === 'desktop' ? 'h-[490px]' : 'h-[280px]'}`}>
      {/* Timeline Container */}
      <div
        ref={containerRef}
        className={`relative overflow-auto rounded-lg ${theme.border} ${
          theme.cardBackground.includes('stone-100')
            ? 'bg-stone-200/20 backdrop-blur-sm'
            : 'bg-stone-900/20 backdrop-blur-sm'
        }`}
        style={{
          height: window.innerWidth >= 1024 ? '450px' : '240px',
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
              stroke={theme.cardBackground.includes('stone-100') ? '#b45309' : '#d97706'} 
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
                    className={`text-sm font-light cursor-pointer transition-colors ${
                      theme.cardBackground.includes('stone-100') 
                        ? 'hover:fill-stone-700' 
                        : 'hover:fill-amber-300'
                    } ${
                      theme.cardBackground.includes('stone-100') ? 'fill-stone-700' : 'fill-stone-200'
                    }`}
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
                    className={`text-xs font-light ${
                      theme.cardBackground.includes('stone-100') ? 'fill-stone-800' : 'fill-stone-400'
                    }`}
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
                                  className={`text-xs font-light cursor-pointer transition-colors ${
                                    theme.cardBackground.includes('stone-100') 
                                      ? 'fill-stone-800 hover:fill-stone-600' 
                                      : 'fill-amber-400 hover:fill-amber-300'
                                  }`}
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
                                      ? (theme.cardBackground.includes('stone-100') 
                                          ? 'fill-stone-700 hover:fill-stone-600' 
                                          : 'fill-amber-400 hover:fill-amber-300')
                                      : (theme.cardBackground.includes('stone-100') 
                                          ? 'fill-stone-500 hover:fill-stone-700' 
                                          : 'fill-stone-400 hover:fill-amber-300')
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
                                      : (theme.cardBackground.includes('stone-100') 
                                          ? 'fill-stone-700 hover:fill-stone-600' 
                                          : 'fill-amber-500 hover:fill-amber-400')
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
                                    stroke={theme.cardBackground.includes('stone-100') ? '#b45309' : '#f59e0b'}
                                    strokeWidth="1.5"
                                    transform={`translate(${timelineX - 50}, 0)`}
                                  />
                                  
                                  <line
                                    x1={timelineX - 50}
                                    y1={movStartY}
                                    x2={timelineX}
                                    y2={movStartY}
                                    stroke={theme.cardBackground.includes('stone-100') ? '#b45309' : '#f59e0b'}
                                    strokeWidth="1"
                                    strokeDasharray="2,3"
                                  />
                                  
                                  <line
                                    x1={timelineX - 50}
                                    y1={movEndY}
                                    x2={timelineX}
                                    y2={movEndY}
                                    stroke={theme.cardBackground.includes('stone-100') ? '#b45309' : '#f59e0b'}
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
                    // Only consider it a list hover if it's NOT also a timeline hover
                    const isHoveredFromList = hoveredMovement === movementId && localHoveredMovement !== movementId;
                    const isHoveredFromTimeline = localHoveredMovement === movementId; // Local timeline hover
                    const isSelected = selectedMovements && selectedMovements.has(movementId);

                    // Dynamic text sizing based on zoom level - smaller text
                    const fontSize = zoom >= 5 ? 'text-xs' : 'text-[10px]';

                    return (
                      <g 
                        key={movement.name}
                        onMouseEnter={() => {
                          setLocalHoveredMovement(movementId); // Set local hover for timeline color change
                          setHoveredMovement(movementId); // Also trigger hover in the list
                        }}
                        onMouseLeave={() => {
                          setLocalHoveredMovement(null);
                          setHoveredMovement(null); // Clear list hover too
                        }}
                      >
                        {/* Movement Indicator - FARTHER FROM TIMELINE */}
                        <circle
                          cx={timelineX - 20}
                          cy={baseMovementY}
                          r={zoom >= 5 ? 4 : 3}
                          fill={
                            isSelected 
                              ? (theme.cardBackground.includes('stone-100') ? '#b45309' : '#fbbf24')
                              : isHoveredFromList
                                ? (theme.cardBackground.includes('stone-100') ? '#b45309' : '#fbbf24') // Dark amber for list hover
                                : isHoveredFromTimeline 
                                  ? (theme.cardBackground.includes('stone-100') 
                                      ? `${era.color}dd` // Darker tone of era color for timeline hover in light mode
                                      : era.color) // Original color for dark mode
                                  : (theme.cardBackground.includes('stone-100')
                                      ? `${era.color}80` // Lighter tone of era color for light mode
                                      : era.color) // Original color for dark mode
                          }
                          className={`cursor-pointer transition-all duration-300`}
                          style={{
                            opacity: isHoveredFromList 
                              ? 1 
                              : isSelected 
                                ? 0.9 
                                : (theme.cardBackground.includes('stone-100') ? 0.3 : 0.6)
                          }}
                        />

                        {/* Movement Name and Duration - Smart hover behavior */}
                        {/* When hovered from list: slide animation + amber color */}
                        {/* When hovered from timeline: only lighter color */}
                        <text
                          x={isHoveredFromList ? timelineX - 70 : timelineX - 60}
                          y={(movStartY + movEndY) / 2} // Center vertically within the curly brace
                          className={`cursor-pointer ${fontSize} font-medium ${
                            isHoveredFromTimeline
                              ? 'fill-stone-300' // Light color for direct timeline hover only
                              : isHoveredFromList
                                ? (theme.cardBackground.includes('stone-100') 
                                  ? 'fill-amber-800' // Dark amber for light mode list hover
                                  : 'fill-amber-300') // Amber for dark mode list hover
                                : isSelected
                                  ? (theme.cardBackground.includes('stone-100') 
                                      ? 'fill-amber-700' // Dark amber for light mode selected
                                      : 'fill-amber-400') // Amber for dark mode selected 
                                  : isExpanded 
                                    ? 'fill-stone-600' 
                                    : 'fill-stone-500'
                          }`}
                          dominantBaseline="central"
                          textAnchor="end"
                          style={{
                            transition: isHoveredFromTimeline ? 'fill 0.2s' : 'all 0.3s ease-out',
                          }}
                        >
                          {/* Show full name and duration without truncation */}
                          {movement.name} ({movement.startYear < 0 ? `${Math.abs(movement.startYear)} BCE` : movement.startYear} - {movement.endYear} CE)
                        </text>


                        {/* Movement Duration Curly Brace with Traces (only for list hover) */}
                        <g
                          style={{
                            opacity: isHoveredFromList || isSelected ? 1 : 0,
                            transform: `scale(${isHoveredFromList || isSelected ? 1 : 0.8})`,
                            transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
                            transformOrigin: `${timelineX - 45}px ${(movStartY + movEndY) / 2}px`,
                            zIndex: isHoveredFromList ? 100 : (isSelected ? 50 : 1),
                            pointerEvents: 'none'
                          }}
                        >
                          {/* Curly Brace with smooth scaling animation */}
                          <path
                            d={generateCurlyBrace(movStartY, movEndY, 'left', 15)}
                            fill="none"
                            stroke={isSelected 
                              ? (theme.cardBackground.includes('stone-100') ? '#b45309' : '#fbbf24') 
                              : (isHoveredFromList && theme.cardBackground.includes('stone-100') 
                                  ? '#b45309' 
                                  : era.color)
                            }
                            strokeWidth="2"
                            className="transition-all duration-400 ease-in-out"
                            style={{ opacity: isHoveredFromList ? 0.8 : (isSelected ? 0.6 : 0) }}
                            transform={`translate(${timelineX - 50}, 0)`}
                          />
                          
                          {/* Trace from start of brace to main timeline */}
                          <line
                            x1={timelineX - 50}
                            y1={movStartY}
                            x2={timelineX}
                            y2={movStartY}
                            stroke={isSelected 
                              ? (theme.cardBackground.includes('stone-100') ? '#b45309' : '#fbbf24') 
                              : (isHoveredFromList && theme.cardBackground.includes('stone-100') 
                                  ? '#b45309' 
                                  : era.color)
                            }
                            strokeWidth="1"
                            className="transition-all duration-400 ease-in-out"
                            style={{ opacity: isHoveredFromList ? 0.6 : (isSelected ? 0.4 : 0) }}
                            strokeDasharray="3,2"
                          />
                          
                          {/* Trace from end of brace to main timeline */}
                          <line
                            x1={timelineX - 50}
                            y1={movEndY}
                            x2={timelineX}
                            y2={movEndY}
                            stroke={isSelected 
                              ? (theme.cardBackground.includes('stone-100') ? '#b45309' : '#fbbf24') 
                              : (isHoveredFromList && theme.cardBackground.includes('stone-100') 
                                  ? '#b45309' 
                                  : era.color)
                            }
                            strokeWidth="1"
                            className="transition-all duration-400 ease-in-out"
                            style={{ opacity: isHoveredFromList ? 0.6 : (isSelected ? 0.4 : 0) }}
                            strokeDasharray="3,2"
                          />
                        </g>

                        {/* Selected Movement Duration Curly Brace with Traces (persistent light stone) */}
                        {isSelected && !isHoveredFromList && (
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
                              stroke={theme.cardBackground.includes('stone-100') ? '#78716c' : '#a8a29e'}
                              strokeWidth="1.5"
                              transform={`translate(${timelineX - 50}, 0)`}
                            />
                            
                            {/* Trace from start of brace to main timeline */}
                            <line
                              x1={timelineX - 50}
                              y1={movStartY}
                              x2={timelineX}
                              y2={movStartY}
                              stroke={theme.cardBackground.includes('stone-100') ? '#78716c' : '#a8a29e'}
                              strokeWidth="1"
                              strokeDasharray="2,3"
                            />
                            
                            {/* Trace from end of brace to main timeline */}
                            <line
                              x1={timelineX - 50}
                              y1={movEndY}
                              x2={timelineX}
                              y2={movEndY}
                              stroke={theme.cardBackground.includes('stone-100') ? '#78716c' : '#a8a29e'}
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
                    fill={theme.cardBackground.includes('stone-100') ? '#57534e' : '#78716c'}
                    className="opacity-60"
                  />
                  <text
                    x={timelineX - 15}
                    y={y}
                    className={`text-[10px] font-light ${
                      theme.cardBackground.includes('stone-100') ? 'fill-stone-800' : 'fill-stone-400'
                    }`}
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

      {/* Zoom Controls - Positioned at bottom right below timeline */}
      <div className="flex justify-end mt-1.5">
        <div className={`flex items-center gap-1 ${theme.cardBackground} ${theme.border} border backdrop-blur-sm rounded-md p-1.5 shadow-sm`}>
        <button
          onClick={() => setZoom(prev => Math.min(prev + 1, 100))}
          className={`w-6 h-6 flex items-center justify-center ${theme.text} hover:${theme.accent} ${theme.hover} rounded transition-colors`}
          title="Zoom In"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button
          onClick={zoom > 1 ? () => setZoom(prev => Math.max(prev - 1, 1)) : undefined}
          className={`w-6 h-6 flex items-center justify-center ${zoom <= 1 ? theme.textMuted : theme.text + ' hover:' + theme.accent + ' ' + theme.hover} rounded transition-colors`}
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
          className={`px-2 py-1 text-xs font-semibold ${theme.text} hover:${theme.accent} ${theme.hover} rounded transition-colors`}
          title="Reset View"
        >
          ↻
        </button>
        </div>
      </div>
    </div>
  );
});

export default TimelineViewer;