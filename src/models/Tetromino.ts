import { Cell } from "./Cell";
import { Display } from "./Display";
import { EColors } from "./EColors";

export class Tetromino {
  display: Display;
  name: string;
  tetrominoCells: Cell[];
  color: EColors;
  turnsArr: Array<Array<{x: number, y: number}>>;
  turnsCount: number;
  landed: boolean;

  constructor(display: Display, name: string, color: EColors, turnsArr: Array<Array<{x: number, y: number}>>) {
    this.display = display;
    this.name = name;
    this.color = color;
    this.turnsArr = turnsArr;
    this.tetrominoCells = turnsArr[0]
      .map(cell => this.display.getCell(cell.x, cell.y))
      .map((cell, index) => {
        if (index === 0 && this.name === 'O') {
          cell.color = EColors.YELLOW;
        } else {
          cell.color = this.color;
        }
        return cell;
      });
    this.turnsCount = 0;
    this.landed = false;
    console.log('Лог из конструктора:');
    console.log(this.turnsArr);
  }

  turn() {
    if (this.landed) return;
    this.turnsCount < 3 ? this.turnsCount++ : this.turnsCount = 0;
    this.tetrominoCells = this.tetrominoCells.map(cell => { cell.color = EColors.BLACK; return cell; })
    const newCellsArr = this.turnsArr[this.turnsCount];
    console.log('До:');
    console.log(newCellsArr);
    while (newCellsArr.findIndex(item => item.x < 0) >= 0) {
      for (let i = 0; i < this.turnsArr.length; i++) {
        const row = this.turnsArr[i];
        for (let j = 0; j < row.length; j++) {
          row[j].x++;
        }
      }
    }
    while (newCellsArr.findIndex(item => item.x >= this.display.cells[0].length) >= 0) {
      for (let i = 0; i < this.turnsArr.length; i++) {
        const row = this.turnsArr[i];
        for (let j = 0; j < row.length; j++) {
          row[j].x--;
        }
      }
    }
    while (newCellsArr.findIndex(item => item.y < 0) >= 0) {
      for (let i = 0; i < this.turnsArr.length; i++) {
        const row = this.turnsArr[i];
        for (let j = 0; j < row.length; j++) {
          row[j].y++;
        }
      }
    }
    while (newCellsArr.findIndex(item => item.y >= this.display.cells.length) >= 0) {
      for (let i = 0; i < this.turnsArr.length; i++) {
        const row = this.turnsArr[i];
        for (let j = 0; j < row.length; j++) {
          row[j].y--;
        }
      }
    }
    console.log('После:');
    console.log(newCellsArr);
    this.tetrominoCells = newCellsArr
      .map(cell => this.display.getCell(cell.x, cell.y))
      .map((cell, index) => {
        if (index === 0 && this.name === 'O') {
          cell.color = EColors.YELLOW;
        } else {
          cell.color = this.color;
        } return cell;
      });
  }

  canMoveDown() {
    let canMove = true;
    this.tetrominoCells = this.tetrominoCells.sort((a, b) => b.y - a.y).sort((a, b) => b.x - a.x)
    // console.log(this.tetrominoCells);

    for (let i = 0; i < this.tetrominoCells.length; i++) {
      const cell = this.tetrominoCells[i];
      if (cell.y + 1 >= this.display.cells.length) {
        canMove = false;
        break;
      }
      const nextCell = this.display.getCell(cell.x, cell.y + 1);
      if (cell.x === this.tetrominoCells[i - 1]?.x) {
        continue;
      } else {
        canMove = canMove && (nextCell.color === EColors.BLACK);
      }
    }
    this.landed = !canMove;
    if (this.landed) {
      this.display.checkRows();
    }

    // console.log('Проверяем...')
    // console.log(this.landed)
  }

