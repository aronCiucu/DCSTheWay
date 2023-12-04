import Convertors from "./Convertors";

const convert = (dcsWaypoints, module) => {
  switch (module) {
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
    case "M-2000C": {
      // lat  00.00.000 DMM
      //long 000.00.000
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
    case "AH-64D_BLK_II":
    case "UH-60L": {
      // lat  00.00.00 DMM
      //long 000.00.00
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
    case "AV8BNA": {
      // lat 00.00.00 DMS
      // long 000.00.00
      let waypoints = [];
      for (const dcsWaypoint of dcsWaypoints) {
        const name = dcsWaypoint.name;
        const id = dcsWaypoint.id;
        const dmsLat = Convertors.decimalToDMS(dcsWaypoint.lat);
        const dmsLong = Convertors.decimalToDMS(dcsWaypoint.long);
        const lat =
          dmsLat.deg.toString().padStart(2, "0") +
          "." +
          dmsLat.min.toString().padStart(2, "0") +
          "." +
          dmsLat.sec.toString().padStart(2, "0");
        const long =
          dmsLong.deg.toString().padStart(3, "0") +
          "." +
          dmsLong.min.toString().padStart(2, "0") +
          "." +
          dmsLong.sec.toString().padStart(2, "0");
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
    case "Ka-50_3": {
      // lat  00.00.0 DMM
      //long 000.00.0
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
      //long 000.00.0000
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
  }
};

export default convert;
