import { action, observable, computed, autorun } from "mobx";
import Component from "./Component";

export const GAMEBOARD_SELECTOR = 'gameboard';
class Game {
    @observable canvas: HTMLCanvasElement;
    @observable context?: any;
    @observable components: any;
    @observable updateStamp: any;
    @observable active:  Component | undefined;
    @observable frame: number;

    constructor() {
      this.canvas =  document.createElement("canvas");
      this.context = undefined;
      this.components =  {};
      this.updateStamp = undefined;
      this.frame = 0;
    }

    @action setActiveComponent = (componentId: string) => {
      if (this.components[componentId]) {
        this.active = this.components[componentId];
        return this.active;
      }
      return null;
    }

    @action update = () => {
      this.updateStamp = (new Date()).getTime();
      this.updateGame();
    }

    @action addComponent = (component: Component, active: boolean) => {
      this.components[component.id] = component;
      if (active) {
        this.setActiveComponent(component.id);
      }
      this.update();
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
      this.frame = 0;
      requestAnimationFrame(this.updateGame);
    }

    @action updateGame = () => {
      this.clear();
      Object.keys(this.components).forEach(key => {
        this.components[key].update();
      });
      this.frame = this.frame + 1;
      requestAnimationFrame(this.updateGame);
    }
}
const game = new Game();
export default game;