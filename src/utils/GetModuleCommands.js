export default function getModuleCommands(module, waypoints) {
  switch (module) {
    case "F-16C_50": {
      let payload = [
        {
          device: 17,
          code: 3032,
          delay: 20,
          activate: -1,
          addDepress: "true",
        },
        {
          device: 17,
          code: 3006,
          delay: 0,
          activate: 1,
          addDepress: "true",
        },
      ];
      for (const waypoint of waypoints) {
        payload.push(
          {
            device: 17,
            code: 3030,
            delay: 0,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 17,
            code: 3035,
            delay: 20,
            activate: -1,
            addDepress: "true",
          },
          {
            device: 17,
            code: 3035,
            delay: 20,
            activate: -1,
            addDepress: "true",
          }
        );
        //Type hem
        if (waypoint.latHem === "N") {
          payload.push({
            device: 17,
            code: 3004,
            delay: 0,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 17,
            code: 3010,
            delay: 0,
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
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 17,
                code: 3004,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 17,
                code: 3005,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 17,
                code: 3006,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 17,
                code: 3007,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 17,
                code: 3008,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 17,
                code: 3009,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 17,
                code: 3010,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 17,
                code: 3011,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 17,
                code: 3002,
                delay: 0,
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
          delay: 0,
          activate: 1,
          addDepress: "true",
        });
        //dobber to long
        payload.push({
          device: 17,
          code: 3035,
          delay: 20,
          activate: -1,
          addDepress: "true",
        });
        //Type hem
        if (waypoint.longHem === "E") {
          payload.push({
            device: 17,
            code: 3008,
            delay: 0,
            activate: 1,
            addDepress: "true",
          });
        } else {
          payload.push({
            device: 17,
            code: 3006,
            delay: 0,
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
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 17,
                code: 3004,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 17,
                code: 3005,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 17,
                code: 3006,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 17,
                code: 3007,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 17,
                code: 3008,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 17,
                code: 3009,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 17,
                code: 3010,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 17,
                code: 3011,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 17,
                code: 3002,
                delay: 0,
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
          delay: 0,
          activate: 1,
          addDepress: "true",
        });
        //dobber to elev
        payload.push({
          device: 17,
          code: 3035,
          delay: 20,
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
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "2":
              payload.push({
                device: 17,
                code: 3004,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "3":
              payload.push({
                device: 17,
                code: 3005,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "4":
              payload.push({
                device: 17,
                code: 3006,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "5":
              payload.push({
                device: 17,
                code: 3007,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "6":
              payload.push({
                device: 17,
                code: 3008,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "7":
              payload.push({
                device: 17,
                code: 3009,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "8":
              payload.push({
                device: 17,
                code: 3010,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "9":
              payload.push({
                device: 17,
                code: 3011,
                delay: 0,
                activate: 1,
                addDepress: "true",
              });
              break;
            case "0":
              payload.push({
                device: 17,
                code: 3002,
                delay: 0,
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
          delay: 0,
          activate: 1,
          addDepress: "true",
        });
        //back to steerpoint field
        payload.push(
          {
            device: 17,
            code: 3034,
            delay: 20,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 17,
            code: 3034,
            delay: 20,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 17,
            code: 3034,
            delay: 20,
            activate: 1,
            addDepress: "true",
          },
          {
            device: 17,
            code: 3034,
            delay: 20,
            activate: 1,
            addDepress: "true",
          }
        );
      }
      //main page
      payload.push({
        device: 17,
        code: 3032,
        delay: 20,
        activate: -1,
        addDepress: "true",
      });

      return payload;
    }
    case "AH-64D_BLK_II": {
      return [];
    }
    default:
      return [];
  }
}
