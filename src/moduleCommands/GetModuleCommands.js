import f16 from "./f16";
import f15e from "./f15e";
import fa18 from "./fa18";
import ah64 from "./ah64";
import a10 from "./a10";
import m2000 from "./m2000";
import av8b from "./av8b";
import ka50 from "./ka50";

export default function getModuleCommands(module, waypoints) {
    switch (module) {
        case "F-15ESE":
        case "F-15ESE_pilotA":
        case "F-15ESE_wsoA":
        case "F-15ESE_pilotB":
        case "F-15ESE_wsoB":
            f15e.slotVariant = module;
            return f15e.createButtonCommands(waypoints);
        case "F-16C_50":
        case "F-16D_50":
        case "F-16D_50_NS":
        case "F-16D_52":
        case "F-16D_52_NS":
        case "F-16D_Barak_30":
        case "F-16D_Barak_40":
        case "F-16I": {
            return f16.createButtonCommands(waypoints);
        }
        case "FA-18C_hornet":
        case "FA-18E":
        case "FA-18F":
        case "EA-18G": {
            return fa18.createButtonCommands(waypoints);
        }
        case "AH-64D_BLK_II":
        case "AH-64D_BLK_IIpilot": {
            ah64.slotVariant = "AH-64D_BLK_IIpilot";
            return ah64.createButtonCommands(waypoints);
        }
        case "AH-64D_BLK_IIgunner": {
            ah64.slotVariant = "AH-64D_BLK_IIgunner";
            return ah64.createButtonCommands(waypoints);
        }
        case "A-10C_2":
        case "A-10C": {
            return a10.createButtonCommands(waypoints);
        }
        case "M-2000C": {
            return m2000.createButtonCommands(waypoints);
        }
        case "AV8BNA": {
            return av8b.createButtonCommands(waypoints);
        }
        case "Ka-50":
        case "Ka-50_3": {
            return ka50.createButtonCommands(waypoints);
        }
        default:
            return [];
    }
}
