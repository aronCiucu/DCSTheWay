class ka50 {
  static extraDelay = 0;
  static #delay100 = 100 + this.extraDelay;
  static #kuKeycodes = {
    1: 3002,
    2: 3003,
    3: 3004,
    4: 3005,
    5: 3006,
    6: 3007,
    7: 3008,
    8: 3009,
    9: 3010,
    0: 3001,
  };
  static #codesPayload = [];

  static #addKeyboardCode(character) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined)
      this.#codesPayload.push({
        device: 20,
        code: characterCode,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
  }

  static createButtonCommands(waypoints) {
    /*
                   button list, all are device 20
                   Waypoint button 	3011
                   Enter 			3018
                   PVI mode ENT 	3026 rotary value 0.2
                   PVI Mode OPER 	3026 rotary value 0.3

                   0/+     3001 +for north and east
                   1/-     3002 -for south and west
                   2       3003
                   3       3004
                   4       3005
                   5       3006
                   6       3007
                   7       3008
                   8       3009
                   9       3010

                   */
    this.#codesPayload = [];
    this.#codesPayload.push(
      //PVI to Entry mode
      {
        device: 20,
        code: 3026,
        delay: this.#delay100,
        activate: 0.2,
        addDepress: "false",
      },
      //Press waypoint button
      {
        device: 20,
        code: 3011,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      },
    );

    for (let i = 1; i <= waypoints.length; i++) {
      //Press the corresponding waypoint number
      // eslint-disable-next-line default-case
      switch (i) {
        case 1: {
          this.#codesPayload.push({
            device: 20,
            code: 3002,
            delay: this.#delay100,
            activate: 1,
            addDepress: "true",
          });
          break;
        }
        case 2: {
          this.#codesPayload.push({
            device: 20,
            code: 3003,
            delay: this.#delay100,
            activate: 1,
            addDepress: "true",
          });
          break;
        }
        case 3: {
          this.#codesPayload.push({
            device: 20,
            code: 3004,
            delay: this.#delay100,
            activate: 1,
            addDepress: "true",
          });
          break;
        }
        case 4: {
          this.#codesPayload.push({
            device: 20,
            code: 3005,
            delay: this.#delay100,
            activate: 1,
            addDepress: "true",
          });
          break;
        }
        case 5: {
          this.#codesPayload.push({
            device: 20,
            code: 3006,
            delay: this.#delay100,
            activate: 1,
            addDepress: "true",
          });
          break;
        }
        case 6: {
          this.#codesPayload.push({
            device: 20,
            code: 3007,
            delay: this.#delay100,
            activate: 1,
            addDepress: "true",
          });
          break;
        }
      }
      //Type hem
      if (waypoints[i - 1].latHem === "N") {
        this.#codesPayload.push({
          device: 20,
          code: 3001,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 20,
          code: 3002,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
      //type lat
      for (let j = 0; j < waypoints[i - 1].lat.length; j++) {
        this.#addKeyboardCode(waypoints[i - 1].lat.charAt(j));
      }
      //Type hem
      if (waypoints[i - 1].longHem === "E") {
        this.#codesPayload.push({
          device: 20,
          code: 3001,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 20,
          code: 3002,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
      //type long
      for (let j = 0; j < waypoints[i - 1].long.length; j++) {
        this.#addKeyboardCode(waypoints[i - 1].long.charAt(j));
      }
      //Press Enter
      this.#codesPayload.push({
        device: 20,
        code: 3018,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }
    //PVI to OPER
    this.#codesPayload.push({
      device: 20,
      code: 3026,
      delay: this.#delay100,
      activate: 0.3,
      addDepress: "false",
    });
    return this.#codesPayload;
  }
}

export default ka50;
