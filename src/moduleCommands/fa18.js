import { AlertDialog } from "../components/AlertDialog";
class fa18 {
  static slotVariant = "";
  static stations = 4;
  static extraDelay = 0;
  static #delay100 = this.extraDelay + 100;
  static #delay200 = this.extraDelay + 200;
  static #delay500 = this.extraDelay + 500;
  static #delay800 = this.extraDelay + 800;
  static #delay1000 = this.extraDelay + 1000;
  static device_UFC = 25;
  static device_AMPCD = 37;
  static device_MDILeft = 35;
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
    PB1: 3011,
    PB2: 3012,
    PB3: 3013,
    PB4: 3014,
    PB5: 3015,
    PB6: 3016,
    PB7: 3017,
    PB8: 3018,
    PB9: 3019,
    PB10: 3020,
    PB11: 3021,
    PB12: 3022,
    PB13: 3023,
    PB14: 3024,
    PB15: 3025,
    PB16: 3026,
    PB17: 3027,
    PB18: 3028,
    PB19: 3029,
    PB20: 3030,
    UFCOpt1: 3010,
    UFCOpt2: 3011,
    UFCOpt3: 3012,
    UFCOpt4: 3013,
    UFCOpt5: 3014,
    UFCEnter: 3029,
    UFCNorth: 3020,
    UFCSouth: 3026,
    UFCEast: 3024,
    UFCWest: 3022,
  };
  static #codesPayload = [];

  static #addKeyboardCode(character, wait) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined)
      if (wait === true) {
        this.#codesPayload.push({
          device: this.device_UFC,
          code: characterCode,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      } else {
        this.#codesPayload.push({
          device: this.device_UFC,
          code: characterCode,
          delay: this.#delay100,
          activate: 1,
          addDepress: "true",
        });
      }
  }

  static generatePPMSNCommands(wpt, index) {
    
        // Press the Step button
        this.#codesPayload.push({
            device: this.device_MDILeft,
            code: this.#kuKeycodes["PB13"],
            delay: this.#delay100,
            activate: 1,
            addDepress: "false",
        });
        this.#codesPayload.push({
            device: this.device_MDILeft,
            code: this.#kuKeycodes["PB13"],
            delay: this.#delay500,
            activate: 0,
            addDepress: "false",
        });
    

    //select TGT UFC
    this.#codesPayload.push({
      device: this.device_MDILeft,
      code: this.#kuKeycodes["PB14"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device: this.device_MDILeft,
      code: this.#kuKeycodes["PB14"],
      delay: this.#delay500,
      activate: 0,
      addDepress: "false",
    });

    //select UFC POSN
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt3"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt3"],
      delay: this.#delay500,
      activate: 0,
      addDepress: "false",
    });

    //=============== Input Latitude ===============
    //select UFC LAT
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt1"],
      delay: this.#delay200,
      activate: 1,
      addDepress: "true",
    });

    //Type hem
    if (wpt.latHem === "N") {
      this.#codesPayload.push({
        device: this.device_UFC,
        code: this.#kuKeycodes["UFCNorth"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    } else {
      this.#codesPayload.push({
        device: this.device_UFC,
        code: this.#kuKeycodes["UFCSouth"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }
    //enter first lat digits
    const firstLat = wpt.lat.substring(0, wpt.lat.length - 5);
    const format_last4lat = (
      (Number(wpt.lat.substring(wpt.lat.length - 4)) * 60) /
      10000.0
    )
      .toFixed(2)
      .toString();

    let add_to_firstLat = format_last4lat.substring(
      0,
      format_last4lat.length - 3,
    );

    // only one number left, add a '0' before it
    if (add_to_firstLat.length < 2) {
      add_to_firstLat = "0" + add_to_firstLat;
    }

    const first_lat_str = firstLat + add_to_firstLat;
    const second_lat_str = format_last4lat.substring(
      format_last4lat.length - 2,
    );
    //Type lat
    for (let i = 0; i < first_lat_str.length; i++) {
      this.#addKeyboardCode(first_lat_str.charAt(i), true);
    }
    //press enter
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCEnter"],
      delay: this.#delay500,
      activate: 1,
      addDepress: "true",
    });
    //enter last 2 digits
    for (let i = 0; i < second_lat_str.length; i++) {
      this.#addKeyboardCode(second_lat_str.charAt(i), true);
    }
    //press enter
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCEnter"],
      delay: this.#delay500,
      activate: 1,
      addDepress: "true",
    });
    //=============== end of Input Latitude ===============

    //=============== Input Longitude ===============
    //select UFC LON
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt3"],
      delay: this.#delay200,
      activate: 1,
      addDepress: "true",
    });

    //Type hem
    if (wpt.longHem === "E") {
      this.#codesPayload.push({
        device: this.device_UFC,
        code: this.#kuKeycodes["UFCEast"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    } else {
      this.#codesPayload.push({
        device: this.device_UFC,
        code: this.#kuKeycodes["UFCWest"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }
    //enter first long digits

    const firstLong = wpt.long.substring(0, wpt.long.length - 4);
    const format_last4long = (
      (Number(wpt.long.substring(wpt.long.length - 4)) * 60) /
      10000.0
    )
      .toFixed(2)
      .toString();

    let add_to_firstLong = format_last4long.substring(
      0,
      format_last4long.length - 3,
    );

    // only one number left, add a '0' before it
    if (add_to_firstLong.length < 2) {
      add_to_firstLong = "0" + add_to_firstLong;
    }

    let first_long_str = firstLong + add_to_firstLong;
    const second_long_str = format_last4long.substring(
      format_last4long.length - 2,
    );

    // remove starting '0' in longitude, if it is 1xx°, then everything's fine
    if (first_long_str.charAt(0) === "0") {
      first_long_str = first_long_str.substring(1);
    }

    //Type long
    for (let i = 0; i < first_long_str.length; i++) {
      this.#addKeyboardCode(first_long_str.charAt(i), true);
    }
    //press enter
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCEnter"],
      delay: this.#delay500,
      activate: 1,
      addDepress: "true",
    });
    //enter last 4 digits
    for (let i = 0; i < second_long_str.length; i++) {
      this.#addKeyboardCode(second_long_str.charAt(i), true);
    }
    //press enter
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCEnter"],
      delay: this.#delay500,
      activate: 1,
      addDepress: "true",
    });
    //=============== end of Input Longitude ===============

    //select TGT UFC
    this.#codesPayload.push({
      device: this.device_MDILeft,
      code: this.#kuKeycodes["PB14"],
      delay: this.#delay800,
      activate: 1,
      addDepress: "true",
    });
    //select TGT UFC
    this.#codesPayload.push({
      device: this.device_MDILeft,
      code: this.#kuKeycodes["PB14"],
      delay: this.#delay800,
      activate: 1,
      addDepress: "true",
    });

    //=============== Input Elevation ===============
    //select UFC ELEV
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt4"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "false",
    });
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt4"],
      delay: this.#delay800,
      activate: 0,
      addDepress: "false",
    });

    //press position 3 to select feet
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt3"],
      delay: this.#delay100,
      activate: 1,
      addDepress: "true",
    });
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt3"],
      delay: this.#delay800,
      activate: 0,
      addDepress: "false",
    });

    //Type Elevation
    for (let i = 0; i < wpt.elev.length; i++) {
      this.#addKeyboardCode(wpt.elev.charAt(i), true);
    }
    //press Enter
    this.#codesPayload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCEnter"],
      delay: this.#delay500,
      activate: 1,
      addDepress: "true",
    });
    //=============== end of Input Elevation ===============

    //select TGT UFC
    this.#codesPayload.push({
      device: this.device_MDILeft,
      code: this.#kuKeycodes["PB14"],
      delay: this.#delay800,
      activate: 1,
      addDepress: "true",
    });
  }

  static createPPInputCommands(waypoints) {
    let inputNum = this.stations * 5;

    let ppmsn = 0;
    let sta = 0;
    let count = 0;
    for (const wpt of waypoints) {
      if (sta === this.stations) {
        ppmsn += 1;
        sta = 0;
        //select next PP MSN
        if (ppmsn < 5) {
          this.#codesPayload.push({
            device: this.device_MDILeft,
            code: this.#kuKeycodes["PB6"] + ppmsn,
            delay: this.#delay500,
            activate: 1,
            addDepress: "true",
          });

          for (let i = 0; i < this.stations - 1; i++) {
            //select STEP
            this.#codesPayload.push({
              device: this.device_MDILeft,
              code: this.#kuKeycodes["PB13"],
              delay: this.#delay500,
              activate: 1,
              addDepress: "true",
            });

            //select next PP MSN
            this.#codesPayload.push({
              device: this.device_MDILeft,
              code: this.#kuKeycodes["PB6"] + ppmsn,
              delay: this.#delay500,
              activate: 1,
              addDepress: "true",
            });
          }
        }
      }
      this.generatePPMSNCommands(wpt);
      count++;
      sta += 1;
      if (count === inputNum) {
        break;
      }
    }
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];
    if (
      this.slotVariant === "FA-18C_hornetPP1" ||
      this.slotVariant === "FA-18C_hornetPP2" ||
      this.slotVariant === "FA-18C_hornetPP3" ||
      this.slotVariant === "FA-18C_hornetPP4"
    ) {
      if (this.slotVariant === "FA-18C_hornetPP1") {
        this.stations = 1;
      } else if (this.slotVariant === "FA-18C_hornetPP2") {
        this.stations = 2;
      } else if (this.slotVariant === "FA-18C_hornetPP3") {
        this.stations = 3;
      } else {
        this.stations = 4;
      }
      this.createPPInputCommands(waypoints);
    } else {
      //enter the SUPT menu
      this.#codesPayload.push({
        device: this.device_AMPCD,
        code: this.#kuKeycodes["PB18"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      this.#codesPayload.push({
        device: this.device_AMPCD,
        code: this.#kuKeycodes["PB18"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //select HSD
      this.#codesPayload.push({
        device: this.device_AMPCD,
        code: this.#kuKeycodes["PB2"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
      //select DATA
      this.#codesPayload.push({
        device: this.device_AMPCD,
        code: this.#kuKeycodes["PB10"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });

      for (const waypoint of waypoints) {
        //increment waypoint
        this.#codesPayload.push({
          device: this.device_AMPCD,
          code: this.#kuKeycodes["PB12"],
          delay: this.#delay500,
          activate: 1,
          addDepress: "true",
        });
        //press UFC
        this.#codesPayload.push({
          device: this.device_AMPCD,
          code: this.#kuKeycodes["PB5"],
          delay: this.#delay800,
          activate: 1,
          addDepress: "true",
        });
        //press position 1
        this.#codesPayload.push({
          device: this.device_UFC,
          code: this.#kuKeycodes["UFCOpt1"],
          delay: this.#delay200,
          activate: 1,
          addDepress: "true",
        });
        //Type hem
        if (waypoint.latHem === "N") {
          this.#codesPayload.push({
            device: this.device_UFC,
            code: this.#kuKeycodes["UFCNorth"],
            delay: this.#delay100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          this.#codesPayload.push({
            device: this.device_UFC,
            code: this.#kuKeycodes["UFCSouth"],
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
          this.#addKeyboardCode(firstLat.charAt(i), false);
        }
        //press enter
        this.#codesPayload.push({
          device: this.device_UFC,
          code: this.#kuKeycodes["UFCEnter"],
          delay: this.#delay1000,
          activate: 1,
          addDepress: "true",
        });
        //enter last 4 digits
        for (let i = 0; i < last4Lat.length; i++) {
          this.#addKeyboardCode(last4Lat.charAt(i), false);
        }
        //press enter
        this.#codesPayload.push({
          device: this.device_UFC,
          code: this.#kuKeycodes["UFCEnter"],
          delay: this.#delay1000,
          activate: 1,
          addDepress: "true",
        });
        //Type hem
        if (waypoint.longHem === "E") {
          this.#codesPayload.push({
            device: this.device_UFC,
            code: this.#kuKeycodes["UFCEast"],
            delay: this.#delay100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          this.#codesPayload.push({
            device: this.device_UFC,
            code: this.#kuKeycodes["UFCWest"],
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
          this.#addKeyboardCode(firstLong.charAt(i), false);
        }
        //press enter
        this.#codesPayload.push({
          device: this.device_UFC,
          code: this.#kuKeycodes["UFCEnter"],
          delay: this.#delay1000,
          activate: 1,
          addDepress: "true",
        });
        //enter last 4 digits
        for (let i = 0; i < last4Long.length; i++) {
          this.#addKeyboardCode(last4Long.charAt(i), false);
        }
        //press enter
        this.#codesPayload.push({
          device: this.device_UFC,
          code: this.#kuKeycodes["UFCEnter"],
          delay: this.#delay1000,
          activate: 1,
          addDepress: "true",
        });
        //press position 3 to select elevation
        this.#codesPayload.push({
          device: this.device_UFC,
          code: this.#kuKeycodes["UFCOpt3"],
          delay: this.#delay200,
          activate: 1,
          addDepress: "true",
        });
        //press position 1 to select feet
        this.#codesPayload.push({
          device: this.device_UFC,
          code: this.#kuKeycodes["UFCOpt1"],
          delay: this.#delay200,
          activate: 1,
          addDepress: "true",
        });
        //Type elev
        for (let i = 0; i < waypoint.elev.length; i++) {
          this.#addKeyboardCode(waypoint.elev.charAt(i), false);
        }
        //press enter
        this.#codesPayload.push({
          device: this.device_UFC,
          code: this.#kuKeycodes["UFCEnter"],
          delay: this.#delay500,
          activate: 1,
          addDepress: "true",
        });
      }
    }
    return this.#codesPayload;
  }
}

export default fa18;