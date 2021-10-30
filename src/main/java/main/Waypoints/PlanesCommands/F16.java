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

public class F16 {
    public static JSONArray getCommands(List<Point> coords){
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
           4/W     3006
           5       3007
           6/E     3008
           7       3009
           8/S     3010
           9       3011
           0       3002
           ENTR    3016
         */

        JSONArray commandArray = new JSONArray();


        //rtn to main page of DED
        commandArray.put(new JSONObject().put("device", "17").put("code", "3032").put("delay", "20").put("activate", "-1").put("addDepress", "true"));
        //goto STPT page
        commandArray.put(new JSONObject().put("device", "17").put("code", "3006").put("delay", "0").put("activate", "1").put("addDepress", "true"));
        for (Point coordinate:coords) {
            //increment steerpoint
            commandArray.put(new JSONObject().put("device", "17").put("code", "3030").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            //goto lat field
            commandArray.put(new JSONObject().put("device", "17").put("code", "3035").put("delay", "20").put("activate", "-1").put("addDepress", "true"));
            commandArray.put(new JSONObject().put("device", "17").put("code", "3035").put("delay", "20").put("activate", "-1").put("addDepress", "true"));
            //check if latitude is N or S
            if(coordinate.getLatitudeHemisphere()== Hemisphere.NORTH){
                //press N
                commandArray.put(new JSONObject().put("device", "17").put("code", "3004").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            } else {
                //press S
                commandArray.put(new JSONObject().put("device", "17").put("code", "3010").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            }
            //start typing latitude
            for(char digit:coordinate.getLatitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3003").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3004").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3005").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3006").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3007").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3008").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3009").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3010").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3011").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3002").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //press enter
            commandArray.put(new JSONObject().put("device", "17").put("code", "3016").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            //goto long field
            commandArray.put(new JSONObject().put("device", "17").put("code", "3035").put("delay", "20").put("activate", "-1").put("addDepress", "true"));
            //check if longitude is E or W
            if(coordinate.getLongitudeHemisphere()== Hemisphere.EAST){
                //press E
                commandArray.put(new JSONObject().put("device", "17").put("code", "3008").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            } else {
                //press W
                commandArray.put(new JSONObject().put("device", "17").put("code", "3006").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            }
            //start typing longitude
            for(char digit:coordinate.getLongitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3003").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3004").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3005").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3006").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3007").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3008").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3009").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3010").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3011").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3002").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //press enter
            commandArray.put(new JSONObject().put("device", "17").put("code", "3016").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            //goto elevation field
            commandArray.put(new JSONObject().put("device", "17").put("code", "3035").put("delay", "20").put("activate", "-1").put("addDepress", "true"));
            //start entering elevation
            for(char digit:coordinate.getElevation().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3003").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3004").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3005").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3006").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3007").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3008").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3009").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3010").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3011").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "17").put("code", "3002").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //press enter
            commandArray.put(new JSONObject().put("device", "17").put("code", "3016").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            //goto steerpoint field
            commandArray.put(new JSONObject().put("device", "17").put("code", "3034").put("delay", "20").put("activate", "1").put("addDepress", "true"));
            commandArray.put(new JSONObject().put("device", "17").put("code", "3034").put("delay", "20").put("activate", "1").put("addDepress", "true"));
            commandArray.put(new JSONObject().put("device", "17").put("code", "3034").put("delay", "20").put("activate", "1").put("addDepress", "true"));
            commandArray.put(new JSONObject().put("device", "17").put("code", "3034").put("delay", "20").put("activate", "1").put("addDepress", "true"));
        }
        //return to main page
        commandArray.put(new JSONObject().put("device", "17").put("code", "3032").put("delay", "20").put("activate", "-1").put("addDepress", "true"));

        return commandArray;
    }

    public static List<Point> getCoords(List<Point> dcsPoints){
        List<Point> f16Points = new ArrayList<>();
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
            String f16Latitude = latDegDf.format(dmmLat.getDegrees())+latMinDf.format(dmmLat.getMinutes()).replace(".", "");
            String f16Longitude = longDegDf.format(dmmLong.getDegrees())+longMinDf.format(dmmLong.getMinutes()).replace(".", "");
            String f16Elevation = String.valueOf(Math.round(UnitConvertorUtils.metersToFeet(dcsElev)));

            var f16Point = new Point(f16Latitude, f16Longitude, f16Elevation, dcsPoint.getLatitudeHemisphere(), dcsPoint.getLongitudeHemisphere());
            f16Points.add(f16Point);
        }
        return f16Points;
    }
}
