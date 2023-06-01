import React, { FC } from "react";
import { Display } from "../models/Display";
import CellComponent from "./CellComponent";
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../setup";

interface DisplayProps {
  display: Display;
  setDisplay: (display: Display) => void;
}

const DisplayComponent: FC<DisplayProps> = ({ display }) => {

  return (
    <div
      className="grid gap-[1px] border-[4px] rounded-lg overflow-hidden border-white bg-white/40"
      style={{
        gridTemplateColumns: `repeat(${DISPLAY_WIDTH},20px)`,
        gridTemplateRows: `repeat(${DISPLAY_HEIGHT},20px)`,
      }}
    >
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
