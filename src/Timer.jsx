import { useState, useEffect } from 'react';
import PropTypes from "prop-types";

function Timer({ stopCondition }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (stopCondition) {
      return;
    }

    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [time, stopCondition]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1 className='dark:text-white text-2xl'>Timer: {formatTime(time)}</h1>
    </div>
  );
}

Timer.propTypes = {
    stopCondition: PropTypes.bool.isRequired,
}

export default Timer;
