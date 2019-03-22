import { observable } from "mobx";
import Game from './Game';

class App {
    @observable game: Game;
    
    constructor() {
      this.game = new Game();
    }
}

const app = new App();
export default app;