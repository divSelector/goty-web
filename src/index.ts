import { Application, Loader } from 'pixi.js'
import { LoadTilemap } from './scenes/LoadTilemap'

// import {CRTFilter} from '@pixi/filter-crt'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 800
});


const sceny: LoadTilemap = new LoadTilemap(app.renderer.screen.width, app.renderer.screen.height)
app.stage.addChild(sceny)

// const conty: Container = new Container();
// conty.x = 0;
// conty.y = 0;
// app.stage.addChild(conty);

// const clampy: Sprite = Sprite.from("assets/sprites/clampy.png");
// clampy.anchor.set(0.5);
// clampy.x = app.screen.width / 2;
// clampy.y = app.screen.height / 2;
// clampy.scale.set(0.5)
// conty.addChild(clampy);

// const clampy2: Sprite = Sprite.from("assets/sprites/clampy.png");
// // clampy2.anchor.set(0.5);
// clampy2.x = 100
// clampy2.y = 100
// clampy2.scale.set(0.5)
// clampy2.tint = 0xff00ff
// conty.addChild(clampy2);

// const style = new TextStyle({
//     breakWords: true,
//     dropShadow: true,
//     dropShadowColor: "#dc8add",
//     fill: [
//         "#9141ac",
//         "#e01b24"
//     ],
//     fillGradientStops: [
//         100
//     ],
//     fontFamily: "Verdana, Geneva, sans-serif",
//     fontVariant: "small-caps",
//     fontWeight: "bold",
//     lineJoin: "round",
//     strokeThickness: 2,
//     wordWrap: true,
//     wordWrapWidth: 120
// });
// const text = new Text('It\'s Mother Fucking Clampy!', style);
// text.x = clampy2.x * 4
// text.y = clampy2.y
// text.scale.set(1.5)
// conty.addChild(text)

// // If you need to know, this is the expensive part. This creates the font atlas
// BitmapFont.from("comic 32", {
//     fill: "#ffffff", // White, will be colored later
//     fontFamily: "Comic Sans MS",
//     fontSize: 32
// })

// // Remember, this font only has letters and numbers. No commas or any other symbol.
// const bitmapTexty: BitmapText = new BitmapText("I love baking, my family, and my friends",
//     {
//         fontName: "comic 32",
//         fontSize: 32, // Making it too big or too small will look bad
//         tint: 0xFF0000 // Here we make it red.
//     });

// bitmapTexty.text = "This is cheap";
// bitmapTexty.text = "Change it as much as you want";
// conty.addChild(bitmapTexty);

// conty.filters = [new CRTFilter()];


