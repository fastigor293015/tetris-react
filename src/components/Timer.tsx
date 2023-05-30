import React, { FC, useCallback } from "react";
import { motion } from "framer-motion";
import { TbClockHour4 } from "react-icons/tb";
import useInterval from "../hooks/useInterval";

interface TimerProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isPaused: boolean;
}

const Timer: FC<TimerProps> = ({ time, setTime, isPaused }) => {

  useInterval(() => {
    setTime(prev => prev + 1);
  }, isPaused ? null : 1000);

  const formatTime = useCallback(() => {
    const min = Math.floor(time / 60),
          sec = time - min * 60;

    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  }, [time]);

  return (
    <motion.div
      className="grow flex items-center justify-center gap-1 h-12 border border-white rounded-lg text-white bg-black"
      initial={{ width: 0, opacity: 0, x: "100%" }}
      animate={{ width: 96, opacity: 1, x: 0 }}
      transition={{ type: "keyframes", delay: .3, duration: .3 }}
    >
      <TbClockHour4 size={24} />
      {formatTime()}
    </motion.div>
  );
}

export default Timer;
