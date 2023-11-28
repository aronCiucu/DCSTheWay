import f16 from "./f16";
import f15e from "./f15e";
import fa18 from "./fa18";
import ah64 from "./ah64";
import a10 from "./a10";
import m2000 from "./m2000";
import av8b from "./av8b";
import ka50 from "./ka50";
import miragef1 from "./miragef1";
import uh60l from "./uh60l";
import hercules from "./Hercules";

export default function getModuleCommands(module, waypoints, buttonExtraDelay) {
  switch (module) {
    case "F-15ESE_pilotA":
    case "F-15ESE_wsoA":
    case "F-15ESE_pilotB":
    case "F-15ESE_wsoB":
      f15e.slotVariant = module;
      f15e.extraDelay = buttonExtraDelay;
      return f15e.createButtonCommands(waypoints);
    case "F-16C_50":
    case "F-16D_50":
    case "F-16D_50_NS":
    case "F-16D_52":
    case "F-16D_52_NS":
    case "F-16D_Barak_30":
    case "F-16D_Barak_40":
    case "F-16I": {
      f16.extraDelay = buttonExtraDelay;
      return f16.createButtonCommands(waypoints);
    }
    case "FA-18C_hornet":
    case "FA-18E":
    case "FA-18F":
    case "EA-18G": {
      fa18.extraDelay = buttonExtraDelay;
      return fa18.createButtonCommands(waypoints);
    }
    case "AH-64D_BLK_IIpilot": {
      ah64.extraDelay = buttonExtraDelay;
      ah64.slotVariant = "AH-64D_BLK_IIpilot";
      return ah64.createButtonCommands(waypoints);
    }
    case "AH-64D_BLK_IIgunner": {
      ah64.extraDelay = buttonExtraDelay;
      ah64.slotVariant = "AH-64D_BLK_IIgunner";
      return ah64.createButtonCommands(waypoints);
    }
    case "A-10C_2":
    case "A-10C": {
      a10.extraDelay = buttonExtraDelay;
      return a10.createButtonCommands(waypoints);
    }
    case "M-2000C": {
      m2000.extraDelay = buttonExtraDelay;
      return m2000.createButtonCommands(waypoints);
    }
    case "AV8BNA": {
      av8b.extraDelay = buttonExtraDelay;
      return av8b.createButtonCommands(waypoints);
    }
    case "Ka-50":
    case "Ka-50_3": {
      ka50.extraDelay = buttonExtraDelay;
      return ka50.createButtonCommands(waypoints);
    }
    case "Mirage-F1EE": {
      miragef1.extraDelay = buttonExtraDelay;
      return miragef1.createButtonCommands(waypoints);
    }
    case "UH-60L": {
      uh60l.extraDelay = buttonExtraDelay;
      return uh60l.createButtonCommands(waypoints);
    }
    case "Hercules": {
      hercules.extraDelay = buttonExtraDelay;
      return hercules.createButtonCommands(waypoints);
    }
    default:
      return [];
  }
}
