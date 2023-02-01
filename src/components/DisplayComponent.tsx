import React, { FC, useRef, useEffect } from 'react';
import { Display } from '../models/Display';
import CellComponent from './CellComponent';

interface DisplayProps {
  display: Display;
  setDisplay: (display: Display) => void;
  isPaused: boolean;
}

const DisplayComponent: FC<DisplayProps> = ({ display, setDisplay, isPaused }) => {
  // const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  // useEffect(() => {
  //   timer.current = setInterval(update, 5000)
  // }, [])

  // function update() {
  //   const newDisplay = display.getCopyDisplay();
  //   setDisplay(newDisplay);
  //   console.log(display);
  // }

  return (
    <div className="display">
      { isPaused &&
        <div className="modal">
          Paused
        </div>
      }
      {
        display.cells.map((row, index) =>
          <React.Fragment key={index}>
            {
              row.map(cell =>
                <CellComponent key={cell.id} cell={cell} />
              )
            }
          </React.Fragment>
        )
      }
    </div>
  );
}

export default DisplayComponent;
