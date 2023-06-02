import { EColors } from "./models/EColors";

export const DISPLAY_WIDTH = 10;
export const DISPLAY_HEIGHT = 20;
export const TETROMINO_DROP_TIME = 1000;

export const SCORE_COUNT = [100, 300, 500, 800];
export const ROWS_FOR_LEVELUP = 10;

export const TETROMINOS = [
  {
    name: 'I',
    color: EColors.BLUE,
    turns: [
      [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0}],
      [{x: 6, y: -1}, {x: 6, y: 0}, {x: 6, y: 1}, {x: 6, y: 2}],
      [{x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}, {x: 7, y: 1}],
      [{x: 5, y: -1}, {x: 5, y: 0}, {x: 5, y: 1}, {x: 5, y: 2}],
    ],
    preview: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
  },
  {
    name: 'J',
    color: EColors.CYAN,
    turns: [
      [{x: 4, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}],
      [{x: 6, y: 0}, {x: 5, y: 0}, {x: 5, y: 1}, {x: 5, y: 2}],
      [{x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}, {x: 6, y: 2}],
      [{x: 5, y: 0}, {x: 5, y: 1}, {x: 5, y: 2}, {x: 4, y: 2}],
    ],
    preview: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ]
  },
  {
    name: 'L',
    color: EColors.GREEN,
    turns: [
      [{x: 6, y: 0}, {x: 6, y: 1}, {x: 5, y: 1}, {x: 4, y: 1}],
      [{x: 5, y: 0}, {x: 5, y: 1}, {x: 5, y: 2}, {x: 6, y: 2}],
      [{x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}, {x: 4, y: 2}],
      [{x: 4, y: 0}, {x: 5, y: 0}, {x: 5, y: 1}, {x: 5, y: 2}],
    ],
    preview: [
      [0, 0, 0],
      [0, 0, 1],
      [1, 1, 1],
    ]
  },
  {
    name: 'O',
    color: EColors.ORANGE,
    turns: [
      [{x: 5, y: 0}, {x: 6, y: 0}, {x: 6, y: 1}, {x: 5, y: 1}],
      [{x: 6, y: 0}, {x: 6, y: 1}, {x: 5, y: 1}, {x: 5, y: 0}],
      [{x: 6, y: 1}, {x: 5, y: 1}, {x: 5, y: 0}, {x: 6, y: 0}],
      [{x: 5, y: 1}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 6, y: 1}],
    ],
    preview: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
  },
  {
    name: 'S',
    color: EColors.RED,
    turns: [
      [{x: 6, y: 0}, {x: 5, y: 0}, {x: 5, y: 1}, {x: 4, y: 1}],
      [{x: 4, y: -1}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 5, y: 1}],
      [{x: 6, y: -1}, {x: 5, y: -1}, {x: 5, y: 0}, {x: 4, y: 0}],
      [{x: 5, y: -1}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 6, y: 1}],
    ],
    preview: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ]
  },
  {
    name: 'T',
    color: EColors.YELLOW,
    turns: [
      [{x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}, {x: 5, y: 0}],
      [{x: 5, y: 0}, {x: 5, y: 1}, {x: 5, y: 2}, {x: 6, y: 1}],
      [{x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}, {x: 5, y: 2}],
      [{x: 5, y: 0}, {x: 5, y: 1}, {x: 5, y: 2}, {x: 4, y: 1}],
    ],
    preview: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ]
  },
  {
    name: 'Z',
    color: EColors.PURPLE,
    turns: [
      [{x: 4, y: 0}, {x: 5, y: 0}, {x: 5, y: 1}, {x: 6, y: 1}],
      [{x: 5, y: -1}, {x: 5, y: 0}, {x: 4, y: 0}, {x: 4, y: 1}],
      [{x: 4, y: -1}, {x: 5, y: -1}, {x: 5, y: 0}, {x: 6, y: 0}],
      [{x: 6, y: -1}, {x: 6, y: 0}, {x: 5, y: 0}, {x: 5, y: 1}],
    ],
    preview: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ]
  }
]
