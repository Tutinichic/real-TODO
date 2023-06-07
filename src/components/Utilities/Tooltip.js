import React, { useState } from "react";

const Tooltip = ({ txt, children, className }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div className={`relative flex ${className}`}>
      <span
        className="flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      {tooltipVisible && (
        <div className="absolute bg-slate-200 rounded-md w-max py-1 px-2 top-full text-slate-600 shadow-md">
          {txt}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
