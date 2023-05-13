import { Event, Notification, EventDispatcher } from './events';


export class Scene extends EventDispatcher {
	public '@init' = new Event<Scene, []>(this);
	public '@destroy' = new Event<Scene, []>(this);
	public '@destroyed' = new Event<Scene, []>(this);

	public '@notification' = new Notification(Scene, '_notification', this);

	protected static _notification(this: Scene, what: number): void {
		what;
	}

	private _isInited: boolean = false;
	private _isDestroyed: boolean = false;

	public get isInited(): boolean { return this._isInited; }
	public get isDestroyed(): boolean { return this._isDestroyed; }

	public get isLoaded(): boolean { return (this.constructor as typeof Scene).isLoaded; }
	public get isUnloaded(): boolean { return (this.constructor as typeof Scene).isUnloaded; }

	/** @virtual */
	protected async _init(): Promise<void> {}
	/** @virtual */
	protected async _destroy(): Promise<void> {}


	public async init(): Promise<void> {
		if(this._isInited || !this.isLoaded) return;

		await this._init();
		this['@init'].emit();

		this._isInited = true;
		this._isDestroyed = false;
	}

	public async destroy(): Promise<void> {
		if(!this._isInited || this._isDestroyed) return;

		this['@destroy'].emit();
		await this._destroy();

		this.events_off(true);

		this._isDestroyed = true;
		this._isInited = false;

		this['@destroyed'].emit();
	}

	private static _isLoaded: boolean;
	private static _isUnloaded: boolean;

	public static get isLoaded(): boolean {
		return Object.prototype.hasOwnProperty.call(this, '_isLoaded') ? this._isLoaded : this._isLoaded = false;
	}
	public static get isUnloaded(): boolean {
		return Object.prototype.hasOwnProperty.call(this, '_isUnloaded') ? this._isUnloaded : this._isUnloaded = false;
	}

	/** @virtual */
	protected static async _load(scene: typeof this): Promise<void> {}
	/** @virtual */
	protected static async _unload(scene: typeof this): Promise<void> {}


	public static '@load' = new Event<typeof this, [typeof this]>(this);
	public static '@unload' = new Event<typeof this, [typeof this]>(this);

	public static async load(): Promise<void> {
		if(this.isLoaded) return;

		await this._load(this);
		this.emit('load', this);

		this._isLoaded = true;
		this._isUnloaded = false;
	}

	public static async unload(): Promise<void> {
		if(!this.isLoaded) return;

		this.emit('unload', this);
		await this._unload(this);

		this.events_off(true);

		this._isUnloaded = true;
		this._isLoaded = false;
	}
}
