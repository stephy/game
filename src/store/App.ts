import { observable, action } from "mobx";
import Game from './Game';
import dinosprite from './assets/dinosprite.png';
import Pytherodatyle from "./Pytherodatyle";
import Food from "./Food";
import steakImg from './assets/steak.png';
import game from "./Game";
import Component from "./Component";

enum ComponentOptionsType {
  dinosaur = 'dinosaur',
  steak = 'steak',
}
class App {

    
    constructor() {
    }

    @action
    startGame = () => {
     let image= document.createElement('img');
     image.src = dinosprite;
      
      const component = new Pytherodatyle({
        canvas: game.canvas,
        id: ComponentOptionsType.dinosaur,
        image,
        dx: 0,
        dy: 0,
        dWidth: 500,
        dHeight: 600,
        sx: 0,
        sy: 0,
        sWidth: 500,
        sHeight: 600,
      });
      image= document.createElement('img');
      image.src = steakImg;
      const steak = new Component({
        canvas: game.canvas,
        id: ComponentOptionsType.steak,
        image,
        dx: 0,
        dy: 0,
        dWidth: 229,
        dHeight: 216,
        sx: 0,
        sy: 0,
        sWidth: 60,
        sHeight: 55,
      });

      game.addComponent(component, true);
      game.addComponent(steak, false);
      game.start();
    }
}

const app = new App();
export default app;