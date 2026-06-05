//v2
import a10 from "./a10";
import ah6j from "./ah6j";
import ah64 from "./ah64";
import av8b from "./av8b";
import c130j from "./c130j";
import ch47f from "./ch47f";
import f15e from "./f15e";
import f16 from "./f16";
import fa18 from "./fa18";
import hercules from "./Hercules";
import ka50 from "./ka50";
import m2000 from "./m2000";
import miragef1 from "./miragef1";
import oh58d from "./oh58d";
import sa342 from "./sa342";
import uh60l from "./uh60l";
import ns430 from "./ns430";

function applyExtraDelay(commands, buttonExtraDelay) {
  return commands.map((cmd) => ({
    ...cmd,
    delay: (cmd.delay ?? 0) + buttonExtraDelay,
  }));
}

export default function getModuleCommands(module, waypoints, buttonExtraDelay) {
  let commands = [];

  switch (module) {

    case "a10ADD":
    case "a10NEW":
      a10.slotVariant = module;
      a10.extraDelay = 0;
      commands = a10.createButtonCommands(waypoints);
      break;

    case "AH-6J_ADD":
    case "AH-6J_REPLACE":
    case "MH-6J_ADD":
    case "MH-6J_REPLACE":
      ah6j.slotVariant = module;
      ah6j.extraDelay = 0;
      commands = [];
      break;

    case "AH-64D_BLK_IIgunner":
      ah64.extraDelay = 0;
      ah64.slotVariant = "AH-64D_BLK_IIgunner";
      commands = ah64.createButtonCommands(waypoints);
      break;

    case "AH-64D_BLK_IIpilot":
      ah64.extraDelay = 0;
      ah64.slotVariant = "AH-64D_BLK_IIpilot";
      commands = ah64.createButtonCommands(waypoints);
      break;

    case "AV8BNA_TRGPT":
    case "AV8BNA_WPT":
      av8b.slotVariant = module;
      av8b.extraDelay = 0;
      commands = av8b.createButtonCommands(waypoints);
      break;

    case "c130CoPlt":
    case "c130Plt":
      c130j.slotVariant = module;
      c130j.extraDelay = 0;
      commands = c130j.createButtonCommands(waypoints);
      break;

    case "ch47ADD":
    case "ch47ALTADD":
    case "ch47ALTNEW":
    case "ch47NEW":
      ch47f.slotVariant = module;
      ch47f.extraDelay = 0;
      commands = ch47f.createButtonCommands(waypoints);
      break;

    case "EA-18G":
    case "FA-18C_hornet":
    case "FA-18C_hornetPP1":
    case "FA-18C_hornetPP2":
    case "FA-18C_hornetPP3":
    case "FA-18C_hornetPP4":
    case "FA-18E":
    case "FA-18F":
      fa18.slotVariant = module;
      fa18.extraDelay = 0;
      commands = fa18.createButtonCommands(waypoints);
      break;

    case "F-15ESE_pilot_targetpoints":
    case "F-15ESE_pilot_txfr":
    case "F-15ESE_pilot_waypoints":
    case "F-15ESE_wso_targetpoints":
    case "F-15ESE_wso_txfr":
    case "F-15ESE_wso_waypoints":
      f15e.slotVariant = module;
      f15e.extraDelay = 0;
      commands = f15e.createButtonCommands(waypoints);
      break;

    case "F-16C_50":
    case "F-16D_50":
    case "F-16D_50_NS":
    case "F-16D_52":
    case "F-16D_52_NS":
    case "F-16D_Barak_30":
    case "F-16D_Barak_40":
    case "F-16I":
      f16.extraDelay = 0;
      commands = f16.createButtonCommands(waypoints);
      break;

    case "Hercules":
      hercules.extraDelay = 0;
      commands = hercules.createButtonCommands(waypoints);
      break;

    case "ka50TGT":
    case "ka50WPT":
      ka50.slotVariant = module;
      ka50.extraDelay = 0;
      commands = ka50.createButtonCommands(waypoints);
      break;

    case "M-2000C":
      m2000.extraDelay = 0;
      commands = m2000.createButtonCommands(waypoints);
      break;

    case "Mirage-F1EE":
      miragef1.extraDelay = 0;
      commands = miragef1.createButtonCommands(waypoints);
      break;

    case "OH58Dleft-seat":
      oh58d.extraDelay = 0;
      oh58d.slotVariant = "OH58Dleft-seat";
      commands = oh58d.createButtonCommands(waypoints);
      break;

    case "OH58Dright-seat":
      oh58d.extraDelay = 0;
      oh58d.slotVariant = "OH58Dright-seat";
      commands = oh58d.createButtonCommands(waypoints);
      break;

    case "SA342L":
    case "SA342M":
    case "SA342Minigun":
      sa342.extraDelay = 0;
      commands = sa342.createButtonCommands(waypoints);
      break;

    case "UH-60L":
    case "UH-60L_DAP":
      uh60l.extraDelay = 0;
      commands = uh60l.createButtonCommands(waypoints);
      break;

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
    case "Yak-52":
      ns430.extraDelay = 0;
      commands = [];
      break;

    default:
      commands = [];
      break;
  }

  return applyExtraDelay(commands, buttonExtraDelay);
}