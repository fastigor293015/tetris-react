import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { VscDebugRestart } from "react-icons/vsc";
import useInterval from './hooks/useInterval';
import { Display } from './models/Display';

import DisplayComponent from './components/DisplayComponent';
import TetrominoPreview from './components/TetrominoPreview';
import Timer from './components/Timer';
import PlayButton from './components/PlayButton';
import Modal from './components/Modal';

import { DISPLAY_HEIGHT, DISPLAY_WIDTH, ROWS_FOR_LEVELUP, SCORE_COUNT, TETROMINO_DROP_TIME } from './setup';
import useTimeout from './hooks/useTimeout';

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [display, setDisplay] = useState(new Display(DISPLAY_WIDTH, DISPLAY_HEIGHT));
  const [lastCombo, setLastCombo] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [levelup, setLevelup] = useState(false);
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

  const normalDropTime = useMemo(() => {
    return Math.pow(
      TETROMINO_DROP_TIME / 1000 - ((display.level <= 1 ? 1 : display.level) - 1) * 0.007,
      display.level - 1
    ) * 1000;
  }, [display]);

  const boostedDropTime = useMemo(() => {
    return normalDropTime / 15;
  }, [normalDropTime]);

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

  useEffect(() => {
    if (display.lastCombo > 0 && lastCombo !== display.lastCombo) {
      setLastCombo(lastCombo);
      console.log("Устанавливаю бонус")
      setBonus(SCORE_COUNT[display.lastCombo - 1] * (display.level <= 1 ? 1 : display.level));
    }

    if (Math.floor(display.clearedRows / ROWS_FOR_LEVELUP) !== Math.floor((display.clearedRows - display.lastCombo) / ROWS_FOR_LEVELUP) &&  lastCombo !== display.lastCombo) {
      setLevelup(true);
    }
  }, [display.clearedRows, lastCombo]);

  useInterval(() => {
    moveTetromino();
  }, isGameStopped ? null : dropTime);

  useTimeout(() => {
    setBonus(0);
  }, bonus > 0 ? 1000 : null);

  useTimeout(() => {
    setLevelup(false);
  }, levelup ? 1000 : null);

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
    display.score = 0;
    display.level = 0;
    display.clearedRows = 0;
    setIsStarted(true);
    setIsPaused(false);
    setTime(0);

    const newDisplay = new Display(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    setDisplay(newDisplay);
    console.log("СТАРТУЕМ: ", display);
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
    setDropTime(boostedDropTime);
    update();
  }, [update, boostedDropTime]);

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
      setDropTime(normalDropTime);
    }
  };

  const moveTetromino = useCallback(() => {
    if (dropTime === boostedDropTime) {
      display.score++;
    }
    display.tetromino.moveDown();
    if (display.tetromino.landed) {
      createTetromino();
    }
    update();
  }, [dropTime, boostedDropTime, display, update, createTetromino]);

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
      setDropTime(boostedDropTime);
    } else {
      setDropTime(normalDropTime);
    }
  }, [boostedDropTime, normalDropTime, isGameStopped, touchPoints, movingXRatio, arrowRightHandler, arrowLeftHandler]);

  const touchEndHandler = useCallback(() => {
    if (isGameStopped) return;

    setDropTime(normalDropTime);

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
  }, [normalDropTime, isGameStopped, touchPoints, arrowUpHandler]);

  return (
    <div className="flex items-center justify-center min-h-screen" tabIndex={-1} onKeyDown={keyDownHandler} onKeyUp={keyUpHandler}>
      <Modal isOpen={isModalOpen} onClose={() => {display.isLost = false}}>
        <div className="min-w-[200px] text-center">
          <h2 className="mb-3 text-red-400 text-xl font-bold">You lost</h2>
          <p className="mb-3">Score: {display.score}</p>
          <button className="py-3 px-4 rounded-lg text-white bg-black" onClick={start}>Restart</button>
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
          <div className="relative" onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler}>
            <DisplayComponent display={display} setDisplay={setDisplay} />
            <AnimatePresence>
              {bonus !== 0 && (
                <motion.div
                  key={`${display.clearedRows} - ${bonus}`}
                  initial={{ opacity: 0, y: 100, x: "-50%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  className="absolute bottom-1/2 left-1/2 text-green-200 text-3xl font-bold"
                >
                  +{bonus}
                </motion.div>
              )}
              {levelup && (
                <motion.div
                  key={`${display.clearedRows} - ${levelup}`}
                  initial={{ opacity: 0, y: 100, x: "-50%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  className="absolute bottom-[calc(50%+50px)] left-1/2 text-pink-200 text-4xl font-bold"
                >
                  LEVELUP!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Боковая панель */}
        {isStarted && <motion.div
          className="relative flex flex-col items-center gap-12 mt-[72px] overflow-hidden"
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
              Score: {display.score}
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
              Level: {display.level}
            </motion.div>
          </div>
        </motion.div>}
      </div>
    </div>
  );
}

export default App;
