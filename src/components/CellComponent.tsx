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
      className={cell.color}
      initial={{ scale: 0 }}
      animate={{ scale: "100%" }}
      transition={{ delay: index * .1 }}
    ></motion.div>
  );
}

export default CellComponent;
