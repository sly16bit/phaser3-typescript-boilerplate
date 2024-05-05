# phaser3-typescript-boilerplate

A basic repository for starting a Phaser.js game in typescript using bun and vite.

## Included game

The game included in this repo is the snake game example included in the Phaser 3 examples repository. All that was done here is to convert the original code in typescript and add a couple of sound effects.

Here's a link to the repo : https://github.com/phaserjs/examples

## Tech

This repo uses roughly the following :

- bun
- vite
- typescript
- phaser
- eslint
- prettier

## Install

### Prerequesites

This repo uses bun. Instructions to install can be found here: https://bun.sh/ 

### Commands to run

After cloning this, run the following command to install dependencies : `bun install`

You can then run the http server by running the following : `bun run dev`

You can then access the game by using the following url in your favorite browser : http://localhost:5173

### Commands to build

You can build the web app using the `bun run build` command. Resulting files are saved in the `dist` folder.

You can build the electron app using the `bun run build-native` command. Resulting files are saved in the `release` folder.

## Phaser

Phaser is a javascript you can use to make games that would run in any browser. Look here for more info : https://phaser.io/

## TODO list

This repo still needs more work to be complete. Here's a list of what I have in mind :

- build configuration optimisation
- electron for multi-platform desktop builds
