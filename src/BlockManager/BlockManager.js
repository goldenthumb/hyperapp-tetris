import EventEmitter from 'event-emitter';
import _ from 'lodash';

import Block from '../Block';
import Data from '../Data';

import { isEmpty, circulateTwoDArray, isConflictTwoDArray, cloneTwoDArray } from '../utils';

export default class BlockManager {
  constructor({ rows, cols, startPoint }, blocks) {
    this._startPoint = startPoint;
    this._displaySize = { rows, cols };
    this._blocks = blocks;
    this._emitter = new EventEmitter();
    this._block = null;
    this._nextBlock = null;
    this._position = null;
    this._nextPosition = null;
    this._current = new Data(this._displaySize).initialize();
    this._total = new Data(this._displaySize).initialize();
    this._display = new Data(this._displaySize).initialize();

    this.change();
  }

  on(eventName, listener) {
    this._emitter.on(eventName, listener);
  }

  change() {
    this._block = this._nextBlock || new Block(this._blocks);
    this._position = this._startPoint;
    this._nextPosition = this._startPoint;
    this._nextBlock = new Block(this._blocks);

    return this;
  }

  rotate() {
    this._block.rotate();
    this._nextPosition = this._position;

    if (!this._isAvailable()) {
      this._block.rotate(false);
      return;
    }

    this._setDisplay();
  }

  moveDown() {
    const { x, y } = this._position;
    this._nextPosition = { x: x, y: y + 1 };

    if (!this._isAvailable()) return;

    this._setDisplay();
  }

  moveLeft() {
    const { x, y } = this._position;
    this._nextPosition = { x: x - 1, y: y };

    if (!this._isAvailable()) return;

    this._setDisplay();
  }

  moveRight() {
    const { x, y } = this._position;
    this._nextPosition = { x: x + 1, y: y };

    if (!this._isAvailable()) return;

    this._setDisplay();
  }

  getState() {
    return {
      display: this._display,
      nextBlock: this._nextBlock.colorize()
    }
  }

  _isAvailable() {
    if (this._isEdge()) return false;

    if (this._isOnTheBottom() || this._isConflict()) {
      if (this._position.y < 0) {
        this._emitter.emit('end');
        return false;
      }

      circulateTwoDArray(this._block.colorize(), (y, x, block) => {
        const blockY = this._position.y + y;
        const blockX = this._position.x + x;

        if (!isEmpty(block[y][x])) {
          this._total[blockY][blockX] = block[y][x];
        }
      });

      this._clearLine();
      this.change().moveDown();
    }

    return true;
  }

  _clearLine() {
    let clearLine = 0;

    this._total.forEach((row, i) => {
      if (_.every(row)) {
        clearLine++;
        const line = _.fill(row, 0);
        this._total.splice(i, 1);
        this._total.unshift(line);
      }
    });

    if (clearLine) {
      this._emitter.emit('clear', clearLine);
    }
  }

  _setDisplay() {
    this._position = this._nextPosition;

    circulateTwoDArray(this._block.colorize(), (y, x, block) => {
      if (!isEmpty(block[y][x])) {
        this._current[this._position.y + y][this._position.x + x] = block[y][x];
      }
    });

    this._display = this._merge(cloneTwoDArray(this._total), this._current);
    this._current = new Data(this._displaySize).initialize();
    this._emitter.emit('render', this.getState());
  }

  _isEdge() {
    return (
      this._nextPosition.x < 0 ||
      (this._block.height + this._nextPosition.y) > this._total.rows + 1 ||
      (this._block.width + this._nextPosition.x) > this._total.cols
    );
  }

  _isOnTheBottom() {
    return (this._nextPosition.y + this._block.height) > this._total.rows;
  }

  _isConflict() {
    const current = new Data(this._displaySize).initialize();

    circulateTwoDArray(this._block.colorize(), (y, x, block) => {
      if (!isEmpty(block[y][x])) {
        current[this._nextPosition.y + y][this._nextPosition.x + x] = block[y][x];
      }
    });

    return isConflictTwoDArray(this._total, current);
  }

  _merge(total, append) {
    circulateTwoDArray(total, (y, x) => {
      if (!isEmpty(append[y][x])) total[y][x] = append[y][x];
    });

    return total;
  }
}