package main.Waypoints.PlanesCommands;

import main.Utils.CoordinateUtils;
import main.Utils.UnitConvertorUtils;
import main.models.DMSCoordinate;
import main.models.Hemisphere;
import main.models.Point;
import org.json.JSONArray;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

public class AV8BNA {
    public static JSONArray getCommands(List<Point> coords) {
        /*
           Button List ODU, device 24
		   ODU option 1 3250
		   ODU option 2 3251
		   ODU option 3 3252

		   Left MFD, device 26
		   OBS PB 2 3201
		   OBS PB 18 3217

		   UFC device 23
           1       3302
           2/N     3303
           3       3304
           4/W     3306
           5       3307
           6/E     3308
           7       3310
           8/S     3311
           9       3312
           0       3315
           ENT     3314

           Master Modes Panel, device 12
           NAV Master mode 3282
         */

        JSONArray commandArray = new JSONArray();

        //Enter NAV master mode
        commandArray.put(new JSONObject().put("device", "12").put("code", "3282").put("delay", "10").put("activate", "1").put("addDepress", "true"));
        //Enter left MFD menu
        commandArray.put(new JSONObject().put("device", "26").put("code", "3217").put("delay", "10").put("activate", "1").put("addDepress", "true"));
        //Select EHSD
        commandArray.put(new JSONObject().put("device", "26").put("code", "3201").put("delay", "10").put("activate", "1").put("addDepress", "true"));
        //Select DATA sub menu
        commandArray.put(new JSONObject().put("device", "26").put("code", "3201").put("delay", "10").put("activate", "1").put("addDepress", "true"));
        for (Point coordinate:coords) {
            //Enter 99 to increment waypoint
            commandArray.put(new JSONObject().put("device", "23").put("code", "3312").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            commandArray.put(new JSONObject().put("device", "23").put("code", "3312").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //Press ENT
            commandArray.put(new JSONObject().put("device", "23").put("code", "3314").put("delay", "30").put("activate", "1").put("addDepress", "true"));
            //Select ODU option 2 to enter latitude
            commandArray.put(new JSONObject().put("device", "24").put("code", "3251").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //check if latitude is N or S
            if(coordinate.getLatitudeHemisphere()== Hemisphere.NORTH){
                //press N
                commandArray.put(new JSONObject().put("device", "23").put("code", "3303").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            } else {
                //press S
                commandArray.put(new JSONObject().put("device", "23").put("code", "3311").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            }
            //start typing latitude
            for(char digit:coordinate.getLatitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3302").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3303").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3304").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3306").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3307").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3308").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3310").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3311").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3312").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3315").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //Press ENT
            commandArray.put(new JSONObject().put("device", "23").put("code", "3314").put("delay", "30").put("activate", "1").put("addDepress", "true"));
            //Select ODU option 2 to enter longitude -- removed
//            commandArray.put(new JSONObject().put("device", "24").put("code", "3251").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //check if longitude is E or W
            if(coordinate.getLongitudeHemisphere()==Hemisphere.EAST){
                //press E
                commandArray.put(new JSONObject().put("device", "23").put("code", "3308").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            } else {
                //press W
                commandArray.put(new JSONObject().put("device", "23").put("code", "3306").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            }
            //start typing longitude
            for(char digit:coordinate.getLongitude().toCharArray()){
                switch (digit){
                    case '1':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3302").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '2':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3303").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '3':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3304").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '4':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3306").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '5':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3307").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '6':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3308").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '7':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3310").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '8':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3311").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '9':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3312").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                    case '0':
                        commandArray.put(new JSONObject().put("device", "23").put("code", "3315").put("delay", "10").put("activate", "1").put("addDepress", "true"));
                        break;
                }
            }
            //Press ENT
            commandArray.put(new JSONObject().put("device", "23").put("code", "3314").put("delay", "30").put("activate", "1").put("addDepress", "true"));
            //Select ODU option 2 to revert to latitude - removed
//            commandArray.put(new JSONObject().put("device", "24").put("code", "3251").put("delay", "10").put("activate", "1").put("addDepress", "true"));
            //Select ODU option 1 to revert to waypoint selection mode
            commandArray.put(new JSONObject().put("device", "24").put("code", "3250").put("delay", "10").put("activate", "1").put("addDepress", "true"));
        }
        //Deselect EHSD DATA sub menu
        commandArray.put(new JSONObject().put("device", "26").put("code", "3201").put("delay", "10").put("activate", "1").put("addDepress", "true"));

        return commandArray;
    }

    public static List<Point> getCoords(List<Point> dcsPoints) {
        List<Point> av8bnaPoints = new ArrayList<>();
        for (Point dcsPoint : dcsPoints) {
            BigDecimal dcsLat = new BigDecimal(dcsPoint.getLatitude());
            BigDecimal dcsLong = new BigDecimal(dcsPoint.getLongitude());
            Double dcsElev = Double.parseDouble(dcsPoint.getElevation());

            DMSCoordinate dmsLat = CoordinateUtils.decimalToDMS(dcsLat);
            DMSCoordinate dmsLong = CoordinateUtils.decimalToDMS(dcsLong);

            DecimalFormat latDegDf = new DecimalFormat("00");
            DecimalFormat latMinDf = new DecimalFormat("00");
            DecimalFormat latSecDf = new DecimalFormat("00");
            DecimalFormat longDegDf = new DecimalFormat("000");
            DecimalFormat longMinDf = new DecimalFormat("00");
            DecimalFormat longSecDf = new DecimalFormat("00");
            String av8bnaLatitude = latDegDf.format(dmsLat.getDegrees()) + latMinDf.format(dmsLat.getMinutes()) + latSecDf.format(dmsLat.getSeconds());
            String av8bnaLongitude = longDegDf.format(dmsLong.getDegrees()) + longMinDf.format(dmsLong.getMinutes()) + longSecDf.format(dmsLong.getSeconds());
            String av8bnaElevation = String.valueOf(Math.round(UnitConvertorUtils.metersToFeet(dcsElev)));

            var av8bnaPoint = new Point(av8bnaLatitude, av8bnaLongitude, av8bnaElevation, dcsPoint.getLatitudeHemisphere(), dcsPoint.getLongitudeHemisphere());
            av8bnaPoints.add(av8bnaPoint);
        }
        return av8bnaPoints;
    }
}
