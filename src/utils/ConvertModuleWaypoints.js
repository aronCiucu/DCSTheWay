//v2
import Convertors from "./Convertors";

const convert = (dcsWaypoints, module) => {
  switch (module) {
    case "AH-6J":
    case "MH-6J": {
      // lat  00.00.000 DMM
      // long 000.00.000
      // AH/MH-6J also carries explicit hemisphere fields for TNL3100 entry
      let waypoints = [];
      for (const dcsWaypoint of dcsWaypoints) {
        const name = dcsWaypoint.name;
        const id = dcsWaypoint.id;
        const dmmLat = Convertors.decimalToDMM(dcsWaypoint.lat);
        const dmmLong = Convertors.decimalToDMM(dcsWaypoint.long);
        const lat =
          dmmLat.deg.toString().padStart(2, "0") +
          "." +
          dmmLat.min.toFixed(3).toString().padStart(6, "0");
        const long =
          dmmLong.deg.toString().padStart(3, "0") +
          "." +
          dmmLong.min.toFixed(3).toString().padStart(6, "0");
        const elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev)).toString();
        const latHem = dcsWaypoint.lat >= 0 ? "N" : "S";
        const longHem = dcsWaypoint.long >= 0 ? "E" : "W";

        waypoints.push({
          name,
          id,
          lat,
          long,
          elev,
          latHem,
          longHem,
          latHemi: latHem,
          longHemi: longHem,
        });
      }
      return waypoints;
    }

    default:
    case "F-15ESE":
    case "F-16C_50":
    case "F-16D_50":
    case "F-16D_50_NS":
    case "F-16D_52":
    case "F-16D_52_NS":
    case "F-16D_Barak_30":
    case "F-16D_Barak_40":
    case "F-16I":
    case "A-10C_2":
    case "A-10C":
    case "Hercules":
    case "M-2000C":
    case "AV8BNA":
    case "CH-47Fbl1":
    case "C-130J-30": {
      // lat  00.00.000 DMM
      // long 000.00.000
      let waypoints = [];
      for (const dcsWaypoint of dcsWaypoints) {
        const name = dcsWaypoint.name;
        const id = dcsWaypoint.id;
        const dmmLat = Convertors.decimalToDMM(dcsWaypoint.lat);
        const dmmLong = Convertors.decimalToDMM(dcsWaypoint.long);
        const lat =
          dmmLat.deg.toString().padStart(2, "0") +
          "." +
          dmmLat.min.toFixed(3).toString().padStart(6, "0");
        const long =
          dmmLong.deg.toString().padStart(3, "0") +
          "." +
          dmmLong.min.toFixed(3).toString().padStart(6, "0");
        const elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev)).toString();
        const latHem = dcsWaypoint.lat > 0 ? "N" : "S";
        const longHem = dcsWaypoint.long > 0 ? "E" : "W";
        waypoints.push({
          name,
          id,
          lat,
          long,
          elev,
          latHem,
          longHem,
        });
      }
      return waypoints;
    }


    case "A-10A":
    case "AJS37":
    case "Bf-109K-4":
    case "C-101CC":
    case "C-101EB":
    case "Christen Eagle II":
    case "F-14B":
    case "F-15C":
    case "F-5E-3":
    case "F-86F Sabre":
    case "FW-190D9":
    case "I-16":
    case "JF-17":
    case "J-11A":
    case "L-39C":
    case "L-39ZA":
    case "Mi-24P":
    case "Mi-8MT":
    case "MiG-15bis":
    case "MiG-21bis":
    case "MiG-29 Fulcrum":
    case "MiG-29A":
    case "MiG-29G":
    case "MiG-29S":
    case "P-51D":
    case "SpitfireLFMkIX":
    case "SpitfireLFMkIXCW":
    case "Su-25":
    case "Su-25T":
    case "Su-27":
    case "Su-33":
    case "TF-51D":
    case "UH-1H":
    case "Yak-52": {
      // lat  00.00 DMM
      // long 000.00 DMM
      let waypoints = [];
      for (const dcsWaypoint of dcsWaypoints) {
        const name = dcsWaypoint.name;
        const id = dcsWaypoint.id;
        const dmmLat = Convertors.decimalToDMM(dcsWaypoint.lat);
        const dmmLong = Convertors.decimalToDMM(dcsWaypoint.long);
        const lat =
          dmmLat.deg.toString().padStart(2, "0") +
          "." +
          dmmLat.min.toFixed(2).toString().padStart(5, "0");
        const long =
          dmmLong.deg.toString().padStart(3, "0") +
          "." +
          dmmLong.min.toFixed(2).toString().padStart(5, "0");
        const elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev)).toString();
        const latHem = dcsWaypoint.lat >= 0 ? "N" : "S";
        const longHem = dcsWaypoint.long >= 0 ? "E" : "W";

        waypoints.push({
          name,
          id,
          lat,
          long,
          elev,
          latHem,
          longHem,
          latHemi: latHem,
          longHemi: longHem,
        });
      }
      return waypoints;
    }

    case "AH-64D_BLK_II":
    case "UH-60L":
    case "UH-60L_DAP": {
      // lat  00.00.00 DMM
      // long 000.00.00
      let waypoints = [];
      for (const dcsWaypoint of dcsWaypoints) {
        const name = dcsWaypoint.name;
        const id = dcsWaypoint.id;
        const dmmLat = Convertors.decimalToDMM(dcsWaypoint.lat);
        const dmmLong = Convertors.decimalToDMM(dcsWaypoint.long);
        const lat =
          dmmLat.deg.toString().padStart(2, "0") +
          "." +
          dmmLat.min.toFixed(2).toString().padStart(5, "0");
        const long =
          dmmLong.deg.toString().padStart(3, "0") +
          "." +
          dmmLong.min.toFixed(2).toString().padStart(5, "0");
        const elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev)).toString();
        const latHem = dcsWaypoint.lat > 0 ? "N" : "S";
        const longHem = dcsWaypoint.long > 0 ? "E" : "W";
        waypoints.push({
          name,
          id,
          lat,
          long,
          elev,
          latHem,
          longHem,
        });
      }
      return waypoints;
    }

    case "Mirage-F1EE":
    case "Ka-50":
    case "Ka-50_3":
    case "SA342L":
    case "SA342M":
    case "SA342Minigun": {
      // lat  00.00.0 DMM
      // long 000.00.0
      let waypoints = [];
      for (const dcsWaypoint of dcsWaypoints) {
        const name = dcsWaypoint.name;
        const id = dcsWaypoint.id;
        let getCoord = function (degreeLength, dmm) {
          let degrees = dmm.deg;
          let minutes = dmm.min.toFixed(1).toString();
          if (Number(minutes) !== 0 && Number(minutes) % 60 === 0) {
            degrees++;
            minutes = "00.0";
          }
          return (
            degrees.toString().padStart(degreeLength, "0") +
            "." +
            minutes.padStart(4, "0")
          );
        };
        const lat = getCoord(2, Convertors.decimalToDMM(dcsWaypoint.lat));
        const long = getCoord(3, Convertors.decimalToDMM(dcsWaypoint.long));
        const elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev)).toString();
        const latHem = dcsWaypoint.lat > 0 ? "N" : "S";
        const longHem = dcsWaypoint.long > 0 ? "E" : "W";
        waypoints.push({
          name,
          id,
          lat,
          long,
          elev,
          latHem,
          longHem,
        });
      }
      return waypoints;
    }

    case "FA-18C_hornet":
    case "FA-18E":
    case "FA-18F":
    case "EA-18G": {
      // lat  00.00.0000 DMM
      // long 000.00.0000
      let waypoints = [];
      for (const dcsWaypoint of dcsWaypoints) {
        const name = dcsWaypoint.name;
        const id = dcsWaypoint.id;
        const dmmLat = Convertors.decimalToDMM(dcsWaypoint.lat);
        const dmmLong = Convertors.decimalToDMM(dcsWaypoint.long);
        const lat =
          dmmLat.deg.toString().padStart(2, "0") +
          "." +
          dmmLat.min.toFixed(4).toString().padStart(7, "0");
        const long =
          dmmLong.deg.toString().padStart(3, "0") +
          "." +
          dmmLong.min.toFixed(4).toString().padStart(7, "0");
        const elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev)).toString();
        const latHem = dcsWaypoint.lat > 0 ? "N" : "S";
        const longHem = dcsWaypoint.long > 0 ? "E" : "W";
        waypoints.push({
          name,
          id,
          lat,
          long,
          elev,
          latHem,
          longHem,
        });
      }
      return waypoints;
    }

    case "OH58D": {
      let waypoints = [];
      for (const dcsWaypoint of dcsWaypoints) {
        const name = dcsWaypoint.name;
        const id = dcsWaypoint.id;
        const MGRS = Convertors.decimalToMGRS(dcsWaypoint.lat, dcsWaypoint.long);
        const elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev)).toString();
        waypoints.push({
          name,
          id,
          MGRS,
          elev,
        });
      }
      return waypoints;
    }
  }
};

export default convert;
