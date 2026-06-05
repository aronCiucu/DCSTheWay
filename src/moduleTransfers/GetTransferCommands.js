import ah6jTransfer, { requestAbortAH6JTransfer } from "./ah6jTransfer";
import ns430Transfer, { requestAbortNS430Transfer } from "./ns430Transfer";

export default function getTransferCommands(module) {
  switch (module) {
    case "AH-6J":
    case "MH-6J":
    case "AH-6J_ADD":
    case "AH-6J_REPLACE":
    case "AH-6J_NEWFPLN":
    case "MH-6J_ADD":
    case "MH-6J_REPLACE":
    case "MH-6J_NEWFPLN":
      return {
        runTransfer: ah6jTransfer,
        requestAbort: requestAbortAH6JTransfer,
      };

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
      return {
        runTransfer: ns430Transfer,
        requestAbort: requestAbortNS430Transfer,
      };

    default:
      return null;
  }
}
