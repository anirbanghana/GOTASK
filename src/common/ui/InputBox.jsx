import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { ACCENT_800, ACCENT_600, Red, white } from "./colors";
import FlexBox from "./FlexBox";
import { Body2, Support } from "./Headings";

const Wrapper = styled(FlexBox)`
  width: ${({ width }) => width || "100%"};
  cursor: pointer;
  position: relative;
  column-gap: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  box-sizing: border-box;
  background-color: ${white};
  padding: ${({ theme }) => theme?.input?.padding};
  border: 1px solid ${({ theme }) => theme?.input?.border};
`;

export const InputBox = styled.input`
  flex: 1;
  width: ${({ width }) => width || "auto"};
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  font-family: Poppins;
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  color: ${ACCENT_800};
  ::placeholder {
    color: ${ACCENT_600};
  }
`;

const CloseIconWrapper = styled(FlexBox)`
  background-color: ${white};
  align-items: center;
  justify-content: center;
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme?.input?.requiredColor || ACCENT_800};
`;

const Input = ({
  label,
  error,
  type,
  placeholder,
  showCross,
  required = false,
  value,
  onChange,
  onFocus,
  onSubmit,
  onKeyDown,
  onCrossIconClick,
  icon: Icon,
  onIconClick,
  theme,
  onBlur,
  width,
  wrapperWidth,
  onClick = () => {},
  readOnly = false,
  max,
  min,
}) => {
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit?.();
    }
  };

  return (
    <FlexBox column rowGap="0.5rem" width={wrapperWidth}>
      {label && (
        <Body2>
          {label}
          {required && <RequiredIndicator>*</RequiredIndicator>}
        </Body2>
      )}
      <Wrapper theme={theme} width={width} onClick={onClick}>
        <InputBox
          value={value}
          type={type}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown || handleKeyDown}
          theme={theme}
          readOnly={readOnly}
          max={max}
          min={min}
        />
        {showCross && !!value && (
          <CloseIconWrapper onClick={onCrossIconClick}>
            <FiX size="1.5rem" color={theme?.input?.crossIconColor} />
          </CloseIconWrapper>
        )}
        {Icon && (
          <Icon
            color={theme?.input?.IconColor}
            size="1.375rem"
            onClick={onIconClick}
          />
        )}
      </Wrapper>
      {error && <Support color={Red}>{error}</Support>}
    </FlexBox>
  );
};

Input.defaultProps = {
  theme: {
    input: {
      padding: "0.75rem",
      border: ACCENT_600,
      requiredColor: ACCENT_800,
      IconColor: ACCENT_800,
      crossIconColor: ACCENT_800,
    },
  },
};

export default Input;
