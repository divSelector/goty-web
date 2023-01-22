import { Container, Loader } from "pixi.js"
import 'pixi-tiledmap';



export class LoadTilemap extends Container {
    private readonly screenWidth: number
    private readonly screenHeight: number

    constructor(screenWidth: number, screenHeight: number ) {
        super()
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        const loader = new Loader()


        const tilemapsPath: string = 'assets/sprites/tilemaps'

    }

}