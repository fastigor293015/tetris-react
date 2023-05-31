import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { VscDebugRestart } from "react-icons/vsc";
import useInterval from './hooks/useInterval';
import { Display } from './models/Display';

import DisplayComponent from './components/DisplayComponent';
import TetrominoPreview from './components/TetrominoPreview';
import Timer from './components/Timer';
import PlayButton from './components/PlayButton';

import { DISPLAY_HEIGHT, DISPLAY_WIDTH, TETROMINO_DROP_TIME } from './setup';
import Modal from './components/Modal';

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

  const level = useMemo(() => {
    return Math.floor(display.clearedRows / 10);
  }, [display.clearedRows]);

  const isGameStopped = useMemo(() => {
    return !isStarted || display.isLost || isPaused;
  }, [isStarted, isPaused, display.isLost]);

  const isModalOpen = useMemo(() => {
    return display.isLost;
  }, [display.isLost]);

  useEffect(() => {
    if (!isStarted) {
      display.initCells();
      update();
    }
  }, []);

  useInterval(() => {
    moveTetromino();
  }, isGameStopped ? null : dropTime);

  const update = useCallback(() => {
    const newDisplay = display.getCopyDisplay();
    setDisplay(newDisplay);
  }, [display]);

  const createTetromino = useCallback(() => {
    display.addTetromino();
    update();
  }, [display, update]);

  const start = useCallback(() => {
    display.isLost = false;
    setIsStarted(true);
    setIsPaused(false);
    setTime(0);

    const newDisplay = new Display(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    setDisplay(newDisplay);
    display.initCells();

    createTetromino();
  }, [createTetromino, display]);

  const arrowUpHandler = useCallback(() => {
    display.tetromino.turn();
    update();
  }, [update, display]);

  const arrowRightHandler = useCallback(() => {
    display.tetromino.moveRight();
    update();
  }, [update, display]);

  const arrowDownHandler = useCallback(() => {
    setDropTime(TETROMINO_DROP_TIME / 15);
    update();
  }, [update]);

  const arrowLeftHandler = useCallback(() => {
    display.tetromino.moveLeft();
    update();
  }, [update, display]);

  const keyDownHandler = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'p' || e.key === 'з') {
      setIsPaused(!isPaused);
    }
    if (isGameStopped) return;

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
  }, [isPaused, isGameStopped, arrowUpHandler, arrowRightHandler, arrowDownHandler, arrowLeftHandler]);

  const keyUpHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setDropTime(TETROMINO_DROP_TIME);
    }
  };

  const moveTetromino = useCallback(() => {
    display.tetromino.moveDown();
    if (display.tetromino.landed) {
      createTetromino();
    }
    update();
  }, [display, update, createTetromino]);

  const touchStartHandler = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (isGameStopped) return;

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
  }, [isGameStopped]);

  const touchMoveHandler = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (isGameStopped) return;

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

    if (dy > 30) {
      setDropTime(TETROMINO_DROP_TIME / 15);
    } else {
      setDropTime(TETROMINO_DROP_TIME);
    }
  }, [isGameStopped, touchPoints, movingXRatio, arrowRightHandler, arrowLeftHandler]);

  const touchEndHandler = useCallback(() => {
    if (isGameStopped) return;

    setDropTime(TETROMINO_DROP_TIME);

    if (touchPoints[0].x === touchPoints[1].x && touchPoints[0].y === touchPoints[1].y) {
      arrowUpHandler();
      return;
    }

    setTouchPoints([
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 0,
      }
    ]);
  }, [isGameStopped, touchPoints, arrowUpHandler]);

  return (
    <div className="flex items-center justify-center min-h-screen" tabIndex={-1} onKeyDown={keyDownHandler} onKeyUp={keyUpHandler}>
      <Modal isOpen={isModalOpen} onClose={() => {display.isLost = false}}>
        <div className="text-center">
          <h2 className="text-red-400 text-xl font-bold">You lost</h2>
          <button onClick={start}>Restart</button>
        </div>
      </Modal>
      <div className="flex">
        <div>
          <div className="flex items-center justify-center gap-2 mb-6">
            {isStarted && <Timer time={time} setTime={setTime} isStopped={isGameStopped} />}
            <PlayButton
              isPaused={isPaused}
              switchFn={() => !isStarted ? start() : setIsPaused(!isPaused)}
              text={!isStarted ? "Start game" : null}
            />

            {isStarted && <motion.button
              initial={{ width: 0, opacity: 0, x: "-100%" }}
              animate={{ width: 48, opacity: 1, x: 0 }}
              transition={{ type: "keyframes", delay: .3, duration: .3 }}
              className="flex items-center justify-center w-12 h-12 border border-white rounded-lg text-white bg-black"
              onClick={start}
            >
              <VscDebugRestart size={24} />
            </motion.button>}
          </div>
          <div onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler}>
            <DisplayComponent display={display} setDisplay={setDisplay} />
          </div>
        </div>

        {/* Боковая панель */}
        {isStarted && <motion.div
          className="flex flex-col items-center gap-12 mt-[72px] overflow-hidden"
          initial={{ maxWidth: 0, marginLeft: 0 }}
          animate={{ maxWidth: 1000, marginLeft: 24 }}
          transition={{ delay: .2, duration: .4, type: "keyframes" }}
        >
          <TetrominoPreview nextTetrominoIndex={display.lastThreeIndexesArr[0]} />
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "keyframes", delay: .3, duration: .3 }}
              className="flex items-center justify-center h-12 w-32 border border-white rounded-lg text-white bg-black"
            >
              Score: {level}
            </motion.div>
            <motion.div
              className="flex items-center justify-center h-12 border border-white rounded-lg text-white bg-black"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "keyframes", delay: .5, duration: .3 }}
            >Rows: {display.clearedRows}</motion.div>
            <motion.div
              className="flex items-center justify-center h-12 w-32 border border-white rounded-lg text-white bg-black"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "keyframes", delay: .7, duration: .3 }}
            >
              Level: {level}
            </motion.div>
          </div>
        </motion.div>}
      </div>
    </div>
  );
}

export default App;
