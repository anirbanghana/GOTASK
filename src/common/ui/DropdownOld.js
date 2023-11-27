import styled from "styled-components";
import FlexBox from "./FlexBox";
import { boxShadowDs1 } from "./styles";

const Wrapper = styled(FlexBox)`
  z-index: 5;
  width: 100%;
  display: flex;
  border-radius: 1rem;
  flex-direction: column;
  box-sizing: border-box;
  background-color: var(--accent-100);
  border: 1px solid var(--accent-400);
  ${boxShadowDs1}
`;

const Dropdown = ({ onClick, active, disabled, children }) => (
  <Wrapper active={active} onClick={onClick} disabled={disabled}>
    {children}
  </Wrapper>
);

export default Dropdown;
