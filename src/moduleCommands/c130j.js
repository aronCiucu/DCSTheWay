class c130j {
  static slotVariant = ""; // Holds the variant type
  static #device_id = 25; // Pilot
  static #device_id2 = 26; // Copilot
  static extraDelay = 0;
  static #delay_value = this.extraDelay;
  static #delay10 = 10 + this.extraDelay;
  static #delay50 = 50 + this.extraDelay;
  static #delay100 = 100 + this.extraDelay;

  static #kuKeycodes = {
    "0": 3030, "1": 3031, "2": 3032, "3": 3033, "4": 3034,
    "5": 3035, "6": 3036, "7": 3037, "8": 3038, "9": 3039,
    ".": 3040, "a": 3042, "b": 3043, "c": 3044, "d": 3045,
    "e": 3046, "f": 3047, "g": 3048, "h": 3049, "i": 3050,
    "j": 3051, "k": 3052, "l": 3053, "m": 3054, "n": 3055,
    "o": 3056, "p": 3057, "q": 3058, "r": 3059, "s": 3060,
    "t": 3061, "u": 3062, "v": 3063, "w": 3064, "x": 3065,
    "y": 3066, "z": 3067,
    "/": 3068,
    "CLR": 3029,
    "DEL": 3028,
    "INDX": 3016,
    "DIR": 3018,
    "MARK": 3020,
    "EXEC": 3025,
    "NEXT": 3026,
    "PREV": 3027,
    "L1": 3001, "L2": 3002, "L3": 3003,
    "L4": 3004, "L5": 3005, "L6": 3006,
    "R1": 3007, "R2": 3008, "R3": 3009,
    "R4": 3010, "R5": 3011, "R6": 3012,
  };

  static #codesPayload = [];

  static #addKeyboardCode(character, device) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined) {
      this.#codesPayload.push({
        device: device,
        code: characterCode,
        delay: this.#delay_value,
        activate: 1,
        addDepress: "true",
      });
    }
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];

    const device =
      this.slotVariant === "c130Plt"
        ? this.#device_id
        : this.slotVariant === "c130CoPlt"
        ? this.#device_id2
        : null;

    if (!device) return this.#codesPayload;

    // Press INDX key
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["INDX"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // Press L6 Zeroise
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["L6"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // Press Next Page
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["NEXT"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // Press L1 for Route 1
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["L1"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // Press R6 for Verify
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["R6"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    /////////////////////////////// Create MARK POINT for Origin

    // Press MARK key
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["MARK"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // Press L1 to enter MP into Scratchpad
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["L1"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // Press INDX key
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["INDX"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // Press R1 for route 1
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["R1"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // Press L1 to enter MP into Scratchpad
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["L1"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // Press L6 to enter LEGS page
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["L6"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    ///////////////////////////////// Enter Waypoints into LEGS page

    for (let i = 0; i < waypoints.length; i++) {
      const waypoint = waypoints[i];

      if (i > 0 && i % 5 === 0) {
        this.#codesPayload.push({
          device: device,
          code: this.#kuKeycodes["NEXT"],
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }

      const lskL = this.#kuKeycodes[`L${(i % 5) + 1}`];
      const lskR = this.#kuKeycodes[`R${(i % 5) + 1}`];

      // Latitude hemisphere
      this.#codesPayload.push({
        device: device,
        code: this.#kuKeycodes[waypoint.latHem.toLowerCase()],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      // Latitude digits
      for (let j = 0; j < waypoint.lat.length; j++) {
        if (j !== 2) this.#addKeyboardCode(waypoint.lat.charAt(j), device);
      }

      // Longitude hemisphere
      this.#codesPayload.push({
        device: device,
        code: this.#kuKeycodes[waypoint.longHem.toLowerCase()],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      // Longitude digits
      for (let j = 0; j < waypoint.long.length; j++) {
        if (j !== 3) this.#addKeyboardCode(waypoint.long.charAt(j), device);
      }

      // Enter waypoint LAT/LON
      this.#codesPayload.push({
        device: device,
        code: lskL,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      // "/" for elevation
      this.#codesPayload.push({
        device: device,
        code: this.#kuKeycodes["/"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      // Elevation digits
      const elev =
  waypoint.elev && parseInt(waypoint.elev, 10) >= 1
    ? waypoint.elev
    : "1";

for (let j = 0; j < elev.length; j++) {
  this.#addKeyboardCode(elev.charAt(j), device);
}

      // "/" for elevation
      this.#codesPayload.push({
        device: device,
        code: this.#kuKeycodes["a"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      // Enter elevation
      this.#codesPayload.push({
        device: device,
        code: lskR,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }

    // ACTIVATE ROUTE 1
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["R6"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["R6"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["EXEC"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // DIRECT-TO Waypoint 1
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["DIR"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["L1"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["L6"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["EXEC"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // Re-Activate WP trans
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["R6"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["R5"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["R5"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["R5"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

        this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["EXEC"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["L6"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    // CLEAR CNI MESSAGES
    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["CLR"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device: device,
      code: this.#kuKeycodes["CLR"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    return this.#codesPayload;
  }
}

export default c130j;
