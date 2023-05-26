import { FC } from "react";
import { BsFillArrowUpSquareFill, BsFillArrowRightSquareFill, BsFillArrowDownSquareFill, BsFillArrowLeftSquareFill } from "react-icons/bs";

interface ControlsProps {
  arrowUpHandler: () => void;
  arrowRightHandler: () => void;
  arrowDownHandler: () => void;
  arrowLeftHandler: () => void;
  mouseUpHandler: () => void;
}

const Controls: FC<ControlsProps> = ({ arrowUpHandler, arrowRightHandler, arrowDownHandler, arrowLeftHandler, mouseUpHandler }) => {
  return (
    <div className="relative">
      <button className="absolute border border-white rounded-lg overflow-hidden bg-white -translate-y-[95%] -translate-x-1/2" onClick={arrowUpHandler}>
        <BsFillArrowUpSquareFill size={40} />
      </button>
      <button className="absolute border border-white rounded-lg overflow-hidden bg-white translate-x-[45%]" onClick={arrowRightHandler}>
        <BsFillArrowRightSquareFill size={40} />
      </button>
      <button className="absolute border border-white rounded-lg overflow-hidden bg-white translate-y-[95%] -translate-x-1/2" onMouseDown={arrowDownHandler} onMouseUp={mouseUpHandler} onTouchStart={arrowDownHandler}>
        <BsFillArrowDownSquareFill size={40} />
      </button>
      <button className="absolute border border-white rounded-lg overflow-hidden bg-white -translate-x-[145%]" onClick={arrowLeftHandler}>
        <BsFillArrowLeftSquareFill size={40} />
      </button>

    </div>
  )
}

export default Controls;
