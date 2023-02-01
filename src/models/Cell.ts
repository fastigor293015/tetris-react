import { EColors } from "./EColors";

export class Cell {
  readonly x: number;
  readonly y: number;
  color: EColors;
  id: string;

  constructor(x: number, y: number, color: EColors) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.id = Math.random().toString(36).substring(2, 15);
  }
}
