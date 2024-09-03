class ch47f {
  static extraDelay = 0; // TODO remove this (back to 0)
  static #delay100 = this.extraDelay + 100;
  static #delay200 = this.extraDelay + 200;
  static #delay500 = this.extraDelay + 500;
  static #delay800 = this.extraDelay + 800;
  static #delay1000 = this.extraDelay + 1000;
  static #kuKeycodes = {
    1: 3030,
    2: 3031,
    3: 3032,
    4: 3033,
    5: 3034,
    6: 3035,
    7: 3036,
    8: 3037,
    9: 3038,
    0: 3039,
    a: 3043,
    b: 3044,
    c: 3045,
    d: 3046,
    e: 3047,
    f: 3048,
    g: 3049,
    h: 3050,
    i: 3051,
    j: 3052,
    k: 3053,
    l: 3054,
    m: 3055,
    n: 3056,
    o: 3057,
    p: 3058,
    q: 3059,
    r: 3060,
    s: 3061,
    t: 3062,
    u: 3063,
    v: 3064,
    w: 3065,
    x: 3066,
    y: 3067,
    z: 3068,
    ".": 3040,
    "/": 3042,
    up: 3026,
    down: 3027
  };
  static #codesPayload = [];

  static #addKeyboardCode(character) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined)
      this.#codesPayload.push({
        device: 3,
        code: characterCode,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];
    // Press Index Key for main menu
    this.#codesPayload.push({
      device: 3,
      code: 3004,
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });
    // Select Procedures/PATT List
    this.#codesPayload.push({
      device: 3,
      code: 3013,
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });
    // Select ACP
    this.#codesPayload.push({
      device: 3,
      code: 3013,
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

      // //Increment waypoint - UP ARROW (start after current selected ACP) props not needed, delete in PR
      // this.#codesPayload.push({
      //   device: 3,
      //   code: 3026,
      //   delay: this.#delay800,
      //   activate: 1,
      //   addDepress: "true",
      // });

    for (const waypoint of waypoints) {
      //Clear the Scatchpad
      this.#codesPayload.push({
        device: 3,
        code: 3028,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      //Increment waypoint - UP ARROW (start after current selected ACP)
      this.#codesPayload.push({
        device: 3,
        code: 3026,
        delay: this.#delay800,
        activate: 1,
        addDepress: "true",
      });
      
      //Type hem
      if (waypoint.latHem === "N") {
        this.#codesPayload.push({
          device: 3,
          code: 3056,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 3,
          code: 3061,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }

      //Type lat
      for (let i = 0; i < waypoint.lat.length; i++) {
        if (i !== 2) { // remove first "."
          this.#addKeyboardCode(waypoint.lat.charAt(i));
        }
        
      }

      //Type hem
      if (waypoint.longHem === "E") {
        this.#codesPayload.push({
          device: 3,
          code: 3047,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 3,
          code: 3065,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }

      //Type long
      for (let i = 0; i < waypoint.long.length; i++) {
        console.log(waypoint.long.charAt(i), i);
        if (i !== 3) { // remove first "."
          this.#addKeyboardCode(waypoint.long.charAt(i));
        }
      }
      
      // Press LSK L1 to enter coordinates
      this.#codesPayload.push({
      device: 3,
      code: 3008,
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
      });

      //Type elev
      for (let i = 0; i < waypoint.elev.length; i++) {
        this.#addKeyboardCode(waypoint.elev.charAt(i));
      }

      // Press LSK L3 to enter elevation
      this.#codesPayload.push({
        device: 3,
        code: 3010,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      // Press /
      this.#codesPayload.push({
        device: 3,
        code: 3042,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      //Type name
      // const waypointNameLength = waypoint.name.length < 12 ? waypoint.name.length : 12;
      // console.log(waypoint.name);
      const match = waypoint.name.match(/^Waypoint (\d+)$/);
      if (match) { waypoint.name = match[1];}
      for (let i = 0; i < Math.min(waypoint.name.length, 9); i++) {
        this.#addKeyboardCode(waypoint.name.charAt(i));
      }

      // Press LSK L2 to enter waypoint number
      this.#codesPayload.push({
        device: 3,
        code: 3009,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }

    return this.#codesPayload;
  }
}

export default ch47f;