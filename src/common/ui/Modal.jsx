import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { ACCENT_100 } from "./colors";
import useOutsideAlert from "../../hooks/useOutsideAlert";

import { boxShadowDs2 } from "./styles";
import { device } from "./Resposive";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: ${({ whiteOverlay }) =>
    whiteOverlay ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Content = styled.div`
  background-color: ${ACCENT_100};
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  min-width: ${(props) => props.width};
  max-height: ${(props) => props.maxHeight};
  min-height: ${(props) => props.height};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fade-in 0.3s ease-in-out;
  align-items: center;
  align-self:center;
  justify-content: center;
  border-radius:1rem;
  overflow-y:auto;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-1.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  border: ${({ border }) => border || "none"};
  ${({ boxShadow }) => boxShadow && boxShadowDs2};

  * {
    box-sizing: border-box;
  }

  ${({ M1 }) =>
    M1 &&
    css`
      width: ${(props) => props.width || "90vw"};
      height: ${(props) => props.height || "80vh"};
      max-height: ${(props) => props.maxHeight || "45rem"};

      @media ${device.laptop} {
        width: ${(props) => props.width || "50vw"};
        max-width: ${(props) => props.maxWidth || "45rem"};
      }
    `}
`;

const Modal = ({
  M1,
  isMobile,
  togglePopup,
  width,
  height,
  noPadding,
  backgroundClickDisabled = false,
  borderRadius,
  maxWidth,
  children,
  ignoreId = null,
  whiteOverlay,
  boxShadow,
  border,
}) => {
  const containerRef = useRef(null);
  useOutsideAlert(
    containerRef,
    !backgroundClickDisabled ? togglePopup : () => {},
    ignoreId
  );

  // this prevents background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <Container whiteOverlay={whiteOverlay}>
      <Content
        M1={M1}
        isMobile={isMobile}
        ref={containerRef}
        noPadding={noPadding}
        width={width}
        height={height}
        borderRadius={borderRadius}
        maxWidth={maxWidth}
        boxShadow={boxShadow}
        border={border}
      >
        {children}
      </Content>
    </Container>
  );
};

export default Modal;
