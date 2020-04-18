import { Sprite } from 'pixi.js';
import Planet from './Planet';

class MainView extends Sprite {
	mainPlanet: Planet;

	constructor() {
		super();
		this.anchor.set(0, 0);
		this.position.set(400, 250);

		this.initPlanets();
	}

	initPlanets() {
		this.mainPlanet = this.addChild(
			new Planet({ radius: 50, orbitVelovity: 0.001, orbitRadius: 0, maxChildOrbitRadius: 200 })
		);

		this.spawnPlanets(this.mainPlanet, 200);
	}

	spawnPlanets(planet, count) {
		console.log(count);
		for (let i = 0; i < count; i++) {
			const tmpPlanet = planet.spawnNewChildPlanet();
			this.spawnPlanets(tmpPlanet, count ** 0.5 - 1);
		}
	}

	tick(delta) {
		this.mainPlanet.tick(delta);
	}

	onResize() {}
}

export default MainView;
