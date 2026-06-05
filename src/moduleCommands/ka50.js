class ka50 {
  static slotVariant = ""; // Slot variant should be 'ka50WPT' or 'ka50TGT'
  static extraDelay = 0;
  static #delay100 = 100 + this.extraDelay;
  static #kuKeycodes = {
    1: 3002,  // Start waypoints from 3002 (button 1)
    2: 3003,
    3: 3004,
    4: 3005,
    5: 3006,
    6: 3007,
    7: 3008,
    8: 3009,
    9: 3010,
    0: 3001,  // Button 0 for the 10th targetpoint
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
    // Clear the payload for each call
    this.#codesPayload = [];
    
    // PVI to Entry mode
    this.#codesPayload.push(
      {
        device: 20,
        code: 3026,
        delay: this.#delay100,
        activate: 0.2,
        addDepress: "false",
      },
      // Conditionally press the waypoint or targetpoint button
      {
        device: 20,
        code: this.slotVariant === "ka50TGT" ? 3017 : 3011, // Press button 3017 for targetpoints, 3011 for waypoints
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      }
    );

    // Determine the max number of points based on the slotVariant
    const maxPoints = this.slotVariant === "ka50TGT" ? 10 : 6;

    // Process waypoints (or targetpoints if slotVariant is set to 'ka50TGT')
    for (let i = 1; i <= Math.min(waypoints.length, maxPoints); i++) {
      // For waypoints: Start from button 3002 (i=1 maps to 3002, i=2 maps to 3003, etc.)
      // For targetpoints: Continue from button 3001 to 3010 for 10 points
      const buttonCode = this.slotVariant === "ka50TGT" ? 3001 + (i % 10) : 3002 + (i - 1);

      this.#codesPayload.push({
        device: 20,
        code: buttonCode,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      // Type latitude hemisphere (N/S)
      this.#codesPayload.push({
        device: 20,
        code: waypoints[i - 1].latHem === "N" ? 3001 : 3002,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      // Type latitude
      for (let j = 0; j < waypoints[i - 1].lat.length; j++) {
        this.#addKeyboardCode(waypoints[i - 1].lat.charAt(j));
      }

      // Type longitude hemisphere (E/W)
      this.#codesPayload.push({
        device: 20,
        code: waypoints[i - 1].longHem === "E" ? 3001 : 3002,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      // Type longitude
      for (let j = 0; j < waypoints[i - 1].long.length; j++) {
        this.#addKeyboardCode(waypoints[i - 1].long.charAt(j));
      }

      // Press Enter
      this.#codesPayload.push({
        device: 20,
        code: 3018,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }

    // PVI to OPER
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