import { Vector2 } from '@ver/Vector2';
import { EventDispatcher } from '@ver/events';


export class Player extends EventDispatcher {
	public position = new Vector2();

	protected _rotation: number = 0;
	public get rotation() { return this._rotation; }
	public set rotation(v) { this._rotation = v; }


	public draw(ctx: CanvasRenderingContext2D, pos = this.position.buf(), rot = this.rotation): void {
		ctx.save();

		if(rot !== 0) {
			ctx.translate(pos.x, pos.y);
			ctx.rotate(rot);
			ctx.translate(-pos.x, -pos.y);
		}

		const size = 50;
		const drawpos = pos.buf().sub(size/2);
		ctx.fillStyle = '#827ee2';
		ctx.fillRect(drawpos.x, drawpos.y, size, size);
		ctx.restore();
	}
}
