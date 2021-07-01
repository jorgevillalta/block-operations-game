import { useLocation } from 'wouter';
import { NavigationButton } from '../blocks/NavigationButton';
import { routes } from '../constants/Routes';
import { LooksOneBlack, LooksTwoBlack } from '../icons';

export const NavigationButtonContainer = () => {
  const [location, setLocation] = useLocation();

  return (
    <>
      <NavigationButton
        icons={[LooksOneBlack]}
        selected={location.includes(routes.ONE_OPERAND)}
        onClick={() => setLocation(routes.ONE_OPERAND)}
      />
      <NavigationButton
        icons={[LooksOneBlack, LooksTwoBlack]}
        selected={location.includes(routes.OPERATION)}
        onClick={() => setLocation(routes.OPERATION)}
      />
    </>
  );
};
