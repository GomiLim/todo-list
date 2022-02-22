import { useState, useEffect } from 'react';

export const useToast = () => {
  const [isToastVisible, setIsToastlVisible] = useState(false);
  let toastTimer: NodeJS.Timeout;
  const openToast = () => {
    setIsToastlVisible(true);
  };

  const closeToast = () => {
    toastTimer = setTimeout(() => {
      setIsToastlVisible(false);
    }, 1500);
  };

  useEffect(() => {
    if (isToastVisible) {
      closeToast();
    }

    return () => {
      clearTimeout(toastTimer);
    };
  }, [isToastVisible]);

  return { isToastVisible, openToast };
};
