import { Sprite, Graphics, Texture } from 'pixi.js';

interface PlanetOptons {
	orbitRadius: number | undefined;
	orbitVelovity: number | undefined;
	radius: number | undefined;
	maxChildOrbitRadius: number;
}

class Planet extends Sprite {
	private graphics: Graphics;

	public orbitVelovity: number;
	public orbitRadius: number;
	public radius: number;
	public maxChildOrbitRadius: number;

	public childPlanet: Planet[];

	constructor(options?: PlanetOptons) {
		super();

		// TODO: correct way to set deafult value
		this.orbitRadius = options.orbitRadius; // unit
		this.orbitVelovity = options.orbitVelovity; // radians/ms
		this.radius = options.radius;
		this.maxChildOrbitRadius = options.maxChildOrbitRadius;

		this.texture = Texture.WHITE;
		this.tint = Planet.randColor();

		this.childPlanet = [];

		this.anchor.set(0.5);
		this.alpha = 0.99;
	}

	spawnNewChildPlanet(): Planet {
		const radius = (this.radius - 10) * Math.random();

		const orbitRadius = this.radius + radius + (this.maxChildOrbitRadius - this.radius - radius);
		const orbitVelovity = this.orbitVelovity * Math.random();
		const maxChildOrbitRadius = this.orbitRadius - radius;

		const planet = this.addChildPlanet(new Planet({ radius, orbitVelovity, orbitRadius, maxChildOrbitRadius }));

		planet.alpha = Math.max(0.1, this.alpha - 0.5 * Math.random());
		return planet;
	}

	addChildPlanet(planet: Planet): Planet {
		const container = new Sprite();

		planet.position.x = planet.orbitRadius;

		this.childPlanet.push(planet);

		container.addChild(planet);
		this.addChild(container);

		return planet;
	}

	static randColor(): number {
		return ~~(0xffffff * Math.random());
	}

	tick(delta: number) {
		for (let i = 0; i < this.childPlanet.length; i++) {
			this.childPlanet[i].parent.rotation += this.childPlanet[i].orbitVelovity * delta;
			this.childPlanet[i].tick(delta);
		}
	}
}

export default Planet;
