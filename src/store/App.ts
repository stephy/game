import { observable, action } from "mobx";
import Game from './Game';
import Component from "./Component";
import dinosprite from './assets/dinosprite.png';
import Pytherodatyle from "./Pytherodatyle";

enum ComponentOptionsType {
  dinosaur = 'dinosaur',
}
class App {
    @observable game: Game;
    
    constructor() {
      this.game = new Game();
    }

    @action
    animate = () => {
      requestAnimationFrame(this.animate);
       console.log('animate');
       const dinosaur: Component = app.game.components[ComponentOptionsType.dinosaur];
       app.game.updateGame();
       dinosaur.moveForward();
       
    }

    @action
    startGame = () => {
     const image= document.createElement('img');
     image.src = dinosprite;
      this.game.start();
      const component = new Pytherodatyle({
        canvas: this.game.canvas,
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
      this.game.addComponent(component, true);
    }
}

const app = new App();
export default app;