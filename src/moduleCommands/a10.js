class a10 {
  static extraDelay = 0;
  static #delay100 = 100 + this.extraDelay;
  static #kuKeycodes = {
    1: 3015,
    2: 3016,
    3: 3017,
    4: 3018,
    5: 3019,
    6: 3020,
    7: 3021,
    8: 3022,
    9: 3023,
    0: 3024,
    " ": 3057,
    ".": 3025,
    ",": 3025,
    "/": 3026,
    a: 3027,
    b: 3028,
    c: 3029,
    d: 3030,
    e: 3031,
    f: 3032,
    g: 3033,
    h: 3034,
    i: 3035,
    j: 3036,
    k: 3037,
    l: 3038,
    m: 3039,
    n: 3040,
    o: 3041,
    p: 3042,
    q: 3043,
    r: 3044,
    s: 3045,
    t: 3046,
    u: 3047,
    v: 3048,
    w: 3049,
    x: 3050,
    y: 3051,
    z: 3052,
  };
  static #codesPayload = [];

  static #addKeyboardCode(character) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined)
      this.#codesPayload.push({
        device: 9,
        code: characterCode,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];
    this.#codesPayload.push(
      {
        device: 9,
        code: 3011,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      },
      {
        device: 9,
        code: 3005,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      },
    );

    for (const waypoint of waypoints) {
      this.#codesPayload.push({
        device: 9,
        code: 3007,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //Type hem
      if (waypoint.latHem === "N") {
        this.#codesPayload.push({
          device: 9,
          code: 3040,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 9,
          code: 3045,
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
      this.#codesPayload.push({
        device: 9,
        code: 3003,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //Type hem
      if (waypoint.longHem === "E") {
        this.#codesPayload.push({
          device: 9,
          code: 3031,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 9,
          code: 3049,
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
      this.#codesPayload.push({
        device: 9,
        code: 3004,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //Type name
      const waypointNameLength =
        waypoint.name.length < 12 ? waypoint.name.length : 12;
      for (let i = 0; i < waypointNameLength; i++) {
        this.#addKeyboardCode(waypoint.name.charAt(i));
      }
      //Enter name
      this.#codesPayload.push({
        device: 9,
        code: 3005,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }

    return this.#codesPayload;
  }
}

export default a10;
