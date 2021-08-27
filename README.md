# DCSTheWay
Imports waypoints from DCS F10 map into the plane navigation system, like a Data Transfer Cartridge.
Special thanks to kukiric for helping out with the lua side of things!

## What does it do?
You choose points on the F10 map, press a button, and those points will be entered as steerpoints into your plane.  

## What is supported?
Supported modules:
* F-16 
* F/A-18 (make sure you are not in the TAC menu)
* A-10C and A-10C2
 
Multiplayer is supported as long as the server has ownship/player exports turned on.

## How to install?
1. Download the `TheWay.zip` file from the Releases section and extract it in a convenient location, from where you will run the program. 
2. Copy the `TheWay.lua` file from the folder you just extracted into `Users/YourUsernameHere/Saved Games/DCS/Scripts`. The `DCS` folder name may be `DCS.openbeta` if you are on the openbeta version of the game.
3. Edit the `Export.lua` file there and append this line at the end of the file, and save it:
  ```lua
  local TheWayLfs=require('lfs'); dofile(TheWayLfs.writedir()..'Scripts/TheWay.lua')
  ```
   If there is no `Export.lua` file already existing there, create it yourself, and it should include only the line above.

4. Launch TheWay.exe and go fly!

If you are updating from an older version, simply replace your existing `TheWay.lua` and `TheWay.exe` files with the new ones. 

## How to use? 
Video tutorial here:

[![DCSTheWayVideoThumbnail](http://img.youtube.com/vi/0PHWXWClENQ/0.jpg)](http://www.youtube.com/watch?v=0PHWXWClENQ)

Or follow these steps:
1. Launch `TheWay.exe`.
2. Click `Start selecting on map`, and a selection dot will show on screen.
3. Enter the F10 map, position the dot on top of the desired place you wish to mark, and click `Select point`.
Repeat this step to mark as many points as you want.
4. When finished, enter the F1 cockpit view and click `Begin transfer to DCS` to begin the transfering process.
It is advised that you refrain from additional cockpit inputs until the waypoints have been loaded.

This is the way.
