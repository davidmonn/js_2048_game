'use strict';

class Game {
  score = 0;

  constructor(
    initialState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ) {
    this.initialState = initialState;
    this.state = initialState;
    this.status = 'idle';
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.state;
  }

  getStatus() {
    return this.status;
  }

  start() {
    this.status = 'playing';

    this.addRandomTile();
    this.addRandomTile();
  }

  restart() {
    this.state = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.score = 0;
    this.status = 'playing';

    this.addRandomTile();
    this.addRandomTile();
  }

  checkStatus() {
    for (let row = 0; row < this.state.length; row++) {
      for (let column = 0; column < this.state[row].length; column++) {
        if (this.state[row][column] === 2048) {
          this.status = 'win';

          return;
        }
      }
    }

    for (let row = 0; row < this.state.length; row++) {
      for (let column = 0; column < this.state[row].length; column++) {
        if (this.state[row][column] === 0) {
          return;
        }

        if (
          column < 3 &&
          this.state[row][column] === this.state[row][column + 1]
        ) {
          return;
        }

        if (
          row < 3 &&
          this.state[row][column] === this.state[row + 1][column]
        ) {
          return;
        }
      }
    }

    this.status = 'lose';
  }

  calcLeft() {
    let moved = false;

    for (let i = 0; i < this.state.length; i++) {
      const oldRow = [...this.state[i]];
      const newRow = this.moveLeft(this.state[i]);

      this.state[i] = newRow;

      if (oldRow.toString() !== newRow.toString()) {
        moved = true;
      }
    }

    return moved;
  }

  moveLeft(row) {
    const verif = row.filter((val) => {
      return val !== 0;
    });

    const arr = [];

    for (let i = 0; i < verif.length; i++) {
      if (verif[i] === verif[i + 1]) {
        const save = verif[i] + verif[i + 1];

        arr.push(save);
        this.score += save;
        i++;
      } else {
        arr.push(verif[i]);
      }
    }

    while (arr.length < 4) {
      arr.push(0);
    }

    return arr;
  }

  moveRight() {
    let moved = false;

    for (let row = 0; row < this.state.length; row++) {
      const oldRow = [...this.state[row]];

      const values = this.state[row].filter((value) => value !== 0);
      const newRow = [];

      for (let i = values.length - 1; i >= 0; i--) {
        if (values[i] === values[i - 1]) {
          const mergedValue = values[i] + values[i - 1];

          newRow.unshift(mergedValue);
          this.score += mergedValue;
          i--;
        } else {
          newRow.unshift(values[i]);
        }
      }

      while (newRow.length < 4) {
        newRow.unshift(0);
      }

      this.state[row] = newRow;

      if (oldRow.toString() !== newRow.toString()) {
        moved = true;
      }
    }

    return moved;
  }

  moveUp() {
    let moved = false;

    for (let column = 0; column < 4; column++) {
      const oldColumn = [];

      for (let row = 0; row < 4; row++) {
        oldColumn.push(this.state[row][column]);
      }

      const values = oldColumn.filter((value) => value !== 0);
      const newColumn = [];

      for (let i = 0; i < values.length; i++) {
        if (values[i] === values[i + 1]) {
          const mergedValue = values[i] + values[i + 1];

          newColumn.push(mergedValue);
          this.score += mergedValue;
          i++;
        } else {
          newColumn.push(values[i]);
        }
      }

      while (newColumn.length < 4) {
        newColumn.push(0);
      }

      for (let row = 0; row < 4; row++) {
        this.state[row][column] = newColumn[row];
      }

      if (oldColumn.toString() !== newColumn.toString()) {
        moved = true;
      }
    }

    return moved;
  }

  moveDown() {
    let moved = false;

    for (let column = 0; column < 4; column++) {
      const oldColumn = [];

      for (let row = 0; row < 4; row++) {
        oldColumn.push(this.state[row][column]);
      }

      const values = [];

      for (let row = 3; row >= 0; row--) {
        if (this.state[row][column] !== 0) {
          values.push(this.state[row][column]);
        }
      }

      const newColumn = [];

      for (let i = 0; i < values.length; i++) {
        if (values[i] === values[i + 1]) {
          const mergedValue = values[i] + values[i + 1];

          newColumn.push(mergedValue);
          this.score += mergedValue;
          i++;
        } else {
          newColumn.push(values[i]);
        }
      }

      while (newColumn.length < 4) {
        newColumn.push(0);
      }

      for (let row = 0; row < 4; row++) {
        this.state[row][column] = newColumn[3 - row];
      }

      const newColumnState = [];

      for (let row = 0; row < 4; row++) {
        newColumnState.push(this.state[row][column]);
      }

      if (oldColumn.toString() !== newColumnState.toString()) {
        moved = true;
      }
    }

    return moved;
  }

  addRandomTile() {
    const emptyCells = [];

    for (let row = 0; row < 4; row++) {
      for (let column = 0; column < 4; column++) {
        if (this.state[row][column] === 0) {
          emptyCells.push([row, column]);
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [randomRow, randomColumn] = emptyCells[randomIndex];

    this.state[randomRow][randomColumn] = Math.random() < 0.9 ? 2 : 4;
  }
}

export default Game;
