import Convertors from "./Convertors";

const convert = (dcsWaypoints, module) => {
  switch (module) {
    case "F-16C_50": {
      let f16waypoints = [];
      for (const dcsWaypoint of dcsWaypoints) {
        const name = dcsWaypoint.name;
        const id = dcsWaypoint.id;
        const dmmLat = Convertors.decimalToDMM(dcsWaypoint.lat);
        const dmmLong = Convertors.decimalToDMM(dcsWaypoint.long);
        const f16Lat =
          dmmLat.deg.toString().padStart(2, "0") +
          "." +
          dmmLat.min.toFixed(3).toString().padStart(6, "0");
        const f16Long =
          dmmLong.deg.toString().padStart(3, "0") +
          "." +
          dmmLong.min.toFixed(3).toString().padStart(6, "0");
        const f16Elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev));
        const f16LatHem = dcsWaypoint.lat > 0 ? "N" : "S";
        const f16LongHem = dcsWaypoint.long > 0 ? "E" : "W";
        f16waypoints.push({
          name,
          id,
          lat: f16Lat,
          long: f16Long,
          elev: f16Elev,
          latHem: f16LatHem,
          longHem: f16LongHem,
        });
      }
      return f16waypoints;
    }
    case "AH-64D_BLK_II": {
      let ah64Waypoints = [];
      for (const dcsWaypoint of dcsWaypoints) {
        const name = dcsWaypoint.name;
        const id = dcsWaypoint.id;
        const dmmLat = Convertors.decimalToDMM(dcsWaypoint.lat);
        const dmmLong = Convertors.decimalToDMM(dcsWaypoint.long);
        const ah64Lat =
          dmmLat.deg.toString().padStart(2, "0") +
          "." +
          dmmLat.min.toFixed(2).toString().padStart(5, "0");
        const ah64Long =
          dmmLong.deg.toString().padStart(3, "0") +
          "." +
          dmmLong.min.toFixed(2).toString().padStart(5, "0");
        const ah64Elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev));
        const ah64LatHem = dcsWaypoint.lat > 0 ? "N" : "S";
        const ah64LongHem = dcsWaypoint.long > 0 ? "E" : "W";
        ah64Waypoints.push({
          name,
          id,
          lat: ah64Lat,
          long: ah64Long,
          elev: ah64Elev,
          latHem: ah64LatHem,
          longHem: ah64LongHem,
        });
      }
      return ah64Waypoints;
    }
    default:
      return [];
  }
};

export default convert;
