import React, { FC } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { EColors } from '../models/EColors';
import { TETROMINOS } from '../setup';

interface TetrominoPreviewProps {
  nextTetrominoIndex: number;
}

const TetrominoPreview: FC<TetrominoPreviewProps> = ({ nextTetrominoIndex }) => {

  return (
    <motion.div
      className="flex items-center justify-center w-[100px] h-[100px] border border-white rounded-lg bg-black overflow-hidden"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: "100%" }}
      transition={{ type: "keyframes", delay: .2, duration: .3 }}
    >
      <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${TETROMINOS[nextTetrominoIndex].preview.length}, 20px)`, gridTemplateRows: `repeat(${TETROMINOS[nextTetrominoIndex].preview.length}, 20px)` }}>
        {TETROMINOS[nextTetrominoIndex].preview.map((row, index) =>
          <React.Fragment key={index}>
            {
              row.map((cell, i) =>
                <AnimatePresence key={`${cell}-${i}`}>
                  <motion.div
                    key={`${nextTetrominoIndex}-${i}`}
                    className={`flex items-center justify-center bg-black ${cell === 1 ? TETROMINOS[nextTetrominoIndex].color : EColors.BLACK}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: "100%" }}
                    transition={{ delay: index * .1 }}
                  >
                    <div
                      className="h-[90%] w-[90%] p-[2px] border-[3px] border-current rounded-md"
                    >
                      <div className="w-full h-full rounded-[4px] bg-current"></div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )
            }
          </React.Fragment>
        )}
      </div>
    </motion.div>
  );
}

export default TetrominoPreview;
