import * as PIXI from 'pixi.js';
import bind from 'bind-decorator';
import MainView from './MainView';

class Init extends PIXI.Application {
	mainView: MainView;

	// TODO: remove any
	constructor(...args: any[]) {
		super(...args);

		document.body.appendChild(this.view);
		this.initResize();
		this.initTick();

		this.mainView = this.stage.addChild(new MainView());
	}

	initResize(): void {
		window.addEventListener('resize', this.onResize);
	}

	initTick(): void {
		let timestamp = Date.now();
		this.ticker.add(() => {
			this.tick(Date.now() - timestamp);
			timestamp = Date.now();
		});
	}

	tick(delta: number): void {
		this.mainView.tick(delta);
	}

	@bind
	onResize(): void {
		console.log(this);
	}
}

export default Init;
