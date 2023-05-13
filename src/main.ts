import { Vector2 } from '@ver/Vector2';
import { CanvasLayer, LayersList } from '@ver/CanvasLayer';

import { Player } from '@/modules/Player';


const canvas = new CanvasLayer({ layers: 'main' });
document.body.append(canvas);
//@ts-ignore
canvas.ondblclick = () => canvas.webkitRequestFullscreen();


export const layers: LayersList = {};

for(let id in canvas.layers) {
	layers[id] = canvas.layers[id].getContext('2d')!;
}


(async () => {
	const player = new Player();
	player.position.set(canvas.size.buf().div(2));


	function _update() {
		player.rotation += 0.01;

		layers.main.clearRect(0, 0, canvas.width, canvas.height);
		player.draw(layers.main);

		requestAnimationFrame(_update);
	}

	_update();
})();
