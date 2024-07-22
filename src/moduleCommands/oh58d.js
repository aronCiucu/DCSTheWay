import createButtonPress from "../models/ButtonPress";

class oh58d {
  static extraDelay = 100;
  static #delay100 = 100 + this.extraDelay;
  static slotVariant = "";
  static #oh58dkeycodes = {
    // Keyboard keys (device 14)
    a: 3063,
    b: 3064,
    c: 3065,
    d: 3066,
    e: 3067,
    f: 3068,
    g: 3069,
    h: 3070,
    i: 3071,
    j: 3072,
    k: 3073,
    l: 3074,
    m: 3075,
    n: 3076,
    o: 3077,
    p: 3078,
    q: 3079,
    r: 3080,
    s: 3081,
    t: 3082,
    u: 3083,
    v: 3084,
    w: 3085,
    x: 3086,
    y: 3087,
    z: 3088,
    // number keys
    0: 3062,
    1: 3053,
    2: 3054,
    3: 3055,
    4: 3056,
    5: 3057,
    6: 3058,
    7: 3059,
    8: 3060,
    9: 3061,
    // special keys
    " ": 3094,
    ".": 3090,
    "-": 3095,
    enter: 3089,
    clear: 3091,
    // pilot MFD (device 11) copilot MFD (device 23)
    vsd: 3008,
    hsd: 3009,
    l1: 3001,
    l2: 3002,
    l3: 3003,
    l4: 3004,
    l5: 3005,

    r1: 3013,
    r2: 3014,
    r3: 3015,
    r4: 3016,
    r5: 3017,
  };
  static #codesPayload = [];

  static #isPilot() {
    return this.slotVariant === "OH58Dright-seat";
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];
    this.#codesPayload.push(
      // enter nav setup on pilot MFD
      createButtonPress(
        this.#isPilot() ? 11 : 23,
        this.#oh58dkeycodes["hsd"],
        this.#delay100,
      ),
      createButtonPress(
        this.#isPilot() ? 11 : 23,
        this.#oh58dkeycodes["r2"],
        this.#delay100,
      ),
      createButtonPress(
        this.#isPilot() ? 11 : 23,
        this.#oh58dkeycodes["l4"],
        this.#delay100,
      ),
    );

    for (const waypoint of waypoints) {
      this.#codesPayload.push(
        // enter waypoint
        createButtonPress(
          this.#isPilot() ? 11 : 23,
          this.#oh58dkeycodes["l2"],
          this.#delay100,
        ),
        createButtonPress(14, this.#oh58dkeycodes["clear"], this.#delay100),
      );
      const [zone, squareId, easting, northing] = waypoint.MGRS.split(" ");
      let convertedWaypoint = `${zone} ${squareId} ${easting.slice(
        0,
        4,
      )} ${northing.slice(0, 4)}`;
      for (let i = 0; i < convertedWaypoint.length; i++) {
        if (convertedWaypoint.charAt(i) !== " ") {
          this.#codesPayload.push(
            // enter each digit of MGRS into scratchpad
            createButtonPress(
              14,
              this.#oh58dkeycodes[convertedWaypoint.charAt(i).toLowerCase()],
              this.#delay100,
            ),
          );
        }
      }
      this.#codesPayload.push(
        // enter MGRS into UFC
        createButtonPress(14, this.#oh58dkeycodes["enter"], this.#delay100),
      );

      this.#codesPayload.push(
        // select altitude on mfd
        createButtonPress(
          this.#isPilot() ? 11 : 23,
          this.#oh58dkeycodes["l4"],
          this.#delay100,
        ),
        createButtonPress(14, this.#oh58dkeycodes["clear"], this.#delay100), // clear current alt
      );

      for (let i = 0; i < waypoint.elev.length; i++) {
        // enter in waypoint elevation
        this.#codesPayload.push(
          createButtonPress(
            14,
            this.#oh58dkeycodes[waypoint.elev.charAt(i).toLowerCase()],
            this.#delay100,
          ),
        );
      }

      this.#codesPayload.push(
        // press enter on scratchpad
        createButtonPress(14, this.#oh58dkeycodes["enter"], this.#delay100),
        createButtonPress(
          this.#isPilot() ? 11 : 23,
          this.#oh58dkeycodes["r5"],
          this.#delay100,
        ),
      );
    }

    this.#codesPayload.push(
      // exit nav setup on pilot MFD
      createButtonPress(
        this.#isPilot() ? 11 : 23,
        this.#oh58dkeycodes["vsd"],
        this.#delay100,
      ),
    );

    return this.#codesPayload;
  }
}

export default oh58d;