  moveDown() {
    this.canMoveDown();
    if (this.landed) {
      return;
    }
    const newTetrominoCells: typeof this.tetrominoCells = [];

    for (let i = 0; i < this.tetrominoCells.length; i++) {
      const nextCell = this.display.getCell(this.tetrominoCells[i].x, this.tetrominoCells[i].y + 1);
      const curCell = this.display.getCell(this.tetrominoCells[i].x, this.tetrominoCells[i].y);
      const color = curCell.color;
      curCell.color = nextCell.color;
      nextCell.color = color;
      newTetrominoCells.push(nextCell);
    }

    for (let i = 0; i < this.turnsArr.length; i++) {
      const row = this.turnsArr[i];
      for (let j = 0; j < row.length; j++) {
        row[j].y += 1;
      }
    }
    // this.turnsArr = this.turnsArr.map(turn => {turn = turn.map(cell => {cell.y++; return cell; }); return turn;});
    this.tetrominoCells = newTetrominoCells;
    console.log('Обновляем массив поворотов:')
    console.log(this.turnsArr);
  }

  canMoveLeft(): boolean {
    let canMove = true;
    this.tetrominoCells = this.tetrominoCells.sort((a, b) => a.x - b.x).sort((a, b) => b.y - a.y);

    for (let i = 0; i < this.tetrominoCells.length; i++) {
      const cell = this.tetrominoCells[i];
      if (cell.x - 1 < 0) {
        canMove = false;
        break;
      }
      const nextCell = this.display.getCell(cell.x - 1, cell.y);
      if (cell.y === this.tetrominoCells[i - 1]?.y) {
        continue;
      } else {
        canMove = canMove && (nextCell.color === EColors.BLACK);
      }
    }

    return canMove;
  }

  moveLeft() {
    if (this.landed) {
      return;
    }
    const canMove = this.canMoveLeft();
    if (!canMove) {
      return;
    }

    const newTetrominoCells = [];

    for (let i = 0; i < this.tetrominoCells.length; i++) {
      const nextCell = this.display.getCell(this.tetrominoCells[i].x - 1, this.tetrominoCells[i].y);
      const curCell = this.display.getCell(this.tetrominoCells[i].x, this.tetrominoCells[i].y);
      const color = curCell.color;
      curCell.color = nextCell.color;
      nextCell.color = color;
      newTetrominoCells.push(nextCell);
    }
    for (let i = 0; i < this.turnsArr.length; i++) {
      const row = this.turnsArr[i];
      for (let j = 0; j < row.length; j++) {
        row[j].x -= 1;
      }
    }
    // this.turnsArr.map(turn => turn.map(cell => cell.x--));
    this.tetrominoCells = newTetrominoCells;
  }

  canMoveRight(): boolean {
    let canMove = true;
    this.tetrominoCells = this.tetrominoCells.sort((a, b) => b.x - a.x).sort((a, b) => b.y - a.y);

    for (let i = 0; i < this.tetrominoCells.length; i++) {
      const cell = this.tetrominoCells[i];
      if (cell.x + 1 >= this.display.cells[0].length) {
        canMove = false;
        break;
      }
      const nextCell = this.display.getCell(cell.x + 1, cell.y);
      if (cell.y === this.tetrominoCells[i - 1]?.y) {
        continue;
      } else {
        canMove = canMove && (nextCell.color === EColors.BLACK);
      }
    }

    return canMove;
  }

  moveRight() {
    if (this.landed) {
      return;
    }
    const canMove = this.canMoveRight();
    if (!canMove) {
      return;
    }

    const newTetrominoCells = [];

    for (let i = 0; i < this.tetrominoCells.length; i++) {
      const nextCell = this.display.getCell(this.tetrominoCells[i].x + 1, this.tetrominoCells[i].y);
      const curCell = this.display.getCell(this.tetrominoCells[i].x, this.tetrominoCells[i].y);
      const color = curCell.color;
      curCell.color = nextCell.color;
      nextCell.color = color;
      newTetrominoCells.push(nextCell);
    }
    for (let i = 0; i < this.turnsArr.length; i++) {
      const row = this.turnsArr[i];
      for (let j = 0; j < row.length; j++) {
        row[j].x += 1;
      }
    }
    // this.turnsArr.map(turn => turn.map(cell => cell.x++));
    this.tetrominoCells = newTetrominoCells;
  }
}
