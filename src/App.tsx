import React, { useState, useEffect, useCallback } from 'react';
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

  const update = useCallback(() => {
    const newDisplay = display.getCopyDisplay();
    setDisplay(newDisplay);
    console.log(display);
  }, [display]);

  const createTetromino = useCallback(() => {
    display.addTetromino();
    update();
  }, [display, update]);

  const start = useCallback(() => {
    setIsStarted(true);
    setTime(0);

    const newDisplay = new Display(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    setDisplay(newDisplay);
    display.initCells();

    console.log(display);
    createTetromino();
  }, [createTetromino, display]);

  const arrowUpHandler = useCallback(() => {
    if (!isStarted || isPaused) return;
      console.log('-------------------Поворачиваем-------------------');
      display.tetromino.turn();
      update();
    }, [isStarted, isPaused, update, display]);

    const arrowRightHandler = useCallback(() => {
      if (!isStarted || isPaused) return;
      console.log('-------------------Вправо-------------------');
      display.tetromino.moveRight();
      update();
    }, [isStarted, isPaused, update, display]);

    const arrowDownHandler = useCallback(() => {
      if (!isStarted || isPaused) return;
      console.log('-------------------Вниз-------------------');
      setDropTime(TETROMINO_DROP_TIME / 15);
      update();
    }, [isStarted, isPaused, update]);

    const arrowLeftHandler = useCallback(() => {
      if (!isStarted || isPaused) return;
      console.log('-------------------Влево-------------------');
      display.tetromino.moveLeft();
      update();
    }, [isStarted, isPaused, update, display]);

  const keyDownHandler = useCallback((e: React.KeyboardEvent) => {
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
  }, [isPaused, isStarted, arrowUpHandler, arrowRightHandler, arrowDownHandler, arrowLeftHandler]);

  const mouseUpHandler = useCallback(() => {
    setDropTime(TETROMINO_DROP_TIME);
    update();
  }, [update]);

  const keyUpHandler = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setDropTime(TETROMINO_DROP_TIME);
      update();
    }
  }, [update]);

  const moveTetromino = useCallback(() => {
    if (!isStarted || isPaused) return;
    display.tetromino.moveDown();
    if (display.tetromino.landed) {
      createTetromino();
    }
    update();
  }, [isStarted, isPaused, display, update, createTetromino]);

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
              className="flex items-center justify-center h-12 border border-white rounded-lg text-white bg-black"
              initial={{ width: 0, opacity: 0, x: "-100%" }}
              animate={{ width: 96, opacity: 1, x: 0 }}
              transition={{ type: "keyframes", delay: .3, duration: .3 }}
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
