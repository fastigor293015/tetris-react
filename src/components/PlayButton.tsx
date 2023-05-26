import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg";

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
  if (text) {
    return (
      <button className="w-full p-2 border border-white rounded-lg text-white bg-black" onClick={() => switchFn()}>
        {text}
      </button>
    )
  }

  return (
    <button className="p-2 border border-white rounded-lg text-white bg-black" onClick={() => switchFn()}>
      { !isPaused && <CgPlayPauseO size={30} /> }
      { isPaused && <CgPlayButtonO size={30} /> }
    </button>
  );
}

export default PlayButton;
