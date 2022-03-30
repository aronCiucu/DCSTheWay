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

public class M2000 {
    public static JSONArray getCommands(List<Point> coords) {
        /*
           button list, all are device 9

           INS Coord display 3574 value 0.4
           Next WP  3110
           Prep  3570

           1/Lat   3584
           2/N     3585
           3/Lon   3586
           4/W     3587
           5       3588
           6/E     3589
           7       3590
           8/S     3591
           9       3592
           0       3593
           ENTR    3596
         */

        JSONArray commandArray = new JSONArray();

        for (Point coordinate : coords) {
            //INS coordinate display select
            commandArray.put(new JSONObject().put("device", "9").put("code", "3574").put("delay", "10").put("activate", "0.4").put("addDepress", "false"));
            //increment steerpoint
            commandArray.put(new JSONObject().put("device", "9").put("code", "3110").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //select Prep twice
            commandArray.put(new JSONObject().put("device", "9").put("code", "3570").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            commandArray.put(new JSONObject().put("device", "9").put("code", "3570").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //goto lat field
            commandArray.put(new JSONObject().put("device", "9").put("code", "3584").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //check if latitude is N or S
            if (coordinate.getLatitudeHemisphere() == Hemisphere.NORTH) {
                //press N
                commandArray.put(new JSONObject().put("device", "9").put("code", "3585").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            } else {
                //press S
                commandArray.put(new JSONObject().put("device", "9").put("code", "3591").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            }
            //start typing latitude
            for (char digit : coordinate.getLatitude().toCharArray()) {
                switch (digit) {
                    case '1':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3584").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3585").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3586").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3587").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3588").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3589").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3590").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3591").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3592").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3593").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //press enter
            commandArray.put(new JSONObject().put("device", "9").put("code", "3596").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //goto long field
            commandArray.put(new JSONObject().put("device", "9").put("code", "3586").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //check if longitude is E or W
            if (coordinate.getLongitudeHemisphere() == Hemisphere.EAST) {
                //press E
                commandArray.put(new JSONObject().put("device", "9").put("code", "3589").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            } else {
                //press W
                commandArray.put(new JSONObject().put("device", "9").put("code", "3587").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            }
            //start typing longitude
            for (char digit : coordinate.getLongitude().toCharArray()) {
                switch (digit) {
                    case '1':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3584").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3585").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3586").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3587").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3588").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3589").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3590").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3591").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3592").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3593").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
//            //press enter
            commandArray.put(new JSONObject().put("device", "9").put("code", "3596").put("delay", "10").put("activate", "1").put("addDepress", "true"));
//            //goto elevation field
            commandArray.put(new JSONObject().put("device", "9").put("code", "3574").put("delay", "10").put("activate", "0.3").put("addDepress", "false"));
            //select feet and positive elevatioon
            commandArray.put(new JSONObject().put("device", "9").put("code", "3584").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            commandArray.put(new JSONObject().put("device", "9").put("code", "3584").put("delay", "10").put("activate", "1").put("addDepress", "true"));

//            //start entering elevation
            for (char digit : coordinate.getElevation().toCharArray()) {
                switch (digit) {
                    case '1':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3584").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3585").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3586").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3587").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3588").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3589").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3590").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3591").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3592").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "9").put("code", "3593").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
//            press enter
            commandArray.put(new JSONObject().put("device", "9").put("code", "3596").put("delay", "10").put("activate", "1").put("addDepress", "true"));
        }

        return commandArray;
    }

    public static List<Point> getCoords(List<Point> dcsPoints) {
        List<Point> m2000Points = new ArrayList<>();
        for (Point dcsPoint : dcsPoints) {
            BigDecimal dcsLat = new BigDecimal(dcsPoint.getLatitude());
            BigDecimal dcsLong = new BigDecimal(dcsPoint.getLongitude());
            Double dcsElev = Double.parseDouble(dcsPoint.getElevation());

            DMMCoordinate dmmLat = CoordinateUtils.decimalToDMM(dcsLat);
            DMMCoordinate dmmLong = CoordinateUtils.decimalToDMM(dcsLong);

            DecimalFormat latDegDf = new DecimalFormat("00");
            DecimalFormat latMinDf = new DecimalFormat("00.000");
            DecimalFormat longDegDf = new DecimalFormat("000");
            DecimalFormat longMinDf = new DecimalFormat("00.000");
            String m2000Latitude = latDegDf.format(dmmLat.getDegrees()) + latMinDf.format(dmmLat.getMinutes()).replace(".", "");
            String m2000Longitude = longDegDf.format(dmmLong.getDegrees()) + longMinDf.format(dmmLong.getMinutes()).replace(".", "");
            String m2000Elevation = String.valueOf(Math.round(UnitConvertorUtils.metersToFeet(dcsElev)));

            var m2000Point = new Point(m2000Latitude, m2000Longitude, m2000Elevation, dcsPoint.getLatitudeHemisphere(), dcsPoint.getLongitudeHemisphere());
            m2000Points.add(m2000Point);
        }
        return m2000Points;
    }
}
