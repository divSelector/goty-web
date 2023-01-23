import { Container, AnimatedSprite, Texture, Assets } from "pixi.js"
import { IScene } from "../Interfaces"
import { Game } from "../Game"


export class ExampleScene extends Container implements IScene {
    private player: AnimatedSprite
    private playerVelocity: number = 5
    constructor() {
        super()

        const playerRunFrames: Array<string> = Array.from(
            [1,2,3,4], idx => `player/run_${idx}`
        )
        playerRunFrames.forEach(f => console.log(Assets.get(f)))
        this.player = new AnimatedSprite(
            playerRunFrames.map(path => Assets.get(path) as Texture )
        )
        
        this.draw()
        
        // Ticker.shared.add(this.update.bind(this))
        
        this.player.onFrameChange = this.onPlayerFrameChange.bind(this)
    }
    
    private onPlayerFrameChange(currentFrame: number): void {
        console.log("Player's Current Frame is: ", currentFrame)
    }

    private draw(): void {
        console.log(`${Game.width}${Game.height}`)
        
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