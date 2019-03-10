import { observable } from "mobx";

interface ComponentType {
  id: string;
  image: any;
  board: any;
  sx?: number; // Optional The x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
  sy?: number; // Optional The y-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
  sWidth?: number; // Optional The width of the sub-rectangle of the source image to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by sx and sy to the bottom-right corner of the image is used.
  sHeight?: number; // Optional The height of the sub-rectangle of the source image to draw into the destination context.
  dx: number; // The x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
  dy: number; // The y-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
  dWidth: number; // Optional The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
  dHeight: number; // Optional The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
}
class Component {
  id: string;
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

  constructor(props: ComponentType) {
    const { id, board, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight} = props;
    this.id = props.id;
    this.dWidth = props.dWidth;
    this.dHeight = props.dHeight;
    this.dx = props.dx;
    this.dy = props.dy; 
    this.sWidth = props.sWidth;
    this.sHeight = props.sHeight;
    this.sx = props.sx;
    this.sy = props.sy;
    this.ctx = board.context;
    this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  @action update = () => {
    this.ctx = board.context;
    this.ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
  }

  @action setDestination(dx, dy, dWidth, dHeight) {
    this.dWidth = dWidth;
    this.dHeight = dHeight;
    this.dx = dx;
    this.dy = dy; 
  }

  @action setSource(sx, sy, sWidth, sHeight) {
    this.sWidth = sWidth;
    this.sHeight =sHeight;
    this.sx = sx;
    this.sy = sy;
  }

  @action moveForward = (distance) => {
    this.dx = this.dx + distance;
  }

  @action moveBackward = (distance) => {
    this.dx = this.dx - distance;
  }

  @action moveUp = (distance) => {
    this.dy = this.dy + distance;
  }

  @action moveDown = (distance) => {
    this.dy = this.dy - distance;
  }

}
export default Component;