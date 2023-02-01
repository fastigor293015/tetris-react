import React, { FC, useRef, useEffect } from 'react';
import { useInterval } from '../hooks/useInterval';
import { EColors } from '../models/EColors';
import { TETROMINOS } from '../setup';

interface TetrominoPreviewProps {
  nextTetrominoIndex: number;
}

const TetrominoPreview: FC<TetrominoPreviewProps> = ({ nextTetrominoIndex }) => {

  return (
    <div className="preview">
      <div className="preview-container" style={{ "--preview-cells-count": TETROMINOS[nextTetrominoIndex].preview.length } as React.CSSProperties}>
        {TETROMINOS[nextTetrominoIndex].preview.map((row, index) =>
          <React.Fragment key={index}>
            {
              row.map(cell =>
                <div key={Math.random().toString(36).substring(2, 15)} className={['cell', cell === 1 ? TETROMINOS[nextTetrominoIndex].color : EColors.BLACK].join(' ')}></div>
              )
            }
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default TetrominoPreview;
