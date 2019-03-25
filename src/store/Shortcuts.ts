import app from "./App";

export const SHORTCUT_BLOCKER_CLASS = 'block-shortcut';
const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';
const s = 's';
const m = 'm';

export const GlobalShortcuts =  (bindShortcut: any) => {

  const handleEscape = (e: KeyboardEvent) => {
    if (!blockShorcut(e)) {
     console.log('e', handleEscape);
    }
  };

  const handleNumberPad = (e: KeyboardEvent, number: number) => {
    console.log(e, number);
  };

  const handleSpaceBar = (e: KeyboardEvent) => {
    if (!blockShorcut(e)) {
      e.preventDefault();
      e.stopPropagation();
      console.log('handle space bar');
    }
  };

  const handleArrowKeys = (e: KeyboardEvent, key: string) => {
    if (!blockShorcut(e)) {
      // apply number shortcuts in mixer view only
      console.log({ key });
      switch (key) {
        case RIGHT: {
          console.log('right');
          if (app.game.active !== undefined) {
            app.game.active.moveForward();
          }
          break;
        }
        case LEFT: {
          console.log('left');
          if (app.game.active) {
            app.game.active.moveBackward();
          }
          break;
        }
        case UP: {
          console.log('up');
          if (app.game.active) {
            app.game.active.moveUp();
          }
          break;
        }
        case DOWN: {
          console.log('down');
          if (app.game.active) {
            app.game.active.moveDown();
          }
          break;
        }
        default:
          break;
      }

    }
  };

  const handleS = (e: KeyboardEvent) => {
    if (!blockShorcut(e)) {
      console.log('s');
    }
  };

  const handleM = (e: KeyboardEvent) => {
    if (!blockShorcut(e)) {
      console.log('M');
    }

  };

  const blockShorcut = (e: any) => {
    if (e.target !== null) {
      return e.target.className === SHORTCUT_BLOCKER_CLASS;
    }
    
  };

  (() => {
    bindShortcut('esc', (e: KeyboardEvent) => handleEscape(e));
    bindShortcut('space', (e: KeyboardEvent) => handleSpaceBar(e));
    bindShortcut('1', (e: KeyboardEvent) => handleNumberPad(e, 1));
    bindShortcut('2', (e: KeyboardEvent) => handleNumberPad(e, 2));
    bindShortcut('3', (e: KeyboardEvent) => handleNumberPad(e, 3));
    bindShortcut('4', (e: KeyboardEvent) => handleNumberPad(e, 4));
    bindShortcut('5', (e: KeyboardEvent) => handleNumberPad(e, 5));
    bindShortcut('6', (e: KeyboardEvent) => handleNumberPad(e, 6));
    bindShortcut('7', (e: KeyboardEvent) => handleNumberPad(e, 7));
    bindShortcut('8', (e: KeyboardEvent) => handleNumberPad(e, 8));
    bindShortcut('9', (e: KeyboardEvent) => handleNumberPad(e, 9));
    bindShortcut(LEFT, (e: KeyboardEvent) => handleArrowKeys(e, LEFT));
    bindShortcut(RIGHT, (e: KeyboardEvent) => handleArrowKeys(e, RIGHT));
    bindShortcut(UP, (e: KeyboardEvent) => handleArrowKeys(e, UP));
    bindShortcut(DOWN, (e: KeyboardEvent) => handleArrowKeys(e, DOWN));
    bindShortcut(s, (e: KeyboardEvent) => handleS(e));
    bindShortcut(m, (e: KeyboardEvent) => handleM(e));
  })();
};
