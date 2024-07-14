import React, { useState } from 'react';

const ReadMoreReadLess = ({ text = '', maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return null; // Handle the case where text is undefined or empty
  }

  const renderText = () => {
    if (text.length <= maxLength) {
      return text;
    }

    if (isExpanded) {
      return text;
    }

    return text.slice(0, maxLength) ;
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className='about-coin'>{renderText()}
      {text.length > maxLength && (
        <button className='ReadMoreReadLess' onClick={toggleReadMore}>
          {isExpanded ? 'Read Less' : 'Read More...'}
        </button>
      )}
      </p>
    </div>
  );
};

export default ReadMoreReadLess;
