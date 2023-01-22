import { Container, AnimatedSprite, Texture, Ticker } from "pixi.js"

export class Scene extends Container {
    private readonly screenWidth: number
    private readonly screenHeight: number

    private player: AnimatedSprite
    private playerVelocity: number = 5
    constructor(screenWidth: number, screenHeight: number ) {
        super()
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        const framesPath: string = 'assets/sprites/player'
        const playerRunFrames: Array<string> = Array.from(
            [1,2,3,4], idx => `${framesPath}/run_${idx}.png`
        )
        
        this.player = new AnimatedSprite(
            playerRunFrames.map(path => Texture.from(path))
        )
        
        this.draw()
        
        Ticker.shared.add(this.update.bind(this))
        
        this.player.onFrameChange = this.onPlayerFrameChange.bind(this)
    }
    
    private onPlayerFrameChange(currentFrame: number): void {
        console.log("Player's Current Frame is: ", currentFrame)
    }

    private draw(): void {
        console.log(`${this.screenWidth}${this.screenHeight}`)
        
        this.scale.set(2)
        this.player.position.set(0,this.screenHeight/4)
        this.player.loop = true
        this.player.animationSpeed = 0.167; 
        this.player.play()
        this.addChild(this.player);
    }

    private update(deltaTime: number): void {

        this.player.x += this.playerVelocity * deltaTime

        if (this.player.x > this.screenWidth) this.player.x = 0
    }

}