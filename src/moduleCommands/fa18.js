import {
  FourOptionsSimpleDialog,
} from "../components/FourOptionsDialog";

class fa18 {
  static slotVariant = "";
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

  static #addKeyboardCode(payload, character) {
    const characterCode = this.#kuKeycodes[character.toLowerCase()];
    if (characterCode !== undefined)
      payload.push({
        device: this.device_UFC,
        code: characterCode,
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
  }

  static generatePPMSNCommands(wpt, payload) {
    //select STEP
    payload.push({
      device: this.device_MDILeft,
      code: this.#kuKeycodes["PB13"],
      delay: this.#delay500,
      activate: 1,
      addDepress: "true",
    });

    //select TGT UFC
    payload.push({
      device: this.device_MDILeft,
      code: this.#kuKeycodes["PB14"],
      delay: this.#delay800,
      activate: 1,
      addDepress: "true",
    });

    //select UFC POSN
    payload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt3"],
      delay: this.#delay200,
      activate: 1,
      addDepress: "true",
    });

    //=============== Input Latitude ===============
    //select UFC LAT
    payload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt1"],
      delay: this.#delay200,
      activate: 1,
      addDepress: "true",
    });

    //Type hem
    if (wpt.latHem === "N") {
      payload.push({
        device: this.device_UFC,
        code: this.#kuKeycodes["UFCNorth"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    } else {
      payload.push({
        device: this.device_UFC,
        code: this.#kuKeycodes["UFCSouth"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }
    //enter first lat digits
    const firstLat = wpt.lat.substring(0, wpt.lat.length - 5);
    const format_last4lat = (Number(wpt.lat.substring(wpt.lat.length - 4)) * 60 / 10000.0).toFixed(2).toString();
    const first_lat_str = firstLat + format_last4lat.substring(0, format_last4lat.length - 3);
    const second_lat_str = format_last4lat.substring(format_last4lat.length - 2);
    //Type lat
    for (let i = 0; i < first_lat_str.length; i++) {
      this.#addKeyboardCode(payload, first_lat_str.charAt(i));
    }
    //press enter
    payload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCEnter"],
      delay: this.#delay1000,
      activate: 1,
      addDepress: "true",
    });
    //enter last 2 digits
    for (let i = 0; i < second_lat_str.length; i++) {
      this.#addKeyboardCode(payload, second_lat_str.charAt(i));
    }
    //press enter
    payload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCEnter"],
      delay: this.#delay1000,
      activate: 1,
      addDepress: "true",
    });
    //=============== end of Input Latitude ===============


    //=============== Input Longitude ===============
    //select UFC LON
    payload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt3"],
      delay: this.#delay200,
      activate: 1,
      addDepress: "true",
    });

    //Type hem
    if (wpt.longHem === "E") {
      payload.push({
        device: this.device_UFC,
        code: this.#kuKeycodes["UFCEast"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    } else {
      payload.push({
        device: this.device_UFC,
        code: this.#kuKeycodes["UFCWest"],
        delay: this.#delay100,
        activate: 1,
        addDepress: "true",
      });
    }
    //enter first long digits

    const firstLong = wpt.long.substring(0, wpt.long.length - 4);
    const format_last4long = (Number(wpt.long.substring(wpt.long.length - 3)) * 60 / 10000.0).toFixed(2).toString();
    const first_long_str = firstLong + format_last4long.substring(0, format_last4long.length - 3);
    const second_long_str = format_last4long.substring(format_last4long.length - 2);
    //Type long
    for (let i = 0; i < first_long_str.length; i++) {
      this.#addKeyboardCode(payload, first_long_str.charAt(i));
    }
    //press enter
    payload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCEnter"],
      delay: this.#delay1000,
      activate: 1,
      addDepress: "true",
    });
    //enter last 4 digits
    for (let i = 0; i < second_long_str.length; i++) {
      this.#addKeyboardCode(payload, second_long_str.charAt(i));
    }
    //press enter
    payload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCEnter"],
      delay: this.#delay1000,
      activate: 1,
      addDepress: "true",
    });
    //=============== end of Input Longitude ===============

    //select TGT UFC
    payload.push({
      device: this.device_MDILeft,
      code: this.#kuKeycodes["PB14"],
      delay: this.#delay800,
      activate: 1,
      addDepress: "true",
    });
    //select TGT UFC
    payload.push({
      device: this.device_MDILeft,
      code: this.#kuKeycodes["PB14"],
      delay: this.#delay800,
      activate: 1,
      addDepress: "true",
    });

    //=============== Input Elevation ===============
    //select UFC ELEV
    payload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt4"],
      delay: this.#delay200,
      activate: 1,
      addDepress: "true",
    });

    //press position 3 to select feet
    payload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCOpt3"],
      delay: this.#delay200,
      activate: 1,
      addDepress: "true",
    });
    //Type elev
    for (let i = 0; i < wpt.elev.length; i++) {
      this.#addKeyboardCode(payload, wpt.elev.charAt(i));
    }
    //press enter
    payload.push({
      device: this.device_UFC,
      code: this.#kuKeycodes["UFCEnter"],
      delay: this.#delay500,
      activate: 1,
      addDepress: "true",
    });
    //=============== end of Input Elevation ===============

    //select TGT UFC
    payload.push({
      device: this.device_MDILeft,
      code: this.#kuKeycodes["PB14"],
      delay: this.#delay800,
      activate: 1,
      addDepress: "true",
    });
  }

  static async createPPInputCommands(waypoints, payload) {
    let stations;
    await FourOptionsSimpleDialog({
      title: "How many STATIONs for each PP msn?",
      op1: "1",
      op2: "2",
      op3: "3",
      op4: "4",
    }).then((sta) => (stations = Number(sta)));
    
    let inputNum = stations * 5;

    let ppmsn = 0;
    let sta = 0;
    for (let i = 0; i < Object.keys(waypoints).length() && i < inputNum; i++) {
      let wpt = waypoints[i];
      this.generatePPMSNCommands(wpt, payload);
      sta += 1;
      if (sta === stations) {
        ppmsn += 1;
        sta = 0;
        //select next PP MSN
        payload.push({
          device: this.device_MDILeft,
          code: this.#kuKeycodes["PB6"] + ppmsn,
          delay: this.#delay500,
          activate: 1,
          addDepress: "true",
        });
      }
    }
  }

  static createButtonCommands(waypoints) {
    this.#codesPayload = [];
    if (this.slotVariant === "FA-18C_hornetPP") {
      this.createPPInputCommands(waypoints, this.#codesPayload);
    }
    else {
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
          this.#addKeyboardCode(this.#codesPayload, firstLat.charAt(i));
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
          this.#addKeyboardCode(this.#codesPayload, last4Lat.charAt(i));
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
          this.#addKeyboardCode(this.#codesPayload, firstLong.charAt(i));
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
          this.#addKeyboardCode(this.#codesPayload, last4Long.charAt(i));
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
          this.#addKeyboardCode(this.#codesPayload, waypoint.elev.charAt(i));
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
