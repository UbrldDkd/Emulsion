import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MovementDisplay({ content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpand() {
    setIsExpanded(!isExpanded);
  }

  const { label, period, movements } = content;

  return (
    <div>
      <button
        key={label}
        className="w-full text-left px-2 py-1 hover:bg-stone-600 text-stone-300 text-xs rounded"
        onClick={toggleExpand}
      >
        <div className="flex-1">
          <span>{content.label}</span>
          <span className="text-stone-500 ml-1">({period})</span>
        </div>
      </button>
      
      {isExpanded && movements && (
        <div>
          {movements.map((movement, index) => (
            <div key={index} className="ml-4 mt-1">
              <span>{movement.label}</span>
              <span className="text-stone-500 ml-1">({movement.period})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}