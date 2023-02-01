import React, { FC } from 'react';
import { ArrowUp } from '../icons';

interface ControlsProps {
  arrowUpHandler: () => void;
  arrowRightHandler: () => void;
  arrowDownHandler: () => void;
  arrowLeftHandler: () => void;
  mouseUpHandler: () => void;
}

const Controls: FC<ControlsProps> = ({ arrowUpHandler, arrowRightHandler, arrowDownHandler, arrowLeftHandler, mouseUpHandler }) => {
  return (
    <div className="controls">
      <button className="controls-btn up" onClick={arrowUpHandler}>
        <ArrowUp width={20} height={20} />
      </button>
      <button className="controls-btn right" onClick={arrowRightHandler}>
        <ArrowUp width={20} height={20} />
      </button>
      <button className="controls-btn down" onMouseDown={arrowDownHandler} onMouseUp={mouseUpHandler} onTouchStart={arrowDownHandler}>
        <ArrowUp width={20} height={20} />
      </button>
      <button className="controls-btn left" onClick={arrowLeftHandler}>
        <ArrowUp width={20} height={20} />
      </button>

    </div>
  )
}

export default Controls;
