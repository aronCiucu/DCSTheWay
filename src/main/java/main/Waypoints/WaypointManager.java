package main.Waypoints;

import main.DCSconnection.PortListenerThread;
import main.DCSconnection.PortSender;
import main.Waypoints.PlanesCommands.F16;
import main.Waypoints.PlanesCommands.F18;
import main.Waypoints.PlanesCommands.A10CII;
import main.models.Coordinate;

import java.util.ArrayList;

import static main.Utils.CoordinateUtils.*;

public class WaypointManager {
    static private ArrayList<Coordinate> waypoints = new ArrayList<>();

    public static void transfer(){
        String model = PortListenerThread.getPlaneModel();

        if(model != null && !waypoints.isEmpty()){
            if(model.equals("F-16C_50")) {
                ArrayList<Coordinate> coords = convertDDMMmmmCoords(waypoints);
                String dataToSend = F16.getCommands(coords).toString();
                PortSender.send(dataToSend);
            } else if(model.equals("FA-18C_hornet")){
                ArrayList<Coordinate> coords = convertDDMMmmmmCoords(waypoints);
                String dataToSend = F18.getCommands(coords).toString();
                PortSender.send(dataToSend);
            } else if(model.equals("A-10C_2")) {
                ArrayList<Coordinate> coords = convertDDMMmmmCoords(decimalCoords);
                String dataToSend = A10CII.getCommands(coords).toString();
                PortSender.send(dataToSend);
            }
        }

    }

    public static boolean saveWaypointSuccessful(){
        Coordinate cursorPositionCoordinate = PortListenerThread.getCoordinate();
        if(cursorPositionCoordinate != null){
            waypoints.add(cursorPositionCoordinate);
            return true;
        }
        return false;
    }

    public static void clearWaypoints(){
        waypoints.clear();
    }

    public static int getSelectedWaypointsCount(){
        return waypoints.size();
    }
}
