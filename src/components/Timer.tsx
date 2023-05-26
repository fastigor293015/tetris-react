import React, { FC } from "react";
import { motion } from "framer-motion";
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

  const formatTime = () => {
    const min = Math.floor(time / 60),
          sec = time - min * 60;

    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
}

  return (
    <motion.div
      className="flex items-center justify-center h-12 w-24 border border-white rounded-lg text-white bg-black"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "keyframes", delay: .2, duration: .3 }}
    >
      {formatTime()}
    </motion.div>
  );
}

export default Timer;
