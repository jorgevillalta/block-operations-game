import styled, { css } from 'styled-components/macro';
import { ArrowForwardWhite, ArrowDownWhite } from '../icons';

const handleSelectedColor = ({ selected, colors }) => {
  if (selected) return colors.selectionPrimary;

  return colors.selectionSecondary;
};

const handleRotate = (deg) =>
  css`
    path {
      transform: rotate(${deg}deg);
      transform-origin: 50% 50%;
    }
  `;

const MainContainer = styled.div`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: flex-start;

    cursor: pointer;
  }
`;

const BasicContainer = styled.div`
  height: 0;
  padding-bottom: 18%;
  width: 18%;

  position: relative;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const IconsContainer = styled(BasicContainer)`
  && {
    background-color: white;
    border: 3px solid
      ${({ selected, theme }) => handleSelectedColor({ selected, colors: theme.colors })};
    border-radius: 15px 0 0 15px;

    flex: 1 1 auto;
  }
`;

const IconsList = styled.div`
  && {
    display: flex;
    flex-direction: row;
    justify-content: center;

    height: 100%;
    width: 100%;
  }
`;

const ActionContainer = styled(BasicContainer)`
  && {
    background-color: ${({ selected, theme }) =>
      handleSelectedColor({ selected, colors: theme.colors })};
    border: 3px solid
      ${({ selected, theme }) => handleSelectedColor({ selected, colors: theme.colors })};
    border-radius: 0 15px 15px 0;

    flex: 0 0 auto;
  }
`;

const StyledIcon = styled.svg`
  && {
    height: 100%;
    fill: ${({ selected, theme }) => handleSelectedColor({ selected, colors: theme.colors })};

    &:nth-child(odd) {
      ${handleRotate(-10)}
    }
    &:nth-child(even) {
      ${handleRotate(10)}
    }
  }
`;

const StyledArrowIcon = styled.svg`
  && {
    height: 70%;
  }
`;

/** */
export const NavigationButton = styled(({ icons, selected, ...props }) => (
  <MainContainer {...props}>
    <IconsContainer selected={selected}>
      <IconsList>
        {icons &&
          icons.map((icon, index) => <StyledIcon as={icon} key={index} selected={selected} />)}
      </IconsList>
    </IconsContainer>
    <ActionContainer selected={selected}>
      <StyledArrowIcon as={selected ? ArrowDownWhite : ArrowForwardWhite} />
    </ActionContainer>
  </MainContainer>
))``;
