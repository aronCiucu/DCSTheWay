package main.Waypoints.PlanesCommands;

import main.models.Coordinate;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

public class F18 {
    public static JSONArray getCommands(ArrayList<Coordinate> coords){
        /*
            AMPCD stuff, device 37
            PB 18 - 3028
            PB 2  - 3012
            PB 10 - 3020
            PB 12 - 3022
            PB 5  - 3015

            UFC stuff, device 25
            Select 1 - 3010
            1 - 3019
            2 (north) - 3020
            3 - 3021
            4 - 3022
            5 - 3023
            6 (east) - 3024
            7 - 3025
            8 - 3026
            9 - 3027
            0 - 3018
            ENT - 3029
            CLR - 3028
         */

        JSONArray commandArray = new JSONArray();

        //enter the SUPT menu
        commandArray.put(new JSONObject().put("device", "37").put("code", "3028").put("delay", "0").put("activate", "1"));
        commandArray.put(new JSONObject().put("device", "37").put("code", "3028").put("delay", "0").put("activate", "1"));
        //select HSD
        commandArray.put(new JSONObject().put("device", "37").put("code", "3012").put("delay", "0").put("activate", "1"));
        //select DATA
        commandArray.put(new JSONObject().put("device", "37").put("code", "3020").put("delay", "0").put("activate", "1"));

        for (Coordinate coordinate:coords) {
            //increment steerpoint
            commandArray.put(new JSONObject().put("device", "37").put("code", "3022").put("delay", "20").put("activate", "1"));
            //press UFC
            commandArray.put(new JSONObject().put("device", "37").put("code", "3015").put("delay", "20").put("activate", "1"));
            // press position 1
            commandArray.put(new JSONObject().put("device", "25").put("code", "3010").put("delay", "80").put("activate", "1"));
            //press N north
            commandArray.put(new JSONObject().put("device", "25").put("code", "3020").put("delay", "0").put("activate", "1"));
            //start entering latitude
            for(char digit:coordinate.getLatitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3019").put("delay", "0").put("activate", "1"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3020").put("delay", "0").put("activate", "1"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3021").put("delay", "0").put("activate", "1"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3022").put("delay", "0").put("activate", "1"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3023").put("delay", "0").put("activate", "1"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3024").put("delay", "0").put("activate", "1"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3025").put("delay", "0").put("activate", "1"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3026").put("delay", "0").put("activate", "1"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3027").put("delay", "0").put("activate", "1"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3018").put("delay", "0").put("activate", "1"));
                        break;
                }
            }
            //press enter
            commandArray.put(new JSONObject().put("device", "25").put("code", "3029").put("delay", "40").put("activate", "1"));
            //press E east
            commandArray.put(new JSONObject().put("device", "25").put("code", "3024").put("delay", "0").put("activate", "1"));
            //start entering longitude
            for(char digit:coordinate.getLongitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3019").put("delay", "0").put("activate", "1"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3020").put("delay", "0").put("activate", "1"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3021").put("delay", "0").put("activate", "1"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3022").put("delay", "0").put("activate", "1"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3023").put("delay", "0").put("activate", "1"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3024").put("delay", "0").put("activate", "1"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3025").put("delay", "0").put("activate", "1"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3026").put("delay", "0").put("activate", "1"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3027").put("delay", "0").put("activate", "1"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "25").put("code", "3018").put("delay", "0").put("activate", "1"));
                        break;
                }
            }
            //press enter
            commandArray.put(new JSONObject().put("device", "25").put("code", "3029").put("delay", "40").put("activate", "1"));
        }

        return commandArray;
    }
}
