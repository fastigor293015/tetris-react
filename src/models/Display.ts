import { TETROMINOS } from "../setup";
import { Cell } from "./Cell";
import { EColors } from "./EColors";
import { Tetromino } from "./Tetromino";

export class Display {
  cells: Cell[][] = [];
  width: number;
  height: number;
  tetromino: Tetromino;
  lastThreeIndexesArr: Array<number>;
  clearedRows: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.clearedRows = 0;
    this.tetromino = null!;
    this.lastThreeIndexesArr = [];
    this.generateTetrominoIndex();
  }

  public initCells() {
    this.cells = [];
    for (let i = 0; i < this.height; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.width; j++) {
        row.push(new Cell(j, i, EColors.BLACK));
      }
      this.cells.push(row);
    }
  }

  getCell(x: number, y: number): Cell {
    return this.cells[y][x];
  }

  getCopyDisplay(): Display {
    const newDisplay = new Display(this.width, this.height);
    newDisplay.cells = this.cells;
    newDisplay.clearedRows = this.clearedRows;
    newDisplay.tetromino = this.tetromino;
    // Назначаем для tetromino новый контекст newDisplay
    if (newDisplay.tetromino?.display) {
      newDisplay.tetromino.display = newDisplay;
    }
    newDisplay.lastThreeIndexesArr = this.lastThreeIndexesArr;
    return newDisplay;
  }

  public generateTetrominoIndex(): number {
    let tetrominoIndex = Math.floor(Math.random() * TETROMINOS.length);
    while (this.lastThreeIndexesArr.findIndex(index => index === tetrominoIndex) >= 0) {
      tetrominoIndex = Math.floor(Math.random() * TETROMINOS.length);
    }

    this.lastThreeIndexesArr.unshift(tetrominoIndex);
    if (this.lastThreeIndexesArr.length > 5) {
      this.lastThreeIndexesArr.pop();
    }

    return tetrominoIndex;
  }

  public addTetromino(): Tetromino {
    const randomIndex: number = this.lastThreeIndexesArr[0],
          name = TETROMINOS[randomIndex].name,
          color: EColors = TETROMINOS[randomIndex].color,
          turnsArr = JSON.parse(JSON.stringify(TETROMINOS[randomIndex].turns));

    const tetromino = new Tetromino(this, name, color, turnsArr);

    this.tetromino = tetromino;

    this.generateTetrominoIndex();

    return this.tetromino;
  }

  public checkRows() {
    const clearedRowsIndexes: number[] = [];

    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      const index = row.findIndex(item => item.color === EColors.BLACK);
      if (index === -1) {
        for (let j = 0; j < row.length; j++) {
          row[j].color = EColors.BLACK;
        }
        clearedRowsIndexes.push(i);
        console.log('Вы зачистили строчку');
        this.clearedRows++;
      }
    }

    if (clearedRowsIndexes.length === 0) {
      return;
    }

    for (let r = 0; r < clearedRowsIndexes.length; r++) {

      for (let i = clearedRowsIndexes[r]; i > 0; i--) {
        const row = this.cells[i],
              nextRow = this.cells[i - 1];

        for (let j = 0; j < row.length; j++) {
          const curCell = row[j],
                nextCell = nextRow[j],
                curColor = row[j].color;
          curCell.color = nextCell.color;
          nextCell.color = curColor;
        }
      }
    }

    console.log(this.clearedRows);
  }
}
