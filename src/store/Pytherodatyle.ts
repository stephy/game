import Component, { ComponentType } from "./Component";
import { action, observable } from "mobx";
import dinospriteopen from './assets/dinospriteopen.png';
import dinosprite from './assets/dinosprite.png';

class Pytherodatyle extends Component {
  @observable loopIndex: number;
  @observable time: any;
    constructor(props: ComponentType) {
        super(props);
        this.fly();
        this.loopIndex = 0;
        this.time = (new Date()).getTime();
        this.dHeight = 600;
        this.dWidth = 500;
        this.sHeight = 300;
        this.sWidth = 250;
    }

    @action
    loop = () => {
      const now = (new Date()).getTime();
      const elapsed = now - this.time;
      this.update();
      if (elapsed > 120) {
        this.time = now;
        this.loopIndex = this.loopIndex + 1;
        const index = this.loopIndex;
        if (this.loopIndex > 4) {
          this.loopIndex = 0;
        }
        this.dx = index*500;
      }
      requestAnimationFrame(this.loop);
    }

    @action
    fly = () => {
      requestAnimationFrame(this.loop);
    }

    @action
    eat = () => {
      const image= document.createElement('img');
      image.src = dinospriteopen;
      this.image = image;
    }

    @action
    continue = () => {
      const image= document.createElement('img');
      image.src = dinosprite;
      this.image = image;
    }
}

export default Pytherodatyle;