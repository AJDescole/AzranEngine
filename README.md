# Azran

**Azran** is a game FOSS project using PixiJS. It is heavily inspired by Chapatiz and Blablaland and tends to easily make game that resemble them. We indent to make our own fully animated avatars, and a coherent level design.

## Members of the project

- **Descole** (myself) : founder, main server owner, main dev
- **Barok** : communication, artistic director, intelligence services (also partially done with me)
- **A former chapatiz developer** : IT counsil only (not actively participating for some reasons)

## Contact us

- By email : Descole &lt;jdescole@gmx.com&gt;
- Using Discord : https://discord.gg/vNseggW

Do not hesitate to contact us for more informations about our projects.

## Changelog

### 2018-04-12

Made this repo public.
We were actively working on an avatar system based on the `a` file used by several game engines. We're about to make a working avatar. This is the most difficult feature of this project.

See `docs/avatar.md` for more details about avatar breakdown.

### 2018-04-14

Now handling an avatar with multiple parts (such as hat, feet, ...) and animations (such as directions). 
We're currently working on a tiny chat system for demonstration.

### 2018-04-15

Tiny chat done. Now working on UI and room system, inspired by discord. 

### 2018-04-30

Currently working on the (graphic) room system. More complicated than planned. 

Converting flash files (from graphics designers) into MCF system takes too much time and even if it is accurate, it is also too much than the browser can handle. So, we're working on a smarter system : 
- A room has a bitmap background. This background contains every graphics that are non-animated and that a character can walk on. (So, unattainable or higher sprites can be incorporated into the background)
- A room has sprites which are on the same layer that the characters are on. This is needed because a character can be in front of a sprite or behind. 
- Sprites can be MovieClip through the MCF system, or external images, or external spritesheets. 
- Because the TMX format does not handle spritesheets with dynamic sizes, we cannot use it as the main map format. 
- So, a room maker will be needed earlier that planned. It will most likely be the same as the users' one. 


## License

This project is distributed under the MIT license.

## :warning: DISCLAIMER :warning:

This repository **DOES NOT** host any content owned by chapatiz.com nor blablaland.com. Any claim that code or document belong to them would be abusive.
This being said, we *do* build our system inspired by these old fashioned and outdated games. Without infringing any copyright.
