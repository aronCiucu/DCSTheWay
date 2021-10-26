package main.Waypoints.PlanesCommands;

import main.Utils.CoordinateUtils;
import main.Utils.UnitConvertorUtils;
import main.models.DMMCoordinate;
import main.models.Hemisphere;
import main.models.Point;
import org.json.JSONArray;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

public class A10CII {
    public static JSONArray getCommands(ArrayList<Point> coords){
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
            S       3045
            E       3031
            W       3049

           */

        JSONArray commandArray = new JSONArray();


        //go to WP page
        commandArray.put(new JSONObject().put("device", "9").put("code", "3011").put("delay", "10").put("activate", "1").put("addDepress", "true"));
        //goto WAYPOINT page
        commandArray.put(new JSONObject().put("device", "9").put("code", "3005").put("delay", "0").put("activate", "1").put("addDepress", "true"));
        for (Point coordinate:coords) {
            //create new WP
            commandArray.put(new JSONObject().put("device", "9").put("code", "3007").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            //check if latitude is N or S
            if(coordinate.getLatitudeHemisphere()== Hemisphere.NORTH){
                //press N
                commandArray.put(new JSONObject().put("device", "9").put("code", "3040").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            } else {
                //press S
                commandArray.put(new JSONObject().put("device", "9").put("code", "3045").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            }
            //start typing latitude
            for(char digit:coordinate.getLatitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3015").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3016").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3017").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3018").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3019").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3020").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3021").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3022").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3023").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3024").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //enter into field
            commandArray.put(new JSONObject().put("device", "9").put("code", "3003").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            //check if longitude is E or W
            if(coordinate.getLongitudeHemisphere()== Hemisphere.EAST){
                //press E
                commandArray.put(new JSONObject().put("device", "9").put("code", "3031").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            } else {
                //press W
                commandArray.put(new JSONObject().put("device", "9").put("code", "3049").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            }
            //start typing longitude
            for(char digit:coordinate.getLongitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3015").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3016").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3017").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3018").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3019").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3020").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3021").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3022").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3023").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3024").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //enter into field
            commandArray.put(new JSONObject().put("device", "9").put("code", "3004").put("delay", "0").put("activate", "1").put("addDepress", "true"));
        }

        return commandArray;
    }

    public static ArrayList<Point> getCoords(List<Point> dcsPoints){
        ArrayList<Point> a10Points = new ArrayList<>();
        for (Point dcsPoint:dcsPoints){
            BigDecimal dcsLat = new BigDecimal(dcsPoint.getLatitude());
            BigDecimal dcsLong = new BigDecimal(dcsPoint.getLongitude());
            Double dcsElev = Double.parseDouble(dcsPoint.getElevation());

            DMMCoordinate dmmLat = CoordinateUtils.decimalToDMM(dcsLat);
            DMMCoordinate dmmLong = CoordinateUtils.decimalToDMM(dcsLong);

            DecimalFormat latDegDf = new DecimalFormat("00");
            DecimalFormat latMinDf = new DecimalFormat("00.000");
            DecimalFormat longDegDf = new DecimalFormat("000");
            DecimalFormat longMinDf = new DecimalFormat("00.000");
            String a10Latitude = latDegDf.format(dmmLat.getDegrees())+latMinDf.format(dmmLat.getMinutes()).replace(".", "");
            String a10Longitude = longDegDf.format(dmmLong.getDegrees())+longMinDf.format(dmmLong.getMinutes()).replace(".", "");
            String a10Elevation = String.valueOf(Math.round(UnitConvertorUtils.metersToFeet(dcsElev)));

            var a10Point = new Point(a10Latitude, a10Longitude, a10Elevation, dcsPoint.getLatitudeHemisphere(), dcsPoint.getLongitudeHemisphere());
            a10Points.add(a10Point);
        }
        return a10Points;
    }
}
