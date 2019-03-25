import Component, { ComponentType } from "./Component";
import { action, observable } from "mobx";

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
        this.sHeight = 600;
        this.sWidth = 500;
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
}

export default Pytherodatyle;