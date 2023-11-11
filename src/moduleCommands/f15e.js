class f15e {
  static slotVariant = "";
  static extraDelay = 0;
  static delay = 100 + this.extraDelay;
  static #f15eNumberCodes = {
    0: 3036,
    1: 3020,
    2: 3021,
    3: 3022,
    4: 3025,
    5: 3026,
    6: 3027,
    7: 3030,
    8: 3031,
    9: 3032,
    menu: 3038,
    clear: 3035,
    shift: 3033,
    A: 3020,
    B: 3022,
  };

  static createButtonCommands(waypoints) {
    let f15eUFCDevice;
    if (["F-15ESE_pilotA", "F-15ESE_pilotB"].includes(this.slotVariant)) {
      f15eUFCDevice = 56;
    } else {
      f15eUFCDevice = 57;
    }
    let route; // This should reduce length of code by a lot, and make it more readable.
    if (
      this.slotVariant === "F-15ESE_pilotA" ||
      this.slotVariant === "F-15ESE_wsoA"
    ) {
      route = this.#f15eNumberCodes["A"];
    } else {
      route = this.#f15eNumberCodes["B"];
    }

    {
      // Doesnt need to be Splice-Cleared because payload is created *each time* the function is called, and isnt static.
      let payload = [
        {
          // Clear UFC button
          device: f15eUFCDevice,
          code: 3035,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // Clear UFC button
          device: f15eUFCDevice,
          code: 3035,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // Clear UFC button
          device: f15eUFCDevice,
          code: 3035,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // Menu UFC button
          device: f15eUFCDevice,
          code: 3038,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // Press Shift
          device: f15eUFCDevice,
          code: 3033,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // Press B / 3 (This switches to the universal Base point / INS Align point)
          device: f15eUFCDevice,
          code: this.#f15eNumberCodes["B"],
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // Enter B into UFC button 10
          device: f15eUFCDevice,
          code: 3010,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // Press UFC button 10
          device: f15eUFCDevice,
          code: 3010,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
      ];
      // =================== end of setup ===================

      // =================== Enter Waypoint numbers ===================
      for (const waypoint of waypoints) {
        let waypointNumber = waypoints.indexOf(waypoint) + 1;
        for (let i = 0; i < (waypointNumber + "").length; i++) {
          // eslint-disable-next-line default-case
          let digit = (waypointNumber + "").charAt(i);
          payload.push({
            // Waypoint Digit
            device: f15eUFCDevice,
            code: this.#f15eNumberCodes[digit],
            delay: this.delay,
            activate: 1,
            addDepress: "true",
          });
        }
        payload.push(
          {
            // press shift
            device: f15eUFCDevice,
            code: this.#f15eNumberCodes["shift"],
            delay: this.delay,
            activate: 1,
            addDepress: "true",
          },
          {
            // route letter
            device: f15eUFCDevice,
            code: route,
            delay: this.delay,
            activate: 1,
            addDepress: "true",
          },
        );

        // ============================================================

        payload.push({
          // Press PB 1
          device: f15eUFCDevice,
          code: 3001,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        });

        payload.push({
          // Press Shift
          device: f15eUFCDevice,
          code: this.#f15eNumberCodes["shift"],
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        });

        if (waypoint.latHem === "N") {
          // North
          payload.push({
            device: f15eUFCDevice,
            code: this.#f15eNumberCodes[2],
            delay: this.delay,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            // South
            device: f15eUFCDevice,
            code: this.#f15eNumberCodes[8],
            delay: this.delay,
            activate: 1,
            addDepress: "true",
          });
        }

        //Type lat
        for (let i = 0; i < waypoint.lat.length; i++) {
          // enter each digit of lat into scratchpad
          // eslint-disable-next-line default-case
          for (const char of waypoint.lat.charAt(i)) {
            if (char !== ".") {
              payload.push({
                device: f15eUFCDevice,
                code: this.#f15eNumberCodes[char],
                delay: this.delay,
                activate: 1,
                addDepress: "true",
              });
            }
          }
        }

        payload.push({
          // enter latitutde into UFC
          device: f15eUFCDevice,
          code: 3002,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        });

        payload.push({
          // Press Shift
          device: f15eUFCDevice,
          code: 3033,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        });

        if (waypoint.longHem === "E") {
          // Type hemisphere into scratchpad
          payload.push({
            device: f15eUFCDevice,
            code: this.#f15eNumberCodes[6],
            delay: this.delay,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: f15eUFCDevice,
            code: this.#f15eNumberCodes[4],
            delay: this.delay,
            activate: 1,
            addDepress: "true",
          });
        }

        for (let i = 0; i < waypoint.long.length; i++) {
          // enter each digit of longtitude into scratchpad
          // eslint-disable-next-line default-case
          for (const char of waypoint.long.charAt(i)) {
            if (char !== ".") {
              payload.push({
                device: f15eUFCDevice,
                code: this.#f15eNumberCodes[char],
                delay: this.delay,
                activate: 1,
                addDepress: "true",
              });
            }
          }
        }

        payload.push({
          // enter longtitude into UFC
          device: f15eUFCDevice,
          code: 3003,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        });

        for (let i = 0; i < waypoint.elev.length; i++) {
          // enter each digit of elevation into scratchpad
          // eslint-disable-next-line default-case
          for (const char of waypoint.elev.charAt(i)) {
            payload.push({
              device: f15eUFCDevice,
              code: this.#f15eNumberCodes[char],
              delay: this.delay,
              activate: 1,
              addDepress: "true",
            });
          }
        }

        payload.push({
          // enter elevation into UFC
          device: f15eUFCDevice,
          code: 3007,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        });
      }
      payload.push(
        {
          // Menu UFC button
          device: f15eUFCDevice,
          code: 3038,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // Enter 1 button (This re-selects the first waypoint)
          device: f15eUFCDevice,
          code: this.#f15eNumberCodes[1],
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // press shift
          device: f15eUFCDevice,
          code: 3033,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // enter route letter
          device: f15eUFCDevice,
          code: route,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
        {
          // Waypoint UFC button
          device: f15eUFCDevice,
          code: 3010,
          delay: this.delay,
          activate: 1,
          addDepress: "true",
        },
      );

      return payload;
    }
  }
}

export default f15e;
