import { Game } from "./Game";
import { LoaderScene } from "./scenes/LoaderScene";

const screenWidth: number = 1280
const screenHeight: number = 800
const backgroundColor: number = 0x6495ed

Game.initialize(screenWidth, screenHeight, backgroundColor)
Game.changeScene(new LoaderScene())
