import type { ResolverManifest } from "pixi.js";

function getFrameFileNames(): Array<string> {
    const singleFrameNames: Array<string> = [
        "stand_idle", "stand_damaged", "jump_air", "jump_ground", 
        "jump_damaged", "crouch_idle", "crouch_slide", "crouch_damaged"
    ]
    const multiFrameNames: Array<string> = [
        'crouch_attack_', 'stand_attack_', 'jump_attack_'
    ].map(x_attack => [1,2,3,4].map(i => x_attack+i)).flat()
    const frameNames: Array<string> = [].concat.apply([singleFrameNames, multiFrameNames]).flat()
    return frameNames.map(name => name+".png")
}

function getSpriteDirectoryNames(): Array<string> {
    const playerSpriteNames: Array<string> = [
        'player', 'player-greenpants', 'player-greypants', 'player-redpants'
    ]
    
    const equipmentSpriteNames: Array<string> = [
        'armor', 'book', 'hat', 'helm', 'robe', 'shield'
    ].map(eq => [1,2,3,4,5,6,7,8].map(i => `${eq}0${i}`)).flat()
    return [].concat.apply([playerSpriteNames, equipmentSpriteNames]).flat()
}

function createBundleAssetsObj(files: Array<string>, spriteName: string) {
    return files.reduce((obj: any, val: string) => {
        const spritesPath: string = 'assets/sprites'
        const path: string = spriteName + '/' + val
        obj[val] = spritesPath+'/'+path
        return obj
    }, {})
}

const spriteFileNames: Array<string> = getFrameFileNames()
const spriteDirectoryNames: Array<string> = getSpriteDirectoryNames()

export const manifest: ResolverManifest = {
    bundles: spriteDirectoryNames.map(name => ({
        name: name, 
        assets: createBundleAssetsObj(spriteFileNames, name)
    }))
}

// This is an example of what a ManifestBundle entry is going to look like.
// Refer to assets/sprites to see how to access similar textures.
//
// {
//     name: 'book02',
//     assets: {
//       'stand_idle.png': 'assets/sprites/book02/stand_idle.png',
//       'stand_damaged.png': 'assets/sprites/book02/stand_damaged.png',
//       'jump_air.png': 'assets/sprites/book02/jump_air.png',
//       'jump_ground.png': 'assets/sprites/book02/jump_ground.png',
//       'jump_damaged.png': 'assets/sprites/book02/jump_damaged.png',
//       'crouch_idle.png': 'assets/sprites/book02/crouch_idle.png',
//       'crouch_slide.png': 'assets/sprites/book02/crouch_slide.png',
//       'crouch_damaged.png': 'assets/sprites/book02/crouch_damaged.png',
//       'crouch_attack_1.png': 'assets/sprites/book02/crouch_attack_1.png',
//       'crouch_attack_2.png': 'assets/sprites/book02/crouch_attack_2.png',
//       'crouch_attack_3.png': 'assets/sprites/book02/crouch_attack_3.png',
//       'crouch_attack_4.png': 'assets/sprites/book02/crouch_attack_4.png',
//       'stand_attack_1.png': 'assets/sprites/book02/stand_attack_1.png',
//       'stand_attack_2.png': 'assets/sprites/book02/stand_attack_2.png',
//       'stand_attack_3.png': 'assets/sprites/book02/stand_attack_3.png',
//       'stand_attack_4.png': 'assets/sprites/book02/stand_attack_4.png',
//       'jump_attack_1.png': 'assets/sprites/book02/jump_attack_1.png',
//       'jump_attack_2.png': 'assets/sprites/book02/jump_attack_2.png',
//       'jump_attack_3.png': 'assets/sprites/book02/jump_attack_3.png',
//       'jump_attack_4.png': 'assets/sprites/book02/jump_attack_4.png'
//     }
//   },
