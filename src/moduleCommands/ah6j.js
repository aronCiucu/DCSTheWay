//====================================================
// AH-6J TNL3100 Waypoint Entry Logic
// State-machine structure with explicit page-change
// delays and helper-based data-entry sections
//====================================================

class ah6j {

  static slotVariant = "";

  //====================================================
  // DEVICE + TIMING
  //====================================================

  static #device = 13;

  // user adjustable delay added to every button press
  static extraDelay = 0;

  static #delay0   = 10  + this.extraDelay;
  static #delay100 = 100 + this.extraDelay;
  static #delay200 = 200 + this.extraDelay;
  static #delay500 = 500 + this.extraDelay;


  //====================================================
  // COCKPIT COMMAND CODES
  //====================================================

  static #codes = {
    WPT:   3306,
    FPL:   3309,
    AUX:   3311,
    ENT:   3313,
    INNER: 3314,
    OUTER: 3315,
  };

  static #codesPayload = [];

  static #nameCharset = "XYZ0123456789 ABCDEFGHIJKLMNOPQRSTUVW";


  //====================================================
  // KNOB / BUTTON HELPERS
  //====================================================

  static #pushInnerSteps(device, steps) {

    const dir = steps >= 0 ? 1 : -1;

    for (let i = 0; i < Math.abs(steps); i++) {
      this.#codesPayload.push({
        device,
        code: this.#codes.INNER,
        delay: this.#delay0,
        activate: dir,
      });
    }

  }


  static #pushOuterCW(device, count = 1) {

    for (let i = 0; i < count; i++) {
      this.#codesPayload.push({
        device,
        code: this.#codes.OUTER,
        delay: this.#delay100,
        activate: 1,
      });
    }

  }


  static #pushOuterCCW(device, count = 1) {

    for (let i = 0; i < count; i++) {
      this.#codesPayload.push({
        device,
        code: this.#codes.OUTER,
        delay: this.#delay100,
        activate: -1,
      });
    }

  }


  static #pushOuterCWName(device, count = 1) {

    for (let i = 0; i < count; i++) {
      this.#codesPayload.push({
        device,
        code: this.#codes.OUTER,
        delay: 10 + this.extraDelay,
        activate: 1,
      });
    }

  }


  static #press(device, code) {

    this.#codesPayload.push({
      device,
      code,
      delay: this.#delay200,
      activate: 1,
      addDepress: "false",
    });

    this.#codesPayload.push({
      device,
      code,
      delay: this.#delay500,
      activate: 0,
      addDepress: "false",
    });

  }


  //====================================================
  // LABEL UTILITIES
  //====================================================

  static #indexInCharset(charset, ch) {
    const i = charset.indexOf(ch);
    return i >= 0 ? i : 0;
  }


  static #shortestSteps(from, to, charset) {

    const len = charset.length;

    const a = this.#indexInCharset(charset, from);
    const b = this.#indexInCharset(charset, to);

    const cw  = (b - a + len) % len;
    const ccw = cw - len;

    return Math.abs(cw) <= Math.abs(ccw) ? cw : ccw;

  }


  static #sanitizeName(name) {

    const raw = String(name || "")
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, " ");

    return raw.padEnd(3, " ").slice(0, 3);

  }


  static #buildLabel(waypoint) {

    const rawName = String(waypoint?.name || "").trim();

    const m = rawName.match(/^Waypoint\s+(\d+)$/i);

    if (m) {

      const n = parseInt(m[1], 10) || 0;
      const num = Math.max(1, Math.min(99, n));

      return `WP${num}`.padEnd(4, " ");

    }

    return rawName
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, " ")
      .padEnd(4, " ")
      .slice(0, 4);
  }


  //====================================================
  // COORDINATE UTILITIES
  //====================================================

  static #parseCoord(coord) {

    const p = String(coord || "").split(".");

    if (p.length !== 3) return { deg: 0, min: 0 };

    const deg = parseInt(p[0], 10) || 0;
    const min = (parseInt(p[1], 10) || 0) * 1000 + (parseInt(p[2], 10) || 0);

    return { deg, min };

  }


  static parseTNLCoord(str) {

    if (!str) return null;

    const m = String(str).match(
      /(\d+)\*(\d+\.\d+)([NS])(\d+)\*(\d+\.\d+)([EW])/
    );

    if (!m) return null;

    return {
      lat: {
        deg: parseInt(m[1], 10),
        min: Math.round(parseFloat(m[2]) * 1000),
        hemi: m[3],
      },
      lon: {
        deg: parseInt(m[4], 10),
        min: Math.round(parseFloat(m[5]) * 1000),
        hemi: m[6],
      },
    };

  }


  static #coordObjToTheWayString(coordObj) {

    if (!coordObj) return "0.0.0";

    const deg = coordObj.deg || 0;
    const minInt = coordObj.min || 0;
    const minWhole = Math.floor(minInt / 1000);
    const minFrac = minInt % 1000;

    return `${deg}.${minWhole}.${String(minFrac).padStart(3, "0")}`;

  }


  static #directDigitSteps(a, b) {
    return (b || 0) - (a || 0);
  }


  static #minuteDigits(value) {
    return String(Math.max(0, value || 0))
      .padStart(5, "0")
      .slice(-5)
      .split("")
      .map((d) => parseInt(d, 10) || 0);
  }


  static #degreeDigits(value, width) {
    return String(Math.max(0, value || 0))
      .padStart(width, "0")
      .slice(-width)
      .split("")
      .map((d) => parseInt(d, 10) || 0);
  }


  static #getTargetHemisphere(waypoint, axis) {

    if (axis === "lat") {
      const explicit = String(
        waypoint?.latHemi ??
        waypoint?.latHemisphere ??
        waypoint?.ns ??
        waypoint?.northSouth ??
        ""
      ).toUpperCase();

      if (explicit === "N" || explicit === "S") return explicit;

      const lat = String(waypoint?.lat ?? "").trim();
      if (lat.startsWith("S") || lat.startsWith("-")) return "S";
      return "N";
    }

    const explicit = String(
      waypoint?.longHemi ??
      waypoint?.longHemisphere ??
      waypoint?.ew ??
      waypoint?.eastWest ??
      ""
    ).toUpperCase();

    if (explicit === "E" || explicit === "W") return explicit;

    const lon = String(waypoint?.long ?? "").trim();
    if (lon.startsWith("W") || lon.startsWith("-")) return "W";
    return "E";

  }


  //====================================================
  // STATE 1
  // INITIAL TNL3100 MODE SETUP
  // AUX → AUX → WPT
  //====================================================

  static buildInitialModeCommands() {

    const device = this.#device;

    const oldPayload = this.#codesPayload;
    this.#codesPayload = [];

    this.#codesPayload.push({
      device,
      code: this.#codes.AUX,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.AUX,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "true",
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.WPT,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.WPT,
      delay: 500 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });

    const result = this.#codesPayload.slice();
    this.#codesPayload = oldPayload;

    return result;

  }


  //====================================================
  // STATE 2
  // CREATE WAYPOINT PAGE
  // ADD WAYPOINT → LAT/LONG
  //====================================================

  static buildCreateLatLongPageCommands() {

    const device = this.#device;

    const oldPayload = this.#codesPayload;
    this.#codesPayload = [];

    this.#codesPayload.push({
      device,
      code: 0,
      delay: 200 + this.extraDelay,
      activate: 1,
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.OUTER,
      delay: 200 + this.extraDelay,
      activate: 1,
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.OUTER,
      delay: 500 + this.extraDelay,
      activate: 1,
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 500 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.OUTER,
      delay: 200 + this.extraDelay,
      activate: 1,
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });

      this.#codesPayload.push({
      device,
      code: 0,
      delay: 500 + this.extraDelay,
      activate: 0,
    });

    const result = this.#codesPayload.slice();
    this.#codesPayload = oldPayload;

    return result;

  }


  //====================================================
  // STATE 2A
  // OPEN WAYPOINT ENTRY PAGE
  //====================================================

  static buildWaypointEntryPageCommands() {
    return this.buildCreateLatLongPageCommands();
  }


  //====================================================
  // REPLACE-MODE HELPERS
  //====================================================

  static buildDeleteCurrentWaypointCommands() {

    const device = this.#device;
    const oldPayload = this.#codesPayload;
    this.#codesPayload = [];

    this.#codesPayload.push({
      device,
      code: this.#codes.OUTER,
      delay: 200 + this.extraDelay,
      activate: -1,
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 700 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });

    const result = this.#codesPayload.slice();
    this.#codesPayload = oldPayload;

    return result;

  }


  static buildStepToPreviousWaypointCommands() {

    const device = this.#device;
    const oldPayload = this.#codesPayload;
    this.#codesPayload = [];

    this.#codesPayload.push({
      device,
      code: this.#codes.INNER,
      delay: 300 + this.extraDelay,
      activate: -1,
    });

    const result = this.#codesPayload.slice();
    this.#codesPayload = oldPayload;

    return result;

  }


  //====================================================
  // STATE 1
  // ENTER WAYPOINT NAME
  //====================================================

  static #enterWaypointName(device, targetLabel) {

    const currentLabel = ["X", "X", "X", "X"];

    for (let c = 0; c < 4; c++) {

      const s = this.#shortestSteps(
        currentLabel[c],
        targetLabel[c],
        this.#nameCharset
      );

      this.#pushInnerSteps(device, s);

      if (c < 3) {
        this.#pushOuterCWName(device, 1);
      }

    }

  }


  //====================================================
  // STATE 4
  // ENTER LAT / LONG COORDINATES
  //
  // Cursor order after name char 4:
  // LAT deg digit 1 -> LAT deg digit 2 -> LAT min x5 -> LAT hemi
  // -> LON deg digit 1 -> LON deg digit 2 -> LON deg digit 3
  // -> LON min x5 -> LON hemi -> wraps back to row 1 char 1
  //====================================================

  static #enterCoordinates(device, prev, next) {

    const prevLat = this.#parseCoord(prev.lat);
    const nextLat = this.#parseCoord(next.lat);

    const prevLon = this.#parseCoord(prev.long);
    const nextLon = this.#parseCoord(next.long);

    const prevLatHemi = String(prev.latHemi || "N").toUpperCase();
    const nextLatHemi = this.#getTargetHemisphere(next, "lat");

    const prevLonHemi = String(prev.longHemi || "E").toUpperCase();
    const nextLonHemi = this.#getTargetHemisphere(next, "long");

    const prevLatDegDigits = this.#degreeDigits(prevLat.deg, 2);
    const nextLatDegDigits = this.#degreeDigits(nextLat.deg, 2);

    const prevLatMinDigits = this.#minuteDigits(prevLat.min);
    const nextLatMinDigits = this.#minuteDigits(nextLat.min);

    const prevLonDegDigits = this.#degreeDigits(prevLon.deg, 3);
    const nextLonDegDigits = this.#degreeDigits(nextLon.deg, 3);

    const prevLonMinDigits = this.#minuteDigits(prevLon.min);
    const nextLonMinDigits = this.#minuteDigits(nextLon.min);

      this.#codesPayload.push({
      device,
      code: 0,
      delay: 200 + this.extraDelay,
      activate: 0,
    });
    
    // move from row 1 char 4 to latitude degree digit 1
    this.#pushOuterCW(device, 1);

    // latitude degrees (2 digits)
    for (let i = 0; i < 2; i++) {
      const s = this.#directDigitSteps(
        prevLatDegDigits[i],
        nextLatDegDigits[i],
      );

      this.#pushInnerSteps(device, s);
      this.#pushOuterCW(device, 1);
    }

    // latitude minutes (5 digits)
    for (let i = 0; i < 5; i++) {
      const s = this.#directDigitSteps(
        prevLatMinDigits[i],
        nextLatMinDigits[i],
      );

      this.#pushInnerSteps(device, s);
      this.#pushOuterCW(device, 1);
    }

    // latitude hemisphere
    this.#pushInnerSteps(
      device,
      this.#shortestSteps(prevLatHemi, nextLatHemi, "NS")
    );

    // move to longitude degree digit 1
    this.#pushOuterCW(device, 1);

    // longitude degrees (3 digits)
    for (let i = 0; i < 3; i++) {
      const s = this.#directDigitSteps(
        prevLonDegDigits[i],
        nextLonDegDigits[i],
      );

      this.#pushInnerSteps(device, s);
      this.#pushOuterCW(device, 1);
    }

    // longitude minutes (5 digits)
    for (let i = 0; i < 5; i++) {
      const s = this.#directDigitSteps(
        prevLonMinDigits[i],
        nextLonMinDigits[i],
      );

      this.#pushInnerSteps(device, s);
      this.#pushOuterCW(device, 1);
    }

    // longitude hemisphere
    this.#pushInnerSteps(
      device,
      this.#shortestSteps(prevLonHemi, nextLonHemi, "EW")
    );

    // wrap back to first character of waypoint name
    this.#pushOuterCW(device, 1);

    this.#codesPayload.push({
      device,
      code: 0,
      delay: 400 + this.extraDelay,
      activate: 0,
    });

  }


  //====================================================
  // STATE 5
  // SAVE WAYPOINT
  //====================================================

  static #saveWaypoint(device) {

      this.#codesPayload.push({
      device,
      code: 0,
      delay: 100 + this.extraDelay,
      activate: 0,
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });

    this.#codesPayload.push({
      device,
      code: 0,
      delay: 800 + this.extraDelay,
      activate: 0,
    });

  }

    //====================================================
  // FLIGHT PLAN STATE 1
  // DELETE CURRENT FLIGHT PLAN
  // FPL -> ENT -> INNER CW -> ENT
  //====================================================

  static buildDeleteCurrentFlightPlanCommands() {

    const device = this.#device;
    const oldPayload = this.#codesPayload;
    this.#codesPayload = [];

      this.#codesPayload.push({
      device,
      code: 0,
      delay: 100 + this.extraDelay,
      activate: 0,
    });
    
    // FPL press
    this.#codesPayload.push({
      device,
      code: this.#codes.FPL,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.FPL,
      delay: 600 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });

        // FPL press
    this.#codesPayload.push({
      device,
      code: this.#codes.FPL,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.FPL,
      delay: 600 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });


    // ENT press
    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 500 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });


    // INNER CW once
    this.#codesPayload.push({
      device,
      code: this.#codes.INNER,
      delay: 300 + this.extraDelay,
      activate: 1,
    });


    // ENT press
    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });

        // ENT press
    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });

    const result = this.#codesPayload.slice();
    this.#codesPayload = oldPayload;

    return result;

  }


  //====================================================
  // FLIGHT PLAN STATE 2
  // ADD CURRENT WAYPOINT TO FLIGHT PLAN
  // WPT -> INNER CCW -> ENT -> FPL
  //====================================================

  static buildAddCurrentWaypointToFlightPlanCommands() {

    const device = this.#device;
    const oldPayload = this.#codesPayload;
    this.#codesPayload = [];

      this.#codesPayload.push({
      device,
      code: 0,
      delay: 100 + this.extraDelay,
      activate: 0,
    });
    
    // WPT press
    this.#codesPayload.push({
      device,
      code: this.#codes.WPT,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.WPT,
      delay: 800 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });

    this.#codesPayload.push({
      device,
      code: 0,
      delay: 500 + this.extraDelay,
      activate: 0,
    });

    // INNER CCW once
    this.#codesPayload.push({
      device,
      code: this.#codes.INNER,
      delay: 300 + this.extraDelay,
      activate: -1,
    });

    // ENT press
    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });

    this.#codesPayload.push({
      device,
      code: this.#codes.ENT,
      delay: 800 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });

    // FPL press   
    this.#codesPayload.push({
      device,
      code: this.#codes.FPL,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.FPL,
      delay: 500 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });



    const result = this.#codesPayload.slice();
    this.#codesPayload = oldPayload;

    return result;

  }


  //====================================================
  // FLIGHT PLAN STATE 3
  // ACTIVATE FLIGHT PLAN
  // FPL -> FPL
  //====================================================

  static buildActivateFlightPlanCommands() {

    const device = this.#device;
    const oldPayload = this.#codesPayload;
    this.#codesPayload = [];

      this.#codesPayload.push({
      device,
      code: 0,
      delay: 200 + this.extraDelay,
      activate: 0,
    });
    
    // FPL press
    this.#codesPayload.push({
      device,
      code: this.#codes.FPL,
      delay: 200 + this.extraDelay,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device,
      code: this.#codes.FPL,
      delay: 500 + this.extraDelay,
      activate: 0,
      addDepress: "false",
    });


    const result = this.#codesPayload.slice();
    this.#codesPayload = oldPayload;

    return result;

  }


  //====================================================
  // FLIGHT PLAN STATE 4
  // BUILD NEW FLIGHT PLAN FROM LIST
  //====================================================

  static buildNewFlightPlanFromListCommands(waypointCount = 0) {

    const oldPayload = this.#codesPayload;
    this.#codesPayload = [];

    const count = Math.max(0, Number(waypointCount) || 0);

    if (count <= 0) {
      const result = this.#codesPayload.slice();
      this.#codesPayload = oldPayload;
      return result;
    }

    const deletePayload = this.buildDeleteCurrentFlightPlanCommands();
    this.#codesPayload.push(...deletePayload);

    for (let i = 0; i < count; i++) {
      const addPayload = this.buildAddCurrentWaypointToFlightPlanCommands();
      this.#codesPayload.push(...addPayload);
    }

    const activatePayload = this.buildActivateFlightPlanCommands();
    this.#codesPayload.push(...activatePayload);

    const result = this.#codesPayload.slice();
    this.#codesPayload = oldPayload;

    return result;

  }


  //====================================================
  // MAIN STATE MACHINE
  //====================================================

  static createWaypointCommandsFromDisplay(nextWaypoint, waypointNumber, display) {

    this.#codesPayload = [];

    const device = this.#device;
    const next = nextWaypoint || {};
    const row2 = display?.row2 || "";

    const targetLabel = this.#buildLabel(next, waypointNumber).split("");

    this.#enterWaypointName(device, targetLabel);

    const currentCoord = this.parseTNLCoord(row2);

    const prev = currentCoord
      ? {
          lat: this.#coordObjToTheWayString(currentCoord.lat),
          long: this.#coordObjToTheWayString(currentCoord.lon),
          latHemi: currentCoord.lat.hemi,
          longHemi: currentCoord.lon.hemi,
        }
      : {
          lat: "0.0.0",
          long: "0.0.0",
          latHemi: "N",
          longHemi: "E",
        };

    this.#enterCoordinates(device, prev, next);

    this.#saveWaypoint(device);

    return this.#codesPayload;

  }

}

export default ah6j;