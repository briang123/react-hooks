import { useState, useEffect } from 'react';

export const useCountdown = (endtime) => {
  const [isActive, setIsActive] = useState(true);
  // const [currentTime, setCurrentTime] = useState(endtime);
  const [date, setDate] = useState(new Date());

  const total = Date.parse(endtime) - Date.parse(date);
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  const toggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setDate(new Date());
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, date]);

  return {
    toggle,
    isActive,
    total,
    days,
    hours,
    minutes,
    seconds,
  };
};
