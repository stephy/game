import { observable, action, computed, autorun } from "mobx";
import game from "./Game";

export interface ComponentType {
  id: string;
  image: HTMLImageElement;
  pointsWorth?: number;
  canvas: any;
  sx: number; // Optional The x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
  sy: number; // Optional The y-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
  sWidth: number; // Optional The width of the sub-rectangle of the source image to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by sx and sy to the bottom-right corner of the image is used.
  sHeight: number; // Optional The height of the sub-rectangle of the source image to draw into the destination context.
  dx: number; // The x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
  dy: number; // The y-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
  dWidth: number; // Optional The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
  dHeight: number; // Optional The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
}
class Component {
  id: string;
  @observable speedX: number;
  @observable speedY: number;
  @observable gravity: number;
  @observable gravitySpeed: number;
  @observable x: number;
  @observable y: number;
  @observable dWidth: number;
  @observable dHeight: number;
  @observable dx: number;
  @observable dy: number;
  @observable sWidth: number;
  @observable sHeight: number;
  @observable sx: number;
  @observable sy: number;
  @observable ctx: any;
  @observable image: any;
  @observable canvas: HTMLCanvasElement;
  @observable requestAnimationId: any;
  @observable eating: boolean;
  @observable pointsWorth?: number;

  constructor(props: ComponentType) {
    const { id, canvas, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, pointsWorth} = props;
    this.id = id;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.x = 0;
    this.y = 0;
    this.dWidth = dWidth;
    this.dHeight = dHeight;
    this.dx = dx;
    this.dy = dy;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.sx = sx;
    this.sy = sy;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.image = image;
    this.requestAnimationId = undefined;
    this.eating = false;
    this.pointsWorth = pointsWorth;
    this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  @action setImage = (image: any) => {
    this.image = image;
  }

  @action accelerate = (gravity: number) => {
    this.gravity = gravity;
  }

  @action newPos = () => {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.dx = this.x;
    this.dy = this.y;
  }

  @action hitBottom = () => {
    var rockbottom = this.canvas.height - this.dHeight;
    if (this.y > rockbottom) {
        this.y = rockbottom;
        this.gravitySpeed = 0;
    }
  }

  @action clear = () => {
    if (this.requestAnimationId) {
      cancelAnimationFrame(this.requestAnimationId);
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  @action update = () => {
    this.ctx.drawImage(this.image, this.dx, this.dy, this.dWidth, this.dHeight, this.sx, this.sy, this.sWidth, this.sHeight);
  }

  @action setDestination(dx: number, dy:number, dWidth:number, dHeight:number) {
    this.dWidth = dWidth;
    this.dHeight = dHeight;
    this.dx = dx;
    this.dy = dy;
  }

  @action setSource(sx:number, sy:number, sWidth:number, sHeight:number) {
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.sx = sx;
    this.sy = sy;
    this.update();
  }

  @action moveBackward = (value?: number) => {
    //this.accelerate(-0.2);
    // this.speedX += 1;
    // this.newPos();
    if (value) {
      this.sx = this.sx - value;
    } else {
      this.sx = this.sx - 30;
    }
    this.update();
  }

  @action moveForward = (value?: number) => {
    if (value) {
      this.sx = this.sx + value;
    } else {
      this.sx = this.sx + 30;
    }

    //this.accelerate(-0.2);
    // this.speedX -= 1;
    // this.newPos();
    //this.dx = this.dx + 1;
    this.update();
  }

  @action moveUp = () => {
    //this.accelerate(+0.5);
    // this.speedY += 1;
    // this.newPos();
    this.dy = this.dy + 30;
    this.update();
  }

  @action moveDown = () => {
    //this.accelerate(+0.5);
    // this.speedY -= 1; 
    // this.newPos();
    this.dy = this.dy - 30;
    this.update();
  }

  eat = () => {}
  continue = () => {}
  autoScrollX = (value: number) => {
    this.moveBackward(game.frame * 0.005);
    this.requestAnimationId = requestAnimationFrame(this.autoScrollX);
  }

}
export default Component;