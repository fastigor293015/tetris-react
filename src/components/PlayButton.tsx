import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { motion } from "framer-motion";

interface PlayButtonProps {
  isPaused: boolean;
  switchFn: () => void;
  text?: string | null;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  isPaused,
  switchFn,
  text,
}) => {
  return (
    <motion.button
      initial={{ width: 0 }}
      animate={{ width: text ? "100%" : "48px" }}
      transition={{ delay: .3, duration: .3, type: "keyframes" }}
      className={`flex items-center justify-center h-12 border border-white rounded-lg text-white bg-black overflow-hidden`}
      onClick={() => switchFn()}
    >
      {text ? (
        text
      ) : (
        <>
          {isPaused ? <BsFillPlayFill size={30} /> : <BsFillPauseFill size={30} />}
        </>
      )}
    </motion.button>
  );
}

export default PlayButton;
