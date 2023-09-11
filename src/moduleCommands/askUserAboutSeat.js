import {TwoOptionsDialog} from "../components/TwoOptionsDialog";
import {AlertDialog} from "../components/AlertDialog";

const askUserAboutSeat = async (module, userPreferences) => {
  const moduleSpecificPreferences = userPreferences[module];

  if (module === "AH-64D_BLK_II") {
    if (moduleSpecificPreferences?.includes("Pilot")) return "AH-64D_BLK_IIpilot";
    else if (moduleSpecificPreferences?.includes("CPG/Gunner")) return "AH-64D_BLK_IIgunner";
    else {
      return TwoOptionsDialog({
        title: "What seat are you in?",
        op1: "Pilot",
        op2: "CPG/Gunner",
      }).then((option) => option === "CPG/Gunner" ? "AH-64D_BLK_IIgunner" : "AH-64D_BLK_IIpilot");
    }

  } else if (module === "FA-18C_hornet" || module === "FA-18E" || module === "FA-18F" || module === "EA-18G") {
    if (moduleSpecificPreferences?.includes("Hide")) return "FA-18C_hornet";
    else {
      return AlertDialog({
        title: "Please make sure that",
        content:
            "1. PRECISE option is boxed in HSI > DATA\n" +
            "2. You are not in the TAC menu\n" +
            "3. You are in the 00°00.0000' coordinate format",
      }).then(() => "FA-18C_hornet");
    }
  } else if (module === "F-15ESE") {
    let seat;
    if (moduleSpecificPreferences?.includes("Pilot")) seat = "Pilot";
    else if (moduleSpecificPreferences?.includes("WSO")) seat = "WSO";
    else {
      await TwoOptionsDialog({
        title: "What seat are you in?",
        op1: "Pilot",
        op2: "WSO",
      }).then((chosenSeat) => seat = chosenSeat);
    }

    let route;
    if (moduleSpecificPreferences?.includes("A{1/A}")) route = "A{1/A}";
    else if (moduleSpecificPreferences?.includes("B{1/B}")) route = "B{1/B}";
    else {
      await TwoOptionsDialog({
        title: "What route are you using?",
        op1: "A{1/A}",  // op1: "A"
        op2: "B{1/B}",  // op2: "B" // removed because its a nice touch to keep the explicitness of this here, instead of making it more inline.
      }).then((chosenRoute) => route = chosenRoute);
    }
    return `F-15ESE_${seat.toLowerCase()}${(route === 'A{1/A}' ? "A" : "B")}`;
  } else return module;
};

export default askUserAboutSeat;