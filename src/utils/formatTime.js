const formatUnit = (unit) => (unit < 10 ? `0${unit}` : unit);

const formatTime = (totalSeconds) => {
  const hours = formatUnit(Math.floor(totalSeconds / 3600));
  const minutes = formatUnit(Math.floor((totalSeconds % 3600) / 60));
  const seconds = formatUnit(totalSeconds % 60);

  return { hours, minutes, seconds };
};

const timeToStringFormat = (hours, minutes, seconds) => {
  return `${hours > 0 ? `${hours} hrs` : ""} ${
    minutes > 0 || hours>0 ? `${minutes} mins` : ""
  } ${seconds}secs`;
};

export { formatTime, timeToStringFormat };
