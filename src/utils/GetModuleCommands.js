export default function getModuleCommands(module, waypoints) {
  switch (module) {
    case "F-16C_50":
    case "F-16I": {
      let payload = [
        {
          device: 17,
          code: 3032,
          delay: 100,
          activate: -1,
          addDepress: "true",
        },
        {
          device: 17,
          code: 3006,
          delay: 100,
          activate: 1,
          addDepress: "true",
        },
      ];
      for (const waypoint of waypoints) {
        payload.push(
          {
            device: 17,
            code: 3030,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 17,
            code: 3035,
            delay: 100,
            activate: -1,
            addDepress: "true",
          },
          {
            device: 17,
            code: 3035,
            delay: 100,
            activate: -1,
            addDepress: "true",
          }
        );
        //Type hem
        if (waypoint.latHem === "N") {
          payload.push({
            device: 17,
            code: 3004,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 17,
            code: 3010,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //Type lat
        for (let i = 0; i < waypoint.lat.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.lat.charAt(i)) {
            case "1":
              payload.push({
                device: 17,
                code: 3003,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 17,
                code: 3004,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 17,
                code: 3005,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 17,
                code: 3006,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 17,
                code: 3007,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 17,
                code: 3008,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 17,
                code: 3009,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 17,
                code: 3010,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 17,
                code: 3011,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 17,
                code: 3002,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //enter
        payload.push({
          device: 17,
          code: 3016,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //dobber to long
        payload.push({
          device: 17,
          code: 3035,
          delay: 100,
          activate: -1,
          addDepress: "true",
        });
        //Type hem
        if (waypoint.longHem === "E") {
          payload.push({
            device: 17,
            code: 3008,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 17,
            code: 3006,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //type long
        for (let i = 0; i < waypoint.long.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.long.charAt(i)) {
            case "1":
              payload.push({
                device: 17,
                code: 3003,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 17,
                code: 3004,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 17,
                code: 3005,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 17,
                code: 3006,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 17,
                code: 3007,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 17,
                code: 3008,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 17,
                code: 3009,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 17,
                code: 3010,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 17,
                code: 3011,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 17,
                code: 3002,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //enter
        payload.push({
          device: 17,
          code: 3016,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //dobber to elev
        payload.push({
          device: 17,
          code: 3035,
          delay: 100,
          activate: -1,
          addDepress: "true",
        });
        //type elev
        for (let i = 0; i < waypoint.elev.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.elev.charAt(i)) {
            case "1":
              payload.push({
                device: 17,
                code: 3003,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 17,
                code: 3004,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 17,
                code: 3005,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 17,
                code: 3006,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 17,
                code: 3007,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 17,
                code: 3008,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 17,
                code: 3009,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 17,
                code: 3010,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 17,
                code: 3011,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 17,
                code: 3002,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //enter
        payload.push({
          device: 17,
          code: 3016,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //back to steerpoint field
        payload.push(
          {
            device: 17,
            code: 3034,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 17,
            code: 3034,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 17,
            code: 3034,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 17,
            code: 3034,
            delay: 100,
            activate: 1,
            addDepress: "true",
          }
        );
      }

      //main page
      payload.push({
        device: 17,
        code: 3032,
        delay: 100,
        activate: -1,
        addDepress: "true",
      });

      return payload;
    }
    case "FA-18C_hornet": {
      let payload = [];
      //enter the SUPT menu
      payload.push({
        device: 37,
        code: 3028,
        delay: 100,
        activate: 1,
        addDepress: "true",
      });
      payload.push({
        device: 37,
        code: 3028,
        delay: 100,
        activate: 1,
        addDepress: "true",
      });
      //select HSD
      payload.push({
        device: 37,
        code: 3012,
        delay: 100,
        activate: 1,
        addDepress: "true",
      });
      //select DATA
      payload.push({
        device: 37,
        code: 3020,
        delay: 100,
        activate: 1,
        addDepress: "true",
      });

      for (const waypoint of waypoints) {
        //increment waypoint
        payload.push({
          device: 37,
          code: 3022,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //press UFC
        payload.push({
          device: 37,
          code: 3015,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //press position 1
        payload.push({
          device: 25,
          code: 3010,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type hem
        if (waypoint.latHem === "N") {
          payload.push({
            device: 25,
            code: 3020,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 25,
            code: 3026,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //enter first lat digits
        const firstLat = waypoint.lat.substring(0, waypoint.lat.length - 4 - 2);
        const last4Lat = waypoint.lat.substring(waypoint.lat.length - 4 - 2);
        //Type lat
        for (let i = 0; i < firstLat.length; i++) {
          // eslint-disable-next-line default-case
          switch (firstLat.charAt(i)) {
            case "1":
              payload.push({
                device: 25,
                code: 3019,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 25,
                code: 3020,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 25,
                code: 3021,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 25,
                code: 3022,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 25,
                code: 3023,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 25,
                code: 3024,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 25,
                code: 3025,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 25,
                code: 3026,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 25,
                code: 3027,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 25,
                code: 3018,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press enter
        payload.push({
          device: 25,
          code: 3029,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //enter last 4 digits
        for (let i = 0; i < last4Lat.length; i++) {
          // eslint-disable-next-line default-case
          switch (last4Lat.charAt(i)) {
            case "1":
              payload.push({
                device: 25,
                code: 3019,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 25,
                code: 3020,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 25,
                code: 3021,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 25,
                code: 3022,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 25,
                code: 3023,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 25,
                code: 3024,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 25,
                code: 3025,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 25,
                code: 3026,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 25,
                code: 3027,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 25,
                code: 3018,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press enter
        payload.push({
          device: 25,
          code: 3029,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type hem
        if (waypoint.latHem === "E") {
          payload.push({
            device: 25,
            code: 3024,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 25,
            code: 3022,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //enter first long digits
        const firstLong = waypoint.long.substring(
          0,
          waypoint.long.length - 4 - 2
        );
        const last4Long = waypoint.long.substring(waypoint.long.length - 4 - 2);
        //Type long
        for (let i = 0; i < firstLong.length; i++) {
          // eslint-disable-next-line default-case
          switch (firstLong.charAt(i)) {
            case "1":
              payload.push({
                device: 25,
                code: 3019,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 25,
                code: 3020,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 25,
                code: 3021,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 25,
                code: 3022,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 25,
                code: 3023,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 25,
                code: 3024,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 25,
                code: 3025,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 25,
                code: 3026,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 25,
                code: 3027,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 25,
                code: 3018,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press enter
        payload.push({
          device: 25,
          code: 3029,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //enter last 4 digits
        for (let i = 0; i < last4Long.length; i++) {
          // eslint-disable-next-line default-case
          switch (last4Long.charAt(i)) {
            case "1":
              payload.push({
                device: 25,
                code: 3019,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 25,
                code: 3020,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 25,
                code: 3021,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 25,
                code: 3022,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 25,
                code: 3023,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 25,
                code: 3024,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 25,
                code: 3025,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 25,
                code: 3026,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 25,
                code: 3027,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 25,
                code: 3018,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press enter
        payload.push({
          device: 25,
          code: 3029,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //press position 3 to select elevation
        payload.push({
          device: 25,
          code: 3012,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //press position 1 to select feet
        payload.push({
          device: 25,
          code: 3010,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type elev
        for (let i = 0; i < waypoint.elev.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.elev.charAt(i)) {
            case "1":
              payload.push({
                device: 25,
                code: 3019,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 25,
                code: 3020,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 25,
                code: 3021,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 25,
                code: 3022,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 25,
                code: 3023,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 25,
                code: 3024,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 25,
                code: 3025,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 25,
                code: 3026,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 25,
                code: 3027,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 25,
                code: 3018,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press enter
        payload.push({
          device: 25,
          code: 3029,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
      }

      return payload;
    }
    case "AH-64D_BLK_IIpilot": {
      let payload = [];
      //Enter TSD Page
      payload.push({
        device: 43,
        code: 3029,
        delay: 100,
        activate: 1,
        addDepress: "true",
      });
      //goto Point page
      payload.push({
        device: 43,
        code: 3013,
        delay: 100,
        activate: 1,
        addDepress: "true",
      });

      for (const waypoint of waypoints) {
        //press ADD
        payload.push({
          device: 43,
          code: 3023,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //press IDENT
        payload.push({
          device: 43,
          code: 3024,
          delay: 200,
          activate: 1,
          addDepress: "true",
        });
        //press ENTER
        payload.push({
          device: 29,
          code: 3006,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type name (max 3 chars)
        for (let i = 0; i < 3; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.name.charAt(i)) {
            case "1":
              payload.push({
                device: 29,
                code: 3033,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 29,
                code: 3034,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 29,
                code: 3035,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 29,
                code: 3036,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 29,
                code: 3037,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 29,
                code: 3038,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 29,
                code: 3039,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 29,
                code: 3040,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 29,
                code: 3041,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 29,
                code: 3043,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case " ":
              payload.push({
                device: 29,
                code: 3003,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case ".":
            case ",":
              payload.push({
                device: 29,
                code: 3042,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "/":
              payload.push({
                device: 29,
                code: 3045,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "-":
              payload.push({
                device: 29,
                code: 3047,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "+":
              payload.push({
                device: 29,
                code: 3046,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "a":
            case "A":
              payload.push({
                device: 29,
                code: 3007,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "b":
            case "B":
              payload.push({
                device: 29,
                code: 3008,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "c":
            case "C":
              payload.push({
                device: 29,
                code: 3009,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "d":
            case "D":
              payload.push({
                device: 29,
                code: 3010,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "e":
            case "E":
              payload.push({
                device: 29,
                code: 3011,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "f":
            case "F":
              payload.push({
                device: 29,
                code: 3012,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "g":
            case "G":
              payload.push({
                device: 29,
                code: 3013,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "h":
            case "H":
              payload.push({
                device: 29,
                code: 3014,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "i":
            case "I":
              payload.push({
                device: 29,
                code: 3015,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "j":
            case "J":
              payload.push({
                device: 29,
                code: 3016,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "k":
            case "K":
              payload.push({
                device: 29,
                code: 3017,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "l":
            case "L":
              payload.push({
                device: 29,
                code: 3018,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "m":
            case "M":
              payload.push({
                device: 29,
                code: 3019,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "n":
            case "N":
              payload.push({
                device: 29,
                code: 3020,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "o":
            case "O":
              payload.push({
                device: 29,
                code: 3021,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "p":
            case "P":
              payload.push({
                device: 29,
                code: 3022,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "q":
            case "Q":
              payload.push({
                device: 29,
                code: 3023,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "r":
            case "R":
              payload.push({
                device: 29,
                code: 3024,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "s":
            case "S":
              payload.push({
                device: 29,
                code: 3025,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "t":
            case "T":
              payload.push({
                device: 29,
                code: 3026,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "u":
            case "U":
              payload.push({
                device: 29,
                code: 3027,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "v":
            case "V":
              payload.push({
                device: 29,
                code: 3028,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "w":
            case "W":
              payload.push({
                device: 29,
                code: 3029,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "x":
            case "X":
              payload.push({
                device: 29,
                code: 3030,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "y":
            case "Y":
              payload.push({
                device: 29,
                code: 3031,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "z":
            case "Z":
              payload.push({
                device: 29,
                code: 3032,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press ENTER
        payload.push({
          device: 29,
          code: 3006,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //press CLR
        payload.push({
          device: 29,
          code: 3001,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //check if latitude is N or S
        if (waypoint.latHem === "N") {
          payload.push({
            device: 29,
            code: 3020,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 29,
            code: 3025,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //Type lat
        for (let i = 0; i < waypoint.lat.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.lat.charAt(i)) {
            case "1":
              payload.push({
                device: 29,
                code: 3033,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 29,
                code: 3034,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 29,
                code: 3035,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 29,
                code: 3036,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 29,
                code: 3037,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 29,
                code: 3038,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 29,
                code: 3039,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 29,
                code: 3040,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 29,
                code: 3041,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 29,
                code: 3043,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //check if longitude is E or W
        if (waypoint.longHem === "E") {
          payload.push({
            device: 29,
            code: 3011,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 29,
            code: 3029,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //Type long
        for (let i = 0; i < waypoint.long.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.long.charAt(i)) {
            case "1":
              payload.push({
                device: 29,
                code: 3033,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 29,
                code: 3034,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 29,
                code: 3035,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 29,
                code: 3036,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 29,
                code: 3037,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 29,
                code: 3038,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 29,
                code: 3039,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 29,
                code: 3040,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 29,
                code: 3041,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 29,
                code: 3043,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press ENTER
        payload.push({
          device: 29,
          code: 3006,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //press CLR
        payload.push({
          device: 29,
          code: 3001,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type elev
        for (let i = 0; i < waypoint.elev.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.elev.charAt(i)) {
            case "1":
              payload.push({
                device: 29,
                code: 3033,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 29,
                code: 3034,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 29,
                code: 3035,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 29,
                code: 3036,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 29,
                code: 3037,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 29,
                code: 3038,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 29,
                code: 3039,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 29,
                code: 3040,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 29,
                code: 3041,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 29,
                code: 3043,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press ENTER
        payload.push({
          device: 29,
          code: 3006,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
      }
      return payload;
    }
    case "AH-64D_BLK_IIgunner": {
      let payload = [];
      //Enter TSD Page
      payload.push({
        device: 45,
        code: 3029,
        delay: 100,
        activate: 1,
        addDepress: "true",
      });
      //goto Point page
      payload.push({
        device: 45,
        code: 3013,
        delay: 100,
        activate: 1,
        addDepress: "true",
      });

      for (const waypoint of waypoints) {
        //press ADD
        payload.push({
          device: 45,
          code: 3023,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //press IDENT
        payload.push({
          device: 45,
          code: 3024,
          delay: 200,
          activate: 1,
          addDepress: "true",
        });
        //press ENTER
        payload.push({
          device: 30,
          code: 3006,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type name (max 3 chars)
        for (let i = 0; i < 3; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.name.charAt(i)) {
            case "1":
              payload.push({
                device: 30,
                code: 3033,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 30,
                code: 3034,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 30,
                code: 3035,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 30,
                code: 3036,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 30,
                code: 3037,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 30,
                code: 3038,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 30,
                code: 3039,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 30,
                code: 3040,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 30,
                code: 3041,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 30,
                code: 3043,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case " ":
              payload.push({
                device: 30,
                code: 3003,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case ".":
            case ",":
              payload.push({
                device: 30,
                code: 3042,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "/":
              payload.push({
                device: 30,
                code: 3045,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "-":
              payload.push({
                device: 30,
                code: 3047,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "+":
              payload.push({
                device: 30,
                code: 3046,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "a":
            case "A":
              payload.push({
                device: 30,
                code: 3007,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "b":
            case "B":
              payload.push({
                device: 30,
                code: 3008,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "c":
            case "C":
              payload.push({
                device: 30,
                code: 3009,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "d":
            case "D":
              payload.push({
                device: 30,
                code: 3010,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "e":
            case "E":
              payload.push({
                device: 30,
                code: 3011,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "f":
            case "F":
              payload.push({
                device: 30,
                code: 3012,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "g":
            case "G":
              payload.push({
                device: 30,
                code: 3013,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "h":
            case "H":
              payload.push({
                device: 30,
                code: 3014,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "i":
            case "I":
              payload.push({
                device: 30,
                code: 3015,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "j":
            case "J":
              payload.push({
                device: 30,
                code: 3016,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "k":
            case "K":
              payload.push({
                device: 30,
                code: 3017,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "l":
            case "L":
              payload.push({
                device: 30,
                code: 3018,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "m":
            case "M":
              payload.push({
                device: 30,
                code: 3019,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "n":
            case "N":
              payload.push({
                device: 30,
                code: 3020,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "o":
            case "O":
              payload.push({
                device: 30,
                code: 3021,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "p":
            case "P":
              payload.push({
                device: 30,
                code: 3022,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "q":
            case "Q":
              payload.push({
                device: 30,
                code: 3023,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "r":
            case "R":
              payload.push({
                device: 30,
                code: 3024,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "s":
            case "S":
              payload.push({
                device: 30,
                code: 3025,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "t":
            case "T":
              payload.push({
                device: 30,
                code: 3026,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "u":
            case "U":
              payload.push({
                device: 30,
                code: 3027,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "v":
            case "V":
              payload.push({
                device: 30,
                code: 3028,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "w":
            case "W":
              payload.push({
                device: 30,
                code: 3029,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "x":
            case "X":
              payload.push({
                device: 30,
                code: 3030,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "y":
            case "Y":
              payload.push({
                device: 30,
                code: 3031,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "z":
            case "Z":
              payload.push({
                device: 30,
                code: 3032,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press ENTER
        payload.push({
          device: 30,
          code: 3006,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //press CLR
        payload.push({
          device: 30,
          code: 3001,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //check if latitude is N or S
        if (waypoint.latHem === "N") {
          payload.push({
            device: 30,
            code: 3020,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 30,
            code: 3025,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //Type lat
        for (let i = 0; i < waypoint.lat.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.lat.charAt(i)) {
            case "1":
              payload.push({
                device: 30,
                code: 3033,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 30,
                code: 3034,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 30,
                code: 3035,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 30,
                code: 3036,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 30,
                code: 3037,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 30,
                code: 3038,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 30,
                code: 3039,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 30,
                code: 3040,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 30,
                code: 3041,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 30,
                code: 3043,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //check if longitude is E or W
        if (waypoint.longHem === "E") {
          payload.push({
            device: 30,
            code: 3011,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 30,
            code: 3029,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //Type long
        for (let i = 0; i < waypoint.long.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.long.charAt(i)) {
            case "1":
              payload.push({
                device: 30,
                code: 3033,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 30,
                code: 3034,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 30,
                code: 3035,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 30,
                code: 3036,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 30,
                code: 3037,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 30,
                code: 3038,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 30,
                code: 3039,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 30,
                code: 3040,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 30,
                code: 3041,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 30,
                code: 3043,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press ENTER
        payload.push({
          device: 30,
          code: 3006,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //press CLR
        payload.push({
          device: 30,
          code: 3001,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type elev
        for (let i = 0; i < waypoint.elev.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.elev.charAt(i)) {
            case "1":
              payload.push({
                device: 30,
                code: 3033,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 30,
                code: 3034,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 30,
                code: 3035,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 30,
                code: 3036,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 30,
                code: 3037,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 30,
                code: 3038,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 30,
                code: 3039,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 30,
                code: 3040,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 30,
                code: 3041,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 30,
                code: 3043,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //press ENTER
        payload.push({
          device: 30,
          code: 3006,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
      }
      return payload;
    }
    case "A-10C_2":
    case "A-10C": {
      let payload = [
        {
          device: 9,
          code: 3011,
          delay: 100,
          activate: 1,
          addDepress: "true",
        },
        {
          device: 9,
          code: 3005,
          delay: 100,
          activate: 1,
          addDepress: "true",
        },
      ];

      for (const waypoint of waypoints) {
        payload.push({
          device: 9,
          code: 3007,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type hem
        if (waypoint.latHem === "N") {
          payload.push({
            device: 9,
            code: 3040,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 9,
            code: 3045,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //Type lat
        for (let i = 0; i < waypoint.lat.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.lat.charAt(i)) {
            case "1":
              payload.push({
                device: 9,
                code: 3015,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 9,
                code: 3016,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 9,
                code: 3017,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 9,
                code: 3018,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 9,
                code: 3019,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 9,
                code: 3020,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 9,
                code: 3021,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 9,
                code: 3022,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 9,
                code: 3023,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 9,
                code: 3024,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        payload.push({
          device: 9,
          code: 3003,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type hem
        if (waypoint.longHem === "E") {
          payload.push({
            device: 9,
            code: 3031,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 9,
            code: 3049,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //Type long
        for (let i = 0; i < waypoint.long.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.long.charAt(i)) {
            case "1":
              payload.push({
                device: 9,
                code: 3015,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 9,
                code: 3016,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 9,
                code: 3017,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 9,
                code: 3018,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 9,
                code: 3019,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 9,
                code: 3020,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 9,
                code: 3021,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 9,
                code: 3022,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 9,
                code: 3023,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 9,
                code: 3024,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        payload.push({
          device: 9,
          code: 3004,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type name
        for (let i = 0; i < waypoint.name.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.name.charAt(i)) {
            case "1":
              payload.push({
                device: 9,
                code: 3015,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 9,
                code: 3016,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 9,
                code: 3017,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 9,
                code: 3018,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 9,
                code: 3019,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 9,
                code: 3020,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 9,
                code: 3021,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 9,
                code: 3022,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 9,
                code: 3023,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 9,
                code: 3024,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case " ":
              payload.push({
                device: 9,
                code: 3057,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case ".":
            case ",":
              payload.push({
                device: 9,
                code: 3025,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "/":
              payload.push({
                device: 9,
                code: 3026,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "a":
            case "A":
              payload.push({
                device: 9,
                code: 3027,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "b":
            case "B":
              payload.push({
                device: 9,
                code: 3028,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "c":
            case "C":
              payload.push({
                device: 9,
                code: 3029,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "d":
            case "D":
              payload.push({
                device: 9,
                code: 3030,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "e":
            case "E":
              payload.push({
                device: 9,
                code: 3031,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "f":
            case "F":
              payload.push({
                device: 9,
                code: 3032,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "g":
            case "G":
              payload.push({
                device: 9,
                code: 3033,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "h":
            case "H":
              payload.push({
                device: 9,
                code: 3034,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "i":
            case "I":
              payload.push({
                device: 9,
                code: 3035,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "j":
            case "J":
              payload.push({
                device: 9,
                code: 3036,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "k":
            case "K":
              payload.push({
                device: 9,
                code: 3037,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "l":
            case "L":
              payload.push({
                device: 9,
                code: 3038,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "m":
            case "M":
              payload.push({
                device: 9,
                code: 3039,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "n":
            case "N":
              payload.push({
                device: 9,
                code: 3040,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "o":
            case "O":
              payload.push({
                device: 9,
                code: 3041,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "p":
            case "P":
              payload.push({
                device: 9,
                code: 3042,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "q":
            case "Q":
              payload.push({
                device: 9,
                code: 3043,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "r":
            case "R":
              payload.push({
                device: 9,
                code: 3044,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "s":
            case "S":
              payload.push({
                device: 9,
                code: 3045,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "t":
            case "T":
              payload.push({
                device: 9,
                code: 3046,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "u":
            case "U":
              payload.push({
                device: 9,
                code: 3047,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "v":
            case "V":
              payload.push({
                device: 9,
                code: 3048,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "w":
            case "W":
              payload.push({
                device: 9,
                code: 3049,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "x":
            case "X":
              payload.push({
                device: 9,
                code: 3050,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "y":
            case "Y":
              payload.push({
                device: 9,
                code: 3051,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "z":
            case "Z":
              payload.push({
                device: 9,
                code: 3052,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //Enter name
        payload.push({
          device: 9,
          code: 3005,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
      }

      return payload;
    }
    case "M-2000C": {
      let payload = [];
      for (const waypoint of waypoints) {
        payload.push(
          {
            device: 9,
            code: 3574,
            delay: 100,
            activate: 0.4,
            addDepress: "false",
          },
          {
            device: 9,
            code: 3110,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 9,
            code: 3570,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 9,
            code: 3570,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 9,
            code: 3584,
            delay: 100,
            activate: 1,
            addDepress: "true",
          }
        );
        //Type hem
        if (waypoint.latHem === "N") {
          payload.push({
            device: 9,
            code: 3585,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 9,
            code: 3591,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //type lat
        for (let i = 0; i < waypoint.lat.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.lat.charAt(i)) {
            case "1":
              payload.push({
                device: 9,
                code: 3584,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 9,
                code: 3585,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 9,
                code: 3586,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 9,
                code: 3587,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 9,
                code: 3588,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 9,
                code: 3589,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 9,
                code: 3590,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 9,
                code: 3591,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 9,
                code: 3592,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 9,
                code: 3593,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        payload.push({
          device: 9,
          code: 3596,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        payload.push({
          device: 9,
          code: 3586,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        //Type hem
        if (waypoint.longHem === "E") {
          payload.push({
            device: 9,
            code: 3589,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 9,
            code: 3587,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //type long
        for (let i = 0; i < waypoint.long.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.long.charAt(i)) {
            case "1":
              payload.push({
                device: 9,
                code: 3584,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 9,
                code: 3585,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 9,
                code: 3586,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 9,
                code: 3587,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 9,
                code: 3588,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 9,
                code: 3589,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 9,
                code: 3590,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 9,
                code: 3591,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 9,
                code: 3592,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 9,
                code: 3593,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        payload.push({
          device: 9,
          code: 3596,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        payload.push({
          device: 9,
          code: 3574,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        payload.push(
          {
            device: 9,
            code: 3584,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 9,
            code: 3584,
            delay: 100,
            activate: 1,
            addDepress: "true",
          }
        );
        //type elev
        for (let i = 0; i < waypoint.elev.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.elev.charAt(i)) {
            case "1":
              payload.push({
                device: 9,
                code: 3584,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 9,
                code: 3585,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 9,
                code: 3586,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 9,
                code: 3587,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 9,
                code: 3588,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 9,
                code: 3589,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 9,
                code: 3590,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 9,
                code: 3591,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 9,
                code: 3592,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 9,
                code: 3593,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        payload.push({
          device: 9,
          code: 3596,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
      }
      return payload;
    }
    case "AV8BNA": {
      let payload = [
        //nav mode
        {
          device: 12,
          code: 3282,
          delay: 100,
          activate: 1,
          addDepress: "true",
        },
        //left MFD menu
        {
          device: 26,
          code: 3217,
          delay: 100,
          activate: 1,
          addDepress: "true",
        },
        //EHSD
        {
          device: 26,
          code: 3201,
          delay: 100,
          activate: 1,
          addDepress: "true",
        },
        //DATA
        {
          device: 26,
          code: 3201,
          delay: 100,
          activate: 1,
          addDepress: "true",
        },
      ];
      for (const waypoint of waypoints) {
        //increment
        payload.push(
          {
            device: 23,
            code: 3312,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 23,
            code: 3312,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          //ENT
          {
            device: 23,
            code: 3314,
            delay: 100,
            activate: 1,
            addDepress: "true",
          },
          //ODU 2
          {
            device: 24,
            code: 3251,
            delay: 100,
            activate: 1,
            addDepress: "true",
          }
        );
        //Type hem
        if (waypoint.latHem === "N") {
          payload.push({
            device: 23,
            code: 3303,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 23,
            code: 3311,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //type lat
        for (let i = 0; i < waypoint.lat.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.lat.charAt(i)) {
            case "1":
              payload.push({
                device: 23,
                code: 3302,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 23,
                code: 3303,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 23,
                code: 3304,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 23,
                code: 3306,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 23,
                code: 3307,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 23,
                code: 3308,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 23,
                code: 3310,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 23,
                code: 3311,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 23,
                code: 3312,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 23,
                code: 3315,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        payload.push(
          //ENT
          {
            device: 23,
            code: 3314,
            delay: 100,
            activate: 1,
            addDepress: "true",
          }
        );
        //Type hem
        if (waypoint.longHem === "E") {
          payload.push({
            device: 23,
            code: 3308,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 23,
            code: 3306,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //type long
        for (let i = 0; i < waypoint.long.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.long.charAt(i)) {
            case "1":
              payload.push({
                device: 23,
                code: 3302,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 23,
                code: 3303,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 23,
                code: 3304,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 23,
                code: 3306,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 23,
                code: 3307,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 23,
                code: 3308,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 23,
                code: 3310,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 23,
                code: 3311,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 23,
                code: 3312,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 23,
                code: 3315,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        payload.push(
          //ENT
          {
            device: 23,
            code: 3314,
            delay: 100,
            activate: 1,
            addDepress: "true",
          }
        );
        // Select elevation
        payload.push({
          device: 24,
          code: 3252,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
        console.log(waypoint.elev);
        //type elevation
        for (let i = 0; i < waypoint.elev.length; i++) {
          // eslint-disable-next-line default-case
          switch (waypoint.elev.charAt(i)) {
            case "1":
              payload.push({
                device: 23,
                code: 3302,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 23,
                code: 3303,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 23,
                code: 3304,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 23,
                code: 3306,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 23,
                code: 3307,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 23,
                code: 3308,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 23,
                code: 3310,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 23,
                code: 3311,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 23,
                code: 3312,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 23,
                code: 3315,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        payload.push(
          //ENT
          {
            device: 23,
            code: 3314,
            delay: 100,
            activate: 1,
            addDepress: "true",
          }
        );
        payload.push(
          //revert to selection mode
          {
            device: 24,
            code: 3250,
            delay: 100,
            activate: 1,
            addDepress: "true",
          }
        );
      }
      payload.push(
        //deselect DATA
        {
          device: 26,
          code: 3201,
          delay: 100,
          activate: 1,
          addDepress: "true",
        }
      );
      return payload;
    }
    case "Ka-50":
    case "Ka-50_3": {
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
      let payload = [
        //PVI to Entry mode
        {
          device: 20,
          code: 3026,
          delay: 100,
          activate: 0.2,
          addDepress: "false",
        },
        //Press waypoint button
        {
          device: 20,
          code: 3011,
          delay: 100,
          activate: 1,
          addDepress: "true",
        },
      ];

      for (let i = 1; i <= waypoints.length; i++) {
        //Press the corresponding waypoint number
        // eslint-disable-next-line default-case
        switch (i) {
          case 1: {
            payload.push({
              device: 20,
              code: 3002,
              delay: 100,
              activate: 1,
              addDepress: "true",
            });
            break;
          }
          case 2: {
            payload.push({
              device: 20,
              code: 3003,
              delay: 100,
              activate: 1,
              addDepress: "true",
            });
            break;
          }
          case 3: {
            payload.push({
              device: 20,
              code: 3004,
              delay: 100,
              activate: 1,
              addDepress: "true",
            });
            break;
          }
          case 4: {
            payload.push({
              device: 20,
              code: 3005,
              delay: 100,
              activate: 1,
              addDepress: "true",
            });
            break;
          }
          case 5: {
            payload.push({
              device: 20,
              code: 3006,
              delay: 100,
              activate: 1,
              addDepress: "true",
            });
            break;
          }
          case 6: {
            payload.push({
              device: 20,
              code: 3007,
              delay: 100,
              activate: 1,
              addDepress: "true",
            });
            break;
          }
        }
        //Type hem
        if (waypoints[i - 1].latHem === "N") {
          payload.push({
            device: 20,
            code: 3001,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 20,
            code: 3002,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //type lat
        for (let j = 0; j < waypoints[i - 1].lat.length; j++) {
          // eslint-disable-next-line default-case
          switch (waypoints[i - 1].lat.charAt(j)) {
            case "1":
              payload.push({
                device: 20,
                code: 3002,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 20,
                code: 3003,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 20,
                code: 3004,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 20,
                code: 3005,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 20,
                code: 3006,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 20,
                code: 3007,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 20,
                code: 3008,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 20,
                code: 3009,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 20,
                code: 3010,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 20,
                code: 3001,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //Type hem
        if (waypoints[i - 1].longHem === "E") {
          payload.push({
            device: 20,
            code: 3001,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 20,
            code: 3002,
            delay: 100,
            activate: 1,
            addDepress: "true",
          });
        }
        //type long
        for (let j = 0; j < waypoints[i - 1].long.length; j++) {
          // eslint-disable-next-line default-case
          switch (waypoints[i - 1].long.charAt(j)) {
            case "1":
              payload.push({
                device: 20,
                code: 3002,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 20,
                code: 3003,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 20,
                code: 3004,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 20,
                code: 3005,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 20,
                code: 3006,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 20,
                code: 3007,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 20,
                code: 3008,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 20,
                code: 3009,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 20,
                code: 3010,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 20,
                code: 3001,
                delay: 100,
                activate: 1,
                addDepress: "true",
              });
              break;
          }
        }
        //Press Enter
        payload.push({
          device: 20,
          code: 3018,
          delay: 100,
          activate: 1,
          addDepress: "true",
        });
      }
      //PVI to OPER
      payload.push({
        device: 20,
        code: 3026,
        delay: 100,
        activate: 0.3,
        addDepress: "false",
      });
      return payload;
    }
    default:
      return [];
  }
}
