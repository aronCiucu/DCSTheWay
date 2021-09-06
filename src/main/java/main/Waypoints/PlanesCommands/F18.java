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

public class F18 {
    public static JSONArray getCommands(ArrayList<Point> coords){
        /*
            AMPCD stuff, device 37
            PB 18 - 3028
            PB 2  - 3012
            PB 10 - 3020
            PB 12 - 3022
            PB 5  - 3015
            PB 19 - 3029

            UFC stuff, device 25
            Select 1 - 3010
            Select 1 - 3012
            1 - 3019
            2 (north) - 3020
            3 - 3021
            4 (west) - 3022
            5 - 3023
            6 (east) - 3024
            7 - 3025
            8 (south) - 3026
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

        for (Point coordinate:coords) {
            //increment steerpoint
            commandArray.put(new JSONObject().put("device", "37").put("code", "3022").put("delay", "20").put("activate", "1"));
            //press UFC
            commandArray.put(new JSONObject().put("device", "37").put("code", "3015").put("delay", "40").put("activate", "1"));
            // press position 1
            commandArray.put(new JSONObject().put("device", "25").put("code", "3010").put("delay", "10").put("activate", "1"));
            //check if latitude is N or S
            if(coordinate.getLatitudeHemisphere()== Hemisphere.NORTH){
                //press N north
                commandArray.put(new JSONObject().put("device", "25").put("code", "3020").put("delay", "0").put("activate", "1"));
            } else {
                //press S south
                commandArray.put(new JSONObject().put("device", "25").put("code", "3026").put("delay", "0").put("activate", "1"));
            }
            //start entering first latitude digits
            String latitude = coordinate.getLatitude();
            String firstLat = latitude.substring(0, latitude.length()-4);
            String last4Lat = latitude.substring(latitude.length()-4);
            for(char digit:firstLat.toCharArray()){
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
            commandArray.put(new JSONObject().put("device", "25").put("code", "3029").put("delay", "30").put("activate", "1"));
            //start entering last 4 latitude digits
            for(char digit:last4Lat.toCharArray()){
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
            commandArray.put(new JSONObject().put("device", "25").put("code", "3029").put("delay", "30").put("activate", "1"));
            //check if longitude is E or W
            if(coordinate.getLongitudeHemisphere()== Hemisphere.EAST){
                //press E east
                commandArray.put(new JSONObject().put("device", "25").put("code", "3024").put("delay", "0").put("activate", "1"));
            } else {
                //press W west
                commandArray.put(new JSONObject().put("device", "25").put("code", "3022").put("delay", "0").put("activate", "1"));
            }
            //start entering first longitude digits
            String longitude = coordinate.getLongitude();
            String firstLong = longitude.substring(0, longitude.length()-4);
            String last4Long = longitude.substring(longitude.length()-4);
            for(char digit:firstLong.toCharArray()){
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
            commandArray.put(new JSONObject().put("device", "25").put("code", "3029").put("delay", "30").put("activate", "1"));
            //start entering last 4 longitude digits
            for(char digit:last4Long.toCharArray()){
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
            commandArray.put(new JSONObject().put("device", "25").put("code", "3029").put("delay", "30").put("activate", "1"));
            // press position 3 to select elevation
            commandArray.put(new JSONObject().put("device", "25").put("code", "3012").put("delay", "10").put("activate", "1"));
            // press position 1 to select ft
            commandArray.put(new JSONObject().put("device", "25").put("code", "3010").put("delay", "10").put("activate", "1"));
            //start entering elevation
            for(char digit:coordinate.getElevation().toCharArray()){
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
            commandArray.put(new JSONObject().put("device", "25").put("code", "3029").put("delay", "30").put("activate", "1"));
        }

        return commandArray;
    }

    public static ArrayList<Point> getCoords(List<Point> dcsPoints){
        ArrayList<Point> f18Points = new ArrayList<>();
        for (Point dcsPoint:dcsPoints){
            BigDecimal dcsLat = new BigDecimal(dcsPoint.getLatitude());
            BigDecimal dcsLong = new BigDecimal(dcsPoint.getLongitude());
            Double dcsElev = Double.parseDouble(dcsPoint.getElevation());

            DMMCoordinate dmmLat = CoordinateUtils.decimalToDMM(dcsLat);
            DMMCoordinate dmmLong = CoordinateUtils.decimalToDMM(dcsLong);

            DecimalFormat latDegDf = new DecimalFormat("00");
            DecimalFormat latMinDf = new DecimalFormat("00.0000");
            DecimalFormat longDegDf = new DecimalFormat("#00");
            DecimalFormat longMinDf = new DecimalFormat("00.0000");
            String f18Latitude = latDegDf.format(dmmLat.getDegrees())+latMinDf.format(dmmLat.getMinutes()).replace(".", "");
            String f18Longitude = longDegDf.format(dmmLong.getDegrees())+longMinDf.format(dmmLong.getMinutes()).replace(".", "");
            String f18Elevation = String.valueOf(Math.round(UnitConvertorUtils.metersToFeet(dcsElev)));

            var f18Point = new Point(f18Latitude, f18Longitude, f18Elevation, dcsPoint.getLatitudeHemisphere(), dcsPoint.getLongitudeHemisphere());
            f18Points.add(f18Point);
        }
        return f18Points;
    }
}
