import { useState } from "react";
import styled, { css } from "styled-components";

const TooltipWrapper = styled.div`
  position: relative;
  display: ${(props) => props.$display || "inline-block"};
  width: ${(props) => props.$width || "auto"};
`;

const TooltipBubble = styled.div`
  position: absolute;
  z-index: 999;
  width: ${(props) => props.$width || "auto"};
  background-color: ${(props) => props.$bg || "rgba(0,0,0,0.7)"};
  color: ${(props) => props.$color || "#fff"};
  font-size: ${(props) => props.$fontSize || "0.85rem"};
  padding: 6px 10px;
  border-radius: 6px;
  white-space: pre-line;
  text-align: center;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  left: ${(props) => props.$left || "50%"};
  bottom: ${(props) => props.$bottom || "120%"};

  ${(props) =>
    props.$visible &&
    css`
      opacity: 1;
      transform: translate(-50%, 0);
    `}
`;

const Tooltip = ({
  children,
  text,
  backgroundColor,
  color,
  fontSize,
  left,
  bottom,
  width,
  containerDisplay,
  containerWidth,
}) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <TooltipWrapper
      $display={containerDisplay}
      $width={containerWidth}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {text && (
        <TooltipBubble
          role="tooltip"
          $visible={visible}
          $bg={backgroundColor}
          $color={color}
          $fontSize={fontSize}
          $left={left}
          $bottom={bottom}
          $width={width}
        >
          {text}
        </TooltipBubble>
      )}
    </TooltipWrapper>
  );
};

export default Tooltip;