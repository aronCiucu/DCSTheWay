import {
  FourOptionsDialog,
  FourOptionsSimpleDialog,
} from "../components/FourOptionsDialog";
import { AlertDialog } from "../components/AlertDialog";

const askUserAboutSeat = async (module, userPreferences) => {
  const moduleSpecificPreferences = userPreferences[module];

  // A-10C/2
  if (module === "A-10C" || module === "A-10C_2") {
    if (moduleSpecificPreferences?.includes("Add Waypoints")) return "a10ADD";
    if (moduleSpecificPreferences?.includes("Overwrite Waypoints")) return "a10NEW";

    const option = await FourOptionsDialog({
      title: "Would you like to?",
      op1: "Add Waypoints",
      op2: "Overwrite Waypoints",
    });

    return option === "Add Waypoints" ? "a10ADD" : "a10NEW";
  }

  // ✅ RESTORED AH-6J / MH-6J (CRITICAL)
  else if (module === "AH-6J" || module === "MH-6J") {
    if (moduleSpecificPreferences?.includes("Add Waypoints")) return `${module}_ADD`;
    if (moduleSpecificPreferences?.includes("Replace Waypoints")) return `${module}_REPLACE`;
    if (moduleSpecificPreferences?.includes("NEW FPLN FROM LIST")) return `${module}_NEWFPLN`;

    const option = await FourOptionsDialog({
      title: "Would you like to?",
      op1: "Add Waypoints",
      op2: "Replace Waypoints",
      op3: "NEW FPLN FROM LIST",
    });

    switch (option) {
      case "Replace Waypoints":
        return `${module}_REPLACE`;
      case "NEW FPLN FROM LIST":
        return `${module}_NEWFPLN`;
      default:
        return `${module}_ADD`;
    }
  }

  // AH-64D
  else if (module === "AH-64D_BLK_II") {
    if (moduleSpecificPreferences?.includes("Pilot")) return "AH-64D_BLK_IIpilot";
    if (moduleSpecificPreferences?.includes("CPG/Gunner")) return "AH-64D_BLK_IIgunner";

    return FourOptionsDialog({
      title: "What seat are you in?",
      op1: "Pilot",
      op2: "CPG/Gunner",
    }).then((option) =>
      option === "CPG/Gunner"
        ? "AH-64D_BLK_IIgunner"
        : "AH-64D_BLK_IIpilot"
    );
  }

  // AV8BNA
  else if (module === "AV8BNA") {
    if (moduleSpecificPreferences?.includes("Waypoints")) return "AV8BNA_WPT";
    if (moduleSpecificPreferences?.includes("Targetpoints")) return "AV8BNA_TRGPT";

    const option = await FourOptionsDialog({
      title: "Transfer to waypoints or target points?",
      op1: "Waypoints",
      op2: "Targetpoints",
    });

    return option === "Targetpoints" ? "AV8BNA_TRGPT" : "AV8BNA_WPT";
  }

  // C-130J
  else if (module === "C-130J-30") {
    if (moduleSpecificPreferences?.includes("Left Seat")) return "c130Plt";
    if (moduleSpecificPreferences?.includes("Right Seat")) return "c130CoPlt";

    const option = await FourOptionsDialog({
      title: "What seat are you in?",
      op1: "Left Seat",
      op2: "Right Seat",
    });

    return option === "Left Seat" ? "c130Plt" : "c130CoPlt";
  }

  // CH-47F
  else if (module === "CH-47Fbl1") {
    if (moduleSpecificPreferences?.includes("Add to FLPN")) return "ch47ADD";
    if (moduleSpecificPreferences?.includes("Make New FLPN")) return "ch47NEW";
    if (moduleSpecificPreferences?.includes("Add to ALT FLPN")) return "ch47ALTADD";
    if (moduleSpecificPreferences?.includes("Make New ALT FLPN")) return "ch47ALTNEW";

    const option = await FourOptionsDialog({
      title: "Would you like to?",
      op1: "Add to FLPN",
      op2: "Make New FLPN",
      op3: "Add to ALT FLPN",
      op4: "Make New ALT FLPN",
    });

    switch (option) {
      case "Add to FLPN": return "ch47ADD";
      case "Make New FLPN": return "ch47NEW";
      case "Add to ALT FLPN": return "ch47ALTADD";
      case "Make New ALT FLPN": return "ch47ALTNEW";
      default: throw new Error("Invalid option selected");
    }
  }

  // F-15E
  else if (module === "F-15ESE") {
    let seat;

    if (moduleSpecificPreferences?.includes("Pilot")) seat = "Pilot";
    else if (moduleSpecificPreferences?.includes("WSO")) seat = "WSO";
    else {
      seat = await FourOptionsDialog({
        title: "What seat are you in?",
        op1: "Pilot",
        op2: "WSO",
      });
    }

    const jdam = await FourOptionsDialog({
      title: "Input Type?",
      op1: "Waypoints",
      op2: "Target Points",
      op3: "TP's and TXFR to Weapons",
    });

    const route = {
      Waypoints: "waypoints",
      "Target Points": "targetpoints",
      "TP's and TXFR to Weapons": "txfr",
    }[jdam];

    return `F-15ESE_${seat.toLowerCase()}_${route}`;
  }

    // FA-18
else if (
  module === "FA-18C_hornet" ||
  module === "FA-18E" ||
  module === "FA-18F" ||
  module === "EA-18G"
) {
  let PPinput;

  if (moduleSpecificPreferences?.includes("YES")) PPinput = "YES";
  else if (moduleSpecificPreferences?.includes("NO")) PPinput = "NO";
  else {
    PPinput = await FourOptionsDialog({
      title: "Input as PP MSN?",
      op1: "YES",
      op2: "NO",
    });
  }

  let stations = "";

  if (PPinput === "YES") {
    if (moduleSpecificPreferences?.includes("1")) stations = "1";
    else if (moduleSpecificPreferences?.includes("2")) stations = "2";
    else if (moduleSpecificPreferences?.includes("3")) stations = "3";
    else if (moduleSpecificPreferences?.includes("4")) stations = "4";
    else {
      stations = await FourOptionsDialog({
        title: "How many STATIONs carry this weapon?",
        op1: "1",
        op2: "2",
        op3: "3",
        op4: "4",
      });
    }
  }

return `FA-18C_hornet${PPinput === "YES" ? "PP" : ""}${stations}`;
}

  // OH-58D
  else if (module === "OH58D") {
    if (moduleSpecificPreferences?.includes("Left Seat"))
      return "OH58Dleft-seat";

    if (moduleSpecificPreferences?.includes("Right Seat"))
      return "OH58Dright-seat";

    const option = await FourOptionsDialog({
      title: "What seat are you in?",
      op1: "Left Seat",
      op2: "Right Seat",
    });

    return option === "Right Seat"
      ? "OH58Dright-seat"
      : "OH58Dleft-seat";
  }

  // default
  else return module;
};

export default askUserAboutSeat;
