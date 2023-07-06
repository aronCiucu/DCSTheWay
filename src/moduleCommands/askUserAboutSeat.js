import {TwoOptionsDialog} from "../components/TwoOptionsDialog";
import {AlertDialog} from "../components/AlertDialog";

const askUserAboutSeat = (module) => {
    if (module === "AH-64D_BLK_II") {
        TwoOptionsDialog({
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
        AlertDialog({
            title: "Please make sure that",
            content:
                "1. PRECISE option is boxed in HSI > DATA\n" +
                "2. You are not in the TAC menu\n" +
                "3. You are in the 00°00.0000' coordinate format",
        }).then(() => {
            return "FA-18C_hornet";
        });
    } else if (module === "F-15ESE") {
        TwoOptionsDialog({
            title: "What seat are you in?",
            op1: "Pilot",
            op2: "WSO",
        })
            .then((option) => {
                if (option === "WSO")
                    return "F-15ESE_wso";
                return "F-15ESE_pilot";
            })
            .catch(() => {
            });
    } else {
        return module;
    }
};

export default askUserAboutSeat;