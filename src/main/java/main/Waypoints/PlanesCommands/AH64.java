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

public class AH64 {
    public static JSONArray getCommands(List<Point> coords) {
        JSONArray commandArray = new JSONArray();

        //Enter TSD Page
        commandArray.put(new JSONObject().put("device", "43").put("code", "3029").put("delay", "0").put("activate", "1").put("addDepress", "true"));
        //goto Point page
        commandArray.put(new JSONObject().put("device", "43").put("code", "3013").put("delay", "0").put("activate", "1").put("addDepress", "true"));

        for (Point coordinate:coords) {
            //press ADD
            commandArray.put(new JSONObject().put("device", "43").put("code", "3023").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            //press IDENT
            commandArray.put(new JSONObject().put("device", "43").put("code", "3024").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //press ENTER twice
            commandArray.put(new JSONObject().put("device", "29").put("code", "3006").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            commandArray.put(new JSONObject().put("device", "29").put("code", "3006").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //press CLR
            commandArray.put(new JSONObject().put("device", "29").put("code", "3001").put("delay", "10").put("activate", "1").put("addDepress", "true"));

            //check if latitude is N or S
            if (coordinate.getLatitudeHemisphere() == Hemisphere.NORTH) {
                //press N
                commandArray.put(new JSONObject().put("device", "29").put("code", "3020").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            } else {
                //press S
                commandArray.put(new JSONObject().put("device", "29").put("code", "3025").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            }
            //start typing latitude
            for(char digit:coordinate.getLatitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3033").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3034").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3035").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3036").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3037").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3038").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3039").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3040").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3041").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3043").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }

            //check if longitude is E or W
            if(coordinate.getLongitudeHemisphere()== Hemisphere.EAST){
                //press E
                commandArray.put(new JSONObject().put("device", "29").put("code", "3011").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            } else {
                //press W
                commandArray.put(new JSONObject().put("device", "29").put("code", "3029").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            }
            //start typing longitude
            for(char digit:coordinate.getLongitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3033").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3034").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3035").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3036").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3037").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3038").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3039").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3040").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3041").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "29").put("code", "3043").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //press ENTER twice
            commandArray.put(new JSONObject().put("device", "29").put("code", "3006").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            commandArray.put(new JSONObject().put("device", "29").put("code", "3006").put("delay", "10").put("activate", "1").put("addDepress", "true"));
        }
        return commandArray;
    }

    public static List<Point> getCoords(List<Point> dcsPoints){
        List<Point> ah64Points = new ArrayList<>();
        for (Point dcsPoint:dcsPoints){
            BigDecimal dcsLat = new BigDecimal(dcsPoint.getLatitude());
            BigDecimal dcsLong = new BigDecimal(dcsPoint.getLongitude());
            Double dcsElev = Double.parseDouble(dcsPoint.getElevation());

            DMMCoordinate dmmLat = CoordinateUtils.decimalToDMM(dcsLat);
            DMMCoordinate dmmLong = CoordinateUtils.decimalToDMM(dcsLong);

            DecimalFormat latDegDf = new DecimalFormat("00");
            DecimalFormat latMinDf = new DecimalFormat("00.00");
            DecimalFormat longDegDf = new DecimalFormat("000");
            DecimalFormat longMinDf = new DecimalFormat("00.00");
            String ah64Latitude = latDegDf.format(dmmLat.getDegrees())+latMinDf.format(dmmLat.getMinutes()).replace(".", "");
            String ah64Longitude = longDegDf.format(dmmLong.getDegrees())+longMinDf.format(dmmLong.getMinutes()).replace(".", "");
            String ah64Elevation = String.valueOf(Math.round(UnitConvertorUtils.metersToFeet(dcsElev)));

            var ah64Point = new Point(ah64Latitude, ah64Longitude, ah64Elevation, dcsPoint.getLatitudeHemisphere(), dcsPoint.getLongitudeHemisphere());
            ah64Points.add(ah64Point);
        }
        return ah64Points;
    }
}
