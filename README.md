# DCSTheWay
Imports waypoints from DCS F10 map into the plane navigation system, like a Data Transfer Cartidge.

## What does it do?
You choose points on the F10 map, press a button, and those points will be entered as steerpoints into your plane.  

## What is supported?
Supported modules:
* F-16 
 
Multiplayer is supported as long as the server has ownship/player exports turned on.

## How to install?
1. You have to have Java 11 installed. Download from [here](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
2. Download the .zip file from the Releases tab and extract it
3. Paste the TheWay.lua file into `Saved Games/DCS/Scripts`. The `DCS` folder name may be `DCS.openbeta` if you are on the openbeta version of the game.
4. Edit the Export.lua file and append this line at the end of the file, and save it:
  ```lua
  local TheWayLfs=require('lfs'); dofile(TheWayLfs.writedir()..'Scripts/TheWay.lua')
  ```
5. Launch TheWay.exe from the extracted zip file and go fly!

## How to use? 
Video tutorial here:

[![DCSTheWayVideoThumbnail](http://img.youtube.com/vi/0PHWXWClENQ/0.jpg)](http://www.youtube.com/watch?v=0PHWXWClENQ)

Or follow these steps:
1. With the game launched and mission started, launch TheWay.exe
2. Click Start selecting on map, and a crosshair will show on screen
3. Enter the F10 map, position the crosshair ontop of the desired place you wish to mark, and click Select point.
Repeat this step to mark as many points as you want.
4. When finished, click Begin transfer to DCS to begin the transfering process.
It is advised that you are in the F1 cockpit view when you do this, and refrain from additional cockpit inputs until the wapoints have been loaded.

This is the way.
