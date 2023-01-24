import { spritesManifest } from "./sprites";
import { tilemapManifest } from "./tilemaps";
import { ResolverManifest, ResolverBundle } from "pixi.js";

const sprites: ResolverBundle[] = spritesManifest["bundles"]
const tilemaps: ResolverBundle[] = tilemapManifest["bundles"]

let manifests: Array<ResolverBundle[]> = [sprites, tilemaps]
let bundles: ResolverBundle[] = []
for (let manifest of manifests) {
    for (let bundle of manifest) {
        bundles.push(bundle)
    }
}

export const manifest: ResolverManifest = {
    bundles: bundles
}