package main.Waypoints.PlanesCommands;

import main.models.Coordinate;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

public class F16 {
    public static JSONArray getCommands(ArrayList<Coordinate> coords){
        /*
           button list, all are device 17
           DCS rtn 3032 -1
           DCS dn  3035 -1
           DCS up  3034 1
           rokr up 3031
           rokr dn 3030
           1       3003
           2/N     3004
           3       3005
           4       3006
           5       3007
           6/E     3008
           7       3009
           8       3010
           9       3011
           0       3002
           ENTR    3016

         */

        JSONArray commandArray = new JSONArray();


        //rtn to main page of DED
        commandArray.put(new JSONObject().put("device", "17").put("code", "3032").put("delay", "10").put("activate", "-1"));
        //goto STPT page
        commandArray.put(new JSONObject().put("device", "17").put("code", "3006").put("delay", "0").put("activate", "1"));
        for (Coordinate coordinate:coords) {
            //increment steerpoint
            commandArray.put(new JSONObject().put("device", "17").put("code", "3030").put("delay", "0").put("activate", "1"));
            //goto lat field
            commandArray.put(new JSONObject().put("device", "17").put("code", "3035").put("delay", "10").put("activate", "-1"));
            //press N
            commandArray.put(new JSONObject().put("device", "17").put("code", "3004").put("delay", "0").put("activate", "1"));
            //start typing latitude
            for(char digit:coordinate.getLatitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3003").put("delay", "0").put("activate", "1"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3004").put("delay", "0").put("activate", "1"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3005").put("delay", "0").put("activate", "1"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3006").put("delay", "0").put("activate", "1"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3007").put("delay", "0").put("activate", "1"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3008").put("delay", "0").put("activate", "1"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3009").put("delay", "0").put("activate", "1"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3010").put("delay", "0").put("activate", "1"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3011").put("delay", "0").put("activate", "1"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3002").put("delay", "0").put("activate", "1"));
                        break;
                }
            }
            //press enter
            commandArray.put(new JSONObject().put("device", "17").put("code", "3016").put("delay", "0").put("activate", "1"));
            //goto long field
            commandArray.put(new JSONObject().put("device", "17").put("code", "3035").put("delay", "10").put("activate", "-1"));
            //press E
            commandArray.put(new JSONObject().put("device", "17").put("code", "3008").put("delay", "0").put("activate", "1"));
            //press 0
            commandArray.put(new JSONObject().put("device", "17").put("code", "3002").put("delay", "0").put("activate", "1"));
            //start typing longitude
            for(char digit:coordinate.getLongitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3003").put("delay", "0").put("activate", "1"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3004").put("delay", "0").put("activate", "1"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3005").put("delay", "0").put("activate", "1"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3006").put("delay", "0").put("activate", "1"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3007").put("delay", "0").put("activate", "1"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3008").put("delay", "0").put("activate", "1"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3009").put("delay", "0").put("activate", "1"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3010").put("delay", "0").put("activate", "1"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3011").put("delay", "0").put("activate", "1"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3002").put("delay", "0").put("activate", "1"));
                        break;
                }
            }
            //press enter
            commandArray.put(new JSONObject().put("device", "17").put("code", "3016").put("delay", "0").put("activate", "1"));
            //goto elevation field
            commandArray.put(new JSONObject().put("device", "17").put("code", "3035").put("delay", "10").put("activate", "-1"));
            //start entering elevation
            for(char digit:coordinate.getElevation().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3003").put("delay", "0").put("activate", "1"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3004").put("delay", "0").put("activate", "1"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3005").put("delay", "0").put("activate", "1"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3006").put("delay", "0").put("activate", "1"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3007").put("delay", "0").put("activate", "1"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3008").put("delay", "0").put("activate", "1"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3009").put("delay", "0").put("activate", "1"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3010").put("delay", "0").put("activate", "1"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3011").put("delay", "0").put("activate", "1"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3002").put("delay", "0").put("activate", "1"));
                        break;
                }
            }
            //press enter
            commandArray.put(new JSONObject().put("device", "17").put("code", "3016").put("delay", "0").put("activate", "1"));
            //goto steerpoint field
            commandArray.put(new JSONObject().put("device", "17").put("code", "3034").put("delay", "10").put("activate", "1"));
            commandArray.put(new JSONObject().put("device", "17").put("code", "3034").put("delay", "10").put("activate", "1"));
            commandArray.put(new JSONObject().put("device", "17").put("code", "3034").put("delay", "10").put("activate", "1"));
        }
        //return to main page
        commandArray.put(new JSONObject().put("device", "17").put("code", "3032").put("delay", "10").put("activate", "-1"));

        return commandArray;
    }
}
