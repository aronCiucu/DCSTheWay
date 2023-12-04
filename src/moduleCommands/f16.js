import createButtonPress from "../models/ButtonPress";

class f16 {
  static extraDelay = 0;
  static #delay150 = 150 + this.extraDelay;
  static #delay10 = 10 + this.extraDelay;
  static #kuKeycodes = {
    1: 3003,
    2: 3004,
    3: 3005,
    4: 3006,
    5: 3007,
    6: 3008,
    7: 3009,
    8: 3010,
    9: 3011,
    0: 3002,
  };
  static #codesPayload = [];

  static #addKeyboardCode(character) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined)
      this.#codesPayload.push(
        createButtonPress(17, characterCode, this.#delay10),
      );
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];
    this.#codesPayload.push(
      createButtonPress(17, 3032, this.#delay150, -1),
      createButtonPress(17, 3006, this.#delay150),
    );
    for (const waypoint of waypoints) {
      this.#codesPayload.push(
        createButtonPress(17, 3030, this.#delay150),
        createButtonPress(17, 3035, this.#delay150, -1),
        createButtonPress(17, 3035, this.#delay150, -1),
      );
      //Type hem
      if (waypoint.latHem === "N") {
        this.#codesPayload.push(createButtonPress(17, 3004, this.#delay10));
      } else {
        this.#codesPayload.push(createButtonPress(17, 3010, this.#delay10));
      }

      for (let i = 0; i < waypoint.lat.length; i++) {
        // Type Latitude into UFC
        this.#addKeyboardCode(waypoint.lat.charAt(i));
      }

      //enter
      this.#codesPayload.push(createButtonPress(17, 3016, this.#delay10));
      //dobber to long
      this.#codesPayload.push(createButtonPress(17, 3035, this.#delay150, -1));
      //Type hem
      if (waypoint.longHem === "E") {
        this.#codesPayload.push(createButtonPress(17, 3008, this.#delay10));
      } else {
        this.#codesPayload.push(createButtonPress(17, 3006, this.#delay10));
      }

      //type long
      for (let i = 0; i < waypoint.long.length; i++) {
        // Type Longtitude into UFC
        this.#addKeyboardCode(waypoint.long.charAt(i));
      }

      //enter
      this.#codesPayload.push(createButtonPress(17, 3016, this.#delay10));
      //dobber to elev
      this.#codesPayload.push(createButtonPress(17, 3035, this.#delay150, -1));

      //type elev
      for (let i = 0; i < waypoint.elev.length; i++) {
        // Type Elevation into UFC
        this.#addKeyboardCode(waypoint.elev.charAt(i));
      }

      //enter
      this.#codesPayload.push(createButtonPress(17, 3016, this.#delay10));
      //back to steerpoint field
      this.#codesPayload.push(
        createButtonPress(17, 3034, this.#delay150),
        createButtonPress(17, 3034, this.#delay150),
        createButtonPress(17, 3034, this.#delay150),
        createButtonPress(17, 3034, this.#delay150),
      );
    }

    //main page
    this.#codesPayload.push(createButtonPress(17, 3032, this.#delay150, -1));

    return this.#codesPayload;
  }
}

export default f16;
