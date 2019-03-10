import { action, observable, computed } from "mobx";
import Component from "./Component";

class Game {
    @observable canvas: HTMLCanvasElement;
    @observable context: any;
    @observable components: {};
    @observable updateStamp: any;

    constructor() {
      this.canvas =  document.createElement("canvas");
      this.context = null;
      this.components = [];
      this.updateStamp = new Date();
    }

    @action update = () => {
      this.updateStamp = new Date();
    }

    @action addComponent = (component: Component) => {
      this.components[component.id] = component;
      this.update();
    }

    @action removeComponent = (component: Component) => {
      if (this.components[component.id]) {
        delete this.components[component.id];
        this.update();
      };
    }

    @action clear = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    @action start = () => {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    @action updateGame = () => {
      this.clear();
      Object.keys(this.components).forEach(key => {
        this.components[key].update();
      });
    }
}

export default Game;