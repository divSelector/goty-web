import type { ResolverManifest } from "pixi.js";

export const tilemapManifest: ResolverManifest = {
    bundles: [
        {
            name : "tilemaps",
            assets:
            {
                "map" : "assets/tilemaps/map.json",
            }
        }
    ]
}