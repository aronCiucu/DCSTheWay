class av8b {
  static extraDelay = 0;
  static #delay100 = 100 + this.extraDelay;
  static #kuKeycodes = {
    1: 3302,
    2: 3303,
    3: 3304,
    4: 3306,
    5: 3307,
    6: 3308,
    7: 3310,
    8: 3311,
    9: 3312,
    0: 3315,
  };
  static #codesPayload = [];

  static #addKeyboardCode(character) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined)
      this.#codesPayload.push({
        device: 23,
        code: characterCode,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];
    this.#codesPayload.push(
      //nav mode
      {
        device: 12,
        code: 3282,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      },
      //left MFD menu
      {
        device: 26,
        code: 3217,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      },
      //EHSD
      {
        device: 26,
        code: 3201,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      },
      //DATA
      {
        device: 26,
        code: 3201,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      },
    );
    for (const waypoint of waypoints) {
      //increment
      this.#codesPayload.push(
        {
          device: 23,
          code: 3312,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
        {
          device: 23,
          code: 3312,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
        //ENT
        {
          device: 23,
          code: 3314,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
        //ODU 2
        {
          device: 24,
          code: 3251,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
      );
      //Type hem
      if (waypoint.latHem === "N") {
        this.#codesPayload.push({
          device: 23,
          code: 3303,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 23,
          code: 3311,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
      //type lat
      for (let i = 0; i < waypoint.lat.length; i++) {
        this.#addKeyboardCode(waypoint.lat.charAt(i));
      }
      this.#codesPayload.push(
        //ENT
        {
          device: 23,
          code: 3314,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
      );
      //Type hem
      if (waypoint.longHem === "E") {
        this.#codesPayload.push({
          device: 23,
          code: 3308,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 23,
          code: 3306,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
      //type long
      for (let i = 0; i < waypoint.long.length; i++) {
        this.#addKeyboardCode(waypoint.long.charAt(i));
      }
      this.#codesPayload.push(
        //ENT
        {
          device: 23,
          code: 3314,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
      );
      // Select elevation
      this.#codesPayload.push({
        device: 24,
        code: 3252,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //type elevation
      for (let i = 0; i < waypoint.elev.length; i++) {
        this.#addKeyboardCode(waypoint.elev.charAt(i));
      }
      this.#codesPayload.push(
        //ENT
        {
          device: 23,
          code: 3314,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
      );
      this.#codesPayload.push(
        //revert to selection mode
        {
          device: 24,
          code: 3250,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
      );
    }
    this.#codesPayload.push(
      //deselect DATA
      {
        device: 26,
        code: 3201,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      },
    );
    return this.#codesPayload;
  }
}

export default av8b;
