package main.Waypoints;

import main.DCSconnection.PortListenerThread;
import main.DCSconnection.PortSender;
import main.Waypoints.PlanesCommands.F16;
import main.Waypoints.PlanesCommands.F18;
import main.Waypoints.PlanesCommands.A10CII;
import main.models.Coordinate;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.util.ArrayList;

public class WaypointManager {

    public static void send(ArrayList<Coordinate> decimalCoords){
        String model = PortListenerThread.getPlaneModel();

        if(model != null && !decimalCoords.isEmpty()){
            if(model.equals("F-16C_50")){
                ArrayList<Coordinate> coords = convertDDMMmmmCoords(decimalCoords);
                String dataToSend = F16.getCommands(coords).toString();
                PortSender.send(dataToSend);
            } else if(model.equals("FA-18C_hornet")){
                ArrayList<Coordinate> coords = convertDDMMmmCoords(decimalCoords);
                String dataToSend = F18.getCommands(coords).toString();
                PortSender.send(dataToSend);
            } else if(model.equals("A-10C_2")) {
                ArrayList<Coordinate> coords = convertDDMMmmmCoords(decimalCoords);
                String dataToSend = A10CII.getCommands(coords).toString();
                PortSender.send(dataToSend);
            }
        }

    }

    private static ArrayList<Coordinate> convertDDMMmmmCoords(ArrayList<Coordinate> decimalCoords){
        ArrayList<Coordinate> finalCoords = new ArrayList<>();
        for(Coordinate c: decimalCoords) {
            BigDecimal DdLat = new BigDecimal(c.getLatitude());
            BigDecimal DdLong = new BigDecimal(c.getLongitude());
            BigInteger DLat = new BigDecimal(c.getLatitude()).toBigInteger();
            BigInteger DLong = new BigDecimal(c.getLongitude()).toBigInteger();
            BigDecimal dLat = DdLat.subtract(new BigDecimal(DLat.toString()));
            BigDecimal dLong = DdLong.subtract(new BigDecimal(DLong.toString()));
            BigDecimal MmLat = dLat.multiply(new BigDecimal(60));
            BigDecimal MmLong = dLong.multiply(new BigDecimal(60));

            DecimalFormat df = new DecimalFormat("00.000");
            String latitude = DLat+"."+df.format(MmLat);
            String longitude = DLong+"."+df.format(MmLong);
            finalCoords.add(new Coordinate(latitude, longitude));
        }
        return finalCoords;
    }

    private static ArrayList<Coordinate> convertDDMMmmCoords(ArrayList<Coordinate> decimalCoords){
        ArrayList<Coordinate> finalCoords = new ArrayList<>();
        for(Coordinate c: decimalCoords) {
            BigDecimal DdLat = new BigDecimal(c.getLatitude());
            BigDecimal DdLong = new BigDecimal(c.getLongitude());
            BigInteger DLat = new BigDecimal(c.getLatitude()).toBigInteger();
            BigInteger DLong = new BigDecimal(c.getLongitude()).toBigInteger();
            BigDecimal dLat = DdLat.subtract(new BigDecimal(DLat.toString()));
            BigDecimal dLong = DdLong.subtract(new BigDecimal(DLong.toString()));
            BigDecimal MmLat = dLat.multiply(new BigDecimal(60));
            BigDecimal MmLong = dLong.multiply(new BigDecimal(60));

            DecimalFormat df = new DecimalFormat("00.00");
            String latitude = DLat+"."+df.format(MmLat);
            String longitude = DLong+"."+df.format(MmLong);
            finalCoords.add(new Coordinate(latitude, longitude));
        }
        return finalCoords;
    }
}
