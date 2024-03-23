import { useState, useEffect } from "react";
import { formatTime } from "../utils/formatTime";

const useTimer = (initialSeconds = 0) => {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resetTimer = () => {
    setTotalSeconds(0);
  };

  return {
    totalSeconds,
    ...formatTime(totalSeconds),
    resetTimer,
  };
};

export default useTimer;
