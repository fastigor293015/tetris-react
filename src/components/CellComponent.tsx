import { FC } from "react";
import { motion } from "framer-motion";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  index: number;
}

const CellComponent: FC<CellProps> = ({ cell, index }) => {
  return (
    <motion.div
      className={`flex items-center justify-center bg-black ${cell.color}`}
      initial={{ scale: 0 }}
      animate={{ scale: "100%" }}
      transition={{ delay: index * .1 + .1 }}
    >
      <div
        className="h-[90%] w-[90%] p-[2px] border-[3px] border-current rounded-md"
      >
        <div className="w-full h-full rounded-[4px] bg-current"></div>
      </div>
    </motion.div>
  );
}

export default CellComponent;
