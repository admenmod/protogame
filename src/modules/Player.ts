import { Vector2 } from '@ver/Vector2';
import { EventDispatcher } from '@ver/events';


export class Player extends EventDispatcher {
	public position = new Vector2();


	public draw(ctx: CanvasRenderingContext2D, pos = this.position.buf()): void {
		ctx.save();
		ctx.fillStyle = '#827ee2';
		ctx.fillRect(pos.x, pos.y, 50, 50);
		ctx.restore();
	}
}
