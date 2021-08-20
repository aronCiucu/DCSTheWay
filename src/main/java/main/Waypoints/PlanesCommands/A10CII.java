package main.Waypoints.PlanesCommands;

import main.models.Coordinate;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

public class A10CII {
    public static JSONArray getCommands(ArrayList<Coordinate> coords){
            /*
           button list, all are device 9
           LSK 3L  3001
           LSK 5L  3002
           LSK 7L  3003
           LSK 9L  3004
           LSK 3R  3005
           LSK 5R  3006
           LSK 7R  3007
           LSK 9R  3008

           WP MENU 3011

           1       3015
           2       3016
           3       3017
           4       3018
           5       3019
           6       3020
           7       3021
           8       3022
           9       3023
           0       3024
            N       3040
            E       3031

           */

        JSONArray commandArray = new JSONArray();


        //go to WP page
        commandArray.put(new JSONObject().put("device", "9").put("code", "3011").put("delay", "10").put("activate", "1"));
        //goto WAYPOINT page
        commandArray.put(new JSONObject().put("device", "9").put("code", "3005").put("delay", "0").put("activate", "1"));
        for (Coordinate coordinate:coords) {
            //create new WP
            commandArray.put(new JSONObject().put("device", "9").put("code", "3007").put("delay", "0").put("activate", "1"));
            //goto lat field
            //commandArray.put(new JSONObject().put("device", "17").put("code", "3035").put("delay", "10").put("activate", "1"));
            //press N
            commandArray.put(new JSONObject().put("device", "9").put("code", "3040").put("delay", "0").put("activate", "1"));
            //start typing latitude
            for(char digit:coordinate.getLatitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3015").put("delay", "0").put("activate", "1"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3016").put("delay", "0").put("activate", "1"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3017").put("delay", "0").put("activate", "1"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3018").put("delay", "0").put("activate", "1"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3019").put("delay", "0").put("activate", "1"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3020").put("delay", "0").put("activate", "1"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3021").put("delay", "0").put("activate", "1"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3022").put("delay", "0").put("activate", "1"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3023").put("delay", "0").put("activate", "1"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3024").put("delay", "0").put("activate", "1"));
                        break;
                }
            }
            //enter into field
            commandArray.put(new JSONObject().put("device", "9").put("code", "3003").put("delay", "0").put("activate", "1"));
            //goto long field
            //commandArray.put(new JSONObject().put("device", "17").put("code", "3035").put("delay", "10").put("activate", "1"));
            //press E
            commandArray.put(new JSONObject().put("device", "9").put("code", "3031").put("delay", "0").put("activate", "1"));
            //press 0
            commandArray.put(new JSONObject().put("device", "9").put("code", "3024").put("delay", "0").put("activate", "1"));
            //start typing longitude
            for(char digit:coordinate.getLongitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3015").put("delay", "0").put("activate", "1"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3016").put("delay", "0").put("activate", "1"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3017").put("delay", "0").put("activate", "1"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3018").put("delay", "0").put("activate", "1"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3019").put("delay", "0").put("activate", "1"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3020").put("delay", "0").put("activate", "1"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3021").put("delay", "0").put("activate", "1"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3022").put("delay", "0").put("activate", "1"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3023").put("delay", "0").put("activate", "1"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3024").put("delay", "0").put("activate", "1"));
                        break;
                }
            }
            //enter into field
            commandArray.put(new JSONObject().put("device", "9").put("code", "3004").put("delay", "0").put("activate", "1"));
            //goto steerpoint field
            //commandArray.put(new JSONObject().put("device", "17").put("code", "3034").put("delay", "10").put("activate", "1"));
            //commandArray.put(new JSONObject().put("device", "17").put("code", "3034").put("delay", "10").put("activate", "1"));
        }
        //return to main page
        //commandArray.put(new JSONObject().put("device", "17").put("code", "3032").put("delay", "10").put("activate", "-1"));

        return commandArray;
    }
}
