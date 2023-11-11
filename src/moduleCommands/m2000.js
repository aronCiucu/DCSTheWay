class m2000 {
  static extraDelay = 0;
  static #delay100 = 100 + this.extraDelay;
  static #kuKeycodes = {
    1: 3584,
    2: 3585,
    3: 3586,
    4: 3587,
    5: 3588,
    6: 3589,
    7: 3590,
    8: 3591,
    9: 3592,
    0: 3593,
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
    for (const waypoint of waypoints) {
      this.#codesPayload.push(
        {
          device: 9,
          code: 3574,
          delay: this.#delay100,
          activate: 0.4,
          addDepress: "false",
        },
        {
          device: 9,
          code: 3110,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
        {
          device: 9,
          code: 3570,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
        {
          device: 9,
          code: 3570,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
        {
          device: 9,
          code: 3584,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
      );
      //Type hem
      if (waypoint.latHem === "N") {
        this.#codesPayload.push({
          device: 9,
          code: 3585,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 9,
          code: 3591,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
      //type lat
      for (let i = 0; i < waypoint.lat.length; i++) {
        this.#addKeyboardCode(waypoint.lat.charAt(i));
      }
      this.#codesPayload.push({
        device: 9,
        code: 3596,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      this.#codesPayload.push({
        device: 9,
        code: 3586,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //Type hem
      if (waypoint.longHem === "E") {
        this.#codesPayload.push({
          device: 9,
          code: 3589,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 9,
          code: 3587,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
      //type long
      for (let i = 0; i < waypoint.long.length; i++) {
        this.#addKeyboardCode(waypoint.long.charAt(i));
      }
      this.#codesPayload.push({
        device: 9,
        code: 3596,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      this.#codesPayload.push({
        device: 9,
        code: 3574,
        delay: this.#delay100,
        activate: 0.3,
        addDepress: "false",
      });
      this.#codesPayload.push(
        {
          device: 9,
          code: 3584,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
        {
          device: 9,
          code: 3584,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        },
      );
      //type elev
      for (let i = 0; i < waypoint.elev.length; i++) {
        this.#addKeyboardCode(waypoint.elev.charAt(i));
      }
      this.#codesPayload.push({
        device: 9,
        code: 3596,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }
    return this.#codesPayload;
  }
}

export default m2000;
