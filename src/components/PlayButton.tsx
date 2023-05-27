import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
// import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg";

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
    <button className={`p-2 border border-white rounded-lg text-white bg-black transition duration-1000 ${text ? "w-full" : "w-12"}`} onClick={() => switchFn()}>
      {text ? (
        text
      ) : (
        <>
          {isPaused ? <BsFillPlayFill size={30} /> : <BsFillPauseFill size={30} />}
        </>
      )}
    </button>
  );
}

export default PlayButton;
