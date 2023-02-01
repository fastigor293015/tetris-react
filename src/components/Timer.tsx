import React, { FC, useRef, useEffect } from 'react';
import { useInterval } from '../hooks/useInterval';

interface TimerProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isPaused: boolean;
}

const Timer: FC<TimerProps> = ({ time, setTime, isPaused }) => {
  // const [time, setTime] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>(null!);

  useEffect(() => {
    // clearInterval(timer.current);
    // timer.current = setInterval(() => {

    // }, 1000);
  }, [])

  useInterval(() => {
    if (!isPaused) {
      setTime(prev => prev + 1);
    }
  }, 1000)

  function getFormattedTime(): string {
    const min = Math.floor(time / 60),
          sec = time - min * 60;

    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
}

  return (
    <div className="timer">
      {getFormattedTime()}
    </div>
  );
}

export default Timer;
