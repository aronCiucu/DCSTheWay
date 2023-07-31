import {TwoOptionsDialog} from "../components/TwoOptionsDialog";
import {AlertDialog} from "../components/AlertDialog";

const askUserAboutSeat = (module) => {
    if (module === "AH-64D_BLK_II") {
        return TwoOptionsDialog({
            title: "What seat are you in?",
            op1: "Pilot",
            op2: "CPG/Gunner",
        })
            .then((option) => {
                if (option === "CPG/Gunner")
                    return "AH-64D_BLK_IIgunner";
                return "AH-64D_BLK_IIpilot";
            })
            .catch(() => {
            });
    } else if (module === "FA-18C_hornet" || module === "FA-18E" || module === "FA-18F" || module === "EA-18G") {
        //show warning dialog
        return AlertDialog({
            title: "Please make sure that",
            content:
                "1. PRECISE option is boxed in HSI > DATA\n" +
                "2. You are not in the TAC menu\n" +
                "3. You are in the 00°00.0000' coordinate format",
        }).then(() => "FA-18C_hornet");
    } else if (module === "F-15ESE") {
        return TwoOptionsDialog({
          title: "What seat are you in?",
          op1: "Pilot",
          op2: "WSO",
        })
            .then((option) => {
            TwoOptionsDialog({
                title: "What route are you using?",
                op1: "A{1/A}",
                op2: "B{1/B}",
            }).then((option2) => {
            if (option2 === "A{1/A}")
                if (option === "WSO")
                    return  "F-15ESE_wsoA";
                else
                    return "F-15ESE_pilotA";
            if (option === "WSO")
                return "F-15ESE_wsoB";
            return "F-15ESE_pilotB";
            })
                //if (option === "WSO")
                //   return "F-15ESE_wso";
                //return "F-15ESE_pilot";
            //})
            .catch(() => {
            });
        })
    }
};

export default askUserAboutSeat;