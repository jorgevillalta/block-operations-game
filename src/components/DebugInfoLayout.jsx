import { useLayoutEffect, useState } from 'react';
import styled from 'styled-components/macro';

const StyledPanel = styled.div`
  && {
    position: absolute;
    bottom: 0;
    right: 0;

    margin: 10px;

    font-weight: 200;
    font-size: 12px;
    color: gray;
  }
`;

const DebugInfoLayout = () => {
  const [screenSize, setScreenSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateScreenSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const debugLine = `${screenSize[0]}x${screenSize[1]} - v${process.env.REACT_APP_VERSION}`;

  return <StyledPanel>{debugLine}</StyledPanel>;
};

export default DebugInfoLayout;
