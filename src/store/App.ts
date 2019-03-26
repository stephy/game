import { action } from "mobx";
import chickenImg from './assets/chicken.png';
import icecreamImg from './assets/icecream.png';
import pizzaImg from './assets/pizza.png';
import dinosprite from './assets/dinosprite.png';
import Pytherodatyle from "./Pytherodatyle";
import steakImg from './assets/steak.png';
import game from "./Game";
import Component from "./Component";

enum ComponentOptionsType {
  dinosaur = 'dinosaur',
  steak = 'steak',
  chicken = 'chicken',
  pizza = 'pizza',
  icecream = 'icecream',
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
        sx: 500,
        sy: 0,
        sWidth: 60,
        sHeight: 55,
        pointsWorth: 50,
      });

      image= document.createElement('img');
      image.src = chickenImg;
      const chicken = new Component({
        canvas: game.canvas,
        id: ComponentOptionsType.chicken,
        image,
        dx: 0,
        dy: 0,
        dWidth: 229,
        dHeight: 216,
        sx: 700,
        sy: 100,
        sWidth: 60,
        sHeight: 55,
        pointsWorth: 30,
      });

      image= document.createElement('img');
      image.src = pizzaImg;
      const pizza = new Component({
        canvas: game.canvas,
        id: ComponentOptionsType.pizza,
        image,
        dx: 0,
        dy: 0,
        dWidth: 229,
        dHeight: 216,
        sx: 900,
        sy: 200,
        sWidth: 60,
        sHeight: 55,
        pointsWorth: 40,
      });

      image= document.createElement('img');
      image.src = icecreamImg;
      const icecream = new Component({
        canvas: game.canvas,
        id: ComponentOptionsType.icecream,
        image,
        dx: 0,
        dy: 0,
        dWidth: 229,
        dHeight: 216,
        sx: 1000,
        sy: 40,
        sWidth: 60,
        sHeight: 55,
        pointsWorth: 10,
      });
      game.addComponent(chicken, false);
      game.addComponent(steak, false);
      game.addComponent(pizza, false);
      game.addComponent(icecream, false);
      game.addComponent(component, true);

      game.start();
      game.components[ComponentOptionsType.steak].autoScrollX(1);
      game.components[ComponentOptionsType.chicken].autoScrollX(1);
      game.components[ComponentOptionsType.pizza].autoScrollX(1);
      game.components[ComponentOptionsType.icecream].autoScrollX(1);
      game.setFoodItem([
        ComponentOptionsType.chicken,
        ComponentOptionsType.steak,
        ComponentOptionsType.pizza,
        ComponentOptionsType.icecream,
      ]);
    }
}

const app = new App();
export default app;