import { Container, AnimatedSprite, Texture } from "pixi.js"
import { IScene } from "../Interfaces"
import { Manager } from "../Manager"


export class ExampleScene extends Container implements IScene {
    private player: AnimatedSprite
    private playerVelocity: number = 5
    constructor() {
        super()

        const framesPath: string = 'assets/sprites/player'
        const playerRunFrames: Array<string> = Array.from(
            [1,2,3,4], idx => `${framesPath}/run_${idx}.png`
        )
        
        this.player = new AnimatedSprite(
            playerRunFrames.map(path => Texture.from(path))
        )
        
        this.draw()
        
        // Ticker.shared.add(this.update.bind(this))
        
        this.player.onFrameChange = this.onPlayerFrameChange.bind(this)
    }
    
    private onPlayerFrameChange(currentFrame: number): void {
        console.log("Player's Current Frame is: ", currentFrame)
    }

    private draw(): void {
        console.log(`${Manager.width}${Manager.height}`)
        
        this.scale.set(2)
        this.player.position.set(0,Manager.height/4)
        this.player.loop = true
        this.player.animationSpeed = 0.167; 
        this.player.play()
        this.addChild(this.player);
    }

    public update(deltaTime: number): void {

        this.player.x += this.playerVelocity * deltaTime

        if (this.player.x > Manager.width) this.player.x = 0
    }

}