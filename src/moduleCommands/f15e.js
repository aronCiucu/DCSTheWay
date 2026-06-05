class f15e {
  static slotVariant = "";
  static delay = 50;
  static #f15eNumberCodes = {
    0: 3036, 
    1: 3020, 
    2: 3021, 
    3: 3022, 
    4: 3025, 
    5: 3026, 
    6: 3027, 
    7: 3030,
    8: 3031, 
    9: 3032,
    L1: 3001,
    L2: 3002,
    L3: 3003,
    R1: 3010,
    R4: 3007,
    menu: 3038, 
    clear: 3035, 
    shift: 3033, 
    A: 3020, 
    B: 3022, 
    dot: 3029, 
    PB1: 3061, 
    PB2: 3062, 
    AG: 3127
  };

  static #codesPayload = [];

  static createButtonCommands(waypoints) {
    // Clear previous payload
    this.#codesPayload = [];

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
============================================================== F-15ESE SLOT LOGIC =========================================================
////////////////////////////////////////////////////////*//////////////////////////////////////////////////////////////////////////////////

// Determine seat once
const isPilot = this.slotVariant.includes("_pilot_");

const f15eUFCDevice = isPilot ? 56 : 57;
const f15eMPDDevice = isPilot ? 36 : 39;
const f15eACCDevice = isPilot ? 32 : null; // WSO may not use ACC



/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
===================================================================== WAYPOINTS =============================================================
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

if (this.slotVariant.includes("_waypoints")) {

      // Clear the scratchpad and menu ///////////////////
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.clear, delay: this.delay, activate: 1, addDepress: "true"});
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.clear, delay: this.delay, activate: 1, addDepress: "true"});
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.clear, delay: this.delay, activate: 1, addDepress: "true"});

      // Enter MENU page ///////////////////////////////
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.menu, delay: this.delay, activate: 1, addDepress: "true"});

      // Enter B into Scratchpad ///////////////////////
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true"});
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.B, delay: this.delay, activate: 1, addDepress: "true"});

      //Enter B into UFC PB10 to enter BASE mode////////////////////////////
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.R1, delay: this.delay, activate: 1, addDepress: "true"});

      //UFC PB10 For Waypoint menu //////////////////////////
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.R1, delay: this.delay, activate: 1, addDepress: "true"});

      // Waypoint loop //////////////////////////////////////
      for (let i = 0; i < waypoints.length; i++) {
        const wp = waypoints[i];
        const wpNum = i + 1;

        // Enter WAYPOINT IDENT Number into scratchpad////////////////////////////
        for (const digit of ("" + wpNum)) {
          this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[digit], delay: this.delay, activate: 1, addDepress: "true" });}

        // Enter A into scratchpad /////////////////////////////////////////
        this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true" });
        this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.A, delay: this.delay, activate: 1, addDepress: "true" });

        // PB1 press to set Waypoint menu to currently transferring waypoint ////////////////////////////////////////
        this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.L1, delay: this.delay, activate: 1, addDepress: "true" });

                

        // LAT N or S /////////////////////////////////////
        this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true" }); //Press Shift
	if (wp.latHem === "N") 
          this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[2], delay: this.delay, activate: 1, addDepress: "true" }); //Enters N
        else this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[8], delay: this.delay, activate: 1, addDepress: "true" }); //Enters S

        //Enter LAT Coordinate DIGITS //////////////////////////////////
        for (const char of wp.lat) if (char !== ".") this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[char], delay: this.delay, activate: 1, addDepress: "true" }); //Types all LAT coordinates
        
	      //Press LSK L2 to enter Latitude into UFC
	      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.L2, delay: this.delay, activate: 1, addDepress: "true" });

        // LON E or W /////////////////////////////////////////
        this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true" }); // Press Shift
        if (wp.longHem === "E") this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[6], delay: this.delay, activate: 1, addDepress: "true" }); //Enters E
        else this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[4], delay: this.delay, activate: 1, addDepress: "true" }); //Enters W

        //Enter LAT DIGITS ////////////////////////////////////
        for (const char of wp.long) if (char !== ".") this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[char], delay: this.delay, activate: 1, addDepress: "true" }); //Types all LON coordinates

        //Press LSK L3 to enter Longitude into UFC
	      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.L3, delay: this.delay, activate: 1, addDepress: "true" });

        //Enter ELEV DIGITS ////////////////////////////////////
        for (const char of wp.elev) this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[char], delay: this.delay, activate: 1, addDepress: "true" });

        //Press LSK R4 to enter Elevation into UFC
	      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.R4, delay: this.delay, activate: 1, addDepress: "true" });}
	      //^This is the end of waypoint entry loop

      
      // BACK TO AND SELECT WP 1
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.menu, delay: this.delay, activate: 1, addDepress: "true" }); // Press UFC Menu button
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[1], delay: this.delay, activate: 1, addDepress: "true" }); // Press 1 
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true" }); // Press Shift
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.A, delay: this.delay, activate: 1, addDepress: "true" }); // Press A
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.R1, delay: this.delay, activate: 1, addDepress: "true" }); // Press UFC LSK R1
       
    }




    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ============================================================== TARGET POINTS ===================================================================
    ////////////////////////////////////////////////////////*///////////////////////////////////////////////////////////////////////////////////////
    
    if (this.slotVariant.includes("_targetpoints") || this.slotVariant.includes("_txfr")) {

      // Clear and Menu
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.clear, delay: this.delay, activate: 1, addDepress: "true" });
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.clear, delay: this.delay, activate: 1, addDepress: "true" });
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.clear, delay: this.delay, activate: 1, addDepress: "true" });
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.menu, delay: this.delay, activate: 1, addDepress: "true" });

      // A/G Mode
      this.#codesPayload.push({ device: f15eACCDevice, code: this.#f15eNumberCodes["AG"], delay: this.delay, activate: 1, addDepress: "true", });

      // Basepoint B
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true" });
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.B, delay: this.delay, activate: 1, addDepress: "true" });
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.R1, delay: this.delay, activate: 1, addDepress: "true" });

      // Waypoint Page
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.R1, delay: this.delay, activate: 1, addDepress: "true" });

      // Waypoint IDENT
      for (let i = 0; i < waypoints.length; i++) {
        const wp = waypoints[i];
        const wpNum = i + 1;

        for (const digit of ("" + wpNum)) this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[digit], delay: this.delay, activate: 1, addDepress: "true" });

        // dot
        this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.dot, delay: this.delay, activate: 1, addDepress: "true" });

        // Route B
        this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true" });
        this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.B, delay: this.delay, activate: 1, addDepress: "true" });

        // PB1 press
        this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.L1, delay: this.delay, activate: 1, addDepress: "true" });

        // LAT loop
        this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true" });
        if (wp.latHem === "N") this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[2], delay: this.delay, activate: 1, addDepress: "true" });
        else this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[8], delay: this.delay, activate: 1, addDepress: "true" });

        for (const char of wp.lat) if (char !== ".") this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[char], delay: this.delay, activate: 1, addDepress: "true" });
        this.#codesPayload.push({ device: f15eUFCDevice, code: 3002, delay: this.delay, activate: 1, addDepress: "true" });
        

        // LON loop
        this.#codesPayload.push({ device: f15eUFCDevice, code: 3033, delay: this.delay, activate: 1, addDepress: "true" }); 
        if (wp.longHem === "E") this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[6], delay: this.delay, activate: 1, addDepress: "true" });
        else this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[4], delay: this.delay, activate: 1, addDepress: "true" });

        for (const char of wp.long) if (char !== ".") this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[char], delay: this.delay, activate: 1, addDepress: "true" });
        this.#codesPayload.push({ device: f15eUFCDevice, code: 3003, delay: this.delay, activate: 1, addDepress: "true" });

        //ELEV loop
        for (const char of wp.elev) this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[char], delay: this.delay, activate: 1, addDepress: "true" });
        this.#codesPayload.push({ device: f15eUFCDevice, code: 3007, delay: this.delay, activate: 1, addDepress: "true" });
      }
      // BACK TO AND SELECT TP 1
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.menu, delay: this.delay, activate: 1, addDepress: "true" });
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[1], delay: this.delay, activate: 1, addDepress: "true" });
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.dot, delay: this.delay, activate: 1, addDepress: "true" });
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true" });
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.B, delay: this.delay, activate: 1, addDepress: "true" });
      this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.R1, delay: this.delay, activate: 1, addDepress: "true" });
    }



    

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
========================================================== TRANSFER TO WEAPONS =====================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
if (this.slotVariant.includes("_txfr")) {

  

  const numWaypoints = waypoints.length;


  //This block sets a specific number of weapon station jumps
  function getPB2PressCount(numWaypoints, waypointNumber) {
  const lookup = {
    7: [3, 6, 6, 3, 2, 6, 2],          // index 0 → WP1
    8: [3, 7, 3, 4, 3, 3, 7, 2],      // index 0 → WP1
    9: [4, 8, 8, 4, 4, 4, 3, 8, 2]    // index 0 → WP1
  };
  if (lookup[numWaypoints]) {
    return lookup[numWaypoints][waypointNumber - 1] ?? 1;
  }
  return 1;} // End of block

  // Sets A/G mode, required to transfer Target-Point to Weapon.
  this.#codesPayload.push({ device: f15eACCDevice, code: this.#f15eNumberCodes.AG, delay: this.delay, activate: 1, addDepress: "true" }); // Enters A/G mode

  for (let i = 0; i < numWaypoints; i++) {

    const wpNum = i + 1;

    // IDENT only (e.g. 1.B)
    for (const digit of String(wpNum)) { this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[digit], delay: this.delay, activate: 1, addDepress: "true", });} //Enters number
    this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.dot, delay: this.delay, activate: 1, addDepress: "true" }); // Enters dot
    this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true" }); //Presses Shift
    this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.B, delay: this.delay, activate: 1, addDepress: "true" }); // Makes a B
    this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.R1, delay: this.delay, activate: 1, addDepress: "true" }); // Enter it to LSK R1

    // MPD PB1 — transfer to bomb - has a delay to allow for coordinate transfer
    this.#codesPayload.push({ device: f15eMPDDevice, code: this.#f15eNumberCodes.PB1, delay: 2000, activate: 1, addDepress: "true", });

    // PB2 — This does the actual pushing of MPD PB2
    const presses =
      (numWaypoints === 7 ||numWaypoints === 8 || numWaypoints === 9)
        ? getPB2PressCount(numWaypoints, wpNum)
        : 1;
    for (let j = 0; j < presses; j++) {
      this.#codesPayload.push({ device: f15eMPDDevice, code: this.#f15eNumberCodes.PB2, delay: this.delay, activate: 1, addDepress: "true",}); }
  }

  this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes[1], delay: this.delay, activate: 1, addDepress: "true" });
  this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.dot, delay: this.delay, activate: 1, addDepress: "true" });
  this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.shift, delay: this.delay, activate: 1, addDepress: "true" });
  this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.B, delay: this.delay, activate: 1, addDepress: "true" });
  this.#codesPayload.push({ device: f15eUFCDevice, code: this.#f15eNumberCodes.R1, delay: this.delay, activate: 1, addDepress: "true" });
}

     return this.#codesPayload;
  }
}

export default f15e;
