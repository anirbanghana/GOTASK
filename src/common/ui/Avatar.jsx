import styled from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";

import { DUSTY_ORANGE_700, ERROR } from "./colors";
import { H3 } from "./Headings";
import FlexBox from "./FlexBox";

const Container = styled(FlexBox)`
  position: relative;
  min-width: 3rem;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 3rem;
  height: 3rem;
  padding: 0.625rem 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 3rem;
  background: linear-gradient(135deg, #fff 0%, #000 100%), #ffefb0;
  background-blend-mode: soft-light, normal;
`;

const Initials = styled(H3)`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: ${DUSTY_ORANGE_700};
  text-align: center;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  text-transform: uppercase;
`;

const Dot = styled.div`
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  top: 0.25rem;
  right: 0.25rem;
  border-radius: 4rem;
  background-color: ${ERROR};
`;

const Avatar = ({ name, firstname, lastname, typing, showDot, isDisabled }) => {
  let initials = "";

  if (name) {
    initials = name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .slice(0, 2);
  } else if (firstname) {
    initials = `${firstname?.charAt(0)}${!lastname ? "" : lastname?.charAt(0)}`;
  }

  return (
    <Container className={isDisabled ? "grayscale" : ""}>
      <Wrapper>
        {typing ? (
          <FiMoreHorizontal
            size={18}
            strokeWidth={3}
            color={DUSTY_ORANGE_700}
          />
        ) : (
          <Initials>{initials}</Initials>
        )}
      </Wrapper>
      {showDot && <Dot />}
    </Container>
  );
};

export default Avatar;
