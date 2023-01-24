import { Application, Assets } from "pixi.js";
import { IScene } from "./Interfaces";
import { manifest } from "./manifest/index";

console.log(manifest)

export class Game {
    private constructor() { /*Static Class*/ }

    private static app: Application;
    private static currentScene: IScene;

    private static _width: number;
    private static _height: number;

    // Read-only getters
    public static get width(): number {
        return Game._width;
    }
    public static get height(): number {
        return Game._height;
    }

    private static initializeAssetsPromise: Promise<unknown>; 

    // Use this function ONCE to start the entire machinery
    public static initialize(width: number, height: number, background: number): void {

        Game.initializeAssetsPromise = Assets.init({ manifest: manifest });
        const bundleNames = manifest.bundles.map(b => b.name);
        Game.initializeAssetsPromise.then(() => {
            Assets.backgroundLoadBundle(bundleNames)
        });

        Game._width = width;
        Game._height = height;

        Game.app = new Application({
            view: document.querySelector("#pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        // Add the ticker
        Game.app.ticker.add(Game.update)

        window.addEventListener("resize", Game.resize)
        Game.resize()
    }

    public static async changeScene(newScene: IScene): Promise<void> {
        // Wait for Assets to Initialize
        await Game.initializeAssetsPromise;

        // Remove and destroy old scene... if we had one..
        if (Game.currentScene) {
            Game.app.stage.removeChild(Game.currentScene);
            Game.currentScene.destroy();
        }

        // Start Downloading Assets
        await Assets.loadBundle(newScene.assetBundles);

        // TODO: Show Loading

        // When assets are ready, tell the scene
        newScene.constructorWithAssets();

        Game.currentScene = newScene;
        Game.app.stage.addChild(Game.currentScene);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    // and to run its update function.
    private static update(framesPassed: number): void {
        if (Game.currentScene) {
            Game.currentScene.update(framesPassed);
        }
    }

    public static resize(): void {
        const screenWidth = Math.max(
            document.documentElement.clientWidth, window.innerWidth || 0
        )
        const screenHeight = Math.max(
            document.documentElement.clientHeight, window.innerHeight || 0
        )
        const scale = Math.min(screenWidth / Game.width, screenHeight / Game.height)
        const enlargedWidth = Math.floor(scale * Game.width)
        const enlargedHeight = Math.floor(scale * Game.height)
        const horizontalMargin = (screenWidth - enlargedWidth) / 2
        const verticalMargin = (screenHeight - enlargedHeight) / 2
        
        const style = (Game.app.view as HTMLCanvasElement).style
        if (style) {
            style.width = `${enlargedWidth}px`;
            style.height = `${enlargedHeight}px`;
            style.marginLeft = style.marginRight = `${horizontalMargin}px`;
            style.marginTop = style.marginBottom = `${verticalMargin}px`;
        }
    }
}
