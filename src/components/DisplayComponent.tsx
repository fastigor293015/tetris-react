import React, { FC } from "react";
import { Display } from "../models/Display";
import CellComponent from "./CellComponent";

interface DisplayProps {
  display: Display;
  setDisplay: (display: Display) => void;
  isPaused: boolean;
}

const DisplayComponent: FC<DisplayProps> = ({ display, setDisplay, isPaused }) => {

  return (
    <div className="grid grid-cols-[repeat(12,20px)] grid-rows-[repeat(20,20px)] gap-[1px] border-[4px] overflow-hidden border-white rounded-lg">
      { isPaused &&
        <div className="hidden">
          Paused
        </div>
      }
      {
        display.cells.map((row, i) =>
          <React.Fragment key={i}>
            {
              row.map((cell, i) =>
                <CellComponent key={cell.id} cell={cell} index={i} />
              )
            }
          </React.Fragment>
        )
      }
    </div>
  );
}

export default DisplayComponent;
