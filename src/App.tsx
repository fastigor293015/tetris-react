import React, { useState, useEffect, FC } from 'react';
import './App.css';
import Controls from './components/Controls';
import DisplayComponent from './components/DisplayComponent';
import TetrominoPreview from './components/TetrominoPreview';
import Timer from './components/Timer';
import { useInterval } from './hooks/useInterval';
import { PauseIcon, PlayIcon } from './icons';
import { Display } from './models/Display';
import { DISPLAY_HEIGHT, DISPLAY_WIDTH, TETROMINO_DROP_TIME } from './setup';

const App: FC = () => {
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
  }, dropTime);

  function start() {
    setTime(0);

    const newDisplay = new Display(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    setDisplay(newDisplay);
    display.initCells();

    console.log(display);
    createTetromino();
  }

  function update() {
    const newDisplay = display.getCopyDisplay();
    setDisplay(newDisplay);
    console.log(display);
  }

  function createTetromino() {
    const tetromino = display.addTetromino();
    update();
  }

  function keyDownHandler(e: React.KeyboardEvent) {
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

  function arrowUpHandler() {
    if (!isStarted || isPaused) return;
    console.log('-------------------Поворачиваем-------------------');
    display.tetromino.turn();
    update();
  }

  function arrowRightHandler() {
    if (!isStarted || isPaused) return;
    console.log('-------------------Вправо-------------------');
    display.tetromino.moveRight();
    update();
  }

  function arrowDownHandler() {
    if (!isStarted || isPaused) return;
    console.log('-------------------Вниз-------------------');
    setDropTime(TETROMINO_DROP_TIME / 15);
    update();
  }

  function arrowLeftHandler() {
    if (!isStarted || isPaused) return;
    console.log('-------------------Влево-------------------');
    display.tetromino.moveLeft();
    update();
  }

  function mouseUpHandler() {
    setDropTime(TETROMINO_DROP_TIME);
    update();
  }

  function keyUpHandler(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      setDropTime(TETROMINO_DROP_TIME);
      update();
    }
  }

  function moveTetromino() {
    if (!isStarted || isPaused) return;
    display.tetromino.moveDown();
    if (display.tetromino.landed) {
      createTetromino();
    }
    update();
  }

  return (
    <div className="app" tabIndex={-1} onKeyDown={keyDownHandler} onKeyUp={keyUpHandler}>
      <div className="container">
        <div className={['top', !isStarted ? 'start' : ''].join(' ')}>
          { isStarted && <Timer time={time} setTime={setTime} isPaused={isPaused} /> }
          { isStarted &&
            <button className="pause-btn" onClick={() => {setIsPaused(!isPaused)}}>
              { !isPaused && <PauseIcon width={30} height={30} /> }
              { isPaused && <PlayIcon width={30} height={30} /> }
            </button>
          }
          { isStarted && <div className="rows-count">Rows: {display.clearedRows}</div> }
          { !isStarted && <button className="start-btn" onClick={() => {setIsStarted(true); start();}} onKeyDown={keyDownHandler}>Start game</button> }
        </div>
        <DisplayComponent display={display} setDisplay={setDisplay} isPaused={isPaused} />
        { isStarted && <TetrominoPreview nextTetrominoIndex={display.lastThreeIndexesArr[0]} /> }
        { isStarted && <Controls arrowUpHandler={arrowUpHandler} arrowRightHandler={arrowRightHandler} arrowDownHandler={arrowDownHandler} arrowLeftHandler={arrowLeftHandler} mouseUpHandler={mouseUpHandler} /> }
      </div>
    </div>
  );
}

export default App;
