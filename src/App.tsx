import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useInterval from './hooks/useInterval';
import { Display } from './models/Display';

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
  const [touchPoints, setTouchPoints] = useState([
    {
      x: 0,
      y: 0,
    },
    {
      x: 0,
      y: 0,
    },
  ]);
  const [movingXRatio, setMovingXRatio] = useState(0);

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
    console.log('-------------------Поворачиваем-------------------');
    display.tetromino.turn();
    update();
  }, [update, display]);

  const arrowRightHandler = useCallback(() => {
    console.log('-------------------Вправо-------------------');
    display.tetromino.moveRight();
    update();
  }, [update, display]);

  const arrowDownHandler = useCallback(() => {
    console.log('-------------------Вниз-------------------');
    setDropTime(TETROMINO_DROP_TIME / 15);
    update();
  }, [update]);

  const arrowLeftHandler = useCallback(() => {
    console.log('-------------------Влево-------------------');
    display.tetromino.moveLeft();
    update();
  }, [update, display]);

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

  const keyUpHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setDropTime(TETROMINO_DROP_TIME);
    }
  };

  const moveTetromino = useCallback(() => {
    if (!isStarted || isPaused) return;
    display.tetromino.moveDown();
    if (display.tetromino.landed) {
      createTetromino();
    }
    update();
  }, [isStarted, isPaused, display, update, createTetromino]);

  const touchStartHandler = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isStarted || isPaused) return;

    console.log("TOUCH START");
    setTouchPoints([
      {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      },
      {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      }
    ]);
    console.log("x: ", e.changedTouches[0].clientX, ";    y: ", e.changedTouches[0].clientY);
  }, [isStarted, isPaused]);

  const touchMoveHandler = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isStarted || isPaused) return;

    console.log("TOUCH MOVE");
    console.log("x: ", e.changedTouches[0].clientX, ";    y: ", e.changedTouches[0].clientY);

    setTouchPoints(prev => [
      {
        x: prev[0].x,
        y: prev[0].y,
      },
      {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      }
    ]);

    const dx = touchPoints[1].x - touchPoints[0].x;
    const dy = touchPoints[1].y - touchPoints[0].y;

    const newMovingXRatio = Math.floor(dx / 20);
    if (newMovingXRatio > movingXRatio) {
      arrowRightHandler();
    } else if (newMovingXRatio < movingXRatio) {
      arrowLeftHandler();
    }
    setMovingXRatio(newMovingXRatio);

    if (dy > 20) {
      setDropTime(TETROMINO_DROP_TIME / 15);
    } else {
      setDropTime(TETROMINO_DROP_TIME);
    }
  }, [isStarted, isPaused, touchPoints, movingXRatio, arrowRightHandler, arrowLeftHandler]);

  const touchEndHandler = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isStarted || isPaused) return;

    console.log("TOUCH END");
    console.log("x: ", e.changedTouches[0].clientX, ";    y: ", e.changedTouches[0].clientY);

    setDropTime(TETROMINO_DROP_TIME);

    if (touchPoints[0].x === touchPoints[1].x && touchPoints[0].y === touchPoints[1].y) {
      arrowUpHandler();
      return;
    }
  }, [isStarted, isPaused, touchPoints, arrowUpHandler]);

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
          <div onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler}>
            <DisplayComponent display={display} setDisplay={setDisplay} />
          </div>
        </div>
        {isStarted && <motion.div
          className="flex flex-col items-center justify-center gap-32 overflow-hidden"
          initial={{ maxWidth: 0, padding: 0 }}
          animate={{ maxWidth: 1000, padding: "0 48px" }}
          transition={{ delay: .2, duration: .4, type: "keyframes" }}
        >
          <TetrominoPreview nextTetrominoIndex={display.lastThreeIndexesArr[0]} />
        </motion.div>}
      </div>
    </div>
  );
}

export default App;
