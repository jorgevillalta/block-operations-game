import styled from 'styled-components/macro';

const MainContainer = styled.div`
  && {
    width: 5%;
    cursor: pointer;
  }
`;

const IconContainer = styled.div`
  && {
    height: 0;
    padding-bottom: 100%;
    width: 100%;

    position: relative;

    background-color: ${({ theme }) => theme.colors.action};
    border-radius: 50%;

    & > * {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const StyledIcon = styled.svg`
  && {
    fill: white;
    width: 75%;
  }
`;

/** */
export const ActionButton = styled(({ icon, ...props }) => (
  <MainContainer>
    <IconContainer {...props}>{icon && <StyledIcon as={icon} />}</IconContainer>
  </MainContainer>
))``;
