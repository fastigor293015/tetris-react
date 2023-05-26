import React, { FC } from 'react';
import { motion } from "framer-motion";
import { EColors } from '../models/EColors';
import { TETROMINOS } from '../setup';

interface TetrominoPreviewProps {
  nextTetrominoIndex: number;
}

const TetrominoPreview: FC<TetrominoPreviewProps> = ({ nextTetrominoIndex }) => {

  return (
    <div className="flex items-center justify-center w-[100px] h-[100px] border border-white rounded-lg bg-black">
      <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${TETROMINOS[nextTetrominoIndex].preview.length}, 20px)`, gridTemplateRows: `repeat(${TETROMINOS[nextTetrominoIndex].preview.length}, 20px)` }}>
        {TETROMINOS[nextTetrominoIndex].preview.map((row, index) =>
          <React.Fragment key={index}>
            {
              row.map((cell, index) =>
                <motion.div

                  key={Math.random().toString(36).substring(2, 15)}
                  className={['cell', cell === 1 ? TETROMINOS[nextTetrominoIndex].color : EColors.BLACK].join(' ')}
                  // initial={{ scale: 0 }}
                  // animate={{ scale: "100%" }}
                  // transition={{ delay: index * .1 }}
                ></motion.div>
              )
            }
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default TetrominoPreview;
