import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useInterval from './hooks/useInterval';
import { Display } from './models/Display';

import Controls from './components/Controls';
import DisplayComponent from './components/DisplayComponent';
import TetrominoPreview from './components/TetrominoPreview';
import Timer from './components/Timer';
import PlayButton from './components/PlayButton';

import { DISPLAY_HEIGHT, DISPLAY_WIDTH, TETROMINO_DROP_TIME } from './setup';

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [display, setDisplay] = useState(new Display(DISPLAY_WIDTH, DISPLAY_HEIGHT));
  const [time, setTime] = useState(0);
  const [dropTime, setDropTime] = useState(TETROMINO_DROP_TIME);

  useEffect(() => {
    if (!isStarted) {
      display.initCells();
      update();
    }
  }, []);

  useInterval(() => {
    moveTetromino();
  }, isPaused ? null : dropTime);

  const start = () => {
    setIsStarted(true);
    setTime(0);

    const newDisplay = new Display(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    setDisplay(newDisplay);
    display.initCells();

    console.log(display);
    createTetromino();
  }

  const update = () => {
    const newDisplay = display.getCopyDisplay();
    setDisplay(newDisplay);
    console.log(display);
  }

  const createTetromino = () => {
    display.addTetromino();
    update();
  }

  const keyDownHandler = (e: React.KeyboardEvent) => {
    console.log(e.key);
    if (e.key === 'p' || e.key === 'з') {
      setIsPaused(!isPaused);
    }
    if (!isStarted || isPaused) return;
    if (e.key === 'ArrowDown') {
      arrowDownHandler();
    }
    if (e.key === 'ArrowLeft') {
      arrowLeftHandler();
    }
    if (e.key === 'ArrowRight') {
      arrowRightHandler();
    }
    if (e.key === 'ArrowUp') {
      arrowUpHandler();
    }
  }

  const arrowUpHandler = () => {
    if (!isStarted || isPaused) return;
    console.log('-------------------Поворачиваем-------------------');
    display.tetromino.turn();
    update();
  }

  const arrowRightHandler = () => {
    if (!isStarted || isPaused) return;
    console.log('-------------------Вправо-------------------');
    display.tetromino.moveRight();
    update();
  }

  const arrowDownHandler = () => {
    if (!isStarted || isPaused) return;
    console.log('-------------------Вниз-------------------');
    setDropTime(TETROMINO_DROP_TIME / 15);
    update();
  }

  const arrowLeftHandler = () => {
    if (!isStarted || isPaused) return;
    console.log('-------------------Влево-------------------');
    display.tetromino.moveLeft();
    update();
  }

  const mouseUpHandler = () => {
    setDropTime(TETROMINO_DROP_TIME);
    update();
  }

  const keyUpHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setDropTime(TETROMINO_DROP_TIME);
      update();
    }
  }

  const moveTetromino = () => {
    if (!isStarted || isPaused) return;
    display.tetromino.moveDown();
    if (display.tetromino.landed) {
      createTetromino();
    }
    update();
  }

  return (
    <div className="flex items-center justify-center min-h-screen" tabIndex={-1} onKeyDown={keyDownHandler} onKeyUp={keyUpHandler}>
      <div className="flex">
        <div>
          <div className="flex items-center justify-between gap-2 mb-6">
            {isStarted && <Timer time={time} setTime={setTime} isPaused={isPaused} />}
            <PlayButton
              isPaused={isPaused}
              switchFn={() => !isStarted ? start() : setIsPaused(!isPaused)}
              text={!isStarted ? "Start game" : null}
            />
            {isStarted && <motion.div
              className="flex items-center justify-center h-12 w-24 border border-white rounded-lg text-white bg-black"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "keyframes", delay: .2, duration: .3 }}
            >Rows: {display.clearedRows}</motion.div>}
          </div>
          <DisplayComponent display={display} setDisplay={setDisplay} isPaused={isPaused} />
        </div>
        {isStarted && <motion.div
          className="flex flex-col items-center justify-center gap-32 overflow-hidden"
          initial={{ maxWidth: 0, padding: 0 }}
          animate={{ maxWidth: 1000, padding: "0 48px" }}
          transition={{ delay: .2, duration: .4, type: "keyframes" }}
        >
          <TetrominoPreview nextTetrominoIndex={display.lastThreeIndexesArr[0]} />
          <Controls arrowUpHandler={arrowUpHandler} arrowRightHandler={arrowRightHandler} arrowDownHandler={arrowDownHandler} arrowLeftHandler={arrowLeftHandler} mouseUpHandler={mouseUpHandler} />
        </motion.div>}
      </div>
    </div>
  );
}

export default App;
