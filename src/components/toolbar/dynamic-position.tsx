import { useEffect, useState } from "react";

const useDynamicPosition = (iconRect : any, gridRef : any) => {
  const [styles, setStyles] = useState({});

  useEffect(() => {
    if (iconRect && gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      setStyles({
        // position: 'absolute',
        // top: `${iconRect.bottom + window.scrollY}px`,
        // left: `${iconRect.left + window.scrollX - gridRect.width / 2 + iconRect.width / 2}px`,
        // zIndex: 1000,        
      });
    }
  }, [iconRect, gridRef]);

  return styles;
};

export default useDynamicPosition