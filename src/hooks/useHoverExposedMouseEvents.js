import { useState, useMemo } from 'react';

export const useHoverExposedMouseEvents = ({
  OnMouseOver = () => null,
  OnMouseLeave = () => null,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const bind = useMemo(() => {
    return {
      onMouseOver: (e) => {
        setIsHovered(true);
        OnMouseOver(e);
      },
      onMouseLeave: (e) => {
        setIsHovered(false);
        OnMouseLeave(e);
      },
    };
  }, []);

  return [isHovered, bind];
};
