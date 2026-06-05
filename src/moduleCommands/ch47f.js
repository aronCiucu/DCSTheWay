class ch47f {
  static slotVariant = ""; // Holds the variant type
  static #device_id = 3; // Device ID, private
  static extraDelay = 0; // Extra delay constant
  static #delay_value = this.extraDelay; // Total delay value
  static #delay10 = 10 + this.extraDelay; // 10 ms delay + extra delay
  static #delay50 = 50 + this.extraDelay; // 50 ms delay + extra delay
  static #delay100 = this.extraDelay + 100; // 100 ms delay + extra delay
  static #kuKeycodes = {
    "1": 3011,
    "2": 3012,
    "3": 3013,
    "4": 3014,
    "5": 3015,
    "6": 3016,
    "7": 3017,
    "8": 3018,
    "9": 3019,
    "0": 3010,
    "a": 3023,
    "b": 3024,
    "c": 3025,
    "d": 3026,
    "e": 3027,
    "f": 3028,
    "g": 3029,
    "h": 3030,
    "i": 3031,
    "j": 3032,
    "k": 3033,
    "l": 3034,
    "m": 3035,
    "n": 3036,
    "o": 3037,
    "p": 3038,
    "q": 3039,
    "r": 3040,
    "s": 3041,
    "t": 3042,
    "u": 3043,
    "v": 3044,
    "w": 3045,
    "x": 3046,
    "y": 3047,
    "z": 3048,
    ".": 3020,
    "/": 3021,
    "UP": 3006,
    "DOWN": 3007,
    "CLR": 3008,
    "FPLN": 3071,
    "IDX": 3064,
    "DIR": 3073,
    "L1": 3050,
    "L2": 3051,
    "L3": 3052,
    "L4": 3053,
    "L5": 3054,
    "L6": 3055,
    "R1": 3056,
    "R2": 3057,
    "R3": 3058,
    "R4": 3059,
    "R5": 3060,
    "R6": 3061,
  };
  static #codesPayload = []; // Holds the generated codes

  // Method to add keyboard codes
  static #addKeyboardCode(character) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined) {
      this.#codesPayload.push({
        device: this.#device_id,
        code: characterCode,
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
    }
  }

  // Main method to create button commands based on waypoints
  static createButtonCommands(waypoints) {
    this.#codesPayload = []; // Reset the payload

  
      // Add to Existing Flight Plan actions
    
    if (this.slotVariant === "ch47ADD") {
          
      // Enter DIR mode
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["DIR"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });

      // Press Down arrow a lot to get to end of any current flight plan
      for (let k = 0; k < 50; k++) {
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["DOWN"],
          delay: this.#delay50,
          activate: 1,
          addDepress: "false",
          });
          this.#codesPayload.push({
            device: this.#device_id,
            code: this.#kuKeycodes["DOWN"],
            delay: this.#delay50,
            activate: 0,
            addDepress: "false",
          });
        }

        // Clear the Scratchpad
    this.#codesPayload.push({
      device: this.#device_id,
      code: this.#kuKeycodes["CLR"],
      delay: 1000,
      activate: 1,
      addDepress: "true",
    });

    // Loop through waypoints
    for (const waypoint of waypoints) {

      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["DOWN"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
      
      // Type hem for latitude
      if (waypoint.latHem === "N") {
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["n"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["s"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });
      }

      // Type latitude
      for (let i = 0; i < waypoint.lat.length; i++) {
        if (i !== 2) {
          this.#addKeyboardCode(waypoint.lat.charAt(i));
        }
      }

      // Type hem for longitude
      if (waypoint.longHem === "E") {
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["e"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["w"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });
      }

      // Type longitude
      for (let i = 0; i < waypoint.long.length; i++) {
        if (i !== 3) {
          this.#addKeyboardCode(waypoint.long.charAt(i));
        }
      }
        
        // Press LSK L5 to enter Waypoint into Flight Plan
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["L5"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });
      }
    

    // New Flight Plan Actions

    } else if (this.slotVariant === "ch47NEW") {

      // Enter DIR mode
  this.#codesPayload.push({
    device: this.#device_id,
    code: this.#kuKeycodes["DIR"],
    delay: this.#delay_value,
    activate: 1,
    addDepress: "true",
  });

  // Delete Current Flight Plan
  this.#codesPayload.push({
    device: this.#device_id,
    code: this.#kuKeycodes["L6"],
    delay: this.#delay_value,
    activate: 1,
    addDepress: "true",
  });
  this.#codesPayload.push({
    device: this.#device_id,
    code: this.#kuKeycodes["R1"],
    delay: this.#delay_value,
    activate: 1,
    addDepress: "true",
  });

  // Return to DIR mode
  this.#codesPayload.push({
    device: this.#device_id,
    code: this.#kuKeycodes["DIR"],
    delay: this.#delay_value,
    activate: 1,
    addDepress: "true",
  });

  // Clear the Scratchpad
    this.#codesPayload.push({
      device: this.#device_id,
      code: this.#kuKeycodes["CLR"],
      delay: 1000,
      activate: 1,
      addDepress: "true",
    });

  // Loop through waypoints
  for (let i = 0; i < waypoints.length; i++) {
    const waypoint = waypoints[i];

    this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["DOWN"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });

    // Type hem for latitude
    if (waypoint.latHem === "N") {
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["n"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
    } else {
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["s"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
    }

    // Type latitude (skip 3rd char)
    for (let j = 0; j < waypoint.lat.length; j++) {
      if (j !== 2) {
        this.#addKeyboardCode(waypoint.lat.charAt(j));
      }
    }

    // Type hem for longitude
    if (waypoint.longHem === "E") {
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["e"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
    } else {
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["w"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
    }

    // Type longitude (skip 4th char)
    for (let j = 0; j < waypoint.long.length; j++) {
      if (j !== 3) {
        this.#addKeyboardCode(waypoint.long.charAt(j));
      }
    }

    // Press LSK L1 for first waypoint, LSK L5 for others
    this.#codesPayload.push({
      device: this.#device_id,
      code: i === 0 ? this.#kuKeycodes["L1"] : this.#kuKeycodes["L5"],
      delay: this.#delay_value,
      activate: 1,
      addDepress: "true",
    });
  }
}

    // Add to Existing Alternate Flight Plan actions
    
  if (this.slotVariant === "ch47ALTADD") {  
        
      // Enter ALTN FPLN mode
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["IDX"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });

      // Enter ALTN FPLN mode
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["L4"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });

      // Press Down arrow a lot to get to end of any current flight plan
      for (let k = 0; k < 50; k++) {
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["DOWN"],
          delay: this.#delay50,
          activate: 1,
          addDepress: "false",
          });
          this.#codesPayload.push({
            device: this.#device_id,
            code: this.#kuKeycodes["DOWN"],
            delay: this.#delay50,
            activate: 0,
            addDepress: "false",
          });
        }

        // Clear the Scratchpad
    this.#codesPayload.push({
      device: this.#device_id,
      code: this.#kuKeycodes["CLR"],
      delay: 1000,
      activate: 1,
      addDepress: "true",
    });

    // Loop through waypoints
    for (const waypoint of waypoints) {

      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["DOWN"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
      
      // Type hem for latitude
      if (waypoint.latHem === "N") {
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["n"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["s"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });
      }

      // Type latitude
      for (let i = 0; i < waypoint.lat.length; i++) {
        if (i !== 2) {
          this.#addKeyboardCode(waypoint.lat.charAt(i));
        }
      }

      // Type hem for longitude
      if (waypoint.longHem === "E") {
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["e"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["w"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });
      }

      // Type longitude
      for (let i = 0; i < waypoint.long.length; i++) {
        if (i !== 3) {
          this.#addKeyboardCode(waypoint.long.charAt(i));
        }
      }
        
        // Press LSK L5 to enter Waypoint into Flight Plan
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["L5"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });
      }
    
    // New Alternate Flight Plan Actions

    } else if (this.slotVariant === "ch47ALTNEW") {
      // Enter ALTN FPLN mode
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["IDX"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });

      // Enter ALTN FPLN mode
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["L4"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });

      // Delete Current Flight Plan
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["L6"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });

      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["R1"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });

      // Clear the Scratchpad
    this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["CLR"],
        delay: 1000,
        activate: 1,
        addDepress: "true",
      });


      // Loop through waypoints
  for (let i = 0; i < waypoints.length; i++) {
    const waypoint = waypoints[i];

    this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["DOWN"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });

    // Type hem for latitude
    if (waypoint.latHem === "N") {
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["n"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
    } else {
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["s"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
    }

    // Type latitude (skip 3rd char)
    for (let j = 0; j < waypoint.lat.length; j++) {
      if (j !== 2) {
        this.#addKeyboardCode(waypoint.lat.charAt(j));
      }
    }

    // Type hem for longitude
    if (waypoint.longHem === "E") {
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["e"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
    } else {
      this.#codesPayload.push({
        device: this.#device_id,
        code: this.#kuKeycodes["w"],
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
    }

    // Type longitude (skip 4th char)
    for (let j = 0; j < waypoint.long.length; j++) {
      if (j !== 3) {
        this.#addKeyboardCode(waypoint.long.charAt(j));
      }
    }

   // Press LSK L2 for first waypoint, LSK L5 for others
    this.#codesPayload.push({
      device: this.#device_id,
      code: i === 0 ? this.#kuKeycodes["L2"] : this.#kuKeycodes["L5"],
      delay: this.#delay_value,
      activate: 1,
      addDepress: "true",
    });
   } 
  }

  // Enter FPLN mode
        this.#codesPayload.push({
          device: this.#device_id,
          code: this.#kuKeycodes["FPLN"],
          delay: this.#delay_value,
          activate: 1,
          addDepress: "true",
        });

    return this.#codesPayload; // Return the generated payload
  }
}

export default ch47f;
