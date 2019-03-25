import { action, observable, computed, autorun } from "mobx";
import Component from "./Component";

export const GAMEBOARD_SELECTOR = 'gameboard';
class Game {
    @observable canvas: HTMLCanvasElement;
    @observable context?: any;
    @observable components: any;
    @observable updateStamp: any;

    constructor() {
      this.canvas =  document.createElement("canvas");
      this.context = undefined;
      this.components =  {};
      this.updateStamp = new Date();
      autorun(() => {
        if (this.updateStamp > 0) {
          this.updateGame();
        }
      })
    }

    @action update = () => {
      this.updateStamp = new Date();
    }

    @action addComponent = (component: Component) => {
      this.components[component.id] = component;
    }

    @action removeComponent = (component: Component) => {
      if (this.components[component.id]) {
        delete this.components[component.id];
        this.update();
      };
    }

    @action clear = () => {
      if (this.canvas && this.context) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  
    @action start = () => {
      this.canvas.width = 1000;
      this.canvas.height = 1000;
      this.context = this.canvas.getContext("2d");
      const gameboard = document.getElementById(GAMEBOARD_SELECTOR);
      if(gameboard) {
        gameboard.insertBefore(this.canvas, gameboard.childNodes[0]);
      }
    }

    @action updateGame = () => {
      this.clear();
      Object.keys(this.components).forEach(key => {
        this.components[key].update();
      });
    }
}

export default Game;