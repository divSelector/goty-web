import { Manager } from "./Manager";
import { ExampleScene } from "./scenes/ExampleScene";

const screenWidth: number = 1280
const screenHeight: number = 800
const backgroundColor: number = 0x6495ed

Manager.initialize(screenWidth, screenHeight, backgroundColor)
Manager.changeScene(new ExampleScene())
