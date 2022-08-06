package main.Waypoints.PlanesCommands;

import main.Utils.CoordinateUtils;
import main.Utils.UnitConvertorUtils;
import main.Waypoints.KeyCommands;
import main.models.DMMCoordinate;
import main.models.Hemisphere;
import main.models.Point;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

enum Cockpit{PILOT,CPG}
enum PointType{WP,HZ,CM,TG}

public class AH64 {
    private static LinkedHashMap<String,String> _keyboard = null;
    private static JSONArray commandArray;
    private static JSONObject _abbreviationObject = null;
    private static int _waypointNumber = 0;

    public static JSONArray getPilotCommands(List<Point> coords) {
        return getCommands(coords,Cockpit.PILOT);
    }
    public static JSONArray getCPGCommands(List<Point> coords) {
        return getCommands(coords,Cockpit.CPG);
    }
    private static JSONArray getCommands(List<Point> coords, Cockpit cockpit) {
        commandArray = new JSONArray();
        _abbreviationObject = ProcessAbbreviations("resources/AH-64D_BLK_II.abr.json");
        if (_keyboard == null) _keyboard = KeyCommands.Build("Helios.AH64D",new String[][] {{"Keyboard Unit (CP/G)","Key "},{"MFD Left (CP/G)", "Button "}});
        String mfdDevice = "";
        String kuDevice = "";
        switch(cockpit){
            case PILOT:
                mfdDevice="43";
                kuDevice= "29";
            break;
            case CPG:
                mfdDevice="45";
                kuDevice= "30";
            break;
        }
        _waypointNumber = 0;
        //Enter TSD Page
        PressKey(mfdDevice, "TSD", "2");
        //goto Point page
        PressKey(mfdDevice, "B6", "2");

        for (Point coordinate:coords) {
            _waypointNumber++;
            boolean validWayPointIdent = false;
            //press ADD
            PressKey(mfdDevice, "L2", "3");
            // Select point type
            try{
                String buttonNumber = "L1";
                String abbreviationClass = "";
                switch(coordinate.getWayPointType()){
                    case "WP": 
                        buttonNumber = "L3";
                        abbreviationClass = "WP";
                        break;
                    case "HZ": 
                        buttonNumber = "L4";
                        abbreviationClass = "HZ";
                        break;
                    case "CM": 
                        buttonNumber = "L5";
                        abbreviationClass = "CM";
                        break;                    
                    case "TG": 
                        buttonNumber = "L6";
                        abbreviationClass = "TG";
                        break;                    
                default:
                        String ex = "Invalid AH-64D Waypoint Type: " + coordinate.getWayPointType();
                        throw new Exception(ex);
                }
                validWayPointIdent = isWaypointIdentificationValid(abbreviationClass,coordinate.getWayPointTypeIdentification());
                PressKey(mfdDevice, buttonNumber, "3");
            } catch (Exception e) {
                e.printStackTrace();
            }
            //press IDENT
            PressKey(mfdDevice, "L1", "3");
            if (validWayPointIdent) TypeText(kuDevice, coordinate.getWayPointTypeIdentification(),2, "3");
            PressKey(kuDevice, "ENTER", "10");
            // Free Text
            if (validWayPointIdent) TypeText(kuDevice, coordinate.getWayPointTypeFreeText(),3, "3");
            PressKey(kuDevice, "ENTER", "10");
            PressKey(kuDevice, "CLR", "10");
            //start typing latitude
            PressKey(kuDevice,  coordinate.getLatitudeHemisphere(), "3");
            TypeText(kuDevice,  coordinate.getLatitude(), "3");
             //start typing longitude
            PressKey(kuDevice,  coordinate.getLongitudeHemisphere(), "3");
            TypeText(kuDevice,  coordinate.getLongitude(), "3");
            //press ENTER twice
            PressKey(kuDevice, "ENTER", "10");
            TypeText(kuDevice, coordinate.getElevation(), "3");
            PressKey(kuDevice, "ENTER", "10");
            PressKey(kuDevice, "CLR", "20");
        }
        return commandArray;
    }
    private static void TypeText(String device, String text, String delay){
        TypeText(device, text, 99, delay);
    }
    private static void TypeText(String device, String text,int maxLength, String delay){
        text = text.length() > maxLength?text.substring(0,maxLength):text;
        for(char digit:text.toCharArray()){             
            PressKey(device,  digit, delay);
        }
    }
    private static void PressKey(String device, Hemisphere hemisphere, String delay){
        String hemi = "";
        switch(hemisphere){
            case EAST: hemi = "E"; break;
            case WEST: hemi = "W"; break;
            case NORTH: hemi = "N"; break;
            case SOUTH: hemi = "S"; break;
        }
        PressKey(device, hemi, delay);
    }
    private static void PressKey(String device, char code, String delay){
        PressKey(device, ""+code, delay);
    }
    private static void PressKey(String device, String code, String delay){
        // if  (code.length() > 1){
        //     System.out.println("\n"+code);
        // }
        // else{
        //     System.out.print(code);            
        // }
        commandArray.put(new JSONObject().put("device", device).put("code",  _keyboard.get(code)).put("delay", delay).put("activate", "1").put("addDepress", "true"));
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

            var ah64Point = new Point(ah64Latitude, ah64Longitude, ah64Elevation, dcsPoint.getLatitudeHemisphere(), dcsPoint.getLongitudeHemisphere(),dcsPoint.getWayPointType(),dcsPoint.getWayPointTypeIdentification(),dcsPoint.getWayPointTypeFreeText());
            ah64Points.add(ah64Point);
        }
        return ah64Points;
    }
    private static JSONObject ProcessAbbreviations(String abrFilename){
        Path abrFilePath = Paths.get(abrFilename);
        JSONObject abbreviations = null;
        try{
            abbreviations = new JSONObject(Files.readString(abrFilePath, StandardCharsets.UTF_8));
        } catch (IOException ex){
            ex.printStackTrace();
        }
        return abbreviations;
    }
    private static boolean isWaypointIdentificationValid(String wpClass, String ident){
        try{
            if(_abbreviationObject != null && ident != ""){
                JSONObject wpAbbreviations = _abbreviationObject.getJSONObject(wpClass);
                if(wpAbbreviations.getString(ident) == ""){
                    throw new JSONException("Abbreviation not Located in Waypoint Type");
                }
            } else {
                return true;
            }
        } catch (JSONException ex){
            System.out.printf("Abbreviation Ident \"%s\" not located in waypoint class \"%s\" at waypoint number %d\n",ident,wpClass,_waypointNumber);
            return false;
        }
        return true;
    }
}
