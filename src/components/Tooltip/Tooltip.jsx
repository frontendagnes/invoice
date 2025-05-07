import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const defaultBackgroundColor = "rgba(0,0,0,0.7)";
const defaultColor = "#ffffff";
const defaultFontSize = "inherit"; // Dziedziczy wielkość czcionki od rodzica
const defaultBottom = "90%";
const defaultLeft = "50%";
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.div`
  visibility: hidden;
  width: auto;
  background-color: ${defaultBackgroundColor};
  color: ${defaultColor};
  font-size: ${defaultFontSize};
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  bottom: ${defaultBottom};
  left: ${defaultLeft};
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;

  &.show {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = ({
  text,
  children,
  backgroundColor,
  color,
  fontSize,
  left,
  bottom,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const tooltipStyle = {
    backgroundColor: backgroundColor || defaultBackgroundColor,
    color: color || defaultColor,
    fontSize: fontSize || defaultFontSize,
    bottom: bottom || defaultBottom,
    left: left || defaultLeft,
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef]);

  return (
    <TooltipContainer
      ref={tooltipRef}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      <TooltipText className={showTooltip ? "show" : ""} style={tooltipStyle}>
        {text}
      </TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
