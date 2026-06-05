// ============================================================
// NS430 waypoint entry helpers
// Shared across aircraft that host the ED NS430
// ============================================================

class ns430 {

  // ============================================================
  // MODULE METADATA
  // ============================================================

  static slotVariant = "";
  static #device = 257;
  static extraDelay = 0;

  static #buttondown = 100;
  static #buttonup = 200;

  static #rotarydown = 150;
  static #rotaryup = 100;

  static #rotarypushdown = 200;
  static #rotarypushup = 200;

  static #holdup = 3000;

  // ============================================================
  // NS430 COMMAND CODES
  // ============================================================

  static #codes = {
    CLRD: 3023,
    CLRU: 3044,
    DIRD: 3021,
    DIRU: 3042,
    ENTD: 3024,
    ENTU: 3045,
    FPLD: 3017,
    FPLU: 3038,
    MENUD: 3022,
    MENUU: 3043,
    MSGU: 3016,
    MSGD: 3037,
    RIGHT_BIG: 3026,
    RIGHT_SMALL: 3028,
    RIGHT_SMALL_PUSHD: 3027,
    RIGHT_SMALL_PUSHU: 3046,
  };

  static #codesPayload = [];
  static #lastEnteredName = "     ";

  // ============================================================
  // CHARACTER SETS
  // ============================================================

  static #nameCharset = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  static #coordCharsets = [
    "NS",
    "012345678",
    "0123456789",
    "012345",
    "0123456789",
    "0123456789",
    "0123456789",
    "EW",
    "01",
    "01234567",
    "0123456789",
    "012345",
    "0123456789",
    "0123456789",
    "0123456789",
  ];

  // ============================================================
  // PAYLOAD MANAGEMENT
  // ============================================================

  static resetPayload() {
    this.#codesPayload = [];
  }

  static getPayload() {
    return this.#codesPayload.slice();
  }

  // ============================================================
  // LOW LEVEL INPUT HELPERS
  // ============================================================

  static #pause(ms) {
    this.#codesPayload.push({
      device: 0,
      code: 0,
      delay: ms,
      activate: 0,
    });
  }

  static #button(
    codeDown,
    codeUp,
    downMs = this.#buttondown,
    upMs = this.#buttonup,
  ) {
    this.#codesPayload.push({
      device: this.#device,
      code: codeDown,
      delay: downMs,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device: this.#device,
      code: codeUp,
      delay: upMs,
      activate: 0,
      addDepress: "false",
    });
  }

  static #rotary(
    code,
    dir,
    addDepress = "false",
    downMs = this.#rotarydown,
    upMs = this.#rotaryup,
  ) {
    this.#codesPayload.push({
      device: this.#device,
      code,
      delay: downMs,
      activate: dir,
      addDepress,
    });
    this.#codesPayload.push({
      device: this.#device,
      code,
      delay: upMs,
      activate: 0,
      addDepress,
    });
  }

  static #rotaryPush(
    codeDown,
    codeUp,
    downMs = this.#rotarypushdown,
    upMs = this.#rotarypushup,
  ) {
    this.#codesPayload.push({
      device: this.#device,
      code: codeDown,
      delay: downMs,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device: this.#device,
      code: codeUp,
      delay: upMs,
      activate: 0,
      addDepress: "false",
    });
  }

  static #holdButton(
    codeDown,
    codeUp,
    holdMs = this.#holdup,
    upMs = this.#buttonup,
  ) {
    this.#codesPayload.push({
      device: this.#device,
      code: codeDown,
      delay: holdMs,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device: this.#device,
      code: codeUp,
      delay: upMs,
      activate: 0,
      addDepress: "false",
    });
  }

  // ============================================================
  // NAMED BUTTON / ROTARY HELPERS
  // ============================================================

  static #CLR() {
    this.#button(this.#codes.CLRD, this.#codes.CLRU);
  }

  static #DIR() {
    this.#button(this.#codes.DIRD, this.#codes.DIRU);
  }

  static #ENT(releaseMs = this.#buttonup) {
    this.#button(
      this.#codes.ENTD,
      this.#codes.ENTU,
      this.#buttondown,
      releaseMs,
    );
  }

  static #FPL() {
    this.#button(this.#codes.FPLD, this.#codes.FPLU);
  }

  static #MENU() {
    this.#button(this.#codes.MENUD, this.#codes.MENUU);
  }

  static #MSG() {
    this.#button(this.#codes.MSGD, this.#codes.MSGU);
  }

  static #BIGr(addDepress = "false") {
    this.#rotary(
      this.#codes.RIGHT_BIG,
      1,
      addDepress,
      this.#rotarydown,
      this.#rotaryup,
    );
  }

  static #BIGl(addDepress = "false") {
    this.#rotary(
      this.#codes.RIGHT_BIG,
      -1,
      addDepress,
      this.#rotarydown,
      this.#rotaryup,
    );
  }

  static #SMALLr(addDepress = "false") {
    this.#rotary(
      this.#codes.RIGHT_SMALL,
      1,
      addDepress,
      this.#rotarydown,
      this.#rotaryup,
    );
  }

  static #SMALLl(addDepress = "false") {
    this.#rotary(
      this.#codes.RIGHT_SMALL,
      -1,
      addDepress,
      this.#rotarydown,
      this.#rotaryup,
    );
  }

  static #SMALLp() {
    this.#rotaryPush(
      this.#codes.RIGHT_SMALL_PUSHD,
      this.#codes.RIGHT_SMALL_PUSHU,
      this.#rotarypushdown,
      this.#rotarypushup,
    );
  }

  static #holdCLR() {
    this.#holdButton(
      this.#codes.CLRD,
      this.#codes.CLRU,
      this.#holdup,
      this.#buttonup,
    );
  }

  // ============================================================
  // AUTOMATIC / CALCULATION HELPERS
  // ============================================================

  static #indexInCharset(charset, ch) {
    const idx = charset.indexOf(ch);
    return idx >= 0 ? idx : 0;
  }

  static #shortestSteps(from, to, charset) {
    const len = charset.length;
    const a = this.#indexInCharset(charset, from);
    const b = this.#indexInCharset(charset, to);
    const cw = (b - a + len) % len;
    const ccw = cw - len;
    return Math.abs(cw) <= Math.abs(ccw) ? cw : ccw;
  }

  static #sanitizeName(name) {
    return String(name || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, " ")
      .padEnd(5, " ")
      .slice(0, 5);
  }

  static #formatDecimalDegreesToEditableChars(value, isLat) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
      throw new Error(
        `Invalid ${isLat ? "latitude" : "longitude"} snapshot value: ${value}`,
      );
    }

    const hemi = numericValue >= 0
      ? (isLat ? "N" : "E")
      : (isLat ? "S" : "W");

    let absValue = Math.abs(numericValue);
    let degrees = Math.floor(absValue);
    let minutesHundredths = Math.round((absValue - degrees) * 60 * 100);

    if (minutesHundredths >= 6000) {
      degrees += 1;
      minutesHundredths = 0;
    }

    const maxDegrees = isLat ? 89 : 179;
    if (degrees > maxDegrees) {
      degrees = maxDegrees;
      minutesHundredths = 5999;
    }

    const degreeWidth = isLat ? 2 : 3;
    const degreeDigits = String(degrees).padStart(degreeWidth, "0");
    const minuteWhole = Math.floor(minutesHundredths / 100);
    const minuteDecimal = minutesHundredths % 100;
    const minuteDigits =
      `${String(minuteWhole).padStart(2, "0")}${String(minuteDecimal).padStart(2, "0")}`;

    return [hemi, ...degreeDigits.split(""), ...minuteDigits.split("")];
  }

  static #formatWaypointFieldToEditableChars(coordText, hemi, isLat) {
    const safeHemi = String(hemi || (isLat ? "N" : "E")).toUpperCase();
    const digitsOnly = String(coordText || "").replace(/\D/g, "");
    const expectedLength = isLat ? 6 : 7;
    const paddedDigits = digitsOnly.padStart(expectedLength, "0").slice(-expectedLength);
    return [safeHemi, ...paddedDigits.split("")];
  }

  static #waypointToTargetChars(waypoint) {
    const latHem = waypoint?.latHemi || waypoint?.latHem || "N";
    const longHem = waypoint?.longHemi || waypoint?.longHem || "E";

    const latChars = this.#formatWaypointFieldToEditableChars(
      waypoint?.lat,
      latHem,
      true,
    );
    const longChars = this.#formatWaypointFieldToEditableChars(
      waypoint?.long,
      longHem,
      false,
    );

    return [...latChars, ...longChars];
  }

  static #snapshotToCurrentChars(snapshot) {
    const latValue = snapshot?.lat ?? snapshot?.Lat ?? snapshot?.latitude;
    const longValue = snapshot?.long ?? snapshot?.lon ?? snapshot?.Long ?? snapshot?.longitude;

    const latChars = this.#formatDecimalDegreesToEditableChars(latValue, true);
    const longChars = this.#formatDecimalDegreesToEditableChars(longValue, false);

    return [...latChars, ...longChars];
  }

  static #turnSmallBySteps(steps) {
    if (steps === 0) {
      return;
    }

    const stepFn = steps > 0 ? this.#SMALLr.bind(this) : this.#SMALLl.bind(this);
    for (let s = 0; s < Math.abs(steps); s += 1) {
      stepFn();
    }
  }

  static #setCharacter(fromChar, toChar, charset) {
    const steps = this.#shortestSteps(fromChar, toChar, charset);
    this.#turnSmallBySteps(steps);
    return toChar;
  }

  static #applyNameCharacter(current, target, index) {
    const previousChar = current[index];
    current[index] = this.#setCharacter(
      previousChar,
      target[index],
      this.#nameCharset,
    );

    if (previousChar !== target[index]) {
      for (let j = index + 1; j < current.length; j += 1) {
        current[j] = " ";
      }
    }
  }

  static #enterNameAutomatically(name) {
    const target = this.#sanitizeName(name).split("");
    const current = this.#lastEnteredName.split("");

    for (let i = 0; i < current.length; i += 1) {
      this.#applyNameCharacter(current, target, i);

      if (i < current.length - 1) {
        this.#BIGr();
      }
    }

    this.#lastEnteredName = target.join("");
  }

  static #enterFlightPlanWaypointName(name) {
    const target = this.#sanitizeName(name).split("");
    const current = ["K", " ", " ", " ", " "];

    for (let i = 0; i < current.length; i += 1) {
      current[i] = this.#setCharacter(
        current[i],
        target[i],
        this.#nameCharset,
      );

      if (i < current.length - 1) {
        this.#BIGr();
      }
    }
  }

  static #enterCoordinatesAutomatically(current, target) {
    current[0] = this.#setCharacter(current[0], target[0], this.#coordCharsets[0]);

    this.#pause(100);
    this.#BIGr();
    this.#pause(100);

    for (let i = 1; i < this.#coordCharsets.length; i += 1) {
      current[i] = this.#setCharacter(current[i], target[i], this.#coordCharsets[i]);

      if (i < this.#coordCharsets.length - 1) {
        this.#BIGr();
      }
    }
  }

  // =================================================================================================================================================================
  // INITIAL SETUP COMMANDS
  // =================================================================================================================================================================

  static buildSetupCommands(deletePasses = 10) {
    this.resetPayload();
    this.#lastEnteredName = "     ";

    this.#CLR();
    this.#SMALLr();
    this.#SMALLl();
    this.#BIGr();
    this.#BIGl();
    this.#pause(100);

    // DELETE CURRENT FLIGHT PLAN
    this.#FPL();
    this.#MENU();
    this.#SMALLr();
    this.#SMALLr();
    this.#SMALLr();
    this.#ENT();
    this.#ENT();
    this.#SMALLp();
    this.#pause(300);

    //DELETE CURRENT USER WAYPOINTS X10 
    this.#holdCLR();
    this.#BIGr();

    for (let i = 0; i < 10; i += 1) {
      this.#SMALLr();
    }

    for (let i = 0; i < deletePasses; i += 1) {
      this.#MENU();
      this.#SMALLr("true");
      this.#ENT();
      this.#ENT();
    }

    this.#holdCLR();
    this.#pause(400);
    this.#BIGl();
    this.#BIGr();
    this.#pause(600);

    this.#SMALLp();
    this.#pause(300);
   
    return this.getPayload();
  }

  // ============================================================
  // NAME ENTRY COMMANDS
  // ============================================================

  static buildNameCharactersCommands(name) {
    this.resetPayload();

    this.#pause(100);
    this.#SMALLr();
    this.#pause(200);

    this.#enterNameAutomatically(name);

    this.#pause(500);

    return this.getPayload();
  }

  static buildConfirmNameCommands() {
    this.resetPayload();

    this.#ENT();

    return this.getPayload();
  }

  static buildNameEntryCommands(name) {
    return [
      ...this.buildNameCharactersCommands(name),
      ...this.buildConfirmNameCommands(),
    ];
  }

  // ============================================================
  // MOVE TO POSITION FIELD
  // ============================================================

  static buildMoveToPositionFieldCommands() {
    this.resetPayload();

    this.#pause(100);

    for (let i = 0; i < 6; i += 1) {
      this.#ENT();
    }

    this.#pause(100);

    this.#SMALLr();
    for (let i = 0; i < 7; i += 1) {
      this.#BIGl();
    }

    this.#pause(200);

    return this.getPayload();
  }

  // ============================================================
  // COORDINATE ENTRY COMMANDS
  // ============================================================

  static buildCoordinateEntryCommands(currentPosition, waypoint) {
    this.resetPayload();

    const current = this.#snapshotToCurrentChars(currentPosition);
    const target = this.#waypointToTargetChars(waypoint);

    this.#enterCoordinatesAutomatically(current, target);

    this.#pause(500);
    this.#BIGr();
    this.#BIGr();
    this.#BIGr();
    this.#BIGr();
    this.#ENT();
    this.#pause(500);
    this.#ENT();
    this.#pause(500);
   
    return this.getPayload();
  }

  // ============================================================
  // SAVE WAYPOINT COMMANDS
  // ============================================================

  static buildSaveWaypointCommands() {
    this.resetPayload();

    this.#pause(800);

    this.#SMALLp();
    this.#MSG();
    this.#MSG();

    return this.getPayload();
  }

  // ============================================================
  // FLIGHT PLAN COMMANDS
  // ============================================================

  static buildFlightPlanCreateStartCommands() {
    this.resetPayload();


    this.#FPL();

    this.#SMALLp();

    this.#pause(300);

    return this.getPayload();
  }

  static buildFlightPlanAddWaypointFromListCommands(waypointNumber) {
  this.resetPayload();

  const listSteps = Math.max(0, (Number(waypointNumber) || 0) - 1);
  const bigRightSteps = Math.max(0, (Number(waypointNumber) || 0) - 6);

  this.#pause(150);
  this.#SMALLr();

   // Move first character from K to W (correct number of steps)
  this.#setCharacter("K", "W", this.#nameCharset);
  this.#pause(200);

  this.#BIGr();

  // Move first character from K to W (correct number of steps)
  this.#setCharacter(" ", "A", this.#nameCharset);
  this.#pause(200);

  // Open the user waypoint list
  this.#ENT();
  this.#pause(300);

  // Move down to the correct waypoint in the list
  for (let i = 0; i < listSteps; i += 1) {
    this.#SMALLr();
  }

  this.#pause(300);

  // Select highlighted waypoint
  this.#ENT();
  this.#pause(300);

  // Accept it
  this.#ENT();
  this.#pause(300);

  // Move across to the next visible flight plan slot if needed
  for (let i = 0; i < bigRightSteps; i += 1) {
    this.#BIGr();
  }

  this.#BIGr();
  this.#BIGr();
  this.#BIGr();
  this.#BIGr();

  return this.getPayload();
}

  static buildFlightPlanAddWaypointCommands(name, waypointNumber) {
  this.resetPayload();

  const bigRightSteps = Math.max(0, (Number(waypointNumber) || 0) - 6);

  this.#pause(150);

  this.#SMALLr();
  this.#pause(200);

  this.#enterFlightPlanWaypointName(name);

  this.#pause(300);
  this.#ENT();
  this.#pause(300);
  this.#ENT();
  this.#pause(300);
  this.#ENT();
  this.#pause(300);

  for (let i = 0; i < bigRightSteps; i += 1) {
    this.#BIGr();
  }

  this.#BIGr();
  this.#BIGr();
  this.#BIGr();
  this.#BIGr();

  return this.getPayload();
}

  static buildFlightPlanActivateCommands(waypointCount) {
  this.resetPayload();

  const stepsLeft = Math.max(0, Number(waypointCount) || 0) + 5;

  this.#pause(200);

  for (let i = 0; i < stepsLeft; i += 1) {
    this.#BIGl();
  }

  this.#pause(200);

  this.#MENU();
  this.#ENT();
  this.#ENT();
  this.#MSG();
  this.#MSG();

  return this.getPayload();
}
}

export default ns430;