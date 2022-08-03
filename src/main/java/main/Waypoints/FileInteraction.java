package main.Waypoints;

import main.models.Point;
import main.models.Hemisphere;

import org.json.JSONObject;
import org.json.JSONArray;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

import java.util.ArrayList;

public class FileInteraction {
    private static JSONArray _points;
    private static Path _infile;
    private static boolean _readWaypoints = false;
    private static Path _outfile;
    private static boolean _writeWaypoints = false;

    public static void Write(ArrayList<Point> waypoints) throws IOException {
        JSONArray pointList = new JSONArray();
         waypoints.forEach(p -> {
            var point = new JSONObject();
            point.put("Latitude",p.getLatitude());
            point.put("LatitudeHemisphere",p.getLatitudeHemisphere());
            point.put("Longitude",p.getLongitude());
            point.put("LongitudeHemisphere",p.getLongitudeHemisphere());
            point.put("Elevation",p.getElevation());
            point.put("WaypointType",p.getWayPointType());
            point.put("WaypointTypeIdentification",p.getWayPointTypeIdentification());
            point.put("WaypointTypeFreeText",p.getWayPointTypeFreeText());
            pointList.put(point);
         });
        _points = pointList;
        JSONObject outputJsonObject = new JSONObject();
        outputJsonObject.put("source","DCS The Way");
        outputJsonObject.put("version","1.5.1.2");
        outputJsonObject.put("type","");
        outputJsonObject.put("commit","");
        outputJsonObject.put("module","");
        outputJsonObject.put("vehicles",new JSONArray());
        outputJsonObject.put("comments","");
        outputJsonObject.put("waypoints",_points);
        Files.writeString(_outfile,outputJsonObject.toString(), StandardCharsets.UTF_8, StandardOpenOption.CREATE);
        System.out.println("Waypoint Data written to " + _outfile.toString() + ":");
        System.out.println(outputJsonObject);
    }

    public static ArrayList<Point> Read() throws IOException {
        ArrayList<Point> points = new ArrayList<>();
        JSONObject fileContents = new JSONObject(Files.readString(_infile, StandardCharsets.UTF_8));
        JSONArray waypoints = (JSONArray) fileContents.get("waypoints");
        waypoints.forEach(wp -> {
            JSONObject jwp = (JSONObject) wp;
            Point p = new Point();
            p.setLatitude(jwp.getString("Latitude"));            
            p.setLatitudeHemisphere(jwp.getString("LatitudeHemisphere")=="NORTH" ? Hemisphere.NORTH:Hemisphere.SOUTH);            
            p.setLongitude(jwp.getString("Longitude"));            
            p.setLongitudeHemisphere(jwp.getString("LongitudeHemisphere")=="EAST" ? Hemisphere.EAST:Hemisphere.WEST);            
            p.setElevation(jwp.getString("Elevation"));            
            p.setWaypointType(jwp.getString("WaypointType"));            
            p.setWaypointTypeIdentification(jwp.getString("WaypointTypeIdentification"));
            p.setWaypointTypeFreeText(jwp.getString("WaypointTypeFreeText"));            
            points.add(p);
        });
        System.out.println("Waypoint Data read in from " + _infile.toString() + ":");
        System.out.println(waypoints.toString());
        return points;
    }

    public static boolean getReadWaypoints(){
        return _readWaypoints;
    }
    public static boolean getWriteWaypoints(){
        return _writeWaypoints;
    }
    public static void setReadWaypoints(Path p){
        _infile = p;
        _readWaypoints = true;
    }
    public static void setWriteWaypoints(Path p){
        _outfile = p;
        _writeWaypoints = true;
    }
}