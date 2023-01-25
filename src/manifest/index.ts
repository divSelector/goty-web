import { spritesManifest } from "./sprites";
import { tilemapManifest } from "./tilemaps";
import { tilesetManifest } from "./tilesets";
import { ResolverManifest, ResolverBundle } from "pixi.js";

const sprites: ResolverBundle[] = spritesManifest["bundles"]
const tilemaps: ResolverBundle[] = tilemapManifest["bundles"]
const tilesets: ResolverBundle[] = tilesetManifest["bundles"]

let manifests: Array<ResolverBundle[]> = [sprites, tilemaps, tilesets]
let bundles: ResolverBundle[] = []
for (let manifest of manifests) {
    for (let bundle of manifest) {
        bundles.push(bundle)
    }
}

export const manifest: ResolverManifest = {
    bundles: bundles
}