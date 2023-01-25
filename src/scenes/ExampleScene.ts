import { Container, AnimatedSprite, Texture, Assets, Sprite } from "pixi.js"
import { IScene } from "../Interfaces"
import { Game } from "../Game"

export class ExampleScene extends Container implements IScene {
    private player: AnimatedSprite
    private playerVelocity: number = 3
    assetBundles: string[] = ["player", "tilesets", "tilemaps"]

    constructor() {
        super()
        this.player = undefined!
    }

    constructorWithAssets(): void {
        // Manager will call this when we have all the assets!
        const playerRunFrames: Array<string> = Array.from(
            [1,2,3,4], idx => `player/run_${idx}`
        )
        this.player = new AnimatedSprite(
            playerRunFrames.map(path => Assets.get(path) as Texture )
        )
        
        this.draw()
        
        this.player.onFrameChange = this.onPlayerFrameChange.bind(this)

        console.log(Assets)
        const map = Assets.get('map')
        const tileset = Assets.get('scifi-pipes-dark')
        this.addChild(Sprite.from(Assets.get("dark/112.png")))
        
        console.log(tileset)
        console.log(map)
        console.log(Sprite)
        // console.log(utils.TextureCache)
    }
    
    private onPlayerFrameChange(currentFrame: number): void {
        // console.log("Player's Current Frame is: ", currentFrame)
    }

    private draw(): void {        
        this.scale.set(2)
        this.player.position.set(0,Game.height/4)
        this.player.loop = true
        this.player.animationSpeed = 0.167; 
        this.player.play()
        this.addChild(this.player);
    }

    public update(deltaTime: number): void {
        this.player.x += this.playerVelocity * deltaTime
        if (this.player.x > Game.width) this.player.x = 0
    }

}