class ah64 {
  static extraDelay = 0;
  static #delay100 = 100 + this.extraDelay;
  static slotVariant = "";
  static #kuKeycodes = {
    1: 3033,
    2: 3034,
    3: 3035,
    4: 3036,
    5: 3037,
    6: 3038,
    7: 3039,
    8: 3040,
    9: 3041,
    0: 3043,
    " ": 3003,
    ".": 3042,
    ",": 3042,
    "/": 3045,
    "-": 3047,
    "+": 3046,
    a: 3007,
    b: 3008,
    c: 3009,
    d: 3010,
    e: 3011,
    f: 3012,
    g: 3013,
    h: 3014,
    i: 3015,
    j: 3016,
    k: 3017,
    l: 3018,
    m: 3019,
    n: 3020,
    o: 3021,
    p: 3022,
    q: 3023,
    r: 3024,
    s: 3025,
    t: 3026,
    u: 3027,
    v: 3028,
    w: 3029,
    x: 3030,
    y: 3031,
    z: 3032,
  };
  static #codesPayload = [];

  static #addKeyboardCode(character) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined)
      this.#codesPayload.push({
        device: this.#isPilot() ? 29 : 30,
        code: characterCode,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
  }

  static #isPilot() {
    return this.slotVariant === "AH-64D_BLK_IIpilot";
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];
    //Enter TSD Page
    this.#codesPayload.push({
      device: this.#isPilot() ? 43 : 45,
      code: 3029,
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });
    //goto Point page
    this.#codesPayload.push({
      device: this.#isPilot() ? 43 : 45,
      code: 3013,
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    for (const waypoint of waypoints) {
      //press ADD
      this.#codesPayload.push({
        device: this.#isPilot() ? 43 : 45,
        code: 3023,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //press IDENT
      this.#codesPayload.push({
        device: this.#isPilot() ? 43 : 45,
        code: 3024,
        delay: 200,
        activate: 1,
        addDepress: "true",
      });
      //press ENTER
      this.#codesPayload.push({
        device: this.#isPilot() ? 29 : 30,
        code: 3006,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //Type name (max 3 chars)
      for (let i = 0; i < 3; i++) {
        this.#addKeyboardCode(waypoint.name.charAt(i));
      }
      //press ENTER
      this.#codesPayload.push({
        device: this.#isPilot() ? 29 : 30,
        code: 3006,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //press CLR
      this.#codesPayload.push({
        device: this.#isPilot() ? 29 : 30,
        code: 3001,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //check if latitude is N or S
      if (waypoint.latHem === "N") {
        this.#codesPayload.push({
          device: this.#isPilot() ? 29 : 30,
          code: 3020,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: this.#isPilot() ? 29 : 30,
          code: 3025,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
      //Type lat
      for (let i = 0; i < waypoint.lat.length; i++) {
        waypoint.lat.charAt(i) !== "." &&
          this.#addKeyboardCode(waypoint.lat.charAt(i));
      }
      //check if longitude is E or W
      if (waypoint.longHem === "E") {
        this.#codesPayload.push({
          device: this.#isPilot() ? 29 : 30,
          code: 3011,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: this.#isPilot() ? 29 : 30,
          code: 3029,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
      //Type long
      for (let i = 0; i < waypoint.long.length; i++) {
        waypoint.long.charAt(i) !== "." &&
          this.#addKeyboardCode(waypoint.long.charAt(i));
      }
      //press ENTER
      this.#codesPayload.push({
        device: this.#isPilot() ? 29 : 30,
        code: 3006,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //press CLR
      this.#codesPayload.push({
        device: this.#isPilot() ? 29 : 30,
        code: 3001,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //Type elev
      for (let i = 0; i < waypoint.elev.length; i++) {
        this.#addKeyboardCode(waypoint.elev.charAt(i));
      }
      //press ENTER
      this.#codesPayload.push({
        device: this.#isPilot() ? 29 : 30,
        code: 3006,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }
    return this.#codesPayload;
  }
}

export default ah64;
