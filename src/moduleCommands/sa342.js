class sa342 {
  static extraDelay = 0;
  static #delay50 = 50;
  static #delay100 = 100 + this.extraDelay;
  static #delay200 = 200 + this.extraDelay;
  static #delay500 = 500 + this.extraDelay;
  static #kuKeycodes = {
    1: 3010,
    2: 3011, //N
    3: 3012,
    4: 3013, //W
    5: 3014,
    6: 3015, //E
    7: 3016,
    8: 3017, //S
    9: 3018,
    0: 3009,
    DOWN: 3008,
    ENT: 3004,
    DEL: 3023,
  };
  static #codesPayload = [];

  static #addKeyboardCode(character) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined)
      this.#codesPayload.push({
        device: 22,
        code: characterCode,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];
    this.#codesPayload.push({
      device: 22,
      code: 3003,
      delay: this.#delay100,
      activate: 1,
      addDepress: "false",
    });

    for (let index = 0; index < waypoints.length; index++) {
      const waypoint = waypoints[index]; // Access the waypoint using the index
      const waypointNumber = index + 1; // Use the index to get the waypoint number starting at 1

      // Use the loop number as the waypoint name
      const waypointName = waypointNumber.toString(); // Convert the waypoint number to string

      for (let i = 0; i < Math.min(waypointName.length, 9); i++) {
        this.#addKeyboardCode(waypointName.charAt(i)); // Type the waypoint number
      }

      // Press ENT to edit waypoint
      this.#codesPayload.push({
        device: 22,
        code: 3004,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      // Press DEL*6 to Delete Waypoint data
      for (let i = 0; i < 10; i++) {
         this.#codesPayload.push({
          device: 22,
          code: 3023,
          delay: this.#delay100,
          activate: 1,
          addDepress: "false",
        });
        this.#codesPayload.push({
          device: 22,
          code: 3023,
          delay: this.#delay100,
          activate: 0,
          addDepress: "false",
        });
      }

      // Type hem
      if (waypoint.latHem === "N") {
        this.#codesPayload.push({
          device: 22,
          code: 3011,
          delay: this.#delay200,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 22,
          code: 3017,
          delay: this.#delay200,
          activate: 1,
          addDepress: "true",
        });
      }

      // Type lat
      for (let i = 0; i < waypoint.lat.length; i++) {
        waypoint.lat.charAt(i) !== "." &&
          this.#addKeyboardCode(waypoint.lat.charAt(i));
      }

        // Press the Down arrow For Longitude
        this.#codesPayload.push({
          device: 22,
          code: 3008,
          delay: this.#delay500,
          activate: 1,
          addDepress: "true",
        });

       // Press DEL*7 to Delete Waypoint data
        for (let i = 0; i < 10; i++) {
         this.#codesPayload.push({
          device: 22,
          code: 3023,
          delay: this.#delay100,
          activate: 1,
          addDepress: "false",
        });
        this.#codesPayload.push({
          device: 22,
          code: 3023,
          delay: this.#delay100,
          activate: 0,
          addDepress: "false",
        });
      }

      // Type long hem
      if (waypoint.longHem === "E") {
        this.#codesPayload.push({
          device: 22,
          code: 3015,
          delay: this.#delay200,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: 22,
          code: 3013,
          delay: this.#delay200,
          activate: 1,
          addDepress: "true",
        });
      }

      // Type long
      for (let i = 0; i < waypoint.long.length; i++) {
        waypoint.long.charAt(i) !== "." &&
          this.#addKeyboardCode(waypoint.long.charAt(i));
      }

      //Press Enter
      this.#codesPayload.push({
        device: 22,
        code: 3004,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }

    return this.#codesPayload;
  }
}

export default sa342;
