import React from "react";
import styled, { css } from "styled-components";
import FlexBox from "./FlexBox";
import { ACCENT_600, Green, white } from "./colors";
import { H6 } from "./Headings";

const ToggleContainer = styled(FlexBox)`
  width: max-content;
  min-width: ${({ small }) => (small ? "2.5rem" : "4rem")};
  height: ${({ small }) => (small ? "1.3rem" : "auto")};
  padding: 2px;
  cursor: pointer;
  align-items: center;
  border-radius: 6.1875rem;
  opacity: 1;
  gap: 0.25rem;
  background-color: ${({ toggleBgColor }) => toggleBgColor};
  box-sizing: border-box;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};

  ${({ checked, primaryColor }) =>
    checked &&
    css`
      background-color: ${primaryColor};
      justify-content: end;
    `};
`;

const Switch = styled(FlexBox)`
  width: ${({ small }) => (small ? "1rem" : "1.75rem")};
  height: ${({ small }) => (small ? "1rem" : "1.75rem")};
  border-radius: 50%;
  transform: translateX(0);
  transition: transform 300ms ease-in-out;
  background-color: var(--accent-100);

  ${({ checked }) =>
    checked &&
    css`
      /* transform: translateX(20%); */
    `};
`;

const CustomToggle = ({
  checked,
  disabled,
  size,
  small,
  primaryColor = Green,
  toggleBgColor = ACCENT_600,
  accentColor = white,
  onChange,
  showTitle = true,
}) => {
  return (
    <ToggleContainer
      checked={checked}
      disabled={disabled}
      small={small}
      size={size}
      primaryColor={primaryColor}
      toggleBgColor={toggleBgColor}
      onClick={() => {
        if (!disabled && onChange) {
          onChange(!checked);
        }
      }}
    >
      {showTitle && checked && (
        <H6 color={white} bold>
          YES
        </H6>
      )}
      <Switch accentColor={accentColor} checked={checked} small={small} />
      {showTitle && !checked && (
        <H6 color={white} bold>
          NO
        </H6>
      )}
    </ToggleContainer>
  );
};

export default CustomToggle;
