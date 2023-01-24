// *Dragon Ball Z Intro Music* 
// ... 
// Last Time, on Pointlessly Complicated Spaghetti Code Z, Goku was resolving paths 
// to ~200 assets in over 20 directories in a manifest without access to the file system. 
// Gathering all the files into the correct context, our heroes exported the ResolverManifest. 
// But will they ever be able to understand what it does again? 
//
// FIND OUT NEXT TIME ON Pointlessly Complicated Spaghetti Code Z!!!!
//
// =============================================================================================
//
// The purpose of this file is to resolve the urls that direct to sprite assets
// All the frames of each sprite are "bundled" into a single object so that they can be
// pre-loaded together using a keyword that resolves to the url path of the asset.

import type { ResolverManifest } from "pixi.js";

function getFrameFileNames(): Array<string> {
    // The frames in every spritesheet are contained in a directory
    // They have the following file names:
    const singleFrameNames: Array<string> = [
        "stand_idle", "stand_damaged", "jump_air", "jump_ground", 
        "jump_damaged", "crouch_idle", "crouch_slide", "crouch_damaged"
    ]
    // Some of these files contain multiple frames for a single animation
    // There are four frames per attack, and three attacking stances.
    const attackFrameNames: Array<string> = [
        'crouch_attack_', 'stand_attack_', 'jump_attack_'
    ].map(x_attack => [1,2,3,4].map(i => x_attack+i)).flat()

    // There are eight frames in a running animation
    const runFrameNames: Array<string> = [1,2,3,4,5,6,7,8].map(n => "run_"+n)

    // Together they return the png filenames that all sprites in these directories have instances of.
    const frameNames: Array<string> = [].concat.apply([
        singleFrameNames, attackFrameNames, runFrameNames
    ]).flat()
    return frameNames.map(name => name+".png")
}

function getSpriteDirectoryNames(): Array<string> {
    // Each direcotory represents a sprite
    // There are sprites for the player
    const playerSpriteNames: Array<string> = [
        'player', 'player-greenpants', 'player-greypants', 'player-redpants'
    ]
    
    // and for the equipment, of which each of these 6 types has 8 varieties
    const equipmentSpriteNames: Array<string> = [
        'armor', 'book', 'hat', 'helm', 'robe', 'shield'
    ].map(eq => [1,2,3,4,5,6,7,8].map(i => `${eq}0${i}`)).flat()
    return [].concat.apply([playerSpriteNames, equipmentSpriteNames]).flat()
}

function createBundleAssetsObj(files: Array<string>, spriteName: string) {
    // Each bundle contains both a keyword and a path.
    // This functuion allows us to designate the key from the value in the files array.
    return files.reduce((obj: any, val: string) => {
        const spritesPath: string = 'assets/sprites'
        const path: string = spriteName + '/' + val
        obj[path.slice(0,-4)] = spritesPath+'/'+path
        return obj
    }, {})
}

const spriteFileNames: Array<string> = getFrameFileNames()
const spriteDirectoryNames: Array<string> = getSpriteDirectoryNames()

export const spritesManifest: ResolverManifest = {
    bundles: spriteDirectoryNames.map(name => ({
        name: name, 
        assets: createBundleAssetsObj(spriteFileNames, name)
    }))
    
    // This is an example of what a ManifestBundle entry is going to look like.
    // Refer to static/assets/sprites to see how to access similar textures.
    // {
    //     name: 'shield08',
    //     assets: {
    //       'shield08/stand_idle': 'assets/sprites/shield08/stand_idle.png',
    //       'shield08/stand_damaged': 'assets/sprites/shield08/stand_damaged.png',
    //       'shield08/jump_air': 'assets/sprites/shield08/jump_air.png',
    //       'shield08/jump_ground': 'assets/sprites/shield08/jump_ground.png',
    //       'shield08/jump_damaged': 'assets/sprites/shield08/jump_damaged.png',
    //       'shield08/crouch_idle': 'assets/sprites/shield08/crouch_idle.png',
    //       'shield08/crouch_slide': 'assets/sprites/shield08/crouch_slide.png',
    //       'shield08/crouch_damaged': 'assets/sprites/shield08/crouch_damaged.png',
    //       'shield08/crouch_attack_1': 'assets/sprites/shield08/crouch_attack_1.png',
    //       'shield08/crouch_attack_2': 'assets/sprites/shield08/crouch_attack_2.png',
    //       'shield08/crouch_attack_3': 'assets/sprites/shield08/crouch_attack_3.png',
    //       'shield08/crouch_attack_4': 'assets/sprites/shield08/crouch_attack_4.png',
    //       'shield08/stand_attack_1': 'assets/sprites/shield08/stand_attack_1.png',
    //       'shield08/stand_attack_2': 'assets/sprites/shield08/stand_attack_2.png',
    //       'shield08/stand_attack_3': 'assets/sprites/shield08/stand_attack_3.png',
    //       'shield08/stand_attack_4': 'assets/sprites/shield08/stand_attack_4.png',
    //       'shield08/jump_attack_1': 'assets/sprites/shield08/jump_attack_1.png',
    //       'shield08/jump_attack_2': 'assets/sprites/shield08/jump_attack_2.png',
    //       'shield08/jump_attack_3': 'assets/sprites/shield08/jump_attack_3.png',
    //       'shield08/jump_attack_4': 'assets/sprites/shield08/jump_attack_4.png',
    //       'shield08/run_1': 'assets/sprites/shield08/run_1.png',
    //       'shield08/run_2': 'assets/sprites/shield08/run_2.png',
    //       'shield08/run_3': 'assets/sprites/shield08/run_3.png',
    //       'shield08/run_4': 'assets/sprites/shield08/run_4.png',
    //       'shield08/run_5': 'assets/sprites/shield08/run_5.png',
    //       'shield08/run_6': 'assets/sprites/shield08/run_6.png',
    //       'shield08/run_7': 'assets/sprites/shield08/run_7.png',
    //       'shield08/run_8': 'assets/sprites/shield08/run_8.png'
    //     }
    
}

