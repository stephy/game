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
    }

    @action
    loop = () => {
      const now = (new Date()).getTime();
      const elapsed = now - this.time;
      if (elapsed > 120) {
        this.time = now;
        this.loopIndex = this.loopIndex + 1;
        const index = this.loopIndex;
        if (this.loopIndex > 4) {
          this.loopIndex = 0;
        }
        this.redraw(index*500, 0, 500, 600, 0, 0, 500, 600);
      }
      requestAnimationFrame(this.loop);
    }

    @action
    fly = () => {
      requestAnimationFrame(this.loop);
    }
}

export default Pytherodatyle;