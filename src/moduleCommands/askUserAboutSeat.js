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
          .then(seat => {
        
            return TwoOptionsDialog({
              title: "What route are you using?",
              op1: "A{1/A}",  // op1: "A"
              op2: "B{1/B}",  // op2: "B" // removed because its a nice touch to keep the explicitness of this here, instead of making it more inline.
            })
            .then(route => {
        
              let routeCode;
              if (route === 'A{1/A}') { // sorting
                routeCode = 'A'; // maybe an alert dialogue here to tell the user that route A will not work if it has target points or something of the sort
              } else {
                routeCode = 'B';  
              }
              
              return `F-15ESE_${seat.toLowerCase()}${routeCode}`;  // improved readability over the big ball of if statements
        
            });
        
          })
          .catch(() => {});
    }  else return module;
};

export default askUserAboutSeat;