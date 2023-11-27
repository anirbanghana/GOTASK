import styled, { css } from "styled-components";
import { ACCENT_800 } from "./colors";
import { device } from "./Resposive";

const commonStyles = css`
  font-family: Arial, Helvetica, sans-serif;
  display: ${({ display }) => display || "initial"};
  opacity: ${({ opacity }) => opacity || 1};
  font-weight: ${({ bold }) => (bold ? 700 : 500)};
  color: ${({ color }) => color || ACCENT_800};
  text-align: ${({ textAlign }) => textAlign || "left"};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  white-space: ${({ whiteSpace }) => whiteSpace || "inherit"};
  text-transform: ${({ textTransform }) => textTransform || "none"};
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  cursor: ${({ cursor }) => !!cursor && cursor};
`;

export const Display = styled.h1`
  ${commonStyles}
  font-size: 1.56rem;
  line-height: ${({ lineHeight }) => lineHeight || "2rem"};

  @media ${device.laptop} {
    font-size: 2.44rem;
    line-height: ${({ lineHeight }) => lineHeight || "3.75rem"};
  }
`;

export const H1 = styled.h2`
  ${commonStyles}
  font-size: 1.5rem;
  line-height: ${({ lineHeight }) => lineHeight || "2.5rem"};

  @media ${device.laptop} {
    font-size: 2rem;
    line-height: ${({ lineHeight }) => lineHeight || "3rem"};
  }
`;

export const H2 = styled.h3`
  ${commonStyles}
  font-size: 1.25rem;
  line-height: ${({ lineHeight }) => lineHeight || "2rem"};

  @media ${device.laptop} {
    font-size: 1.95rem;
    line-height: ${({ lineHeight }) => lineHeight || "2.5rem"};
  }
`;

export const H3 = styled.h4`
  ${commonStyles}
  font-size: 1.25rem;
  line-height: ${({ lineHeight }) => lineHeight || "1.75rem"};

  @media ${device.laptop} {
    font-size: 1.56rem;
    line-height: ${({ lineHeight }) => lineHeight || "2rem"};
  }
`;

export const H5 = styled.h5`
  ${commonStyles}
  font-size: 0.8rem;
  line-height: 1.4rem;

  @media ${device.laptop} {
    font-size: 1rem;
    line-height: ${({ lineHeight }) => lineHeight || "1.75rem"};
  }
`;

export const H6 = styled.h5`
  ${commonStyles}
  font-size: 0.75rem;
  line-height: 1.25rem;

  @media ${device.laptop} {
    font-size: 0.875rem;
    line-height: ${({ lineHeight }) => lineHeight || "1.75rem"};
  }
`;

export const Body1 = styled.h5`
  ${commonStyles}
  font-size: 0.875rem;
  line-height: ${({ lineHeight }) => lineHeight || "1.25rem"};

  @media ${device.laptop} {
    font-size: 1rem;
    line-height: ${({ lineHeight }) => lineHeight || "1.5rem"};
  }
`;

export const Body2 = styled.h5`
  ${commonStyles}
  font-size: 0.875rem;
  line-height: ${({ lineHeight }) => lineHeight || "1.5rem"};
  letter-spacing: ${({ spacing }) => spacing || "unset"};
`;

export const ButtonText = styled.span`
  ${commonStyles}
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  text-underline-offset: 2px;
  cursor: pointer;
`;

export const Support = styled.span`
  ${commonStyles}
  font-size: 0.75rem;
  line-height: ${({ lineHeight }) => lineHeight || "1.25rem"};
  letter-spacing: ${({ spacing }) => spacing || "unset"};
`;

export const Caption = styled.span`
  ${commonStyles}
  font-size: 0.625rem;
  font-weight: 700;
  line-height: ${({ lineHeight }) => lineHeight || "1rem"};
`;
