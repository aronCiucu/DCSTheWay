package main.Waypoints;

import main.DCSconnection.PortListenerThread;
import main.DCSconnection.PortSender;
import main.Waypoints.PlanesCommands.F16;
import main.models.Coordinate;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Locale;

public class WaypointManager {
    private static ArrayList<ArrayList<String>> coords;

    public static void send(ArrayList<Coordinate> decimalCoords){
        String model = PortListenerThread.getPlaneModel();
        ArrayList<Coordinate> coords = convertCoords(decimalCoords);

        if(model != null && !decimalCoords.isEmpty()){
            if(model.equals("F-16C_50")){
                String dataToSend = F16.getCommands(coords).toString();
                PortSender.send(dataToSend);
            } else if(model.equals("FA-188")){

            }
        }

    }

    private static ArrayList<Coordinate> convertCoords(ArrayList<Coordinate> decimalCoords){
        ArrayList<Coordinate> finalCoords = new ArrayList<>();

        for(Coordinate coordinate: decimalCoords){
            String latDegrees, latMinutes, latSeconds, longDegrees, longMinutes, longSeconds;
            // deal with the lat
            var latBD = new BigDecimal(coordinate.getLatitude());
            latDegrees = latBD.toBigInteger().toString();
            var latDegreesDecimalBD = latBD.subtract(new BigDecimal(latDegrees));
            var latMinutesBD = latDegreesDecimalBD.multiply(new BigDecimal(60));
            latMinutes = String.format(Locale.US,"%02d", latMinutesBD.toBigInteger());
            var latMinutesDecimalBD = latMinutesBD.subtract(new BigDecimal(latMinutes));
            var latSecondsBD = latMinutesDecimalBD.multiply(new BigDecimal(60));
            latSeconds = String.format(Locale.US,"%02d0", latSecondsBD.toBigInteger());

            //deal with the long
            var longBD = new BigDecimal(coordinate.getLongitude());
            longDegrees = longBD.toBigInteger().toString();
            var longDegreesDecimalBD = longBD.subtract(new BigDecimal(longDegrees));
            var longMinutesBD = longDegreesDecimalBD.multiply(new BigDecimal(60));
            longMinutes = String.format(Locale.US,"%02d", longMinutesBD.toBigInteger());
            var longMinutesDecimalBD = longMinutesBD.subtract(new BigDecimal(longMinutes));
            var longSecondsBD = longMinutesDecimalBD.multiply(new BigDecimal(60));
            longSeconds = String.format(Locale.US,"%02d0", longSecondsBD.toBigInteger());

            String latitude = latDegrees+"."+latMinutes+"."+latSeconds;
            String longitude = longDegrees+"."+longMinutes+"."+longSeconds;
            finalCoords.add(new Coordinate(latitude, longitude));
        }
        return finalCoords;
    }
}
