import React from 'react';
import '@fontsource/lora/700.css'; // Bold weight
import '../style/TextLogo.css'; // Import CSS for additional styling

const TextLogo = ({
  text = 'Julie',
  fontSize = 24,
  color = 'rgb(235, 227, 248)', // Light text color
  borderColor = '#624E88', // Dark border color
  borderWidth = 2,
}) => {
  return (
    <div className="text-logo">
      {/* Border effect */}
      <span
        className="text-border"
        style={{
          fontSize: `${fontSize}px`,
          WebkitTextStroke: `${borderWidth}px ${borderColor}`, // Border using stroke
          color: 'transparent', // Make inner color transparent
        }}
      >
        {text}
      </span>
      {/* Main text */}
      <span
        className="text-main"
        style={{
          fontSize: `${fontSize}px`,
          color: color,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default TextLogo;
