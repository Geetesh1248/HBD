// src/MemoryCard.jsx
import React from 'react';

function MemoryCard({ image, title, date }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-2xl max-w-sm mx-auto border border-gray-200">
      
      {/* The Photo Frame */}
      <div className="h-80 w-full overflow-hidden rounded-lg bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* The Text */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold text-gray-800 capitalize">{title}</h2>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
      
    </div>
  );
}

export default MemoryCard;