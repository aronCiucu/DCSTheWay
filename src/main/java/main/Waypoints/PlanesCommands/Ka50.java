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

public class Ka50 {
    public static JSONArray getCommands(List<Point> coords) {
        /*
           button list, all are device 20
           Waypoint button 	3011
		   Enter 			3018
		   PVI mode ENT 	3026 rotary value 0.2
           PVI Mode OPER 	3026 rotary value 0.3

           0/+     3001 +for north and east
           1/-     3002 -for south and west
           2       3003
           3       3004
           4       3005
           5       3006
           6       3007
           7       3008
           8       3009
           9       3010

           */

        JSONArray commandArray = new JSONArray();

        //PVI to Entry mode
        commandArray.put(new JSONObject().put("device", "20").put("code", "3026").put("delay", "0").put("activate", "0.2").put("addDepress", "false"));
        //Press waypoint button
        commandArray.put(new JSONObject().put("device", "20").put("code", "3011").put("delay", "0").put("activate", "1").put("addDepress", "true"));
        for(int i=1; i<= coords.size(); i++){
            //Press the corresponding waypoint number
            switch (i){
                case 1:
                    commandArray.put(new JSONObject().put("device", "20").put("code", "3002").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                    break;
                case 2:
                    commandArray.put(new JSONObject().put("device", "20").put("code", "3003").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                    break;
                case 3:
                    commandArray.put(new JSONObject().put("device", "20").put("code", "3004").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                    break;
                case 4:
                    commandArray.put(new JSONObject().put("device", "20").put("code", "3005").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                    break;
                case 5:
                    commandArray.put(new JSONObject().put("device", "20").put("code", "3006").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                    break;
                case 6:
                    commandArray.put(new JSONObject().put("device", "20").put("code", "3007").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                    break;
            }
            //Check if latitude is N or S
            if (coords.get(i-1).getLatitudeHemisphere() == Hemisphere.NORTH) {
                //press 0/+ for North
                commandArray.put(new JSONObject().put("device", "20").put("code", "3001").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            } else {
                //press 1/- for South
                commandArray.put(new JSONObject().put("device", "20").put("code", "3002").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            }
            //Start typing latitude
            for(char digit:coords.get(i-1).getLatitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3002").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3003").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3004").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3005").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3006").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3007").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3008").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3009").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3010").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3001").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //Check if longitude is E or W
            if (coords.get(i-1).getLongitudeHemisphere() == Hemisphere.EAST) {
                //press 0/+ for East
                commandArray.put(new JSONObject().put("device", "20").put("code", "3001").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            } else {
                //press 1/- for West
                commandArray.put(new JSONObject().put("device", "20").put("code", "3002").put("delay", "0").put("activate", "1").put("addDepress", "true"));
            }
            //Start typing longitude
            for(char digit:coords.get(i-1).getLongitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3002").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3003").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3004").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3005").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3006").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3007").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3008").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3009").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3010").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "20").put("code", "3001").put("delay", "0").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //Press Enter
            commandArray.put(new JSONObject().put("device", "20").put("code", "3018").put("delay", "0").put("activate", "1").put("addDepress", "true"));
        }
        //PVI to OPER
        commandArray.put(new JSONObject().put("device", "20").put("code", "3026").put("delay", "0").put("activate", "0.3").put("addDepress", "false"));

        return commandArray;
    }

    public static List<Point> getCoords(List<Point> dcsPoints) {
        List<Point> Ka50Points = new ArrayList<>();
        for (Point dcsPoint : dcsPoints) {
            BigDecimal dcsLat = new BigDecimal(dcsPoint.getLatitude());
            BigDecimal dcsLong = new BigDecimal(dcsPoint.getLongitude());
            Double dcsElev = Double.parseDouble(dcsPoint.getElevation());

            DMMCoordinate dmmLat = CoordinateUtils.decimalToDMM(dcsLat);
            DMMCoordinate dmmLong = CoordinateUtils.decimalToDMM(dcsLong);

            DecimalFormat latDegDf = new DecimalFormat("00");
            DecimalFormat latMinDf = new DecimalFormat("00.0");
            DecimalFormat longDegDf = new DecimalFormat("000");
            DecimalFormat longMinDf = new DecimalFormat("00.0");
            String Ka50Latitude = latDegDf.format(dmmLat.getDegrees()) + latMinDf.format(dmmLat.getMinutes()).replace(".", "");
            String Ka50Longitude = longDegDf.format(dmmLong.getDegrees()) + longMinDf.format(dmmLong.getMinutes()).replace(".", "");
            String Ka50Elevation = String.valueOf(Math.round(UnitConvertorUtils.metersToFeet(dcsElev)));

            var Ka50Point = new Point(Ka50Latitude, Ka50Longitude, Ka50Elevation, dcsPoint.getLatitudeHemisphere(), dcsPoint.getLongitudeHemisphere());
            Ka50Points.add(Ka50Point);
        }
        return Ka50Points;
    }
}
