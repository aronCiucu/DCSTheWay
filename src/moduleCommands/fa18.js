class fa18 {
  static extraDelay = 0;
  static #delay100 = this.extraDelay + 100;
  static #delay200 = this.extraDelay + 200;
  static #delay500 = this.extraDelay + 500;
  static #delay800 = this.extraDelay + 800;
  static #delay1000 = this.extraDelay + 1000;
  static #kuKeycodes = {
    1: 3019,
    2: 3020,
    3: 3021,
    4: 3022,
    5: 3023,
    6: 3024,
    7: 3025,
    8: 3026,
    9: 3027,
    0: 3018,
  };
  static #codesPayload = [];

  static #addKeyboardCode(character) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined)
      this.#codesPayload.push({
        device: 25,
        code: characterCode,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];
    //enter the SUPT menu
    this.#codesPayload.push({
      device: 37,
      code: 3028,
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });
    this.#codesPayload.push({
      device: 37,
      code: 3028,
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });
    //select HSD
    this.#codesPayload.push({
      device: 37,
      code: 3012,
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });
    //select DATA
    this.#codesPayload.push({
      device: 37,
      code: 3020,
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });

    for (const waypoint of waypoints) {
      //increment waypoint
      this.#codesPayload.push({
        device: 37,
        code: 3022,
        delay: this.#delay500,
        activate: 1,
        addDepress: "true",
      });
      //press UFC
      this.#codesPayload.push({
        device: 37,
        code: 3015,
        delay: this.#delay800,
        activate: 1,
        addDepress: "true",
      });
      //press position 1
      this.#codesPayload.push({
        device: 25,
        code: 3010,
        delay: this.#delay200,
        activate: 1,
        addDepress: "true",
      });
      //Type hem
      if (waypoint.latHem === "N") {
        this.#codesPayload.push({
          device: 25,
          code: 3020,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 25,
          code: 3026,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
      //enter first lat digits
      const firstLat = waypoint.lat.substring(0, waypoint.lat.length - 5);
      const last4Lat = waypoint.lat.substring(waypoint.lat.length - 5);
      //Type lat
      for (let i = 0; i < firstLat.length; i++) {
        this.#addKeyboardCode(firstLat.charAt(i));
      }
      //press enter
      this.#codesPayload.push({
        device: 25,
        code: 3029,
        delay: this.#delay1000,
        activate: 1,
        addDepress: "true",
      });
      //enter last 4 digits
      for (let i = 0; i < last4Lat.length; i++) {
        this.#addKeyboardCode(last4Lat.charAt(i));
      }
      //press enter
      this.#codesPayload.push({
        device: 25,
        code: 3029,
        delay: this.#delay1000,
        activate: 1,
        addDepress: "true",
      });
      //Type hem
      if (waypoint.longHem === "E") {
        this.#codesPayload.push({
          device: 25,
          code: 3024,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 25,
          code: 3022,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
      //enter first long digits

      const firstLong = waypoint.long.substring(0, waypoint.long.length - 4);
      const last4Long = waypoint.long.substring(waypoint.long.length - 4);
      //Type long
      for (let i = 0; i < firstLong.length; i++) {
        this.#addKeyboardCode(firstLong.charAt(i));
      }
      //press enter
      this.#codesPayload.push({
        device: 25,
        code: 3029,
        delay: this.#delay1000,
        activate: 1,
        addDepress: "true",
      });
      //enter last 4 digits
      for (let i = 0; i < last4Long.length; i++) {
        this.#addKeyboardCode(last4Long.charAt(i));
      }
      //press enter
      this.#codesPayload.push({
        device: 25,
        code: 3029,
        delay: this.#delay1000,
        activate: 1,
        addDepress: "true",
      });
      //press position 3 to select elevation
      this.#codesPayload.push({
        device: 25,
        code: 3012,
        delay: this.#delay200,
        activate: 1,
        addDepress: "true",
      });
      //press position 1 to select feet
      this.#codesPayload.push({
        device: 25,
        code: 3010,
        delay: this.#delay200,
        activate: 1,
        addDepress: "true",
      });
      //Type elev
      for (let i = 0; i < waypoint.elev.length; i++) {
        this.#addKeyboardCode(waypoint.elev.charAt(i));
      }
      //press enter
      this.#codesPayload.push({
        device: 25,
        code: 3029,
        delay: this.#delay500,
        activate: 1,
        addDepress: "true",
      });
    }

    return this.#codesPayload;
  }
}

export default fa18;
